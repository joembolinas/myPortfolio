import React from 'react';
import { CardProps } from '@/types';

// Base card component for consistent styling across the portfolio - optimized with React.memo
export const Card: React.FC<CardProps> = React.memo(
  ({ children, className = '', gradient = '', hover = true }) => {
    const baseStyles = 'bg-gray-800 rounded-xl overflow-hidden border border-gray-600/50';
    const hoverStyles = hover
      ? 'hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50'
      : '';
    const gradientStyles = gradient ? `bg-gradient-to-br ${gradient}` : '';

    return (
      <div className={`${baseStyles} ${hoverStyles} ${gradientStyles} ${className}`}>
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
