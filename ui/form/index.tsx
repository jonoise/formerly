'use client'

import React, { FC, useEffect } from 'react'
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form'
import { FormJSON } from '..'
import clsx from 'clsx'
import { Input } from './input'

type Props = {
  json: FormJSON
  onSubmit?: (data: any) => Promise<void>
  onSuccess?: (json?: any) => void
  onError?: (json?: any) => void
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.HTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <label
      ref={ref}
      className={clsx(error && 'text-red-500', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = 'FormLabel'

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={clsx('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <div
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={clsx('text-[0.8rem] font-medium text-red-500', className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

export const FormRenderer: FC<Props> = (props) => {
  const { json } = props

  const form = useForm({})

  useEffect(() => {
    if (props.json) {
      props.json.steps
        .flatMap((step) => step.inputs)
        .map((input) => {
          if (input.defaultValue) {
            form.setValue(input.name, input.defaultValue)
          }
        })
    }
  }, [props.json])

  return (
    <FormProvider {...form}>
      <form
        style={{ width: '100%' }}
        onSubmit={form.handleSubmit(async (data) =>
          props.onSubmit
            ? props
                .onSubmit(data)
                .then((json) => props.onSuccess && props.onSuccess(json))
                .catch((json) => props.onError && props.onError(json))
            : console.log(data)
        )}
      >
        {json.steps.map((step) => {
          return (
            <div key={step.id}>
              {step.inputs.map((input, index) => {
                return (
                  <div key={index}>
                    <FormField
                      control={form.control}
                      name={input.name}
                      rules={input.rules}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>{input.label}</FormLabel>
                            <FormControl>
                              <Input {...field} {...input} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                )
              })}
            </div>
          )
        })}
        <button className={clsx(json.submit.className)} type='submit'>
          {json.submit.label}
        </button>
      </form>
    </FormProvider>
  )
}
