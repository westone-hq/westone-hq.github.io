import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollProgressiveReveal: React.FC<{
    image1: string;
    image2: string;
    title: string;
    subtitle?: string;
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
                    <img src={image1} className="w-full h-full object-cover opacity-40" alt="Base" />
                </div>

                {/* Revealed Image */}
                <motion.div
                    style={{ clipPath, scale }}
                    className="absolute inset-0 z-10"
                >
                    <img src={image2} className="w-full h-full object-cover" alt="Reveal" />
                </motion.div>

                {/* Content Overlay */}
                <motion.div
                    style={{ opacity }}
                    className="relative z-20 text-center px-6"
                >
                    {subtitle && <span className="text-purple-400 text-sm uppercase tracking-[0.3em] mb-4 block">{subtitle}</span>}
                    <h3 className="text-5xl md:text-8xl font-serif leading-none whitespace-pre-line">{title}</h3>
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-[15]" />
            </div>
        </div>
    );
};
