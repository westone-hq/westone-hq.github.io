import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// 스크롤 진행도에 따라 clipPath로 이미지 2를 위에서 아래로 점진적으로 공개
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
                {/* 기본 이미지 (어둡게 깔림) */}
                <div className="absolute inset-0">
                    <img src={image1} className="w-full h-full object-cover opacity-40" alt="Base" />
                </div>

                {/* 공개 이미지 — clipPath로 스크롤 진행에 따라 표시 */}
                <motion.div
                    style={{ clipPath, scale }}
                    className="absolute inset-0 z-10"
                >
                    <img src={image2} className="w-full h-full object-cover" alt="Reveal" />
                </motion.div>

                {/* 텍스트 오버레이 */}
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
