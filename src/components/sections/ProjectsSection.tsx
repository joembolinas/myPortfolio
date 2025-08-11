import React from 'react';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import { ProgressiveReveal } from '@/components/animations/ProgressiveReveal';
import { motion } from 'framer-motion';

// Mini projects data (simple tools and utilities)
const miniProjects = [
  {
    id: 'converter',
    title: 'Unit Converter',
    description: 'Convert between different units of measurement',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    icon: '⚖️',
    demoUrl: '#',
  },
  {
    id: 'cheatsheet',
    title: 'CSS Cheatsheet',
    description: 'Quick reference for CSS properties and values',
    technologies: ['HTML', 'CSS'],
    icon: '📋',
    demoUrl: '#',
  },
  {
    id: 'calculator',
    title: 'Simple Calculator',
    description: 'Basic arithmetic calculator with clean UI',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    icon: '🧮',
    demoUrl: '#',
  },
  {
    id: 'todo',
    title: 'Todo List',
    description: 'Manage daily tasks with local storage',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    icon: '✅',
    demoUrl: '#',
  },
];

// Enhanced projects showcase section with animations and moving background
export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-20 px-4 relative bg-grid-pattern">
      <div className="max-w-6xl mx-auto">
        {/* Section header with fade-in animation */}
        <FadeInOnScroll>
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>

            <motion.p
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              A collection of projects showcasing my journey from career transition to full-stack
              development
            </motion.p>
          </div>
        </FadeInOnScroll>

        {/* Featured Projects Section */}
        <ProgressiveReveal
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          staggerDelay={0.1}
        >
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -5 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </ProgressiveReveal>

        {/* Mini Projects Section */}
        <FadeInOnScroll delay={0.3}>
          <div className="text-center mb-12">
            <motion.h3
              className="text-3xl font-bold mb-4 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Mini Projects
            </motion.h3>

            <motion.p
              className="text-lg text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Simple tools and utilities I've built for learning and practice
            </motion.p>
          </div>
        </FadeInOnScroll>

        {/* Mini Projects Grid */}
        <ProgressiveReveal
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          staggerDelay={0.1}
        >
          {miniProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -3 }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 h-full">
                <div className="text-2xl mb-3">{project.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-white">{project.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-700 text-xs rounded text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <motion.button
                  className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                  whileHover={{ x: 2 }}
                  onClick={() => window.open(project.demoUrl, '_blank')}
                >
                  Try it →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </ProgressiveReveal>

        {/* GitHub call-to-action */}
        <FadeInOnScroll delay={0.4}>
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-gray-300">View more projects on GitHub</span>
            </motion.div>
          </motion.div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};
