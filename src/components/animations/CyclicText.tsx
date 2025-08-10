import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CyclicTextProps {
  texts: string[];
  interval?: number;
  className?: string;
  animationDuration?: number;
}

export const CyclicText = ({
  texts,
  interval = 3000,
  className = '',
  animationDuration = 0.5
}: CyclicTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  const slideVariants = {
    enter: {
      x: 20,
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: -20,
      opacity: 0
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: animationDuration,
            ease: "easeInOut"
          }}
          className="block"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
