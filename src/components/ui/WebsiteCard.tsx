import React from 'react';
import { WebsiteType } from '@/types';
import { Card } from './Card';
import { Button } from './Button';

interface WebsiteCardProps {
  website: WebsiteType;
}

// Website type card for our "10 Essential Static Websites" section
export const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  return (
    <Card className="group bg-gray-700/50">
      {/* Colored top border */}
      <div className={`h-2 bg-gradient-to-r ${website.gradient}`}></div>
      
      <div className="p-6">
        {/* Header with icon and title */}
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-3">{website.icon}</span>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
            {website.title}
          </h3>
        </div>
        
        {/* Use case */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-blue-300 mb-2">Use Case:</p>
          <p className="text-gray-300 text-sm">{website.useCase}</p>
        </div>
        
        {/* Example */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-green-300 mb-2">Example:</p>
          <p className="text-gray-400 text-sm leading-relaxed">{website.example}</p>
        </div>
        
        {/* CTA Button */}
        <div className="mt-6 pt-4 border-t border-gray-600/50">
          <Button 
            variant="secondary" 
            size="sm"
            className="w-full transform group-hover:scale-105"
          >
            Get Quote
          </Button>
        </div>
      </div>
    </Card>
  );
};
