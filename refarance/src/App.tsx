import React, { useState } from 'react';
import { DetailHeader, ScrollReveal, Marquee, DraggableImageCarousel } from "./components/layout";
import { SpotlightReveal, MagneticCard, GlassLayerInteraction, InteractiveFeatureStrips, ScrollProgressiveReveal, ProximityBentoGrid, InteractiveTypographicList, StickyScrollSection } from "./components/interactive/NewInteractions";
import { Play, Loader2, Pause, ArrowRight, ArrowUpRight, Zap, Shield, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECT_DETAILS, PROJECTS } from './data/projects';

export default function App() {
    const [projectId, setProjectId] = useState('1');
    const details = PROJECT_DETAILS[projectId];
    const nextProject = PROJECTS.find(p => p.id !== projectId) || PROJECTS[0];

    const [activeHighlightIndex, setActiveHighlightIndex] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);
    const [isPlayingVision, setIsPlayingVision] = useState(false);

    const handleGenerate = () => {
        if (isGenerating || hasGenerated) return;
        setIsGenerating(true);
        setTimeout(() => { setIsGenerating(false); setHasGenerated(true); }, 2000);
    };

    const handleVisionPlay = () => setIsPlayingVision(!isPlayingVision);

    const widgetImages = details.media.widgetImages || (Array.isArray(details.media.hero)
        ? details.media.hero
        : [details.media.hero, details.media.hero, details.media.hero]);

    const featureStrips = [
        { 
            number: "01", 
            title: "Fluid Motion", 
            description: "Interfaces that respond to human intent with natural, physics-based movement.",
            image: "https://picsum.photos/seed/motion/1200/1600"
        },
        { 
            number: "02", 
            title: "Neural Logic", 
            description: "Anticipatory systems that learn from user behavior to simplify complex tasks.",
            image: "https://picsum.photos/seed/logic/1200/1600"
        },
        { 
            number: "03", 
            title: "Ambient UI", 
            description: "Design that fades into the background, appearing only when truly needed.",
            image: "https://picsum.photos/seed/ambient/1200/1600"
        },
        { 
            number: "04", 
            title: "Digital Craft", 
            description: "Meticulous attention to every pixel, ensuring a premium and lasting impression.",
            image: "https://picsum.photos/seed/craft/1200/1600"
        }
    ];

    const bentoItems = [
        { title: "Lightning Fast", color: "rgba(168, 85, 247, 0.5)", icon: <Zap className="w-6 h-6" /> },
        { title: "Secure by Default", color: "rgba(59, 130, 246, 0.5)", icon: <Shield className="w-6 h-6" /> },
        { title: "Global Reach", color: "rgba(16, 185, 129, 0.5)", icon: <Globe className="w-6 h-6" /> }
    ];

    return (
        <motion.div
            key={projectId}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white pb-0 relative"
        >
            {/* 1. Header */}
            <DetailHeader title={details.hero.title} type={details.hero.type} stage={details.hero.stage} deliverables={details.hero.deliverables} />

            {/* 2. Hero Image */}
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-neutral-900">
                {Array.isArray(details.media.hero) ? (
                    <div className="w-full h-full grid grid-cols-3">
                        {details.media.hero.map((imgSrc, index) => (
                            <div key={index} className="w-full h-full relative overflow-hidden group">
                                <img src={imgSrc} alt={`Hero ${index + 1}`}
                                    className="w-full h-full transition-transform duration-1000 group-hover:scale-105 object-cover" />
                                {index < (details.media.hero as string[]).length - 1 && (
                                    <div className="absolute top-0 right-0 w-px h-full bg-white/10 z-10"></div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <img src={details.media.hero} alt="Hero" className="w-full h-full object-cover" />
                )}
            </div>

            {/* 3. Introduction - Updated with SpotlightReveal */}
            <section className="py-48 bg-black">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <ScrollReveal className="mb-12">
                        <span className="block text-sm font-semibold uppercase tracking-wider mb-8 text-purple-400">Introduction</span>
                    </ScrollReveal>
                    <SpotlightReveal size={300} className="rounded-3xl border border-white/5">
                        <div className="py-48 px-8 md:px-24 text-center">
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif leading-[1.1] text-white/90 whitespace-pre-line mb-8">
                                {details.intro.text}
                            </h2>
                            <p className="text-xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                Every interaction is an opportunity to create something meaningful. We focus on the intersection of human emotion and digital precision.
                            </p>
                        </div>
                    </SpotlightReveal>
                </div>
            </section>

            {/* 4. The Vision - Replaced with ScrollProgressiveReveal (No Click) */}
            <ScrollProgressiveReveal 
                image1={details.media.visionGrid1}
                image2={details.media.visionGrid2}
                subtitle="The Vision"
                title={details.vision.heading}
            />

            {/* 7. Interactive Feature Strips Section (Moved Up) */}
            <section className="py-32 bg-black">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
                    <ScrollReveal>
                        <span className="block text-sm font-semibold uppercase tracking-wider mb-6 text-gray-400">Core Pillars</span>
                        <h3 className="text-4xl md:text-6xl font-serif max-w-3xl">Defining the<br/>essence of Aura.</h3>
                    </ScrollReveal>
                </div>
                <ScrollReveal>
                    <InteractiveFeatureStrips items={featureStrips} />
                </ScrollReveal>
            </section>

            {/* 5. Marquee */}
            <section className="py-12"><Marquee text={details.marquee} /></section>

            {/* 6. Visual Identity - Replaced with StickyScrollSection */}
            <StickyScrollSection 
                subheading={details.aura.subheading}
                heading={details.aura.heading}
                text={details.aura.text}
                images={[
                    details.media.auraBento,
                    details.media.visionGrid1,
                    details.media.visionGrid2
                ]}
            />


            {/* 8. Discovery - Replaced photo carousel with Typographic List (No Click) */}
            <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
                    <ScrollReveal>
                        <span className="block text-sm font-semibold uppercase tracking-wider mb-6 text-gray-400">Discovery</span>
                        <h3 className="text-3xl md:text-5xl font-serif max-w-2xl py-10 whitespace-pre-line">{details.discovery.heading}</h3>
                    </ScrollReveal>
                </div>
                <ScrollReveal>
                    <InteractiveTypographicList items={details.discovery.items} />
                </ScrollReveal>
            </section>

            {/* 9. Stats */}
            <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
                <ScrollReveal><h3 className="text-3xl font-serif mb-24">Immediate disruption</h3></ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
                    {[details.stats.stat1, details.stats.stat2, details.stats.stat3].map((stat, i) => (
                        <ScrollReveal key={i} delay={i * 200}>
                            <div className="space-y-4 group">
                                <span className="text-gray-500 text-sm font-mono block mb-8">0{i+1}</span>
                                <div className="text-6xl md:text-8xl font-serif group-hover:text-purple-400 transition-colors duration-500">{stat.value}</div>
                                <p className="text-gray-400 border-l border-white/20 pl-4 mt-8">{stat.label}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* 10. Next Case Footer */}
            <section className="relative h-[80vh] w-full bg-neutral-900 border-t border-white/10 overflow-hidden group cursor-pointer" onClick={() => setProjectId(nextProject.id)}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 z-0">
                    <img src={nextProject.image} className="w-full h-full object-cover" alt="Next" />
                </div>
                <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
                <div className="relative z-20 flex flex-col items-center justify-center h-full w-full text-center">
                    <span className="text-sm font-mono text-gray-500 mb-8 tracking-widest uppercase group-hover:text-white transition-colors">Next Case Study</span>
                    <h2 className="text-[10vw] font-serif leading-none mb-4 group-hover:tracking-wide transition-all duration-700">{nextProject.name}</h2>
                    <div className="flex items-center gap-4 text-xl opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        <span>View Case Study</span><ArrowUpRight className="w-6 h-6" />
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
