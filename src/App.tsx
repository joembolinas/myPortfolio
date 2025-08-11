import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { LearningJourneySection } from '@/components/sections/LearningJourneySection';
import { GitHubSection } from '@/components/sections/GitHubSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { ContactSection } from '@/components/sections/ContactSection';

// Main App component with enhanced sections and animations
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Fixed navigation */}
      <Navigation />

      {/* All sections with enhanced animations */}
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <LearningJourneySection />
        <GitHubSection />
        <BlogSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
