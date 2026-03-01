import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FluidBackgroundProps {
    mode: 'dark' | 'light';
}

// 플루이드 배경 — 두 블러 블롭이 무한 회전, 메뉴 페이지 전용
export const FluidBackground: React.FC<FluidBackgroundProps> = ({ mode }) => {
    const isDark = mode === 'dark';
    const shouldReduceMotion = useReducedMotion();

    // prefers-reduced-motion 시 정적 표시
    const blob1Animate = shouldReduceMotion ? {} : {
        rotate: [0, 360],
        scale: [1, 1.2, 0.9, 1],
        x: [0, 50, -50, 0],
        y: [0, -30, 30, 0],
    };

    const blob2Animate = shouldReduceMotion ? {} : {
        rotate: [360, 0],
        scale: [1, 1.1, 0.8, 1],
        x: [0, -40, 40, 0],
        y: [0, 40, -40, 0],
    };

    const glossyAnimate = shouldReduceMotion ? {} : {
        rotate: [0, -180],
        scale: [0.8, 1.1, 0.8],
    };

    return (
        <div className={`absolute inset-0 w-full h-full overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-meta-dark' : 'bg-white'}`}>
            <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* 블롭 1 — 20초 무한 회전 */}
                <motion.div
                    animate={blob1Animate}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ willChange: 'transform' }}
                    className={`w-[600px] h-[600px] rounded-full blur-[80px] mix-blend-multiply absolute
            ${isDark ? 'bg-indigo-900/60' : 'bg-gray-200'}
          `}
                />

                {/* 블롭 2 — 25초 역방향 회전 */}
                <motion.div
                    animate={blob2Animate}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ willChange: 'transform' }}
                    className={`w-[500px] h-[500px] rounded-full blur-[90px] mix-blend-multiply absolute translate-x-32
             ${isDark ? 'bg-purple-900/50' : 'bg-slate-200'}
          `}
                />

                {/* 광택 오버레이 — dark 모드에서만 표시 */}
                {isDark && (
                    <motion.div
                        className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-[60px]"
                        animate={glossyAnimate}
                        style={{ willChange: 'transform' }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                )}
            </motion.div>

            {/* SVG 노이즈 텍스처 — 그레인 효과 */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>
        </div>
    );
};
