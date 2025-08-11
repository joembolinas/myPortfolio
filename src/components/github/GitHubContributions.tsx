import React from 'react';
import { motion } from 'framer-motion';
import { useGitHubUser, useRecentActivity } from '@/hooks/useGitHub';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import { HoverLift } from '@/components/animations/HoverLift';

// Simplified contribution visualization component
export const GitHubContributions: React.FC = () => {
  const { user, loading: userLoading } = useGitHubUser();
  const { activity, loading: activityLoading } = useRecentActivity();

  const loading = userLoading || activityLoading;

  // Generate mock contribution data for visualization
  // In a real implementation, you might use GitHub's GraphQL API or a service like GitHub Contributions API
  const generateContributionData = () => {
    const days = 365;
    const data = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate semi-realistic contribution counts
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const baseActivity = isWeekend ? 0.3 : 0.7;
      const randomFactor = Math.random();
      
      let count = 0;
      if (randomFactor < baseActivity) {
        count = Math.floor(Math.random() * 8) + 1;
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        count,
        level: count === 0 ? 0 : Math.min(Math.floor(count / 2) + 1, 4)
      });
    }
    
    return data;
  };

  const contributionData = generateContributionData();
  
  // Calculate weeks for grid layout
  const weeks: any[][] = [];
  let currentWeek: any[] = [];
  
  contributionData.forEach((day, index) => {
    const dayOfWeek = new Date(day.date).getDay();
    
    if (index === 0) {
      // Fill in empty days at the start of the first week
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push(null);
      }
    }
    
    currentWeek.push(day);
    
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  // Add remaining days to the last week
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const getIntensityColor = (level: number) => {
    const colors = [
      'bg-gray-800', // 0 contributions
      'bg-green-900', // 1-2 contributions
      'bg-green-700', // 3-4 contributions
      'bg-green-500', // 5-6 contributions
      'bg-green-300', // 7+ contributions
    ];
    return colors[level] || colors[0];
  };

  const totalContributions = contributionData.reduce((sum, day) => sum + day.count, 0);
  const activeStreaks = contributionData.filter(day => day.count > 0).length;

  if (loading) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded mb-4"></div>
        <div className="h-32 bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <FadeInOnScroll>
      <HoverLift>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">GitHub Activity</h3>
              <p className="text-gray-400 text-sm">
                {totalContributions} contributions in the last year
              </p>
            </div>
            
            {user && (
              <motion.a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={user.avatar_url} 
                  alt={user.name}
                  className="w-6 h-6 rounded-full"
                />
                @{user.login}
              </motion.a>
            )}
          </div>

          {/* Contribution Grid */}
          <div className="mb-6">
            <div className="flex gap-1 overflow-x-auto pb-2">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={day ? day.date : `empty-${dayIndex}`}
                      className={`w-3 h-3 rounded-sm ${
                        day ? getIntensityColor(day.level) : 'bg-transparent'
                      }`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: weekIndex * 0.01 + dayIndex * 0.001,
                        duration: 0.2 
                      }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.5,
                        transition: { duration: 0.1 }
                      }}
                      title={day ? `${day.count} contributions on ${day.date}` : ''}
                    />
                  ))}
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getIntensityColor(level)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{totalContributions}</div>
              <div className="text-gray-400 text-sm">Total Contributions</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{activeStreaks}</div>
              <div className="text-gray-400 text-sm">Active Days</div>
            </div>
            
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-2xl font-bold text-purple-400">
                {Math.round((activeStreaks / 365) * 100)}%
              </div>
              <div className="text-gray-400 text-sm">Activity Rate</div>
            </div>
          </div>

          {/* Recent Activity Preview */}
          {activity.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-700">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Recent Commits</h4>
              <div className="space-y-2">
                {activity.slice(0, 3).map((commit, index) => (
                  <motion.div
                    key={commit.sha}
                    className="flex items-center gap-3 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-400 truncate flex-1">
                      {commit.commit.message}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {new Date(commit.commit.author.date).toLocaleDateString()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </HoverLift>
    </FadeInOnScroll>
  );
};
