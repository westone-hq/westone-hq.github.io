import React from 'react';
import { DetailHeader } from "@/components/layout";
import { ScrollReveal } from "@/components/interactive/scroll";
import { Marquee } from "@/components/interactive/animations";
import { SpotlightReveal } from '@/components/interactive/spotlight';
import { ScrollProgressiveReveal } from '@/components/interactive/progressive-reveal';
import { InteractiveFeatureStrips } from '@/components/interactive/feature-strips';
import { StickyScrollSection } from '@/components/interactive/sticky-scroll';
import { InteractiveTypographicList } from '@/components/interactive/typographic-list';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProjectDetailContent } from '../../types';
import type { Project } from '../../types';
import { PROJECT_DETAILS } from '../../data/projects';

interface ProjectDetailProps {
    details: ProjectDetailContent;
    nextProject: Project;
    onNextProject: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ details, nextProject, onNextProject }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white pb-0 relative z-40 w-full"
        >

            {/* Header & Hero Image */}
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

            {/* Introduction - Spotlight */}
            <section className="pt-8 pb-4 md:pt-12 md:pb-6 bg-black">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <ScrollReveal className="mb-4">
                        <span className="block text-sm font-semibold uppercase tracking-wider text-purple-400">Introduction</span>
                    </ScrollReveal>
                    <SpotlightReveal size={420} className="rounded-3xl">
                        <div className="py-16 md:py-32 px-8 md:px-24 text-center">
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif leading-[1.1] text-white/90 whitespace-pre-line mb-10">
                                {details.intro.text}
                            </h2>
                            <p className="text-lg md:text-xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                {details.vision.text}
                            </p>
                        </div>
                    </SpotlightReveal>
                </div>
            </section>

            {/* The Vision - ScrollProgressiveReveal */}
            <ScrollProgressiveReveal
                image1={details.media.visionGrid1}
                image2={details.media.visionGrid2}
                title={details.vision.heading}
            />

            {/* Core Pillars */}
            <section className="py-32 bg-black">
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

            {/* Middle Marquee */}
            <section className="py-12">
                <Marquee text={details.marquee} />
            </section>

            {/* Visual Identity - StickyScrollSection */}
            <StickyScrollSection
                heading={details.aura.heading}
                text={details.vision.text}
                images={[
                    details.media.auraBento,
                    details.media.visionGrid1,
                    details.media.visionGrid2,
                ]}
            />

            {/* Discovery Section */}
            <section className="pt-32 pb-16 bg-neutral-900">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <ScrollReveal className="mb-32">
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


            {/* Stats / Impact Section */}
            <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
                <ScrollReveal>
                    <h3 className="text-3xl font-serif mb-24">Immediate disruption</h3>
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

            {/* NEXT CASE FOOTER */}
            <section className="relative h-[80vh] w-full bg-neutral-900 border-t border-white/10 overflow-hidden group">
                {/* Background Image that reveals on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-in-out z-0">
                    {(() => {
                        const nextDetails = PROJECT_DETAILS[nextProject.id];
                        const hero = nextDetails ? nextDetails.media.hero : nextProject.image;
                        const heroSrc = Array.isArray(hero) ? hero[0] : hero;
                        return <img src={heroSrc} alt="Next Case" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s]" />;
                    })()}
                </div>
                <div className="absolute inset-0 bg-black/60 z-1 pointer-events-none"></div>

                <div className="relative z-20 flex flex-col items-center justify-center h-full w-full text-center cursor-pointer" onClick={onNextProject}>
                    <span className="text-sm font-mono text-gray-500 mb-8 tracking-widest uppercase group-hover:text-white transition-colors">Next Case Study</span>
                    <h2 className="text-[10vw] font-serif leading-none mb-4 group-hover:tracking-wide transition-all duration-700">
                        {nextProject.name}
                    </h2>
                    <div className="flex items-center gap-4 text-xl opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-6 h-6" />
                    </div>
                </div>

                {/* Standard Footer Links inside the Next Case area */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end z-30 mix-blend-difference text-white">
                    <div className="text-sm text-gray-400">
                        &copy; 2024 Metalab Clone.
                    </div>
                    <div className="flex gap-6 text-sm">
                        <button className="hover:text-white/70 transition-colors">Instagram</button>
                        <button className="hover:text-white/70 transition-colors">Twitter</button>
                    </div>
                </div>
            </section>

        </motion.div>
    );
};
