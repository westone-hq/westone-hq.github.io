import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, MotionValue, animate, type AnimationPlaybackControls } from 'framer-motion';

const baseItems = [
    { id: 1, img: "https://picsum.photos/600/800?random=1", title: "Dashboards" },
    { id: 2, img: "https://picsum.photos/800/600?random=2", title: "Web Apps" },
    { id: 3, img: "https://picsum.photos/600/800?random=3", title: "Interfaces" },
    { id: 4, img: "https://picsum.photos/800/600?random=4", title: "Mobile" },
    { id: 5, img: "https://picsum.photos/600/800?random=5", title: "AI" },
    { id: 6, img: "https://picsum.photos/800/600?random=6", title: "Server" },
    { id: 7, img: "https://picsum.photos/600/800?random=7", title: "Design Systems" },
];

interface ScrollItemData {
    img: string;
    title: string;
}

interface ScrollItemProps {
    item: ScrollItemData;
    index: number;
    x: MotionValue<number>;
    itemWidth: number;
    gap: number;
    totalCount: number;
}

// 개별 스크롤 아이템 — 모듈로 연산으로 무한 순환 위치 계산
const ScrollItem: React.FC<ScrollItemProps> = ({ item, index, x, itemWidth, gap, totalCount }) => {
    const totalItemWidth = itemWidth + gap;
    const trackWidth = totalCount * totalItemWidth;

    const xPos = useTransform(x, (latestX) => {
        let pos = index * totalItemWidth + latestX;

        // 트랙 절반 기준으로 wrap-around
        const halfTrack = trackWidth / 2;
        pos = ((pos % trackWidth) + trackWidth) % trackWidth;
        if (pos > halfTrack) pos -= trackWidth;

        return pos;
    });

    return (
        <motion.div
            style={{
                x: xPos,
                width: itemWidth,
                left: `calc(50% - ${itemWidth / 2}px)`
            }}
            className="absolute top-0 h-full flex-shrink-0 bg-gray-900 overflow-hidden group rounded-sm select-none"
        >
            <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
            />
            <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                <h3 className="text-2xl font-light text-white">{item.title}</h3>
            </div>
        </motion.div>
    );
};

// 모바일 전용: 스냅 캐러셀 (카드 하나 정면 표시 + 자동 슬라이드)
const MobileCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isUserScrolling = useRef(false);
    const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scrollToIndex = useCallback((index: number) => {
        if (!scrollRef.current) return;
        const cardWidth = scrollRef.current.offsetWidth * 0.78 + 16;
        scrollRef.current.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
    }, []);

    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;
        const { scrollLeft, offsetWidth } = scrollRef.current;
        const cardWidth = offsetWidth * 0.78 + 16;
        setActiveIndex(Math.round(scrollLeft / cardWidth));

        // 사용자 스크롤 감지 → 자동 슬라이드 잠시 멈춤
        isUserScrolling.current = true;
        if (scrollTimer.current) clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => {
            isUserScrolling.current = false;
        }, 2000);
    }, []);

    // 자동 슬라이드
    useEffect(() => {
        const interval = setInterval(() => {
            if (isUserScrolling.current) return;
            setActiveIndex(prev => {
                const next = (prev + 1) % baseItems.length;
                scrollToIndex(next);
                return next;
            });
        }, 2500);
        return () => clearInterval(interval);
    }, [scrollToIndex]);

    return (
        <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4"
            style={{ paddingInline: '11vw', scrollPaddingInline: '11vw', touchAction: 'pan-x' }}
        >
            {baseItems.map((item, i) => (
                <motion.div
                    key={item.id}
                    className="relative snap-center flex-shrink-0 rounded-2xl overflow-hidden"
                    style={{ width: '78vw', height: '52vh' }}
                    animate={{
                        scale: activeIndex === i ? 1 : 0.9,
                        opacity: activeIndex === i ? 1 : 0.45,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-xl font-light text-white">{item.title}</h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// 가로 자동 슬라이드 섹션 — 모바일: 스냅 캐러셀, 데스크탑: 1초 정지 후 단계 이동
const HorizontalScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, gap: 32 });
    const x = useMotionValue(0);

    // 반응형 아이템 너비 계산 (모바일 75vw, 데스크탑 25vw)
    useEffect(() => {
        const updateDimensions = () => {
            const isMobile = window.innerWidth < 768;
            const itemWidth = isMobile ? window.innerWidth * 0.75 : window.innerWidth * 0.25;
            const gap = isMobile ? 12 : 32;
            setDimensions({ width: itemWidth, gap });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // 1초 정지 → 0.8초 이동 반복 루프
    useEffect(() => {
        if (dimensions.width === 0) return;

        let controls: AnimationPlaybackControls | null = null;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const stride = dimensions.width + dimensions.gap;

        const runLoop = async () => {
            // 1초 대기 (정지 구간)
            await new Promise(resolve => {
                timeoutId = setTimeout(resolve, 1000);
            });

            // 한 아이템 너비만큼 이동
            const currentX = x.get();
            const targetX = currentX - stride;

            controls = animate(x, targetX, {
                duration: 0.8,
                ease: [0.32, 0.72, 0, 1],
                onComplete: () => {
                    runLoop();
                }
            });
        };

        runLoop();

        return () => {
            if (controls) controls.stop();
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [dimensions, x]);

    // 3세트 복제 — 대형 화면에서도 끊김 없이 순환
    const RENDER_SETS = 3;
    const DISPLAY_ITEMS = Array(RENDER_SETS).fill(baseItems).flat().map((item, idx) => ({ ...item, uniqueId: idx }));

    if (dimensions.width === 0) return null;

    return (
        <section className="bg-black py-24 md:py-36 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 md:px-12 mb-12">
                <h2 className="serif text-3xl md:text-5xl text-white">Our Platforms</h2>
            </div>

            {/* 모바일: 스냅 캐러셀 */}
            <div className="block md:hidden">
                <MobileCarousel />
            </div>

            {/* 데스크톱: 기존 무한 자동 슬라이드 */}
            <div
                ref={containerRef}
                className="hidden md:block w-full h-[50vh] relative touch-none"
                data-hover="true"
            >
                <div className="absolute top-0 left-1/2 w-full h-full pointer-events-none z-20">
                    {DISPLAY_ITEMS.map((item, index) => (
                        <ScrollItem
                            key={`${item.uniqueId}-${dimensions.width}`}
                            item={item}
                            index={index}
                            x={x}
                            itemWidth={dimensions.width}
                            gap={dimensions.gap}
                            totalCount={DISPLAY_ITEMS.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HorizontalScroll;
