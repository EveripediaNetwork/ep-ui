import * as React from 'react'
import { cn } from '@lib/utils'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-gray200 bg-white px-3 py-2 text-sm r file:border-0 file:bg-transparent file:text-sm file:font-medium outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-alpha-400 dark:bg-gray800 dark:placeholder:text-slate-400 ',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
