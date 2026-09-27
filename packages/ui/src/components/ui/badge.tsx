import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'sale' | 'neutral' | 'status';
}

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  const base = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-none border transition-colors';
  const variants = {
    sale: 'bg-primary text-primary-foreground border-primary',
    neutral: 'bg-card text-foreground border-border',
    status: 'bg-background text-foreground border-border',
  };

  return <div className={cn(base, variants[variant], className)} {...props} />;
}
