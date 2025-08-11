import React from 'react';
import { contactMethods } from '@/data/contact';
import { Button } from '@/components/ui/Button';
import { useContactForm } from '@/hooks/useContactForm';

// Contact section with social links, contact form, and resume download
export const ContactSection: React.FC = () => {
  const {
    state,
    update,
    submit,
    isSubmitting,
    isSuccess,
    isError,
  } = useContactForm();

  const handleContactClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit();
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 relative bg-grid-pattern"
      aria-labelledby="contact-heading"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto">
        <h2 id="contact-heading" className="text-4xl font-bold mb-16 text-center text-blue-400">Get In Touch</h2>

        {/* Contact methods grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
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

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto mb-16" aria-labelledby="contact-form-heading">
          <h3 id="contact-form-heading" className="text-2xl font-semibold mb-8 text-center">Send a Message</h3>
          
          {/* Status Messages */}
      <div className="mb-6" aria-live="polite" aria-atomic="true">
            {isSuccess && (
        <div className="bg-green-600 text-white p-4 rounded-lg text-center" role="alert">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {isError && Object.keys(state.errors).length > 0 && (
        <div className="bg-red-600 text-white p-4 rounded-lg text-center" role="alert">
                Please fix the errors below and try again.
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-describedby="form-instructions" role="form">
      <p id="form-instructions" className="sr-only">Fields marked with * are required.</p>
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={state.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                placeholder="Your full name"
                required
        aria-invalid={!!state.errors.name}
        aria-describedby={state.errors.name ? 'name-error' : undefined}
              />
              {state.errors.name && (
        <p id="name-error" className="text-red-400 text-sm mt-1">{state.errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={state.email}
                onChange={(e) => update('email', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                placeholder="your.email@example.com"
                required
                aria-invalid={!!state.errors.email}
                aria-describedby={state.errors.email ? 'email-error' : undefined}
              />
              {state.errors.email && (
                <p id="email-error" className="text-red-400 text-sm mt-1">{state.errors.email}</p>
              )}
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={state.subject}
                onChange={(e) => update('subject', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                placeholder="What's this about?"
                aria-invalid={!!state.errors.subject}
                aria-describedby={state.errors.subject ? 'subject-error' : undefined}
              />
              {state.errors.subject && (
                <p id="subject-error" className="text-red-400 text-sm mt-1">{state.errors.subject}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                id="message"
                value={state.message}
                onChange={(e) => update('message', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors resize-vertical"
                placeholder="Tell me about your project, question, or just say hi!"
                required
                aria-invalid={!!state.errors.message}
                aria-describedby={state.errors.message ? 'message-error' : undefined}
              />
              {state.errors.message && (
                <p id="message-error" className="text-red-400 text-sm mt-1">{state.errors.message}</p>
              )}
            </div>

            {/* Honeypot Field (hidden) */}
            <input
              type="text"
              value={state.company}
              onChange={(e) => update('company', e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>

        {/* Resume download button */}
        <div className="text-center">
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
      </div>
    </section>
  );
};
