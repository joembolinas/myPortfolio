import { Header, Footer } from '@/components/layout';
import { Hero, About, Projects, Contact } from '@/components/sections';
import { BackToTop } from '@/components/ui';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 dark-mode-transition">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;