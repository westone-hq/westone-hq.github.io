import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, MotionValue, animate, type PanInfo, type AnimationPlaybackControls } from 'framer-motion';
import { useCursor } from '../../../context/cursor-context';
import { useUI } from '../../../context/ui-context';

import portraitYjt from '../../../assets/what-we-do/portrait-yjt.jpg';
import portraitPgj from '../../../assets/what-we-do/portrait-pgj.jpg';
import portraitLjm from '../../../assets/what-we-do/portrait-ljm.jpg';
import portraitPhj from '../../../assets/what-we-do/portrait-phj.jpg';

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "사용자가 보는 모든 픽셀에는\n고민이 담겨있어야 한다고 생각합니다.\n인터랙션 하나하나가 경험을 만듭니다.",
        author: "박건준",
        role: "Frontend Developer",
        image: portraitPgj
    },
    {
        id: 2,
        quote: "안정적이고 확장 가능한 시스템 설계가\n좋은 서비스의 기반입니다.\n눈에 보이지 않지만 가장 중요한 부분이죠.",
        author: "박희정",
        role: "Backend Developer",
        image: portraitPhj
    },
    {
        id: 3,
        quote: "프론트부터 백엔드까지 전체를 보면\n더 나은 의사결정을 할 수 있습니다.\n효율과 품질, 둘 다 잡을 수 있어요.",
        author: "양종태",
        role: "Full Stack Developer",
        image: portraitYjt
    },
    {
        id: 4,
        quote: "빠른 배포와 안정적인 운영,\n둘 모두를 잡는게 제 목표입니다.\n그것 만으로도 다른개발자들이\n코드에만 집중할 수 있도록 해주죠.",
        author: "이지민",
        role: "DevOps Engineer",
        image: portraitLjm
    }
];

// 카드 크기/간격 설정
const CARD_WIDTH = 320;
const GAP = 100;
const TOTAL_ITEM_WIDTH = CARD_WIDTH + GAP;
const ITEMS = testimonials;
// 대형 모니터 채우기 위해 4세트 복제
const RENDER_SETS = 4;
const DISPLAY_ITEMS: Testimonial[] = Array(RENDER_SETS).fill(ITEMS).flat();

