import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useCursor } from "@/context/cursor-context";
import { useUI } from "@/context/ui-context";

const steps = [
    {
        id: "01",
        title: "Product focus",
        desc: "마케팅 사이트가 아닌,\n실제로 작동하는 소프트웨어를 만듭니다.",
        image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "02",
        title: "Co-founder mentality",
        desc: "단순히 개발만 하지 않습니다.\n함께 고민하고, 더 나은 방향을 찾아갑니다.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "03",
        title: "Track record",
        desc: "우리가 만든 제품들은\n실제 사용자들의 일상에서 작동합니다.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "04",
        title: "Software not vaporware",
        desc: "프로토타입이 아닌 프로덕션 레벨 코드,\n바로 배포 가능한 결과물을 만듭니다.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "05",
        title: "Startup pace",
        desc: "빠르게 반복하며 시장에 먼저 도달합니다.\n속도가 경쟁력입니다.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "06",
        title: "Small, world-class teams",
        desc: "소수 정예로 움직이되,\n퀄리티는 절대 타협하지 않습니다.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
    }
];

// 모바일 스텝 아이템 — 뷰포트 50% 진입 시 설명 텍스트 펼침
const MobileStepItem: React.FC<{ step: typeof steps[0] }> = ({ step }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    return (
        <motion.div
            ref={ref}
            className="border-b border-gray-800 py-6"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isInView ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500 font-serif">{step.id}</span>
            </div>
            <h3 className="text-xl font-medium mb-3">{step.title}</h3>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: isInView ? 'auto' : 0,
                    opacity: isInView ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="overflow-hidden"
            >
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line pb-2">
                    {step.desc}
                </p>
            </motion.div>
        </motion.div>
    );
};

// 프로세스 그리드 — 모바일: 스크롤 아코디언, 데스크탑: 호버 시 가로 아코디언 확장
const ProcessGrid = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { setCursorType } = useCursor();
    const { isMobile } = useUI();

    // 모바일 레이아웃
    if (isMobile) {
        return (
            <section className="bg-black text-white pt-8 pb-16">
                <div className="px-4 mb-12">
                    <h2 className="text-3xl font-serif leading-tight">
                        After shipping hundreds of products, there are a few key things we've learned
                    </h2>
                </div>

                <div className="px-4 border-t border-gray-800">
                    {steps.map((step) => (
                        <MobileStepItem key={step.id} step={step} />
                    ))}
                </div>

                <div className="px-4 mt-8">
                    <a href="/" className="text-sm font-medium border-b border-white pb-1">View the work &rarr;</a>
                </div>
            </section>
        );
    }

    // 데스크탑 레이아웃
    return (
        <section className="bg-black text-white pt-8 pb-32 md:pt-12 md:pb-56">
            {/* 헤더 */}
            <div className="max-w-7xl mx-auto px-4 md:px-12 mb-32 md:mb-40 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <h2 className="text-5xl md:text-7xl font-serif leading-tight max-w-5xl">
                    After shipping hundreds of products, there are a few key things we've learned are needed to do the best work
                </h2>
                <a
                    href="/"
                    className="hidden md:inline-block text-sm font-medium border-b border-white pb-1 hover:text-gray-300 transition-colors whitespace-nowrap mb-2"
                    data-hover="true"
                >
                    View the work &rarr;
                </a>
            </div>

            {/* 가로 아코디언 — 호버 시 flex-grow 3으로 확장, 나머지 0.3으로 페이드 */}
            <div className="w-full border-t border-b border-gray-800 flex flex-col md:flex-row h-auto md:h-[450px]">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        className="group relative border-b md:border-b-0 md:border-r border-gray-800 p-8 flex flex-col h-[300px] md:h-auto overflow-hidden bg-black"
                        onMouseEnter={() => {
                            setHoveredIndex(index);
                            setCursorType('view');
                        }}
                        onMouseLeave={() => {
                            setHoveredIndex(null);
                            setCursorType('default');
                        }}
                        data-hover="true"
                        // flex-grow로 확장 효과
                        animate={{
                            flex: hoveredIndex === index ? 3 : 1,
                            opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.3 : 1
                        }}
                        transition={{
                            flex: {
                                duration: 0.5,
                                ease: "easeInOut",
                                // 축소 시 콘텐츠 페이드아웃 후 진행
                                delay: hoveredIndex === index ? 0 : 0.3
                            },
                            opacity: { duration: 0.3 }
                        }}
                    >
                        {/* 우측 강조선 — 호버 시 표시 */}
                        <motion.div
                            className="w-[1px] h-full absolute right-0 top-0 bg-blue-600 hidden md:block z-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        />

                        {/* 번호 — 상단 고정 */}
                        <div className="flex justify-between items-start z-20 relative shrink-0">
                            <span className="text-xl font-serif">{step.id}</span>
                        </div>

                        {/* 이미지 — 중간 영역 채움, 호버 시 표시 */}
                        <div className="flex-grow relative w-full my-6 overflow-hidden rounded-sm">
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.div
                                        className="absolute inset-0 w-full h-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
                                        exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
                                    >
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover grayscale opacity-50"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 설명 + 타이틀 — 하단 고정 */}
                        <div className="flex flex-col justify-end shrink-0 z-20 relative">
                            <AnimatePresence>
                                {(hoveredIndex === index) && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
                                        exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
                                        className="mb-4"
                                    >
                                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-md whitespace-pre-line">
                                            {step.desc}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.h3
                                layout="position"
                                className="text-2xl md:text-3xl leading-tight"
                            >
                                {step.title}
                            </motion.h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ProcessGrid;
