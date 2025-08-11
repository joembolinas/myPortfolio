import { Suspense, lazy } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { LoadingSection } from '@/components/lazy/LazySection';

// Lazy load non-critical sections for better performance
const AboutSection = lazy(() => import('@/components/sections/AboutSection').then(module => ({ default: module.AboutSection })));
const ProjectsSection = lazy(() => import('@/components/sections/ProjectsSection').then(module => ({ default: module.ProjectsSection })));
const LearningJourneySection = lazy(() => import('@/components/sections/LearningJourneySection').then(module => ({ default: module.LearningJourneySection })));
const GitHubSection = lazy(() => import('@/components/sections/GitHubSection').then(module => ({ default: module.GitHubSection })));
const BlogSection = lazy(() => import('@/components/sections/BlogSection').then(module => ({ default: module.BlogSection })));
const ContactSection = lazy(() => import('@/components/sections/ContactSection').then(module => ({ default: module.ContactSection })));

// Main App component with enhanced sections and code splitting
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Fixed navigation */}
      <Navigation />

      {/* All sections with lazy loading */}
      <main className="relative">
        {/* Hero loads immediately for faster FCP */}
        <HeroSection />
        
        {/* Other sections load as needed */}
        <Suspense fallback={<LoadingSection message="Loading About section..." />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<LoadingSection message="Loading Projects..." />}>
          <ProjectsSection />
        </Suspense>
        
        <Suspense fallback={<LoadingSection message="Loading Learning Journey..." />}>
          <LearningJourneySection />
        </Suspense>
        
        <Suspense fallback={<LoadingSection message="Loading GitHub data..." />}>
          <GitHubSection />
        </Suspense>
        
        <Suspense fallback={<LoadingSection message="Loading Blog..." />}>
          <BlogSection />
        </Suspense>
        
        <Suspense fallback={<LoadingSection message="Loading Contact..." />}>
          <ContactSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
