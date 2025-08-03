import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { WebsitesSection } from '@/components/sections/WebsitesSection';
import { ContactSection } from '@/components/sections/ContactSection';

// Main App component - putting it all together
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Fixed navigation */}
      <Navigation />
      
      {/* All sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <WebsitesSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
