import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// 모바일 전용 - 3D 회전 없이 부드러운 슬라이드 애니메이션
const StickyImageItemMobile: React.FC<{ img: string; index: number }> = ({ img, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.02, 0.92]);
    const opacity = useTransform(scrollYProgress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ y, scale, opacity }}
            className="relative w-full rounded-xl overflow-hidden shadow-[0_20px_50px_-8px_rgba(0,0,0,0.8)] bg-neutral-900 border border-white/10"
        >
            <img
                src={img}
                className="w-full aspect-[4/3] object-cover block"
                alt={`Visual ${index}`}
            />
        </motion.div>
    );
};

// 데스크탑 - 기존 3D 효과
const StickyImageItem: React.FC<{ img: string; index: number }> = ({ img, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

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
            className="relative h-[500px] w-fit rounded-xl overflow-hidden group shadow-[0_45px_100px_-15px_rgba(0,0,0,0.6)] bg-neutral-900 border border-white/10"
        >
            <img
                src={img}
                className="h-full w-auto block transition-transform duration-1000 group-hover:scale-110"
                alt={`Visual ${index}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
};

export const StickyScrollSection: React.FC<{
    heading: string;
    text: string;
    images: string[];
    subheading?: string;
}> = ({ heading, text, images, subheading }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // 모바일: 스크롤 시작 직후 본문 텍스트 빠르게 페이드아웃
    const mobileTextOpacity = useTransform(sectionProgress, [0, 0.15], [1, 0]);

    return (
        <section ref={sectionRef} className="py-16 md:py-32 relative">

            {/* 모바일 전용 상단 블랙 그라데이션 - 텍스트(z-20) 뒤에서 배경 역할 */}
            <div
                className="block md:hidden sticky top-8 z-10 h-36 -mb-36 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, #000000 55%, transparent 100%)' }}
            />

            <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-24 items-start">

                    {/* Sticky Text Column */}
                    <div className="md:col-span-5 sticky top-24 md:top-32 z-20 pb-6 md:pb-0">
                        <div className="space-y-4 md:space-y-6">
                            {subheading && (
                                <span className="block text-sm font-semibold uppercase tracking-wider text-purple-400">{subheading}</span>
                            )}
                            <h3 className="text-3xl md:text-6xl font-serif leading-tight whitespace-pre-line">{heading}</h3>

                            {/* 모바일: 스크롤 시 빠르게 페이드아웃 */}
                            <motion.p
                                style={{ opacity: mobileTextOpacity }}
                                className="text-gray-400 text-base leading-relaxed block md:hidden"
                            >
                                {text}
                            </motion.p>

                            {/* 데스크탑: 정적 표시 */}
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md hidden md:block">{text}</p>

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

                    {/* Scrolling Images Column */}
                    <div className="md:col-span-7 mt-12 md:mt-0 flex flex-col gap-5 md:gap-12 items-stretch md:items-end">
                        {images.map((img, i) => (
                            <div key={i}>
                                <div className="block md:hidden">
                                    <StickyImageItemMobile img={img} index={i} />
                                </div>
                                <div className="hidden md:block">
                                    <StickyImageItem img={img} index={i} />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};
