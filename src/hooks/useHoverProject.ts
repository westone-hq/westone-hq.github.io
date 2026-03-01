import { useState, useEffect } from 'react';
import { PROJECTS } from '@/data/projects';
import type { Project } from '@/types';

// hoveredProjectId에 해당하는 Project 객체 반환, 없으면 null
export const useHoverProject = (hoveredProjectId: string | null) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    if (hoveredProjectId) {
      const project = PROJECTS.find((p: Project) => p.id === hoveredProjectId);
      setActiveProject(project || null);
    } else {
      setActiveProject(null);
    }
  }, [hoveredProjectId]);

  return activeProject;
};
