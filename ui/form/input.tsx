import clsx from 'clsx'
import * as React from 'react'
import { TextInput } from './text-input'
import { SelectInput } from './select-input'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  switch (props.type) {
    case 'text':
      return <TextInput ref={ref} {...props} />

    case 'password':
      return <TextInput ref={ref} {...props} />

    case 'email':
      return <TextInput ref={ref} {...props} />

    case 'select':
      return <SelectInput {...props} />

    default:
      break
  }
})
Input.displayName = 'Input'

export { Input }
