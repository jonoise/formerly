import React from 'react'
import { InputProps } from './input'
import clsx from 'clsx'

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <input
        type={props.type}
        className={clsx(props.className)}
        ref={ref}
        {...props}
      />
    )
  }
)
