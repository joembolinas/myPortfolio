import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md', 
    hover = false,
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        className={clsx(
          // Base styles
          'rounded-lg border transition-all duration-300',
          
          // Variant styles
          {
            'bg-white dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700 shadow-soft': 
              variant === 'default',
            'glass-effect shadow-medium': 
              variant === 'glass',
            'gradient-bg text-white border-transparent shadow-large': 
              variant === 'gradient',
          },
          
          // Padding styles
          {
            'p-0': padding === 'none',
            'p-3': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg',
          },
          
          // Hover effects
          {
            'hover:shadow-medium hover:-translate-y-1 cursor-pointer': hover && variant === 'default',
            'hover:shadow-large hover:-translate-y-1 cursor-pointer': hover && variant === 'glass',
            'hover:scale-105 cursor-pointer': hover && variant === 'gradient',
          },
          
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;