import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  colors?: string[];
  maxSize?: number;
  minSize?: number;
  speed?: number;
  className?: string;
  enableMouse?: boolean;
}

export const ParticleBackground = ({
  particleCount = 50,
  colors = ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.2)', 'rgba(236, 72, 153, 0.2)'],
  maxSize = 4,
  minSize = 1,
  speed = 0.5,
  className = '',
  enableMouse = true,
}: ParticleBackgroundProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize particles
  const initializeParticles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * (dimensions.width || window.innerWidth),
      y: Math.random() * (dimensions.height || window.innerHeight),
      size: Math.random() * (maxSize - minSize) + minSize,
      opacity: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [particleCount, colors, maxSize, minSize, speed, dimensions]);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    setParticles(initializeParticles);
  }, [initializeParticles]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (enableMouse) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (enableMouse) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [enableMouse]);

  useEffect(() => {
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          // Mouse interaction - particles move away from cursor
          if (enableMouse) {
            const dx = mousePosition.x - particle.x;
            const dy = mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const force = (100 - distance) / 100;
              newX -= (dx / distance) * force * 2;
              newY -= (dy / distance) * force * 2;
            }
          }

          // Boundary wrapping
          if (newX < 0) newX = dimensions.width;
          if (newX > dimensions.width) newX = 0;
          if (newY < 0) newY = dimensions.height;
          if (newY > dimensions.height) newY = 0;

          return {
            ...particle,
            x: newX,
            y: newY,
          };
        }),
      );
    };

    const intervalId = setInterval(animateParticles, 50);
    return () => clearInterval(intervalId);
  }, [mousePosition, dimensions, enableMouse]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg width="100%" height="100%" className="absolute inset-0">
        {particles.map((particle) => (
          <motion.circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
            initial={{ opacity: 0 }}
            animate={{
              opacity: particle.opacity,
              scale: [1, 1.2, 1],
            }}
            transition={{
              opacity: { duration: 2 },
              scale: {
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          />
        ))}

        {/* Connecting lines between nearby particles */}
        {particles.map((particle, i) =>
          particles.slice(i + 1).map((otherParticle, j) => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2),
            );

            if (distance < 150) {
              const opacity = ((150 - distance) / 150) * 0.1;
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={particle.x}
                  y1={particle.y}
                  x2={otherParticle.x}
                  y2={otherParticle.y}
                  stroke="rgba(59, 130, 246, 0.2)"
                  strokeWidth="1"
                  opacity={opacity}
                />
              );
            }
            return null;
          }),
        )}
      </svg>
    </div>
  );
};
