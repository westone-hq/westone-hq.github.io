import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// 모바일: 뷰포트 중앙 진입 시 이미지 자동 펼침
const MobileListItem: React.FC<{
    item: { img: string; title: string };
    index: number;
}> = ({ item, index }) => {
    const ref = useRef(null);
    // 뷰포트 상단 20% ~ 하단 55% 구간에 들어오면 active
    const isInView = useInView(ref, { margin: "-20% 0px -55% 0px" });

    return (
        <div ref={ref} className="border-b border-white/10">
            <div className="py-10 px-6 flex justify-between items-center">
                <div className="flex flex-col gap-4">
                    <span className="text-xs font-mono text-gray-500 w-6">0{index + 1}</span>
                    <h4 className={`text-3xl font-serif leading-none transition-all duration-500 ${isInView ? 'italic' : ''}`}>
                        {item.title}
                    </h4>
                </div>
                <motion.div
                    animate={{ rotate: isInView ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                    <ArrowUpRight className={`w-6 h-6 transition-colors duration-300 ${isInView ? 'text-white' : 'text-gray-500'}`} />
                </motion.div>
            </div>

            <AnimatePresence initial={false}>
                {isInView && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6">
                            <div className="rounded-xl overflow-hidden aspect-video">
                                <img
                                    src={item.img}
                                    className="w-full h-full object-cover"
                                    alt={item.title}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// 타이포그래피 목록 — 모바일: 스크롤 자동 아코디언, 데스크탑: 호버 시 마우스 위치에 플로팅 이미지
export const InteractiveTypographicList: React.FC<{
    items: { img: string; title: string }[];
}> = ({ items }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    // 호버 해제 시에도 마지막 이미지 유지 (깜빡임 방지)
    const lastIndexRef = useRef<number>(0);
    const mouseX = useMotionValue(-500);
    const mouseY = useMotionValue(-500);

    const springConfig = { damping: 25, stiffness: 150 };
    const imageX = useSpring(mouseX, springConfig);
    const imageY = useSpring(mouseY, springConfig);

    if (hoveredIndex !== null) lastIndexRef.current = hoveredIndex;

    // 호버 전부터 마우스 위치 추적
    useEffect(() => {
        const track = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', track);
        return () => window.removeEventListener('mousemove', track);
    }, [mouseX, mouseY]);

    return (
        <div className="relative">

            {/* 모바일: 스크롤 기반 자동 아코디언 */}
            <div className="block md:hidden border-t border-white/10">
                {items.map((item, i) => (
                    <MobileListItem key={i} item={item} index={i} />
                ))}
            </div>

            {/* 데스크탑: 마우스 호버 + 플로팅 이미지 */}
            <div className="hidden md:block relative">
                <div className="flex flex-col border-t border-white/10">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative border-b border-white/10 py-10 px-6 md:px-12 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-baseline gap-16">
                                <span className="text-xs font-mono text-gray-500 w-6 flex-shrink-0">0{i + 1}</span>
                                <h4 className="text-5xl lg:text-6xl font-serif group-hover:italic transition-all duration-500 leading-none">{item.title}</h4>
                            </div>
                            <ArrowUpRight className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
                        </div>
                    ))}
                </div>

                <motion.div
                    animate={{
                        opacity: hoveredIndex !== null ? 1 : 0,
                        scale: hoveredIndex !== null ? 1 : 0.88,
                    }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    style={{
                        position: 'fixed',
                        left: imageX,
                        top: imageY,
                        x: '-50%',
                        y: '-50%',
                        pointerEvents: 'none',
                        zIndex: 100
                    }}
                    className="w-[450px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                >
                    <img
                        src={items[lastIndexRef.current].img}
                        alt="Preview"
                        loading="lazy"
                        className="w-full h-auto block"
                    />
                </motion.div>
            </div>

        </div>
    );
};