// 드래그 캐러셀 — 팀 멤버 카드, 모바일: 지그재그 수직 레이아웃, 데스크탑: 드래그 무한 순환
const DraggableCarousel = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorType } = useCursor();
    const { isMobile } = useUI();

    // 드래그 위치 추적 MotionValue
    const x = useMotionValue(0);
    const animationRef = useRef<AnimationPlaybackControls | null>(null);

    // 언마운트 시 진행 중인 애니메이션 정리
    useEffect(() => {
        return () => {
            animationRef.current?.stop();
        };
    }, []);

    // pan 이벤트로 x를 직접 조작 (엘리먼트는 고정, delta로 움직임)
    const onPan = (_e: PointerEvent, info: PanInfo) => {
        x.set(x.get() + info.delta.x);
    };

    // 드래그 시작 시 관성 애니메이션 중단
    const onPanStart = () => {
        animationRef.current?.stop();
        x.stop();
    };

    // 드래그 종료 시 속도 기반 관성 스프링 애니메이션
    const onPanEnd = (_e: PointerEvent, info: PanInfo) => {
        const moveDistance = info.velocity.x * 0.12;
        const targetX = x.get() + moveDistance;

        animationRef.current = animate(x, targetX, {
            type: "spring",
            mass: 0.5,
            stiffness: 200,
            damping: 30,
        });
    };

    // 모바일: 지그재그 수직 레이아웃
    if (isMobile) {
        return (
            <section className="bg-black pt-16 pb-8 overflow-hidden relative">
                <div className="mb-8 px-4 relative z-10">
                    <h2 className="serif text-4xl text-white mb-6">Meet the Team</h2>
                </div>

                <div className="px-4 space-y-6">
                    {testimonials.map((item, index) => (
                        <MobileTeamCard key={item.id} item={item} index={index} />
                    ))}
                </div>
            </section>
        );
    }

    // 데스크탑: 드래그 캐러셀
    return (
        <section className="bg-black pt-24 pb-8 md:pt-40 md:pb-12 overflow-hidden relative select-none">
            <div className="mb-12 px-4 md:px-12 relative z-10 pointer-events-none">
                <h2 className="serif text-5xl md:text-7xl text-white mb-6">Meet the Team</h2>
            </div>

            {/*
         The Container acts as the interactive surface.
         We use onPan instead of drag. This means the div itself stays fixed (inset-0),
         but we capture the movement delta to drive the animation.
         No giant div needed!
      */}
            <div
                ref={containerRef}
                className="w-full min-h-[800px] relative touch-none"
                data-hover="true"
                onMouseEnter={() => setCursorType('drag')}
                onMouseLeave={() => setCursorType('default')}
            >
                {/* 제스처 레이어 — 투명, 최상위에서 pan 이벤트 수신 */}
                <motion.div
                    className="absolute inset-0 z-30"
                    onPan={onPan}
                    onPanStart={onPanStart}
                    onPanEnd={onPanEnd}
                />

                {/* 시각 아이템 레이어 */}
                <div className="absolute top-0 left-1/2 w-full h-full pointer-events-none z-20 -translate-x-1/2">
                    {DISPLAY_ITEMS.map((item, index) => (
                        <CarouselItem
                            key={`${item.id}-${index}`}
                            item={item}
                            index={index}
                            x={x}
                            totalCount={DISPLAY_ITEMS.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// 모바일 지그재그 카드 — 짝수/홀수 인덱스로 좌우 교차 배치
interface MobileTeamCardProps {
    item: Testimonial;
    index: number;
}

const MobileTeamCard: React.FC<MobileTeamCardProps> = ({ item, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            className={`flex flex-col ${isEven ? 'items-start pr-12' : 'items-end pl-12'}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <div className="w-[65vw] max-w-[280px]">
                <div className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-black shadow-xl mb-4">
                    <img
                        src={item.image}
                        alt={item.author}
                        loading="lazy"
                        className="w-full h-full object-contain grayscale opacity-90"
                        draggable={false}
                    />
                </div>
                <div className="space-y-3">
                    <p className="text-sm text-white font-serif leading-relaxed whitespace-pre-line">
                        "{item.quote}"
                    </p>
                    <div>
                        <p className="text-white font-medium text-sm">{item.author}</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wide mt-1">{item.role}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

interface CarouselItemProps {
    item: Testimonial;
    index: number;
    x: MotionValue<number>;
    totalCount: number;
}

// 개별 캐러셀 카드 — 모듈로 연산으로 무한 wrap-around 위치 계산, id 기반 지그재그
const CarouselItem: React.FC<CarouselItemProps> = ({ item, index, x, totalCount }) => {
    // 콘텐츠 ID 기준 지그재그 (복제본에서도 일관성 유지)
    const isEven = item.id % 2 === 0;

    const baseOffset = (index * TOTAL_ITEM_WIDTH);
    const trackWidth = totalCount * TOTAL_ITEM_WIDTH;

    // x 드래그 값을 [-trackWidth/2, trackWidth/2] 범위로 wrap
    const xPos = useTransform(x, (latestX) => {
        let pos = baseOffset + latestX;

        // 트랙 중심 기준으로 오프셋
        pos -= (trackWidth / 2);

        // 음수 포함 모듈로 연산
        const min = -trackWidth / 2;
        const max = trackWidth / 2;
        const range = max - min;

        const wrappedPos = ((((pos - min) % range) + range) % range) + min;

        return wrappedPos;
    });

    return (
        <motion.div
            style={{ x: xPos }}
            className={`
                absolute top-0 left-0 w-[320px] flex flex-col gap-6 select-none
                ${isEven ? 'mt-48' : 'mt-0'} 
            `}
        >
            {/* 뷰포트 진입 시 아래에서 위로 페이드인 */}
            <motion.div
                className="w-full h-[420px] overflow-hidden rounded-sm bg-black shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <img
                    src={item.image}
                    alt={item.author}
                    loading="lazy"
                    className="w-full h-full object-contain grayscale opacity-90 transition-all duration-500 hover:grayscale-0 hover:opacity-100"
                    draggable={false}
                />
            </motion.div>
            <div className="space-y-4 pr-4">
                <p className="text-base md:text-lg text-white font-serif leading-relaxed whitespace-pre-line">
                    “{item.quote}”
                </p>
                <div>
                    <p className="text-white font-medium text-sm">{item.author}</p>
                    <p className="text-gray-500 text-xs uppercase tracking-wide mt-1">{item.role}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default DraggableCarousel;
