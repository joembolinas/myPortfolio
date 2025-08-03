import React from 'react';
import { Project } from '@/types';
import { Card } from './Card';
import { Button } from './Button';

interface ProjectCardProps {
  project: Project;
}

// Project card component matching our existing project section design
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="group">
      {/* Project image/gradient area */}
      <div className={`h-48 bg-gradient-to-br ${project.gradient} relative`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>
      
      {/* Project content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        
        {/* Technology tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 bg-gray-700 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3">
          <Button 
            size="sm" 
            onClick={() => window.open(project.demoUrl, '_blank')}
          >
            Live Demo
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(project.sourceUrl, '_blank')}
          >
            Source Code
          </Button>
        </div>
      </div>
    </Card>
  );
};
