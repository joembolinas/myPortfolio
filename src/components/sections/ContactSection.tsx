import React from 'react';
import { contactMethods } from '@/data/contact';
import { Button } from '@/components/ui/Button';

// Contact section with social links and resume download
export const ContactSection: React.FC = () => {
  const handleContactClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 relative bg-grid-pattern">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16 text-blue-400">Get In Touch</h2>
        
        {/* Contact methods grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactMethods.map((contact) => (
            <div 
              key={contact.type}
              className="bg-gray-700 p-6 rounded-xl hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
              onClick={() => handleContactClick(contact.url)}
            >
              <div className="text-3xl mb-3">{contact.icon}</div>
              <h3 className="font-semibold mb-2">{contact.label}</h3>
              <p className="text-gray-300">{contact.value}</p>
            </div>
          ))}
        </div>
        
        {/* Resume download button */}
        <Button 
          variant="secondary"
          onClick={() => {
            // TODO: Replace with actual resume download link
            alert('Resume download will be implemented with actual resume file');
          }}
        >
          Download Resume
        </Button>
      </div>
    </section>
  );
};
