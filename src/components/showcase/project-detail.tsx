import React from 'react';
import { DetailHeader } from "@/components/layout";
import { ScrollReveal } from "@/components/interactive/scroll";
import { Marquee } from "@/components/interactive/animations";
import { ScrollProgressiveReveal } from '@/components/interactive/progressive-reveal';
import { InteractiveFeatureStrips } from '@/components/interactive/feature-strips';
import { StickyScrollSection } from '@/components/interactive/sticky-scroll';
import { InteractiveTypographicList } from '@/components/interactive/typographic-list';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProjectDetailContent } from '../../types';
import type { Project } from '../../types';
import { PROJECT_DETAILS } from '../../data/projects';

interface ProjectDetailProps {
    details: ProjectDetailContent;
    nextProject: Project;
    onNextProject: () => void;
}

// 프로젝트 상세 — hero/title/scrollview/corepillars/pointerview 섹션 조합
export const ProjectDetail: React.FC<ProjectDetailProps> = ({ details, nextProject, onNextProject }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white pb-0 relative z-40 w-full"
        >

            {/* hero */}
            <DetailHeader
                title={details.hero.title}
                type={details.hero.type}
                stage={details.hero.stage}
                deliverables={details.hero.deliverables}
            />

            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-neutral-900">
                <img
                    src={Array.isArray(details.media.hero) ? details.media.hero[0] : details.media.hero}
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* title — 스포트라이트 효과, 스크롤에 따라 하단 내용 점진적으로 밝혀짐 */}
            <section className="pt-8 pb-4 md:pt-12 md:pb-6 bg-black">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <ScrollReveal className="mb-4">
                        <span className="block text-sm font-semibold uppercase tracking-wider text-purple-400">Introduction</span>
                    </ScrollReveal>
                    <div className="rounded-3xl">
                        <div className="py-16 md:py-32 px-8 md:px-24 text-center">
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif leading-[1.1] text-white/90 whitespace-pre-line mb-10">
                                {details.intro.text}
                            </h2>
                            <p className="text-lg md:text-xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                {details.vision.text}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* scrollview — 스크롤 진행도에 따라 이미지 공개 */}
            <ScrollProgressiveReveal
                image1={details.media.visionGrid1}
                image2={details.media.visionGrid2}
                title={details.vision.heading}
            />

            {/* corepillars — 인터랙티브 피처 스트립 */}
            <section className="py-16 md:py-32 bg-black">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
                    <ScrollReveal>
                        <span className="block text-sm font-semibold uppercase tracking-wider mb-6 text-gray-400">Core Pillars</span>
                        <h3 className="text-4xl md:text-6xl font-serif max-w-3xl">{details.aura.subheading}</h3>
                    </ScrollReveal>
                </div>
                <ScrollReveal>
                    <InteractiveFeatureStrips items={details.corePillars} />
                </ScrollReveal>
            </section>

            {/* 중간 마퀴 */}
            <section className="py-12">
                <Marquee text={details.marquee} />
            </section>

            {/* pointerview — 스티키 스크롤 */}
            <StickyScrollSection
                heading={details.aura.heading}
                text={details.aura.text}
                images={
                    details.media.pointerImages && details.media.pointerImages.length > 0
                        ? details.media.pointerImages
                        : [details.media.auraBento, details.media.visionGrid1, details.media.visionGrid2]
                }
            />

            {/* 디스커버리 — 타이포그래픽 목록 */}
            <section className="pt-16 pb-10 md:pt-32 md:pb-16 bg-neutral-900">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <ScrollReveal className="mb-12 md:mb-32">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                            <div>
                                <span className="block text-sm font-semibold uppercase tracking-wider mb-6 text-gray-400">{details.feature.subheading}</span>
                                <h3 className="text-3xl md:text-5xl font-serif whitespace-pre-line">
                                    {details.feature.heading}
                                </h3>
                            </div>
                            <p className="text-gray-400 text-lg">
                                {details.feature.text}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
                <InteractiveTypographicList items={details.discovery.items} />
            </section>

            {/* 임팩트 스탯 3열 */}
            <section className="py-16 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
                <ScrollReveal>
                    <h3 className="text-3xl font-serif mb-12 md:mb-24">Immediate disruption</h3>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
                    <ScrollReveal delay={0}>
                        <div className="space-y-4 group">
                            <span className="text-gray-500 text-sm font-mono block mb-8">01</span>
                            <div className="text-6xl md:text-8xl font-serif group-hover:text-purple-400 transition-colors duration-500">{details.stats.stat1.value}</div>
                            <p className="text-gray-400 border-l border-white/20 pl-4 mt-8">{details.stats.stat1.label}</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <div className="space-y-4 group">
                            <span className="text-gray-500 text-sm font-mono block mb-8">02</span>
                            <div className="text-6xl md:text-8xl font-serif group-hover:text-purple-400 transition-colors duration-500">{details.stats.stat2.value}</div>
                            <p className="text-gray-400 border-l border-white/20 pl-4 mt-8">{details.stats.stat2.label}</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={400}>
                        <div className="space-y-4 group">
                            <span className="text-gray-500 text-sm font-mono block mb-8">03</span>
                            <div className="text-6xl md:text-8xl font-serif group-hover:text-purple-400 transition-colors duration-500">{details.stats.stat3.value}</div>
                            <p className="text-gray-400 border-l border-white/20 pl-4 mt-8">{details.stats.stat3.label}</p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 다음 케이스 스터디 푸터 */}
            <section className="relative h-[80vh] w-full bg-neutral-900 border-t border-white/10 overflow-hidden group">
                <div className="absolute inset-0 opacity-30 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-700 ease-in-out z-0">
                    {(() => {
                        const nextDetails = PROJECT_DETAILS[nextProject.id];
                        const hero = nextDetails ? nextDetails.media.hero : nextProject.image;
                        const heroSrc = Array.isArray(hero) ? hero[0] : hero;
                        return <img src={heroSrc} alt="Next Case" className="w-full h-full object-cover scale-100 md:scale-105 md:group-hover:scale-100 transition-transform duration-[1.5s]" />;
                    })()}
                </div>
                <div className="absolute inset-0 bg-black/60 z-1 pointer-events-none"></div>

                <div className="relative z-20 flex flex-col items-center justify-center h-full w-full text-center cursor-pointer" onClick={onNextProject}>
                    <span className="text-sm font-mono text-white md:text-gray-500 mb-8 tracking-widest uppercase md:group-hover:text-white transition-colors">Next Case Study</span>
                    <h2 className="text-[10vw] font-serif leading-none mb-4 group-hover:tracking-wide transition-all duration-700">
                        {nextProject.name}
                    </h2>
                    <div className="flex items-center gap-4 text-xl opacity-100 md:opacity-0 md:translate-y-8 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-100">
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-6 h-6" />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-end items-end z-30 mix-blend-difference text-white">
                    <div className="flex gap-5">
                        <button className="hover:text-white/70 transition-colors">
                            <Instagram className="w-5 h-5" />
                        </button>
                        <button className="hover:text-white/70 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

        </motion.div>
    );
};
