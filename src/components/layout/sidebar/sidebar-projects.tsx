import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/data/projects';
import type { Project } from '@/types';

// 개별 프로젝트 pill — 호버 시 상위 컴포넌트에 프로젝트 ID 전달
const ProjectPill: React.FC<{ project: Project; index: number; onHover: (id: string | null) => void; onClick: (e?: React.MouseEvent) => void }> = ({ project, index, onHover, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        onHover(project.id);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        onHover(null);
    };

    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
        >
            <button
                type="button"
                data-hover="true"
                onClick={onClick}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex items-center justify-between gap-4 group relative overflow-hidden bg-white/20 backdrop-blur-md border-white/10 text-white/80 hover:bg-white/30 hover:border-white/20 hover:text-white"
                style={{
                    width: isHovered ? 'auto' : undefined,
                }}
            >
                <span className="relative z-10">{project.name}</span>
            </button>
        </motion.div>
    );
}

interface SidebarProjectsProps {
    onHoverProject: (id: string | null) => void;
    onOpenProject: (id: string, e?: React.MouseEvent) => void;
}

// 좌측 고정 사이드바 — 프로젝트 pill 목록, 호버/클릭 이벤트 상위에 전달
export const SidebarProjects: React.FC<SidebarProjectsProps> = ({ onHoverProject, onOpenProject }) => {
    return (
        <div className={`fixed left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30`}>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className={`text-[10px] uppercase tracking-widest mb-4 ml-1 transition-colors text-white/50`}
            >
                Case Study
            </motion.span>

            {PROJECTS.map((project: Project, index: number) => (
                <ProjectPill
                    key={project.id}
                    project={project}
                    index={index}
                    onHover={onHoverProject}
                    onClick={(e) => onOpenProject(project.id, e)}
                />
            ))}
        </div>
    )
}
