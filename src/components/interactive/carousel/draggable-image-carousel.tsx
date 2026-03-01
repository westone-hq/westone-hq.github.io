import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, MotionValue, animate, type PanInfo } from 'framer-motion';
import { useCursor } from '../../../context/cursor-context';

interface CarouselItem {
    img: string;
    title: string;
}

interface DraggableImageCarouselProps {
    items: CarouselItem[];
    containImages?: boolean;
}

// 이미지 드래그 캐러셀 — 모바일: 수직 스택, 데스크탑: 드래그 무한 순환
const CARD_WIDTH = 380;
const GAP = 32;
const TOTAL_ITEM_WIDTH = CARD_WIDTH + GAP;
const RENDER_SETS = 4;

const DraggableImageCarousel: React.FC<DraggableImageCarouselProps> = ({ items, containImages = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorType } = useCursor();
    const [isMobile, setIsMobile] = useState(false);

    const x = useMotionValue(0);
    const DISPLAY_ITEMS: CarouselItem[] = Array(RENDER_SETS).fill(items).flat();

    // 창 크기 변경 시 모바일 여부 재계산
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const onPan = (_e: PointerEvent, info: PanInfo) => {
        x.set(x.get() + info.delta.x);
    };

    const onPanStart = () => {
        x.stop();
    };

    const onPanEnd = (_e: PointerEvent, info: PanInfo) => {
        const moveDistance = info.velocity.x * 0.12;
        const targetX = x.get() + moveDistance;
        animate(x, targetX, {
            type: "spring",
            mass: 0.5,
            stiffness: 200,
            damping: 30,
        });
    };

    // 모바일: 수직 스택 레이아웃
    if (isMobile) {
        return (
            <div className="px-4 space-y-4 pb-8">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className={`w-full h-[260px] rounded-lg overflow-hidden relative ${containImages ? 'bg-[#a3a3a3]' : 'bg-neutral-900'}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <img
                            src={item.img}
                            alt={item.title}
                            loading="lazy"
                            className={`w-full h-full transition-all duration-700 ${
                                containImages
                                    ? 'object-contain p-4 opacity-100'
                                    : 'object-cover opacity-70'
                            }`}
                            draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                        <div className="absolute bottom-5 left-5">
                            <h4 className="text-lg font-serif text-white">{item.title}</h4>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    // 데스크탑: 드래그 캐러셀 (지그재그 없음, 동일 높이)
    return (
        <div
            ref={containerRef}
            className="w-full min-h-[560px] relative touch-none select-none pb-12"
            data-hover="true"
            onMouseEnter={() => setCursorType('drag')}
            onMouseLeave={() => setCursorType('default')}
        >
            {/* 제스처 레이어 — 투명, pan 이벤트 수신 */}
            <motion.div
                className="absolute inset-0 z-30"
                onPan={onPan}
                onPanStart={onPanStart}
                onPanEnd={onPanEnd}
            />

            {/* 시각 아이템 레이어 */}
            <div className="absolute top-0 left-1/2 w-full h-full pointer-events-none z-20 -translate-x-1/2">
                {DISPLAY_ITEMS.map((item, index) => (
                    <ImageCarouselItem
                        key={`item-${index}`}
                        item={item}
                        index={index}
                        x={x}
                        totalCount={DISPLAY_ITEMS.length}
                        containImages={containImages}
                    />
                ))}
            </div>
        </div>
    );
};

interface ImageCarouselItemProps {
    item: CarouselItem;
    index: number;
    x: MotionValue<number>;
    totalCount: number;
    containImages: boolean;
}

// 이미지 캐러셀 개별 아이템 — 드래그 x 값을 wrap-around 위치로 변환
const ImageCarouselItem: React.FC<ImageCarouselItemProps> = ({ item, index, x, totalCount, containImages }) => {
    const baseOffset = index * TOTAL_ITEM_WIDTH;
    const trackWidth = totalCount * TOTAL_ITEM_WIDTH;

    const xPos = useTransform(x, (latestX) => {
        let pos = baseOffset + latestX;
        pos -= trackWidth / 2;

        const min = -trackWidth / 2;
        const max = trackWidth / 2;
        const range = max - min;

        const wrappedPos = ((((pos - min) % range) + range) % range) + min;
        return wrappedPos;
    });

    return (
        <motion.div
            style={{ x: xPos }}
            className="absolute top-0 left-0 w-[380px] select-none"
        >
            <motion.div
                className={`w-full h-[500px] overflow-hidden rounded-lg relative group ${containImages ? 'bg-[#a3a3a3]' : 'bg-neutral-900'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className={`w-full h-full transition-all duration-700 ${
                        containImages
                            ? 'object-contain p-4 opacity-100 group-hover:scale-105'
                            : 'object-cover opacity-60 group-hover:scale-105'
                    }`}
                    draggable={false}
                />
                <div className="absolute bottom-8 left-8">
                    <h4 className="text-2xl font-serif text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        {item.title}
                    </h4>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DraggableImageCarousel;
