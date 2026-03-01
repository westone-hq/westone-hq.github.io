import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from "@/context/cursor-context";

// 커스텀 커서 — 스프링으로 마우스 추적, cursorType에 따라 크기/텍스트 변경
export const CustomCursor: React.FC = () => {
    const { cursorType } = useCursor();
    const [isHovered, setIsHovered] = useState(false);

    // 마우스 위치 추적용 MotionValue
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // 스냅감 있는 스프링 설정
    const springConfig = { damping: 20, stiffness: 1200, mass: 0.2 };

    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // 크기 스프링
    const scale = useSpring(1, { damping: 20, stiffness: 400 });

    // cursorTypeRef — 이벤트 리스너 재등록 없이 최신 cursorType 참조
    const cursorTypeRef = useRef(cursorType);
    useEffect(() => {
        cursorTypeRef.current = cursorType;
    }, [cursorType]);

    // cursorType/isHovered 변경 시 크기 갱신
    useEffect(() => {
        if (cursorType === 'drag' || cursorType === 'play' || cursorType === 'view') {
            scale.set(4);
        } else if (isHovered) {
            scale.set(2.5);
        } else {
            scale.set(1);
        }
    }, [isHovered, cursorType, scale]);

    // 마우스 이벤트 리스너 1회 등록 — cursorTypeRef로 최신 타입 읽기
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 6);
            mouseY.set(e.clientY - 6);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (cursorTypeRef.current === 'default') {
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
    }, [mouseX, mouseY]); // mouseX/mouseY는 안정적 ref — 리스너 1회만 등록

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
                }}
            >
                {/* drag/play/view 타입일 때 텍스트 표시 */}
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
