'use client'

import React, { FC, useEffect, useMemo } from 'react'
import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form'
import clsx from 'clsx'
import { EmailOptions } from '../presets/email'
import { createSchema } from '@/lib/schemas'
import { PasswordOptions } from '../presets/password'
import { yupResolver } from '@hookform/resolvers/yup'
import { getPresets } from '@/lib/presets-map'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {}

export type Preset = {
  component: React.ForwardRefExoticComponent<
    { field: ControllerRenderProps<FieldValues, string> } & InputProps &
      React.RefAttributes<HTMLInputElement>
  >
  options: EmailOptions | PasswordOptions | any
}

type FormRendererProps = {
  json: any
  onSubmit?: (data: any) => Promise<void>
  onSuccess?: (json?: any) => void
  onError?: (json?: any) => void
  submitLabel?: string
  submitClassName?: string
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

export const FormField = <
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

export const FormLabel = React.forwardRef<
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

export const FormItem = React.forwardRef<
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

export const FormControl = React.forwardRef<
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

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId, name } = useFormField()
  let body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  if (name === 'address') {
    body = 'Please select an address from the dropdown'
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

export const FormRenderer: FC<FormRendererProps> = (props) => {
  const presets = useMemo(() => getPresets(props.json), [])
  const formSchema = useMemo(() => createSchema(presets), [])
  const form = useForm({ resolver: yupResolver(formSchema) })

  useEffect(() => {
    if (presets) {
      presets.forEach((preset) => {
        if (!preset?.options?.props?.defaultValue) return
        form.setValue(
          preset.options.name!,
          preset?.options?.props?.defaultValue
        )
      })
    }
  }, [presets])

  console.log(form.formState.errors)

  return (
    <FormProvider {...form}>
      <form
        style={{ width: '100%' }}
        className='space-y-5'
        onSubmit={form.handleSubmit(async (data) =>
          props.onSubmit
            ? props
                .onSubmit(data)
                .then((json) =>
                  props.onSuccess ? props.onSuccess(json) : console.log(json)
                )
                .catch((json) =>
                  props.onError ? props.onError(json) : console.log(json)
                )
            : console.log({ data })
        )}
      >
        {presets?.map((preset) => {
          const id = React.useId()
          return (
            <FormField
              key={id}
              control={form.control}
              name={preset.options.name!}
              defaultValue={preset?.options?.props?.defaultValue || undefined}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{preset.options.label}</FormLabel>
                  <FormControl>
                    <preset.component
                      {...preset?.options?.props}
                      field={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        })}
        <div className='flex justify-end'>
          <button
            type='submit'
            className={clsx(
              'bg-blue-500 text-white px-5 py-2 rounded-lg',
              props.submitClassName
            )}
          >
            {props.submitLabel || 'Submit'}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

FormRenderer.displayName = 'FormRenderer'
