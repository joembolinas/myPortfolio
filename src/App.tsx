import { Header, Footer } from '@/components/layout';
import { Hero, About, Projects, Contact } from '@/components/sections';

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
    </div>
  );
}

export default App;