import React from 'react';
import { cn } from '../../lib/utils';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white/60 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
