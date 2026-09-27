import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-none border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50',
          error && 'border-primary aria-[invalid=true]:border-primary',
          className
        )}
        ref={ref}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
