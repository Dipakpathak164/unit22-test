import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive-trigger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const baseStyles =
      'relative group inline-flex items-center justify-center font-extrabold tracking-wider uppercase transition-all duration-200 ease-in-out disabled:bg-[#d8d8da] disabled:text-[#000000]/50 disabled:border-[#d8d8da] disabled:cursor-not-allowed disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white';

    const variants = {
      primary:
        'bg-primary text-primary-foreground border-2 border-primary hover:bg-primary-hover hover:border-primary-hover active:bg-[#d40b11] shadow-md hover:shadow-lg',
      secondary:
        'bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/85 hover:border-secondary shadow-md',
      outline:
        'border-2 border-current bg-transparent text-foreground hover:bg-foreground hover:text-background shadow-sm',
      'destructive-trigger':
        'border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background',
      ghost:
        'bg-transparent text-foreground hover:bg-muted/60 border-2 border-transparent',
    };

    const sizes = {
      sm: 'h-10 px-4 text-xs rounded-none gap-2',
      md: 'h-12 px-6 text-sm rounded-none gap-2.5',
      lg: 'h-14 sm:h-16 px-8 text-sm sm:text-base rounded-none gap-3',
    };

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled ? true : undefined}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
