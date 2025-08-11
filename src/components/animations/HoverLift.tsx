import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
  liftHeight?: number;
  glowIntensity?: 'subtle' | 'medium' | 'strong';
  disabled?: boolean;
}

export const HoverLift = ({
  children,
  className = '',
  liftHeight = 8,
  glowIntensity = 'medium',
  disabled = false,
}: HoverLiftProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const glowShadows = {
    subtle: '0 4px 20px rgba(59, 130, 246, 0.15)',
    medium: '0 8px 30px rgba(59, 130, 246, 0.25)',
    strong: '0 12px 40px rgba(59, 130, 246, 0.35)',
  };

  const variants = {
    rest: {
      y: 0,
      scale: 1,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
    hover: {
      y: -liftHeight,
      scale: 1.02,
      boxShadow: glowShadows[glowIntensity],
      transition: {
        duration: 0.3,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="rest"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`cursor-pointer ${className}`}
      style={{
        borderRadius: '0.75rem', // rounded-xl
        transformOrigin: 'center',
      }}
    >
      {children}

      {/* Optional glow overlay for enhanced effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

// Specialized version for project cards
export const ProjectCardHover = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <HoverLift
      liftHeight={12}
      glowIntensity="strong"
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </HoverLift>
  );
};

// Specialized version for skill cards
export const SkillCardHover = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <HoverLift liftHeight={6} glowIntensity="subtle" className={`relative ${className}`}>
      {children}
    </HoverLift>
  );
};
