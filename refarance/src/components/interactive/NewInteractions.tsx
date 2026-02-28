import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useScroll } from 'motion/react';

import { Play, Loader2, Pause, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

/**
 * 스티키 텍스트와 스크롤되는 이미지 섹션
 */
export const StickyScrollSection: React.FC<{
    subheading: string;
    heading: string;
    text: string;
    images: string[];
}> = ({ subheading, heading, text, images }) => {
    return (
        <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
                {/* Sticky Text Column */}
                <div className="md:col-span-5 sticky top-32 z-20">
                    <div className="space-y-6">
                        <span className="block text-sm font-semibold uppercase tracking-wider text-purple-400">{subheading}</span>
                        <h3 className="text-4xl md:text-6xl font-serif leading-tight whitespace-pre-line">{heading}</h3>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">{text}</p>
                        
                        <div className="pt-12 hidden md:block">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                                <span className="text-sm uppercase tracking-widest font-semibold">Scroll to explore</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrolling Images Column - Reduced spacing and added film-like rising effect */}
                <div className="md:col-span-7 space-y-8 md:space-y-12 flex flex-col items-center md:items-end">
                    {images.map((img, i) => (
                        <StickyImageItem key={i} img={img} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const StickyImageItem: React.FC<{ img: string; index: number }> = ({ img, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Impactful 3D rising effect (parallax) and dramatic rotation
    const y = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 35 : -35, index % 2 === 0 ? -35 : 35]);
    const rotateY = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -20 : 20, index % 2 === 0 ? 20 : -20]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.1, 0.6]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ 
                y,
                rotateX, 
                rotateY, 
                scale,
                opacity,
                perspective: 800,
                transformStyle: "preserve-3d"
            }}
            className="relative w-full max-w-[380px] aspect-[3/4] rounded-xl overflow-hidden group shadow-[0_45px_100px_-15px_rgba(0,0,0,0.6)] bg-neutral-900 border border-white/10"
        >
            <img 
                src={img} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt={`Visual ${index}`} 
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">Perspective 0{index+1}</span>
            </div>
        </motion.div>
    );
};

/**
 * 텍스트 리스트 형태의 디스커버리 섹션 - 호버 시 이미지가 마우스를 따라다님
 */
export const InteractiveTypographicList: React.FC<{
    items: { title: string; category: string; image: string }[];
}> = ({ items }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const imageX = useSpring(mouseX, springConfig);
    const imageY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <div onMouseMove={handleMouseMove} className="relative py-24">
            <div className="flex flex-col border-t border-white/10">
                {items.map((item, i) => (
                    <div
                        key={i}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="group relative border-bottom border-white/10 py-12 px-6 md:px-12 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors"
                    >
                        <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                            <span className="text-xs font-mono text-gray-500">0{i + 1}</span>
                            <h4 className="text-4xl md:text-7xl font-serif group-hover:italic transition-all duration-500">{item.title}</h4>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-purple-400 transition-colors">{item.category}</span>
                            <ArrowUpRight className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Image Preview */}
            <AnimatePresence>
                {hoveredIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                            position: 'fixed',
                            left: imageX,
                            top: imageY,
                            x: '-50%',
                            y: '-50%',
                            pointerEvents: 'none',
                            zIndex: 100
                        }}
                        className="w-[300px] md:w-[450px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        <img 
                            src={items[hoveredIndex].image} 
                            className="w-full h-full object-cover" 
                            alt="Preview" 
                            referrerPolicy="no-referrer"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/**
 * 스크롤 진행도에 따라 이미지가 서서히 드러나는 섹션 (클릭 불필요)
 */
export const ScrollProgressiveReveal: React.FC<{
    image1: string;
    image2: string;
    title: string;
    subtitle: string;
}> = ({ image1, image2, title, subtitle }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const clipPath = useTransform(scrollYProgress, [0.3, 0.7], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
    const scale = useTransform(scrollYProgress, [0.3, 0.7], [1.2, 1]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

    return (
        <div ref={containerRef} className="relative w-full h-[150vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Base Image */}
                <div className="absolute inset-0">
                    <img src={image1} className="w-full h-full object-cover opacity-40" alt="Base" referrerPolicy="no-referrer" />
                </div>

                {/* Revealed Image */}
                <motion.div 
                    style={{ clipPath, scale }}
                    className="absolute inset-0 z-10"
                >
                    <img src={image2} className="w-full h-full object-cover" alt="Reveal" referrerPolicy="no-referrer" />
                </motion.div>

                {/* Content Overlay */}
                <motion.div 
                    style={{ opacity }}
                    className="relative z-20 text-center px-6"
                >
                    <span className="text-purple-400 text-sm uppercase tracking-[0.3em] mb-4 block">{subtitle}</span>
                    <h3 className="text-5xl md:text-8xl font-serif leading-none">{title}</h3>
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-15" />
            </div>
        </div>
    );
};

/**
 * 마우스 근접도에 반응하는 벤토 그리드 (클릭 불필요)
 */
export const ProximityBentoGrid: React.FC<{
    items: { title: string; color: string; icon: React.ReactNode }[];
}> = ({ items }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    whileHover={{ y: -10 }}
                    className="relative p-8 rounded-3xl overflow-hidden border border-white/5 bg-neutral-900/50 group flex flex-col justify-between min-h-[300px]"
                >
                    {/* Background Glow */}
                    <div 
                        className="absolute -inset-24 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-[80px]"
                        style={{ background: item.color }}
                    />
                    
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            {item.icon}
                        </div>
                        <h4 className="text-2xl font-serif mb-2">{item.title}</h4>
                    </div>

                    <div className="relative z-10">
                        <div className="h-1 w-0 group-hover:w-full bg-white/20 transition-all duration-700" />
                        <p className="text-xs text-gray-500 mt-4 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Explore Detail</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

/**
 * 세로형 스트립 인터랙션 섹션 - 마우스 호버 시 확장되며 상세 내용 노출
 */
export const InteractiveFeatureStrips: React.FC<{
    items: { title: string; description: string; image: string; number: string }[];
}> = ({ items }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full h-[600px] md:h-[800px] flex flex-col md:flex-row gap-2 overflow-hidden px-4 md:px-0">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{
                        flex: hoveredIndex === index ? 3 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="relative h-full min-h-[150px] md:min-h-0 overflow-hidden cursor-pointer group rounded-2xl md:rounded-none first:rounded-t-2xl md:first:rounded-none last:rounded-b-2xl md:last:rounded-none"
                >
                    {/* Background Image */}
                    <motion.div 
                        animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                    </motion.div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-mono text-white/50 group-hover:text-white transition-colors">{item.number}</span>
                            <motion.div
                                animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ArrowUpRight className="w-5 h-5" />
                            </motion.div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-3xl md:text-5xl font-serif leading-none">{item.title}</h4>
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="text-white/70 text-sm md:text-base max-w-md leading-relaxed"
                                    >
                                        {item.description}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Decorative Border (Desktop only) */}
                    <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-white/10 group-hover:opacity-0 transition-opacity" />
                </motion.div>
            ))}
        </div>
    );
};

