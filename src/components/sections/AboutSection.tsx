import React from 'react';
import { motion } from 'framer-motion';
import { FadeInOnScroll, FadeInChild } from '@/components/animations/FadeInOnScroll';
import { ProgressiveReveal } from '@/components/animations/ProgressiveReveal';
import { SkillCardHover } from '@/components/animations/HoverLift';
import { skillCategories, getSkillsByCategory } from '@/data/skills';
import { useAdaptiveAnimations } from '@/hooks/useDevicePerformance';

// Enhanced About section with better theming and animations
export const AboutSection: React.FC = () => {
  const { config } = useAdaptiveAnimations();

  const careerStats = [
    { label: 'Years Experience', value: '2+', description: 'Learning & Building' },
    { label: 'Projects Completed', value: '5+', description: 'Portfolio & Practice' },
    { label: 'Technologies', value: '15+', description: 'And Growing' },
    { label: 'LeetCode Problems', value: '50+', description: 'Problem Solving' }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzMzMzMzMyIvPgogIDwvZz4KPHN2Zz4K')] repeat"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeInOnScroll>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent"
              {...(config.quality === 'high' && {
                animate: {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                },
                transition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear'
                }
              })}
            >
              About Me
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From administration to code - building bridges between business operations and technology solutions
            </p>
          </div>
        </FadeInOnScroll>

        {/* Career transition story */}
        <FadeInOnScroll direction="up" className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold text-white mb-6">My Journey</h3>
              <ProgressiveReveal 
                animationType="slide" 
                direction="left"
                staggerDelay={config.staggerDelay}
              >
                <p className="text-gray-300 leading-relaxed text-lg">
                  As a <span className="text-blue-400 font-semibold">2nd year college student</span> and former 
                  <span className="text-emerald-400 font-semibold"> Senior Administrative Officer</span>, I bring a unique 
                  perspective to software development that combines <span className="text-purple-400 font-semibold">5+ years 
                  of business operations experience</span> with growing technical expertise.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  My transition from government administration to technology isn't just a career change—it's about applying 
                  <span className="text-blue-400 font-semibold"> systematic thinking, project management skills, and stakeholder 
                  communication</span> to create software solutions that actually solve real-world problems.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Currently focused on <span className="text-emerald-400 font-semibold">frontend development with React and TypeScript</span>, 
                  while exploring cybersecurity through <span className="text-red-400 font-semibold">TryHackMe</span> and 
                  strengthening algorithmic thinking via <span className="text-yellow-400 font-semibold">LeetCode</span>.
                </p>
              </ProgressiveReveal>
            </div>

            {/* Career stats */}
            <div className="grid grid-cols-2 gap-4">
              {careerStats.map((stat, index) => (
                <FadeInChild key={stat.label}>
                  <SkillCardHover className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl text-center">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                      <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
                      <div className="text-xs text-gray-400">{stat.description}</div>
                    </motion.div>
                  </SkillCardHover>
                </FadeInChild>
              ))}
            </div>
          </div>
        </FadeInOnScroll>

        {/* Skills categories */}
        <FadeInOnScroll direction="up" delay={0.2}>
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl font-semibold text-white mb-4">Skills & Technologies</h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Building a comprehensive skill set across development, security, and data analysis
              </p>
            </div>

            {/* Skill categories */}
            <div className="grid lg:grid-cols-3 gap-8">
              {Object.entries(skillCategories).map(([categoryKey, category]) => {
                const categorySkills = getSkillsByCategory(categoryKey);
                
                return (
                  <FadeInChild key={categoryKey}>
                    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 h-full">
                      <div className="text-center mb-6">
                        <div className="text-4xl mb-3">{category.icon}</div>
                        <h4 className="text-xl font-semibold text-white mb-2">{category.title}</h4>
                        <p className="text-gray-400 text-sm">{category.description}</p>
                      </div>
                      
                      <div className="space-y-3">
                        {categorySkills.map((skill) => (
                          <SkillCardHover key={skill.name}>
                            <div className="bg-gray-700/80 px-4 py-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="text-white font-medium">{skill.name}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  skill.proficiency === 'advanced' ? 'bg-green-500/20 text-green-400' :
                                  skill.proficiency === 'intermediate' ? 'bg-blue-500/20 text-blue-400' :
                                  'bg-orange-500/20 text-orange-400'
                                }`}>
                                  {skill.proficiency}
                                </span>
                              </div>
                            </div>
                          </SkillCardHover>
                        ))}
                      </div>
                    </div>
                  </FadeInChild>
                );
              })}
            </div>
          </div>
        </FadeInOnScroll>

        {/* Call to action */}
        <FadeInOnScroll direction="up" delay={0.4} className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h4 className="text-2xl font-semibold text-white mb-4">Ready to Collaborate</h4>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Looking for opportunities to contribute to meaningful projects and grow alongside experienced developers. 
              Let's build something amazing together!
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </motion.button>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};
