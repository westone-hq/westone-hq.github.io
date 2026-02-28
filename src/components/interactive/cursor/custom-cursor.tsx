import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from "@/context/cursor-context";

export const CustomCursor: React.FC = () => {
    const { cursorType } = useCursor();
    const [isHovered, setIsHovered] = useState(false);

    // Use MotionValues for tracking mouse position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Configuration for "snappy" but smooth movement.
    const springConfig = { damping: 20, stiffness: 1200, mass: 0.2 };

    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Separate spring for scale
    const scale = useSpring(1, { damping: 20, stiffness: 400 });

    useEffect(() => {
        // Base scale logic
        if (cursorType === 'drag' || cursorType === 'play' || cursorType === 'view') {
            scale.set(4); // Larger for text states
        } else if (isHovered) {
            scale.set(2.5); // Standard hover
        } else {
            scale.set(1); // Default
        }
    }, [isHovered, cursorType, scale]);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 6);
            mouseY.set(e.clientY - 6);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Only auto-detect hover if we are in default state
            // If we are in 'drag' or 'play', we trust the component logic
            if (cursorType === 'default') {
                const isInteractive =
                    target.closest('button') ||
                    target.closest('a') ||
                    target.closest('[data-hover="true"]');
                setIsHovered(!!isInteractive);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY, cursorType]); // Dependencies updated

    return (
        <>
            <motion.div
                className={`fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[9999] transition-colors duration-200
                ${(isHovered || cursorType !== 'default') ? 'bg-transparent border-[0.5px] border-white' : 'bg-white'}
                ${(cursorType === 'drag' || cursorType === 'play' || cursorType === 'view') ? 'w-4 h-4' : 'w-3 h-3'} 
            `}
                style={{
                    x: cursorX,
                    y: cursorY,
                    scale: scale,
                    mixBlendMode: (cursorType === 'drag' || cursorType === 'view' || cursorType === 'play') ? 'normal' : 'difference'
                }}
            >
                {/* Text for specific cursor types */}
                {(cursorType === 'drag' || cursorType === 'play' || cursorType === 'view') && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[3px] font-bold text-white uppercase tracking-widest absolute"
                    >
                        {cursorType}
                    </motion.span>
                )}
            </motion.div>
        </>
    );
};
