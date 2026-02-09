import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-earth-900 text-earth-100 hover:bg-earth-800 shadow-lg shadow-earth-900/10 border border-transparent',
      secondary: 'bg-white text-earth-900 border border-earth-800/10 hover:bg-earth-50 hover:border-earth-800/20 shadow-sm',
      outline: 'bg-transparent border border-earth-900 text-earth-900 hover:bg-earth-900 hover:text-earth-100',
      ghost: 'bg-transparent text-earth-800 hover:bg-earth-800/5 hover:text-earth-900',
      danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs rounded-lg',
      md: 'px-5 py-2.5 text-sm rounded-xl',
      lg: 'px-8 py-3.5 text-base rounded-xl',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-earth-900/20 focus:ring-offset-2 focus:ring-offset-earth-100 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
