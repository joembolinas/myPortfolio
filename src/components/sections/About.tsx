import { Card } from '@/components/ui';
import { skills } from '@/data/portfolio';

const About = () => {
  const skillCategories = {
    frontend: skills.filter(skill => skill.category === 'frontend'),
    tools: skills.filter(skill => skill.category === 'tools'),
    business: skills.filter(skill => skill.category === 'business'),
    other: skills.filter(skill => skill.category === 'other'),
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'advanced':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'beginner':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'learning':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/20 dark:text-secondary-400';
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'Frontend Development';
      case 'tools':
        return 'Tools & Platforms';
      case 'business':
        return 'Business Skills';
      case 'other':
        return 'Learning & Growth';
      default:
        return category;
    }
  };

  return (
    <section id="about" className="section-spacing bg-white dark:bg-secondary-900">
      <div className="container-padding mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* About Text */}
          <div className="space-y-6">
            <Card padding="lg" className="h-full">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-4">
                    My Journey
                  </h3>
                  <div className="space-y-4 text-secondary-700 dark:text-secondary-300 leading-relaxed">
                    <p>
                      I'm a 2nd year college student currently learning programming and 
                      transitioning from SNR admin/procurement to tech. My goal is to 
                      secure a remote/VA job to support my education while building 
                      real-world development skills.
                    </p>
                    <p>
                      Through platforms like LeetCode, TryHackMe, and roadmap.sh, I'm 
                      actively expanding my technical knowledge. This portfolio showcases 
                      my growth journey - demonstrating not just technical skills, but 
                      the ability to learn, adapt, and deliver results.
                    </p>
                    <p>
                      My background in business operations gives me a unique perspective 
                      on building practical, user-focused solutions that solve real problems.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-secondary-200 dark:border-secondary-700">
                  <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
                    What I Bring
                  </h4>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                      Strong business operations background with process optimization experience
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                      Proven ability to learn new technologies quickly and effectively
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                      Problem-solving mindset with attention to detail and quality
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                      Honest about current skill level while committed to continuous growth
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Skills Grid */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white text-center lg:text-left">
              Current Skills & Learning
            </h3>
            
            <div className="space-y-6">
              {Object.entries(skillCategories).map(([category, categorySkills]) => (
                <Card key={category} padding="md">
                  <h4 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                    {getCategoryTitle(category)}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`
                          px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                          ${getSkillLevelColor(skill.level)}
                        `}
                        title={`${skill.name} - ${skill.level}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Learning Status Legend */}
            <Card padding="sm" variant="glass">
              <div className="text-center">
                <h5 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Skill Levels
                </h5>
                <div className="flex flex-wrap justify-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    Advanced
                  </span>
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    Intermediate
                  </span>
                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                    Beginner
                  </span>
                  <span className="px-2 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                    Learning
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;