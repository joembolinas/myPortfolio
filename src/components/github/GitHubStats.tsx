import React from 'react';
import { motion } from 'framer-motion';
import { useGitHubStats } from '@/hooks/useGitHub';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import { HoverLift } from '@/components/animations/HoverLift';

// GitHub Statistics Display Component
export const GitHubStats: React.FC = () => {
  const { stats, loading, error } = useGitHubStats();

  if (loading) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-8 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">Failed to load GitHub stats</p>
        <p className="text-gray-400 text-sm">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  const statItems = [
    {
      label: 'Repositories',
      value: stats.totalRepos,
      icon: '📁',
      color: 'text-blue-400'
    },
    {
      label: 'Total Stars',
      value: stats.totalStars,
      icon: '⭐',
      color: 'text-yellow-400'
    },
    {
      label: 'Total Forks',
      value: stats.totalForks,
      icon: '🔀',
      color: 'text-green-400'
    },
    {
      label: 'Languages',
      value: Object.keys(stats.languageStats).length,
      icon: '💻',
      color: 'text-purple-400'
    }
  ];

  const topLanguages = Object.entries(stats.languageStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <FadeInOnScroll>
      <div className="space-y-6">
        {/* Main Stats Grid */}
        <HoverLift>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-6 text-center">GitHub Activity</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className={`text-2xl font-bold ${item.color} mb-1`}>
                    {item.value.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </HoverLift>

        {/* Top Languages */}
        {topLanguages.length > 0 && (
          <HoverLift>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h4 className="text-lg font-semibold mb-4">Top Languages</h4>
              
              <div className="space-y-3">
                {topLanguages.map(([language, count], index) => {
                  const percentage = Math.round((count / stats.totalRepos) * 100);
                  
                  return (
                    <motion.div
                      key={language}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        <span className="text-gray-300">{language}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <span className="text-gray-400 text-sm w-8">{count}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </HoverLift>
        )}

        {/* Recent Activity */}
        {stats.recentActivity.length > 0 && (
          <HoverLift>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h4 className="text-lg font-semibold mb-4">Recent Activity</h4>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {stats.recentActivity.slice(0, 5).map((commit, index) => (
                  <motion.div
                    key={commit.sha}
                    className="flex items-start space-x-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-sm truncate">
                        {commit.commit.message}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(commit.commit.author.date).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <motion.a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View →
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            </div>
          </HoverLift>
        )}
      </div>
    </FadeInOnScroll>
  );
};
