import React from 'react'
import clsx from 'clsx'
import {
  ControllerRenderProps,
  Field,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form'
import { DEFAULT_INPUT_STYLES } from '@/lib/constants'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  field: ControllerRenderProps<FieldValues, string>
}

export type TextOptions = {
  props?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
  name?: string
  label?: string
  rules?: RegisterOptions
  type?: string
}

const defaultOptions: TextOptions = {
  label: '',
  type: '',
  name: '',
}

export const text = (options: TextOptions = defaultOptions) => {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    component: React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
      const { defaultValue, ...rest } = props
      return (
        <input
          type={'text'}
          {...rest}
          {...props.field}
          className={clsx(DEFAULT_INPUT_STYLES, props.className)}
        />
      )
    }),
    options: { ...defaultOptions, ...options },
  }
}
