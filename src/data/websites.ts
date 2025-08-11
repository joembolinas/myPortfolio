import { WebsiteType } from '@/types';

// Website types from our unique "10 Essential Static Websites" section
export const websiteTypes: WebsiteType[] = [
  {
    id: 'business-card',
    title: 'Digital Business Card',
    icon: '👤',
    useCase: 'Perfect for freelancers and consultants',
    example:
      'A one-page site with bio, services, contact details, and social links to establish credibility.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'brochure',
    title: 'Online Brochure/Catalog',
    icon: '📋',
    useCase: 'Showcase products without e-commerce',
    example: "A local bakery's gallery of cakes and pastries with descriptions and pricing.",
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Showcase',
    icon: '🎨',
    useCase: 'Must-have for photographers and artists',
    example: "A wedding photographer's stunning galleries organized by event type.",
    gradient: 'from-green-500 to-teal-500',
  },
  {
    id: 'restaurant',
    title: 'Restaurant/Café Menu',
    icon: '🍽️',
    useCase: 'Essential for food establishments',
    example: 'Clean, mobile-friendly site with menu, hours, and embedded map location.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'landing-page',
    title: 'Event Landing Page',
    icon: '🎪',
    useCase: 'Drive registrations and attendance',
    example: 'Conference site with speakers, schedule, and ticket purchasing integration.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'nonprofit',
    title: 'Nonprofit Awareness',
    icon: '❤️',
    useCase: 'Share mission and drive donations',
    example: 'Local charity with impact stories, volunteer opportunities, and donation buttons.',
    gradient: 'from-rose-500 to-pink-500',
  },
];
