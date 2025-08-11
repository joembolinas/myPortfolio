import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import { GitHubStats } from '@/components/github/GitHubStats';
import { GitHubRepos } from '@/components/github/GitHubRepos';
import { GitHubContributions } from '@/components/github/GitHubContributions';

// Main GitHub showcase section with live data integration
export const GitHubSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'repos' | 'activity'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'repos', label: 'Repositories', icon: '📁' },
    { id: 'activity', label: 'Activity', icon: '🔥' }
  ];

  return (
    <section id="github" className="py-20 px-4 bg-grid-pattern">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeInOnScroll>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              GitHub Showcase
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Live data from GitHub showcasing real development activity, repository stats, and learning progress
            </motion.p>

            {/* Tab Navigation */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 border border-gray-700">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </FadeInOnScroll>

        {/* Tab Content */}
        <div className="relative">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <GitHubStats />
                </div>
                <div>
                  <GitHubContributions />
                </div>
              </div>
            )}

            {activeTab === 'repos' && <GitHubRepos />}

            {activeTab === 'activity' && (
              <div className="max-w-4xl mx-auto">
                <GitHubContributions />
              </div>
            )}
          </motion.div>
        </div>

        {/* Call to Action */}
        <FadeInOnScroll delay={0.6}>
          <div className="text-center mt-16">
            <motion.div
              className="inline-flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="https://github.com/joembolinas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-lg border border-gray-600 hover:border-blue-500 transition-all duration-300 text-white font-medium"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Follow on GitHub</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>

              <div className="text-gray-400 text-sm">
                <p>Stay updated with my latest projects and contributions</p>
              </div>
            </motion.div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};
