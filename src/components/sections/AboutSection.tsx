import React from 'react';
import { skills } from '@/data/skills';

// About section with skills grid
export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gray-800/95 backdrop-blur-sm relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About text */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Who I Am</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              I'm a passionate developer with a love for creating innovative solutions and beautiful user experiences. 
              With expertise in modern web technologies, I enjoy turning complex problems into simple, elegant designs.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
              or sharing knowledge with the developer community.
            </p>
          </div>
          
          {/* Skills grid */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Skills & Technologies</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="bg-gray-700 px-4 py-2 rounded-lg text-center hover:bg-gray-600 transition-colors duration-300"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
