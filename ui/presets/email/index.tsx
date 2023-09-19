import React from 'react'
import clsx from 'clsx'
import { Field, RegisterOptions } from 'react-hook-form'
import { DEFAULT_INPUT_STYLES } from '@/lib/constants'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { field: Field }

export type EmailOptions = {
  props?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
  name?: string
  label?: string
  rules?: RegisterOptions
}

const defaultOptions: EmailOptions = {
  label: 'Email',
  name: 'email',
  props: {
    placeholder: 'Enter your email address',
  },
  rules: {
    required: true,
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Please enter a valid email address.',
    },
  },
}

export const email = (options: EmailOptions = defaultOptions) => {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    component: React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
      const { defaultValue, ...rest } = props
      return (
        <input
          type={'email'}
          {...rest}
          {...props.field}
          className={clsx(DEFAULT_INPUT_STYLES, props.className)}
        />
      )
    }),
    options: { ...defaultOptions, ...options },
  }
}
