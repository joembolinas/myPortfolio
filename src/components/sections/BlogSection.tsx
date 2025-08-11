import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeInOnScroll, FadeInChild } from '@/components/animations/FadeInOnScroll';
import { ProjectCardHover } from '@/components/animations/HoverLift';
import { blogPosts, BlogPost, getBlogPostsByCategory } from '@/data/blogs';
import { ClockIcon, TagIcon, CalendarIcon, ExternalLinkIcon } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlogPost['category'] | 'all'>('all');

  const categories: { key: BlogPost['category'] | 'all'; label: string; color: string }[] = [
    { key: 'all', label: 'All Posts', color: 'from-gray-500 to-gray-600' },
    { key: 'tutorial', label: 'Tutorials', color: 'from-blue-500 to-blue-600' },
    { key: 'experience', label: 'Experience', color: 'from-green-500 to-green-600' },
    { key: 'project', label: 'Projects', color: 'from-purple-500 to-purple-600' },
    { key: 'reflection', label: 'Reflections', color: 'from-yellow-500 to-orange-500' },
    { key: 'technical', label: 'Technical', color: 'from-red-500 to-red-600' },
  ];

  const filteredPosts =
    selectedCategory === 'all' ? blogPosts : getBlogPostsByCategory(selectedCategory);

  const getStatusColor = (status: BlogPost['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-400';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'coming-soon':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: BlogPost['status']) => {
    switch (status) {
      case 'published':
        return '✓';
      case 'draft':
        return '✏️';
      case 'coming-soon':
        return '🚀';
      default:
        return '📄';
    }
  };

  return (
    <section id="blog" className="py-20 px-4 bg-grid-pattern relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInOnScroll>
          <div className="text-center mb-16">
            <motion.h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Blog & Posts
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Sharing insights, experiences, and learnings from my journey in tech. Writing helps me
              reflect on progress and hopefully helps others on similar paths.
            </p>

            {/* Coming soon notice */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-gray-600/50 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-2xl">🚀</span>
                <h3 className="text-lg font-semibold text-white">Content Coming Soon</h3>
              </div>
              <p className="text-gray-300 text-sm">
                I'm actively working on creating valuable content that documents my learning
                journey, technical tutorials, and career transition insights. Each post will be
                thoroughly researched and written to provide real value to fellow learners and
                career changers.
              </p>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Category filter */}
        <FadeInOnScroll delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
                {category.key !== 'all' && (
                  <span className="ml-2 text-xs opacity-70">
                    ({getBlogPostsByCategory(category.key as BlogPost['category']).length})
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </FadeInOnScroll>

        {/* Blog posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <FadeInChild key={post.id}>
              <ProjectCardHover className="h-full">
                <motion.article
                  layout
                  className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden h-full flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Featured badge */}
                  {post.featured && (
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 text-center">
                      ⭐ Featured Post
                    </div>
                  )}

                  {/* Post image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">
                          {post.category === 'tutorial'
                            ? '📚'
                            : post.category === 'experience'
                              ? '🌱'
                              : post.category === 'project'
                                ? '🚀'
                                : post.category === 'reflection'
                                  ? '💭'
                                  : '⚡'}
                        </div>
                        <div className="text-xs text-gray-300 opacity-60">
                          {post.category.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <CalendarIcon size={12} />
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon size={12} />
                        {post.readTime} min read
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-700/60 text-gray-300 rounded-full flex items-center gap-1"
                        >
                          <TagIcon size={10} />
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-700/60 text-gray-400 rounded-full">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Status and action */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(post.status)}`}
                      >
                        <span>{getStatusIcon(post.status)}</span>
                        {post.status === 'coming-soon'
                          ? 'Coming Soon'
                          : post.status === 'draft'
                            ? 'Draft'
                            : 'Published'}
                      </span>

                      <motion.button
                        className={`text-sm font-medium flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-300 ${
                          post.status === 'published'
                            ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10'
                            : 'text-gray-500 cursor-not-allowed'
                        }`}
                        whileHover={post.status === 'published' ? { scale: 1.05 } : {}}
                        disabled={post.status !== 'published'}
                      >
                        {post.status === 'published' ? (
                          <>
                            Read More <ExternalLinkIcon size={12} />
                          </>
                        ) : (
                          'Coming Soon'
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              </ProjectCardHover>
            </FadeInChild>
          ))}
        </div>

        {/* No posts message */}
        {filteredPosts.length === 0 && (
          <FadeInOnScroll>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No posts in this category yet
              </h3>
              <p className="text-gray-500">Check back soon for new content!</p>
            </div>
          </FadeInOnScroll>
        )}

        {/* Call to action */}
        <FadeInOnScroll delay={0.4} className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm border border-gray-600/50 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Want to be notified when I publish new content? Follow my journey on GitHub or connect
              with me on LinkedIn for updates on new posts, projects, and insights.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="https://github.com/joembolinas"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📚</span> Follow on GitHub
              </motion.a>
              <motion.button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};
