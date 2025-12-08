export interface LearningJourneyItem {
  id: string;
  title: string;
  period: string;
  category: 'education' | 'work' | 'skill' | 'project' | 'certification';
  description: string;
  expandedContent: {
    overview: string;
    keyLearnings: string[];
    technologies?: string[];
    achievements?: string[];
    challenges?: string[];
    nextSteps?: string[];
  };
  icon: string;
  color: string;
  isExpanded?: boolean;
}

// Import learning journey data from virtual module populated by Vite plugin
// This reads all .md files from content/learningJourney/ at build time
import { learningJourney as journeyData } from 'virtual:learning-journey-data';

export const learningJourney: LearningJourneyItem[] = journeyData ?? [
  {
    id: 'career-start',
    title: 'Senior Admin/Procurement Officer',
    period: '2018-2023',
    category: 'work',
    description: 'Building foundational business and organizational skills in government service.',
    expandedContent: {
      overview:
        'Developed comprehensive administrative and procurement expertise while managing complex projects and stakeholder relationships in a fast-paced government environment.',
      keyLearnings: [
        'Project management and deadline coordination',
        'Stakeholder communication and relationship building',
        'Process optimization and workflow improvement',
        'Budget management and financial oversight',
        'Compliance and regulatory understanding',
      ],
      achievements: [
        'Streamlined procurement processes, reducing processing time by 30%',
        'Managed multi-million peso procurement projects',
        'Led cross-departmental collaboration initiatives',
        'Implemented digital filing systems improving efficiency',
      ],
      challenges: [
        'Balancing multiple competing priorities and deadlines',
        'Navigating complex regulatory requirements',
        'Managing stakeholder expectations across departments',
      ],
      nextSteps: [
        'Transition skills to tech industry',
        'Apply organizational skills to software development',
        'Leverage communication skills in technical teams',
      ],
    },
    icon: '💼',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'college-return',
    title: 'College Return - 2nd Year Student',
    period: '2023-Present',
    category: 'education',
    description: 'Pursuing formal computer science education to strengthen technical foundations.',
    expandedContent: {
      overview:
        'Returned to formal education to build strong theoretical foundations in computer science while applying real-world experience to academic learning.',
      keyLearnings: [
        'Data structures and algorithms fundamentals',
        'Object-oriented programming principles',
        'Database design and management',
        'Software engineering methodologies',
        'Mathematical foundations for computing',
      ],
      technologies: ['Java', 'Python', 'SQL', 'HTML/CSS', 'JavaScript basics'],
      achievements: [
        'Maintaining high academic performance while learning',
        'Successfully balancing work experience with new concepts',
        'Active participation in programming assignments',
        'Building portfolio projects alongside coursework',
      ],
      challenges: [
        'Adapting to formal academic structure after work experience',
        'Balancing intensive learning with practical application',
        'Keeping up with rapidly evolving technology landscape',
      ],
    },
    icon: '🎓',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'leetcode-journey',
    title: 'LeetCode Problem Solving',
    period: '2024-Present',
    category: 'skill',
    description:
      'Developing algorithmic thinking and problem-solving skills through consistent practice.',
    expandedContent: {
      overview:
        'Committed to daily problem-solving practice to strengthen algorithmic thinking and prepare for technical interviews while building confidence in coding abilities.',
      keyLearnings: [
        'Algorithm design and optimization techniques',
        'Time and space complexity analysis',
        'Data structure selection and implementation',
        'Problem decomposition strategies',
        'Pattern recognition in coding problems',
      ],
      technologies: [
        'Python for algorithms',
        'Java for data structures',
        'Problem-solving patterns',
      ],
      achievements: [
        'Solved 50+ problems across different difficulty levels',
        'Improved problem-solving speed and accuracy',
        'Gained confidence in technical problem analysis',
        'Developed systematic approach to unknown problems',
      ],
      challenges: [
        'Overcoming initial intimidation with complex problems',
        'Maintaining consistent daily practice schedule',
        'Balancing speed with code quality and readability',
      ],
    },
    icon: '🧩',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'tryhackme-security',
    title: 'TryHackMe Security Learning',
    period: '2024-Present',
    category: 'skill',
    description: 'Exploring cybersecurity fundamentals and ethical hacking concepts.',
    expandedContent: {
      overview:
        'Developing cybersecurity awareness and technical skills through hands-on labs and security challenges, building a well-rounded tech skill set.',
      keyLearnings: [
        'Network security fundamentals',
        'Linux command line proficiency',
        'Security tool usage and analysis',
        'Ethical hacking methodologies',
        'Incident response and forensics basics',
      ],
      technologies: [
        'Linux/Unix systems',
        'Network tools (Nmap, Wireshark)',
        'Security frameworks',
        'Virtual machines',
      ],
      achievements: [
        'Completed 20+ security learning modules',
        'Gained hands-on experience with security tools',
        'Developed security-first mindset for development',
        'Understanding of common vulnerabilities and mitigations',
      ],
      challenges: [
        'Learning complex security concepts from scratch',
        'Setting up proper lab environments',
        'Balancing security learning with development skills',
      ],
    },
    icon: '🔒',
    color: 'from-red-500 to-red-600',
  },
  {
    id: 'web-development',
    title: 'Web Development Foundations',
    period: '2024-Present',
    category: 'skill',
    description: 'Building modern web development skills with HTML, CSS, JavaScript, and React.',
    expandedContent: {
      overview:
        'Transitioning from traditional programming concepts to modern web development, focusing on creating interactive and responsive user experiences.',
      keyLearnings: [
        'Modern HTML5 semantic structure',
        'CSS3 advanced styling and animations',
        'JavaScript ES6+ features and concepts',
        'React component-based architecture',
        'Responsive design principles',
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React', 'Tailwind CSS', 'Git/GitHub'],
      achievements: [
        'Built first portfolio website from scratch',
        'Created interactive React components',
        'Implemented responsive design patterns',
        'Deployed projects to live environments',
      ],
      challenges: [
        'Understanding modern JavaScript ecosystem complexity',
        'Learning React state management and lifecycle',
        'Keeping up with rapidly changing frontend technologies',
      ],
    },
    icon: '🌐',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'portfolio-project',
    title: 'Portfolio Development Project',
    period: '2024-Present',
    category: 'project',
    description: 'Creating a comprehensive portfolio to showcase skills and career transition.',
    expandedContent: {
      overview:
        'Developing a professional portfolio that demonstrates technical skills while telling the story of career transition from administration to technology.',
      keyLearnings: [
        'Project planning and execution',
        'Modern development workflow (Git, CI/CD)',
        'Performance optimization techniques',
        'User experience design principles',
        'Professional presentation of technical work',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Vite',
        'GitHub Actions',
      ],
      achievements: [
        'Designed and implemented responsive portfolio site',
        'Set up professional development workflow',
        'Integrated modern animation and interaction design',
        'Documented development process and decisions',
      ],
      challenges: [
        'Balancing feature complexity with performance',
        'Creating compelling narrative around career transition',
        'Learning advanced development tools and practices',
      ],
    },
    icon: '🚀',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'roadmap-learning',
    title: 'roadmap.sh Guided Learning',
    period: '2024-Present',
    category: 'skill',
    description: 'Following structured learning paths for frontend and backend development.',
    expandedContent: {
      overview:
        'Using roadmap.sh to ensure comprehensive coverage of essential web development concepts and maintain a structured approach to skill building.',
      keyLearnings: [
        'Structured approach to technology learning',
        'Industry-standard development practices',
        'Full-stack development concepts',
        'Tool selection and ecosystem understanding',
        'Career path planning in tech',
      ],
      technologies: [
        'Frontend roadmap tools',
        'Backend fundamentals',
        'DevOps basics',
        'Database concepts',
      ],
      achievements: [
        'Completed 40% of frontend developer roadmap',
        'Gained clarity on learning priorities',
        'Identified knowledge gaps and improvement areas',
        'Built systematic approach to skill development',
      ],
      challenges: [
        'Managing overwhelm from extensive roadmap scope',
        'Prioritizing learning objectives with limited time',
        'Balancing breadth vs depth in learning approach',
      ],
    },
    icon: '🗺️',
    color: 'from-teal-500 to-teal-600',
  },
  {
    id: 'github-collaboration',
    title: 'Git & GitHub Workflow Mastery',
    period: '2024-Present',
    category: 'skill',
    description: 'Learning professional version control and collaboration practices.',
    expandedContent: {
      overview:
        'Developing proficiency in Git version control and GitHub collaboration features essential for professional software development teams.',
      keyLearnings: [
        'Git version control fundamentals',
        'Branching strategies and merge workflows',
        'Pull request and code review processes',
        'Issue tracking and project management',
        'Open source contribution practices',
      ],
      technologies: ['Git CLI', 'GitHub', 'GitHub Actions', 'Markdown documentation'],
      achievements: [
        'Set up professional GitHub profile and repositories',
        'Implemented GitHub Actions for CI/CD',
        'Created comprehensive project documentation',
        'Established consistent commit and branching practices',
      ],
      challenges: [
        'Understanding complex Git concepts and conflict resolution',
        'Learning collaborative workflow best practices',
        'Maintaining consistent documentation standards',
      ],
    },
    icon: '📚',
    color: 'from-gray-500 to-gray-600',
  },
  {
    id: 'typescript-learning',
    title: 'TypeScript Skill Development',
    period: '2024-Present',
    category: 'skill',
    description: 'Adding type safety and advanced JavaScript concepts to development toolkit.',
    expandedContent: {
      overview:
        'Learning TypeScript to improve code quality, catch errors early, and work with modern enterprise-level JavaScript applications.',
      keyLearnings: [
        'Static type checking concepts',
        'Interface and type definition creation',
        'Generic programming patterns',
        'Advanced TypeScript features',
        'Integration with React and modern tooling',
      ],
      technologies: [
        'TypeScript',
        'TSConfig optimization',
        'Type definition files',
        'ESLint integration',
      ],
      achievements: [
        'Successfully migrated portfolio project to TypeScript',
        'Created comprehensive type definitions',
        'Improved code reliability and developer experience',
        'Reduced runtime errors through compile-time checking',
      ],
      challenges: [
        'Learning type system complexity and advanced patterns',
        'Balancing type safety with development speed',
        'Understanding TypeScript ecosystem and tooling',
      ],
    },
    icon: '⚡',
    color: 'from-blue-400 to-blue-500',
  },
  {
    id: 'job-preparation',
    title: 'Remote/VA Job Preparation',
    period: '2024-Present',
    category: 'work',
    description: 'Preparing for remote work opportunities in tech and virtual assistance roles.',
    expandedContent: {
      overview:
        'Combining technical skills with administrative experience to prepare for remote opportunities that value both technical capability and strong organizational skills.',
      keyLearnings: [
        'Remote work best practices and tools',
        'Technical interview preparation',
        'Professional online presence development',
        'Client communication in remote settings',
        'Time management for distributed work',
      ],
      technologies: [
        'Communication tools',
        'Project management platforms',
        'Remote collaboration software',
      ],
      achievements: [
        'Built comprehensive portfolio demonstrating capabilities',
        'Developed professional online presence',
        'Created systematic approach to job applications',
        'Prepared for technical and behavioral interviews',
      ],
      challenges: [
        'Competing with more experienced developers',
        'Demonstrating value proposition as career changer',
        'Building confidence in technical abilities',
      ],
      nextSteps: [
        'Apply to entry-level remote positions',
        'Network within tech communities',
        'Continue building portfolio projects',
        'Gain real-world project experience',
      ],
    },
    icon: '💻',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'continuous-learning',
    title: 'Continuous Skill Development',
    period: 'Ongoing',
    category: 'skill',
    description: 'Commitment to lifelong learning and staying current with technology trends.',
    expandedContent: {
      overview:
        'Maintaining a growth mindset and systematic approach to learning new technologies and improving existing skills in the rapidly evolving tech landscape.',
      keyLearnings: [
        'Learning how to learn effectively in tech',
        'Staying current with industry trends',
        'Building sustainable skill development habits',
        'Balancing specialization with broad knowledge',
        'Creating feedback loops for improvement',
      ],
      achievements: [
        'Established daily learning routine',
        'Built network of learning resources and communities',
        'Developed system for tracking progress and goals',
        'Created sustainable approach to skill development',
      ],
      challenges: [
        'Managing information overload in fast-moving field',
        'Prioritizing learning objectives with limited time',
        'Maintaining motivation during challenging periods',
      ],
      nextSteps: [
        'Expand into backend development',
        'Explore mobile development opportunities',
        'Deepen understanding of software architecture',
        'Contribute to open source projects',
      ],
    },
    icon: '🌱',
    color: 'from-green-400 to-green-500',
  },
  {
    id: 'future-goals',
    title: 'Future Learning Objectives',
    period: '2025+',
    category: 'skill',
    description: 'Planned learning path for continued growth and career advancement.',
    expandedContent: {
      overview:
        'Strategic learning plan focused on becoming a well-rounded developer capable of contributing to complex projects and eventually mentoring others.',
      keyLearnings: [
        'Advanced React patterns and state management',
        'Backend development with Node.js/Python',
        'Database design and optimization',
        'System design and architecture',
        'DevOps and cloud technologies',
      ],
      technologies: ['Node.js', 'Python/Django', 'PostgreSQL', 'AWS/Azure', 'Docker', 'Kubernetes'],
      nextSteps: [
        'Complete first professional development project',
        'Contribute to open source projects',
        'Build full-stack applications',
        'Mentor other career changers',
        'Speak at local tech meetups',
      ],
    },
    icon: '🎯',
    color: 'from-violet-500 to-violet-600',
  },
];

// Fallback to empty array if virtual module fails to load
// This ensures the app doesn't break during development before markdown files are created
if (!journeyData || journeyData.length === 0) {
  // Keep this fallback array for development
  (learningJourney as any).push(
    // Fallback items will be added here if needed
  );
}
