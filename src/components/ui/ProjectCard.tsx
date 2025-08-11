import React from 'react';
import { Project } from '@/types';
import { Card } from './Card';
import { Button } from './Button';
import { HoverLift } from '@/components/animations/HoverLift';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

// Enhanced project card component with animations
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <HoverLift className="h-full">
      <Card className="group h-full overflow-hidden">
        {/* Project image/gradient area with hover effects */}
        <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          <motion.div
            className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          />

          {/* Floating tech icons */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-1">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <motion.div
                  key={tech}
                  className="w-2 h-2 bg-white rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Project content with enhanced spacing */}
        <div className="p-6 flex flex-col flex-grow">
          <motion.h3
            className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300"
            whileHover={{ x: 2 }}
          >
            {project.title}
          </motion.h3>

          <p className="text-gray-400 mb-4 flex-grow leading-relaxed">{project.description}</p>

          {/* Technology tags with hover animations */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-gray-700 text-xs rounded-full hover:bg-blue-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action buttons with enhanced hover effects */}
          <div className="flex gap-3 mt-auto">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => window.open(project.demoUrl, '_blank')}
              >
                Live Demo
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-gray-600 hover:border-blue-500 hover:text-blue-400"
                onClick={() => window.open(project.sourceUrl, '_blank')}
              >
                Source
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </HoverLift>
  );
};
