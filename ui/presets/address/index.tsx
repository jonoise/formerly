import React, { useEffect } from 'react'
import clsx from 'clsx'
import {
  ControllerRenderProps,
  Field,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form'
import { DEFAULT_INPUT_STYLES } from '@/lib/constants'

// @ts-ignore
import { Autocomplete } from '@lob/react-address-autocomplete'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  field: ControllerRenderProps<FieldValues, string>
}

export type AddressOptions = {
  props?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
  name?: string
  label?: string
  rules?: RegisterOptions
  type?: string
}

const defaultOptions: AddressOptions = {
  label: 'Address',
  type: 'address',
  name: 'address',
  props: {
    placeholder: 'Enter your address',
    defaultValue: {
      value: {
        primary_line: '',
        state: '',
        city: '',
        zip_code: '',
      },
      label: '',
    } as any,
  },
}

export const address = (options: AddressOptions = defaultOptions) => {
  return {
    component: React.forwardRef<HTMLInputElement, InputProps>((props, _ref) => {
      const { defaultValue, ...rest } = props
      const { ref, onChange, ...field } = props.field

      return (
        <Autocomplete
          {...rest}
          {...field}
          inputValue={field.value.label}
          onSelection={(address: any) => {
            onChange({
              value: address.value,
              label: Object.values(address.value).join(', '),
            })
          }}
          apiKey={'test_pub_e8f6c2ae617c9a4ccfdd164831b020d'}
        />
      )
    }),
    options: { ...defaultOptions, ...options },
  }
}
