import { motion } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';

interface MorphingTextProps {
  children: ReactNode;
  highlightWords?: string[];
  morphDuration?: number;
  glowColor?: string;
  className?: string;
}

export const MorphingText = ({
  children,
  highlightWords = [],
  morphDuration = 2,
  glowColor = 'rgb(59, 130, 246)',
  className = '',
}: MorphingTextProps) => {
  const [currentHighlight, setCurrentHighlight] = useState(0);

  useEffect(() => {
    if (highlightWords.length === 0) return;

    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % highlightWords.length);
    }, morphDuration * 1000);

    return () => clearInterval(interval);
  }, [highlightWords, morphDuration]);

  const processText = (text: string) => {
    if (highlightWords.length === 0) return text;

    const currentWord = highlightWords[currentHighlight];
    const regex = new RegExp(`(${highlightWords.join('|')})`, 'gi');

    return text.split(regex).map((part, index) => {
      const isHighlighted = highlightWords.some(
        (word) => part.toLowerCase() === word.toLowerCase(),
      );
      const isCurrentHighlight = part.toLowerCase() === currentWord.toLowerCase();

      if (isHighlighted) {
        return (
          <motion.span
            key={`${part}-${index}`}
            className="relative"
            animate={{
              color: isCurrentHighlight ? glowColor : 'inherit',
              textShadow: isCurrentHighlight
                ? `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20`
                : 'none',
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {part}
            {isCurrentHighlight && (
              <motion.span
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(90deg, transparent, ${glowColor}20, transparent)`,
                  filter: 'blur(1px)',
                }}
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
              />
            )}
          </motion.span>
        );
      }

      return part;
    });
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {typeof children === 'string' ? processText(children) : children}
    </motion.div>
  );
};

// Letter-by-letter reveal animation
export const RevealText = ({
  children,
  delay = 0,
  className = '',
}: {
  children: string;
  delay?: number;
  className?: string;
}) => {
  const letters = children.split('');

  return (
    <motion.div className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.05,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Typewriter effect
export const TypewriterText = ({
  children,
  speed = 50,
  className = '',
  showCursor = true,
}: {
  children: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursorState, setShowCursorState] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < children.length) {
        setDisplayText(children.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [children, speed]);

  useEffect(() => {
    if (!showCursor) return;

    const cursorTimer = setInterval(() => {
      setShowCursorState((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, [showCursor]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: showCursorState ? 1 : 0 }}
          transition={{ duration: 0 }}
          className="text-blue-400"
        >
          |
        </motion.span>
      )}
    </span>
  );
};
