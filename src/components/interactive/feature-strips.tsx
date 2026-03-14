import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

// 인터랙티브 피처 스트립 — 모바일: 아코디언 토글, 데스크탑: 호버 시 스트립 확장
export const InteractiveFeatureStrips: React.FC<{
    items: { title: string; description: string; image: string; number: string }[];
}> = ({ items }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <>
            {/* 모바일: 텍스트 아코디언 → 탭 시 이미지 펼쳐짐 */}
            <div className="block md:hidden border-t border-white/10 px-4">
                {items.map((item, index) => (
                    <div key={index} className="border-b border-white/10">
                        <button
                            className="w-full flex justify-between items-center py-5 text-left"
                            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        >
                            <div className="flex items-baseline gap-4">
                                <span className="text-xs font-mono text-white/40 flex-shrink-0">{item.number}</span>
                                <h4 className="text-2xl font-serif">{item.title}</h4>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className="flex-shrink-0 ml-4"
                            >
                                <Plus className="w-5 h-5 text-white/50" />
                            </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                            {expandedIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-6 space-y-4">
                                        <div className="rounded-xl overflow-hidden aspect-video">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* 데스크탑: 인터랙티브 스트립 */}
            <div className="hidden md:flex w-full h-[800px] gap-2 overflow-hidden">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        animate={{ flex: hoveredIndex === index ? 3 : 1 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="relative h-full overflow-hidden cursor-pointer group"
                    >
                        {/* 배경 이미지 — 스케일 고정, 호버 시 grayscale 해제 */}
                        <div className="absolute inset-0">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>

                        {/* 하단 그라데이션 — 호버 시 텍스트 영역 선명하게 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-500" />

                        {/* 콘텐츠 오버레이 */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                            <span className="text-xs font-mono text-white/50 group-hover:text-white transition-colors">{item.number}</span>

                            <div className="space-y-4">
                                <h4 className="text-5xl font-serif leading-none">{item.title}</h4>
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                                            className="text-white/70 text-base max-w-md leading-relaxed"
                                        >
                                            {item.description}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* 구분선 — 호버 시 사라짐 */}
                        <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/10 group-hover:opacity-0 transition-opacity" />
                    </motion.div>
                ))}
            </div>
        </>
    );
};
