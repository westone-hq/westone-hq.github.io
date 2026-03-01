import { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

// 스포트라이트 효과 — 마우스 위치에 원형 마스크를 적용해 콘텐츠를 선택적으로 밝힘 (데스크탑 전용)
export const SpotlightReveal: React.FC<{
    children: React.ReactNode;
    className?: string;
    size?: number;
}> = ({ children, className = "", size = 380 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-9999);
    const mouseY = useMotionValue(-9999);

    const springConfig = { damping: 20, stiffness: 120 };
    const spotlightX = useSpring(mouseX, springConfig);
    const spotlightY = useSpring(mouseY, springConfig);

    const maskImage = useTransform(
        [spotlightX, spotlightY],
        ([x, y]) =>
            `radial-gradient(circle ${size}px at ${x}px ${y}px, black 0%, black 40%, transparent 100%)`
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
        <div ref={containerRef} className={`relative overflow-hidden group ${className}`}>
            {/* 기본 레이어: 모바일에서는 full opacity, 데스크탑에서는 어둡게 */}
            <div className="opacity-100 md:opacity-[0.18] md:group-hover:opacity-15 transition-opacity duration-700 select-none">
                {children}
            </div>

            {/* 스포트라이트로 밝혀지는 레이어 - 데스크탑에서만 */}
            <motion.div
                className="hidden md:block absolute inset-0 pointer-events-none"
                style={{
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage,
                }}
            >
                <div className="text-white">
                    {children}
                </div>
            </motion.div>

            {/* 커서 링 - 데스크탑에서만 */}
            <motion.div
                className="hidden md:block absolute w-5 h-5 border border-white/40 rounded-full pointer-events-none z-50"
                style={{
                    x: spotlightX,
                    y: spotlightY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </div>
    );
};
