import React from 'react'
import clsx from 'clsx'
import { Field, RegisterOptions } from 'react-hook-form'
import { DEFAULT_INPUT_STYLES } from '@/lib/constants'

type PasswordProps = React.InputHTMLAttributes<HTMLInputElement> & {
  field: Field
}

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
  label: 'Password',
  name: 'password',
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

export const password = (options: EmailOptions = defaultOptions) => {
  return {
    component: React.forwardRef<HTMLInputElement, PasswordProps>(
      (props, ref) => {
        const { defaultValue, ...rest } = props
        return (
          <input
            type={'password'}
            {...rest}
            {...props.field}
            className={clsx(DEFAULT_INPUT_STYLES, props.className)}
          />
        )
      }
    ),
    options: { ...defaultOptions, ...options },
  }
}
