import React from 'react';
import { Button } from '@/components/ui/Button';
import { useScrollTo } from '@/hooks/useScrollTo';
import { ParticleBackground } from '@/components/animations/ParticleBackground';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import { CyclicText } from '@/components/animations/CyclicText';
import { motion } from 'framer-motion';
import { home } from '@/data/home';

// Hero section with particle background and morphing text
export const HeroSection: React.FC = () => {
  const { scrollToSection } = useScrollTo();

  // Use highlights from content as cyclic text, or fallback to career titles
  const careerTitles = home.highlights && home.highlights.length > 0
    ? home.highlights
    : [
        'Full Stack Developer',
        'Frontend Specialist',
        'React Enthusiast',
        'Career Changer',
        'Problem Solver',
      ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      role="banner"
      aria-label="Introduction and primary presentation"
    >
      {/* Interactive particle background */}
      <ParticleBackground
        particleCount={100}
        colors={['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.2)']}
        className="absolute inset-0"
      />

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Main heading with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            {home.title}
          </h1>
        </motion.div>

        {/* Career transition subtitle with morphing text */}
        <FadeInOnScroll delay={0.4}>
          <div className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            {home.subtitle && (
              <div className="mb-2 text-gray-200">{home.subtitle}</div>
            )}
            <CyclicText
              texts={careerTitles}
              className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold"
              interval={3000}
            />
            {home.body && (
              <div className="mt-2">{home.body}</div>
            )}
          </div>
        </FadeInOnScroll>

        {/* Call-to-action buttons with hover animations */}
        <FadeInOnScroll delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {home.ctaPrimary && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="primary"
                  onClick={() => scrollToSection(home.ctaPrimary?.href?.replace('#', '') || 'projects')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {home.ctaPrimary.label}
                </Button>
              </motion.div>
            )}

            {home.ctaSecondary && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection(home.ctaSecondary?.href?.replace('#', '') || 'learning-journey')}
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  {home.ctaSecondary.label}
                </Button>
              </motion.div>
            )}
          </div>
        </FadeInOnScroll>

        {/* Floating elements for visual interest */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1,
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-500 rounded-full opacity-40"
          animate={{
            y: [0, 15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: 2,
          }}
        />
      </div>
    </section>
  );
};
