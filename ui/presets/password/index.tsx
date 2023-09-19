import React from 'react'
import clsx from 'clsx'
import { Field, RegisterOptions } from 'react-hook-form'
import { DEFAULT_INPUT_STYLES } from '@/lib/constants'

type PasswordProps = React.InputHTMLAttributes<HTMLInputElement> & {
  field: Field
}

export type PasswordOptions = {
  props?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
  name?: string
  label?: string
  rules?: RegisterOptions
  shouldMatch?: string
  shouldMatchMessage?: string
  confirm?: boolean
}

const defaultOptions: PasswordOptions = {
  label: 'Password',
  name: 'password',
  confirm: false,
  props: {
    placeholder: 'Enter your password',
  },
  rules: {
    required: 'The password is required.',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
  },
}

export const password = (options: PasswordOptions = defaultOptions) => {
  const mergedOptions = { ...defaultOptions, ...options }

  if (mergedOptions.confirm) {
    mergedOptions.shouldMatch = mergedOptions.shouldMatch || 'password'
    mergedOptions.shouldMatchMessage =
      mergedOptions.shouldMatchMessage || 'Passwords do not match'
  }

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
    options: mergedOptions,
  }
}
