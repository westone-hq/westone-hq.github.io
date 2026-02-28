import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { useProjectNavigation } from '@/hooks';

const ProjectItem = ({
    project,
    onOpen,
    isActive,
    onActivate
}: {
    project: any,
    onOpen: (id: string) => void,
    isActive: boolean,
    onActivate: (id: string) => void
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

    useEffect(() => {
        if (isInView) {
            onActivate(project.id);
        }
    }, [isInView, project.id, onActivate]);

    return (
        <motion.div
            ref={ref}
            onClick={() => onOpen(project.id)}
            className={`cursor-pointer transition-all duration-300 w-fit`}
        >
            <div className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex items-center justify-between gap-4 group relative overflow-hidden backdrop-blur-md
                ${isActive
                    ? 'bg-white text-black border-white'
                    : 'bg-white/10 text-white/60 border-white/10'
                }
            `}>
                <span className="relative z-10">{project.name}</span>
            </div>
        </motion.div>
    )
}

export const MobileHome: React.FC = () => {
    const { openProject } = useProjectNavigation();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    const [activeId, setActiveId] = useState<string | null>(null);

    // Title fades out quickly as we scroll
    const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Bottom text reveals as we click scroll further down
    const bottomTextOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

    return (
        <div className="h-screen w-full relative">

            {/* 제목 - 마스크 컨테이너 밖에서 그라데이션 영향 없음 */}
            <div className="fixed top-0 left-0 w-full p-6 pt-32 pointer-events-none z-0">
                <motion.h1
                    style={{ opacity: titleOpacity }}
                    className="font-serif text-6xl leading-[0.9] text-white"
                >
                    We make <br />
                    <span className="italic">Experiences</span>
                </motion.h1>
            </div>

            {/* 하단 본문 - 마스크 컨테이너 밖에서 그라데이션 영향 없음 */}
            <motion.div
                style={{ opacity: bottomTextOpacity }}
                className="fixed bottom-10 left-6 max-w-[85%] z-20 pointer-events-none"
            >
                <p className="text-lg text-white/80 leading-relaxed font-normal whitespace-pre-line">
                    스타트업의 첫 프로덕트부터<br />
                    기업의 리뉴얼까지,<br />
                    좋은 아이디어가 좋은 제품이 되도록
                </p>
            </motion.div>

            {/* 소셜 아이콘 - 우측 하단 고정 */}
            <div className="fixed bottom-10 right-6 z-20 flex gap-4 text-white/60">
                <button className="hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </button>
            </div>

            {/* 마스크가 적용되는 스크롤 컨테이너 - 리스트만 포함 */}
            <div
                ref={containerRef}
                className="h-screen w-full overflow-y-auto bg-transparent text-white relative"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 80px, black 180px, black calc(100% - 120px), transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 80px, black 180px, black calc(100% - 120px), transparent 100%)'
                }}
            >
                <div className="relative z-10 w-full">
                    <div className="h-[45vh]" />

                    <div className="bg-transparent pt-10 pb-32 px-6 min-h-[100vh]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[10px] uppercase tracking-widest text-white/50 mb-8 ml-1"
                        >
                            Case Study
                        </motion.div>

                        <div className="flex flex-col gap-4">
                            {PROJECTS.map((project) => (
                                <ProjectItem
                                    key={project.id}
                                    project={project}
                                    onOpen={openProject}
                                    isActive={activeId === project.id}
                                    onActivate={setActiveId}
                                />
                            ))}
                        </div>

                        <div className="h-[30vh]" />
                    </div>
                </div>
            </div>

        </div>
    );
};
