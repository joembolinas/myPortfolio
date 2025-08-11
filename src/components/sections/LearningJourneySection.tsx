import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInOnScroll, FadeInChild } from '@/components/animations/FadeInOnScroll';
import { HoverLift } from '@/components/animations/HoverLift';
import { learningJourney, LearningJourneyItem } from '@/data/learningJourney';
import { useAdaptiveAnimations } from '@/hooks/useDevicePerformance';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

export const LearningJourneySection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { config } = useAdaptiveAnimations();

  const displayedItems = showAll ? learningJourney : learningJourney.slice(0, 6);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getCategoryIcon = (category: LearningJourneyItem['category']) => {
    const icons = {
      education: '🎓',
      work: '💼',
      skill: '🛠️',
      project: '🚀',
      certification: '📜',
    };
    return icons[category];
  };

  return (
    <section id="learning-journey" className="py-20 px-4 bg-grid-pattern relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeInOnScroll>
          <div className="text-center mb-16">
            <motion.h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              My Learning Journey
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From administrative excellence to technical proficiency - every step tells a story of
              growth, curiosity, and the determination to build a meaningful career in technology.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 transform md:-translate-x-1/2"></div>

          {/* Journey items */}
          <div className="space-y-8">
            {displayedItems.map((item, index) => (
              <FadeInChild key={item.id}>
                <div
                  className={`flex items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:items-center`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform md:-translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
                  >
                    <HoverLift liftHeight={6} glowIntensity="medium" className="relative">
                      <motion.div
                        layout
                        className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 cursor-pointer"
                        onClick={() => toggleCard(item.id)}
                      >
                        {/* Card header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-2xl`}
                            >
                              {item.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                                  {getCategoryIcon(item.category)} {item.category}
                                </span>
                                <span className="text-sm text-gray-400">{item.period}</span>
                              </div>
                              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                            </div>
                          </div>

                          <motion.div
                            animate={{ rotate: expandedCard === item.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <ChevronDownIcon size={20} />
                          </motion.div>
                        </div>

                        {/* Basic description */}
                        <p className="text-gray-300 mb-4">{item.description}</p>

                        {/* Expanded content */}
                        <AnimatePresence>
                          {expandedCard === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: config.duration }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-gray-700 pt-4 space-y-4">
                                {/* Overview */}
                                <div>
                                  <h4 className="text-lg font-semibold text-blue-400 mb-2">
                                    Overview
                                  </h4>
                                  <p className="text-gray-300 text-sm leading-relaxed">
                                    {item.expandedContent.overview}
                                  </p>
                                </div>

                                {/* Key learnings */}
                                <div>
                                  <h4 className="text-lg font-semibold text-emerald-400 mb-2">
                                    Key Learnings
                                  </h4>
                                  <ul className="space-y-1">
                                    {item.expandedContent.keyLearnings.map((learning, idx) => (
                                      <li
                                        key={idx}
                                        className="text-gray-300 text-sm flex items-start gap-2"
                                      >
                                        <span className="text-emerald-400 mt-1">•</span>
                                        {learning}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Technologies */}
                                {item.expandedContent.technologies && (
                                  <div>
                                    <h4 className="text-lg font-semibold text-purple-400 mb-2">
                                      Technologies
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {item.expandedContent.technologies.map((tech, idx) => (
                                        <span
                                          key={idx}
                                          className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Achievements */}
                                {item.expandedContent.achievements && (
                                  <div>
                                    <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                                      Achievements
                                    </h4>
                                    <ul className="space-y-1">
                                      {item.expandedContent.achievements.map((achievement, idx) => (
                                        <li
                                          key={idx}
                                          className="text-gray-300 text-sm flex items-start gap-2"
                                        >
                                          <span className="text-yellow-400 mt-1">★</span>
                                          {achievement}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Challenges */}
                                {item.expandedContent.challenges && (
                                  <div>
                                    <h4 className="text-lg font-semibold text-red-400 mb-2">
                                      Challenges
                                    </h4>
                                    <ul className="space-y-1">
                                      {item.expandedContent.challenges.map((challenge, idx) => (
                                        <li
                                          key={idx}
                                          className="text-gray-300 text-sm flex items-start gap-2"
                                        >
                                          <span className="text-red-400 mt-1">⚡</span>
                                          {challenge}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Next steps */}
                                {item.expandedContent.nextSteps && (
                                  <div>
                                    <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                                      Next Steps
                                    </h4>
                                    <ul className="space-y-1">
                                      {item.expandedContent.nextSteps.map((step, idx) => (
                                        <li
                                          key={idx}
                                          className="text-gray-300 text-sm flex items-start gap-2"
                                        >
                                          <span className="text-cyan-400 mt-1">→</span>
                                          {step}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </HoverLift>
                  </div>
                </div>
              </FadeInChild>
            ))}
          </div>
        </div>

        {/* Show more button */}
        {learningJourney.length > 6 && (
          <FadeInOnScroll delay={0.3} className="text-center mt-12">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? (
                <>
                  Show Less <ChevronUpIcon size={20} />
                </>
              ) : (
                <>
                  View More ({learningJourney.length - 6} more items) <ChevronDownIcon size={20} />
                </>
              )}
            </motion.button>
          </FadeInOnScroll>
        )}

        {/* Summary stats */}
        <FadeInOnScroll delay={0.4} className="mt-16">
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm border border-gray-600/50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-center text-white mb-8">Journey Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {learningJourney.length}
                </div>
                <div className="text-gray-300 text-sm">Learning Milestones</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {learningJourney.filter((item) => item.category === 'skill').length}
                </div>
                <div className="text-gray-300 text-sm">Skills Developed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {learningJourney.filter((item) => item.category === 'project').length}
                </div>
                <div className="text-gray-300 text-sm">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">2+</div>
                <div className="text-gray-300 text-sm">Years Growing</div>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};
