import React from 'react';
import { cn } from '../../utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function Card({ className, glow, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl glass p-6 transition-all duration-300",
        glow && "hover:shadow-[0_0_20px_rgba(170,59,255,0.15)] hover:border-finance-accent/50",
        className
      )}
      {...props}
    />
  );
}
