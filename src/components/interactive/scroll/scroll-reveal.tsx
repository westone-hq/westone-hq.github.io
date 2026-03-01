import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
}

// 뷰포트 진입 시 아래에서 위로 페이드인, prefers-reduced-motion 지원
const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, width = "100%", delay = 0, className = "" }) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div style={{ width, overflow: "hidden" }} className={className}>
            <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 75 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, delay: delay / 1000, ease: [0.25, 1, 0.5, 1] }}
                className="h-full"
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
