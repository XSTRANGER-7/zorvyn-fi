import React from 'react';
import { cn } from '../../utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'destructive';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-finance-accent focus:ring-offset-2 focus:ring-offset-finance-dark disabled:opacity-50 disabled:pointer-events-none px-4 py-2",
          {
            "bg-finance-accent text-white hover:bg-finance-accentDark": variant === 'primary',
            "bg-transparent hover:bg-finance-border text-finance-textMain": variant === 'ghost',
            "bg-red-500/10 text-red-500 hover:bg-red-500/20": variant === 'destructive',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
