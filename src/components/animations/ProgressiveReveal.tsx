import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode, Children } from 'react';

interface ProgressiveRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  animationType?: 'fade' | 'slide' | 'scale' | 'rotate';
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ProgressiveReveal = ({
  children,
  className = '',
  staggerDelay = 0.1,
  animationType = 'fade',
  direction = 'up'
}: ProgressiveRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10% 0px -10% 0px" 
  });

  const getVariants = () => {
    const baseTransition = {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1]
    };

    switch (animationType) {
      case 'slide':
        const slideDistance = 50;
        const getSlideInitial = () => {
          switch (direction) {
            case 'up': return { y: slideDistance, opacity: 0 };
            case 'down': return { y: -slideDistance, opacity: 0 };
            case 'left': return { x: slideDistance, opacity: 0 };
            case 'right': return { x: -slideDistance, opacity: 0 };
          }
        };
        return {
          container: {
            hidden: {},
            visible: {
              transition: {
                staggerChildren: staggerDelay
              }
            }
          },
          item: {
            hidden: getSlideInitial(),
            visible: {
              x: 0,
              y: 0,
              opacity: 1,
              transition: baseTransition
            }
          }
        };

      case 'scale':
        return {
          container: {
            hidden: {},
            visible: {
              transition: {
                staggerChildren: staggerDelay
              }
            }
          },
          item: {
            hidden: { scale: 0.8, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: baseTransition
            }
          }
        };

      case 'rotate':
        return {
          container: {
            hidden: {},
            visible: {
              transition: {
                staggerChildren: staggerDelay
              }
            }
          },
          item: {
            hidden: { rotate: -10, scale: 0.9, opacity: 0 },
            visible: {
              rotate: 0,
              scale: 1,
              opacity: 1,
              transition: baseTransition
            }
          }
        };

      default: // fade
        return {
          container: {
            hidden: {},
            visible: {
              transition: {
                staggerChildren: staggerDelay
              }
            }
          },
          item: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: baseTransition
            }
          }
        };
    }
  };

  const variants = getVariants();
  const childrenArray = Children.toArray(children);

  return (
    <motion.div
      ref={ref}
      variants={variants.container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={variants.item}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Specialized component for revealing text lines
export const RevealLines = ({ 
  lines, 
  className = '',
  lineClassName = '',
  staggerDelay = 0.2 
}: { 
  lines: string[]; 
  className?: string;
  lineClassName?: string;
  staggerDelay?: number;
}) => {
  return (
    <ProgressiveReveal 
      className={className}
      staggerDelay={staggerDelay}
      animationType="slide"
      direction="up"
    >
      {lines.map((line, index) => (
        <div key={index} className={lineClassName}>
          {line}
        </div>
      ))}
    </ProgressiveReveal>
  );
};

// Specialized component for revealing cards/items
export const RevealCards = ({ 
  children, 
  className = '',
  columns = 3,
  staggerDelay = 0.1 
}: { 
  children: ReactNode; 
  className?: string;
  columns?: number;
  staggerDelay?: number;
}) => {
  return (
    <ProgressiveReveal 
      className={`grid grid-cols-1 md:grid-cols-${columns} gap-6 ${className}`}
      staggerDelay={staggerDelay}
      animationType="scale"
    >
      {children}
    </ProgressiveReveal>
  );
};
