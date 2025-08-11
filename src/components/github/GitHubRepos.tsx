import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioRepos } from '@/hooks/useGitHub';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import { HoverLift } from '@/components/animations/HoverLift';
import { GitHubRepo } from '@/services/githubAPI';

// Individual Repository Card Component
const RepoCard: React.FC<{ repo: GitHubRepo; index: number }> = ({ repo, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-500',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      React: 'bg-cyan-500',
      HTML: 'bg-orange-500',
      CSS: 'bg-blue-600',
      Java: 'bg-red-500',
      'C++': 'bg-pink-500',
      Go: 'bg-teal-500',
      Rust: 'bg-orange-600',
    };
    return colors[language] || 'bg-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <HoverLift className="h-full">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 h-full flex flex-col">
          {/* Repository Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <motion.h3
                className="text-lg font-semibold text-white mb-2 hover:text-blue-400 transition-colors"
                whileHover={{ x: 2 }}
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  📁 {repo.name}
                  <motion.span
                    className="text-gray-400"
                    whileHover={{ rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    ↗
                  </motion.span>
                </a>
              </motion.h3>

              <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                {repo.description || 'No description available'}
              </p>
            </div>
          </div>

          {/* Repository Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
            {repo.language && (
              <div className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                <span>{repo.language}</span>
              </div>
            )}

            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span>{repo.stargazers_count}</span>
              </div>
            )}

            {repo.forks_count > 0 && (
              <div className="flex items-center gap-1">
                <span>🔀</span>
                <span>{repo.forks_count}</span>
              </div>
            )}
          </div>

          {/* Topics/Tags */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {repo.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-600/30"
                >
                  {topic}
                </span>
              ))}
              {repo.topics.length > 3 && (
                <span className="text-gray-500 text-xs">+{repo.topics.length - 3} more</span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Updated {formatDate(repo.updated_at)}</span>
              <span>{(repo.size / 1024).toFixed(1)} MB</span>
            </div>
          </div>
        </div>
      </HoverLift>
    </motion.div>
  );
};

// Main GitHub Repositories Component
export const GitHubRepos: React.FC = () => {
  const { portfolioRepos, loading, error } = usePortfolioRepos();
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-800/50 rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-700 rounded mb-3"></div>
            <div className="h-4 bg-gray-700 rounded mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-3 w-16 bg-gray-700 rounded"></div>
              <div className="h-3 w-12 bg-gray-700 rounded"></div>
            </div>
            <div className="h-3 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">Failed to load repositories</p>
        <p className="text-gray-400 text-sm">{error}</p>
      </div>
    );
  }

  const sortedRepos = [...portfolioRepos].sort((a, b) => {
    switch (sortBy) {
      case 'stars':
        return b.stargazers_count - a.stargazers_count;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'updated':
      default:
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
  });

  return (
    <FadeInOnScroll>
      <div className="space-y-6">
        {/* Header with Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Featured Repositories</h3>
            <p className="text-gray-400">Live data from GitHub showcasing recent projects</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'updated' | 'stars' | 'name')}
              className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRepos.map((repo, index) => (
            <RepoCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <FadeInOnScroll delay={0.3}>
          <div className="text-center">
            <motion.a
              href="https://github.com/joembolinas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg transition-all duration-300 text-white"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span>View All Repositories on GitHub</span>
            </motion.a>
          </div>
        </FadeInOnScroll>
      </div>
    </FadeInOnScroll>
  );
};
