import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types';

interface HeroSectionProps {
    activeProject: Project | null;
    onOpenProject: (id: string) => void;
}

// 히어로 섹션 — 프로젝트 호버 시 프리뷰 이미지, 기본은 브랜드 헤드라인 표시
export const HeroSection: React.FC<HeroSectionProps> = ({ activeProject, onOpenProject }) => {
    return (
        <motion.main
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
        >
            <AnimatePresence mode="wait">
                {activeProject ? (
                    <motion.div
                        key="project-preview"
                        className="relative w-[60vw] h-[60vh] md:w-[50vw] md:h-[65vh] pointer-events-auto cursor-pointer"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 1.05 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => onOpenProject(activeProject.id)}
                    >
                        <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl relative group" data-hover="true">
                            <img
                                src={activeProject.image}
                                alt={activeProject.name}
                                loading="lazy"
                                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <h2 className="text-6xl font-serif italic mb-2">{activeProject.name}</h2>
                                <p className="text-xl opacity-90">{activeProject.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="default-hero"
                        className="max-w-4xl text-center px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.p className="text-lg md:text-xl text-white/70 mb-6 max-w-lg mx-auto">
                            스타트업의 첫 프로덕트부터<br />
                            기업의 리뉴얼까지,<br />
                            좋은 아이디어가 좋은 제품이 되도록
                        </motion.p>
                        <motion.h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-tight text-white mix-blend-overlay">
                            We make <br />
                            <span className="italic">Experiences</span>
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.main>
    );
};
