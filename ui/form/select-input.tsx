import React from 'react'
import { InputProps } from './input'
import clsx from 'clsx'

export const SelectInput = React.forwardRef<HTMLSelectElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <select className={clsx(className)} ref={ref} {...props}>
        <option value=''>{props.placeholder}</option>
        <option value='laputa'>LAPUTA</option>
      </select>
    )
  }
)
