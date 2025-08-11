import React from 'react';
import { websiteTypes } from '@/data/websites';
import { WebsiteCard } from '@/components/ui/WebsiteCard';

// Static websites section - our unique business value proposition
export const WebsitesSection: React.FC = () => {
  return (
    <section id="websites" className="py-20 px-4 bg-gray-800/95 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-blue-400">10 Essential Static Websites</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Empower your small business with cost-effective, fast-loading, and secure static
            websites. Perfect for establishing a strong online presence without the complexity.
          </p>
        </div>

        {/* Website types grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {websiteTypes.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>
      </div>
    </section>
  );
};
