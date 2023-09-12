import React from 'react'
import { InputProps } from './input'
import clsx from 'clsx'

export const SelectInput = React.forwardRef<HTMLSelectElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <select
        className={clsx(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      >
        <option value='1'>1</option>
        <option value='2'>2</option>
      </select>
    )
  }
)