/**
 * 핸드폰 목업을 대체하는 플로팅 글래스 레이어 인터랙션
 */
export const GlassLayerInteraction: React.FC<{ 
    initImage: string; 
    resultImage: string;
    isGenerating: boolean;
    hasGenerated: boolean;
    onGenerate: () => void;
    onReset: () => void;
}> = ({ initImage, resultImage, isGenerating, hasGenerated, onGenerate, onReset }) => {
    return (
        <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center group">
            {/* Background Layer (Blurred) */}
            <motion.div 
                animate={{ 
                    scale: hasGenerated ? 1.05 : 1,
                    filter: hasGenerated ? 'blur(20px)' : 'blur(0px)'
                }}
                className="absolute inset-0 rounded-3xl overflow-hidden opacity-40"
            >
                <img src={initImage} className="w-full h-full object-cover" alt="Base" referrerPolicy="no-referrer" />
            </motion.div>

            {/* Floating Glass Layers */}
            <div className="relative z-10 w-full max-w-lg h-full flex items-center justify-center">
                {/* Layer 1: The UI Card */}
                <motion.div
                    animate={{ 
                        y: hasGenerated ? -40 : 0,
                        rotateX: hasGenerated ? 5 : 0,
                        opacity: hasGenerated ? 0.5 : 1
                    }}
                    className="absolute w-4/5 aspect-video bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col justify-between z-20"
                >
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500">System Status</p>
                            <p className="text-xs font-mono">Ready to process</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h4 className="text-2xl font-serif italic">Ambient Synthesis</h4>
                        {!hasGenerated && (
                            <button 
                                onClick={onGenerate}
                                disabled={isGenerating}
                                className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 overflow-hidden relative"
                            >
                                {isGenerating ? (
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                        <Loader2 className="w-4 h-4" />
                                    </motion.div>
                                ) : (
                                    <>Generate Vision <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Layer 2: The Result Card (Reveals on generation) */}
                <AnimatePresence>
                    {hasGenerated && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 60, rotateX: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 20, rotateX: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 60 }}
                            className="absolute w-[85%] aspect-square bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] z-30 p-4"
                        >
                            <div className="w-full h-full rounded-2xl overflow-hidden relative">
                                <img src={resultImage} className="w-full h-full object-cover" alt="Result" referrerPolicy="no-referrer" />
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-purple-400 mb-1">Output 01</p>
                                            <h5 className="text-lg font-serif">Neural Composition</h5>
                                        </div>
                                        <button 
                                            onClick={onReset}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest transition-colors"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Decorative Elements */}
                <motion.div 
                    animate={{ 
                        rotate: 360,
                        scale: isGenerating ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -z-10 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full"
                />
            </div>
        </div>
    );
};

/**
 * 마우스 커서를 따라다니는 스포트라이트 효과
 */
export const SpotlightReveal: React.FC<{ children: React.ReactNode; className?: string; size?: number }> = ({ children, className = "", size = 200 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const spotlightX = useSpring(mouseX, springConfig);
    const spotlightY = useSpring(mouseY, springConfig);

    const maskImage = useTransform(
        [spotlightX, spotlightY],
        ([x, y]) => `radial-gradient(circle ${size}px at ${x}px ${y}px, black 0%, transparent 100%)`
    );

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className={`relative overflow-hidden bg-black group ${className}`}>
            {/* 기본 어두운 텍스트/콘텐츠 */}
            <div className="opacity-20 transition-opacity duration-500 group-hover:opacity-10">
                {children}
            </div>

            {/* 스포트라이트 레이어 */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage,
                }}
            >
                <div className="text-white">
                    {children}
                </div>
            </motion.div>

            {/* 커서 가이드 (선택 사항) */}
            <motion.div
                className="absolute w-4 h-4 border border-white/30 rounded-full pointer-events-none z-50"
                style={{ x: spotlightX, y: spotlightY, translateX: '-50%', translateY: '-50%' }}
            />
        </div>
    );
};

/**
 * 마우스 움직임에 따라 기울어지는 자기장 카드
 */
export const MagneticCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width - 0.5) * 20; // 20도까지 기울어짐
        const yPct = (mouseY / height - 0.5) * -20;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY: mouseXSpring,
                rotateX: mouseYSpring,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-transform duration-200 ease-out ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }} className="w-full h-full">
                {children}
            </div>
        </motion.div>
    );
};
