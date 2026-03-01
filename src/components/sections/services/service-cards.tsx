import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useCursor } from "@/context/cursor-context";

const services = [
    {
        id: 1,
        title: "Defining a clear vision for the future",
        description: "• 아이디어 단계부터 함께합니다.\n• 리서치, 프로토타이핑, 검증을 거쳐\n\u00A0\u00A0사용자가 원하는 제품을 만듭니다.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Set the bar for category defining design",
        description: "• 검증된 제품을 카테고리 최고 수준으로.\n• 퍼포먼스, 확장성, 완성도를 모두 갖춘\n\u00A0\u00A0디자인을 제공합니다.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "From strategic insight to implementation",
        description: "• 전략 수립부터 실행까지 전 과정을 함께합니다.\n• 가설 검증, 시장 핏 확인, 성장 로드맵 설계까지 지원합니다.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Production code that scales with you",
        description: "• 프로덕션 환경을 위한 견고한 코드베이스.\n• Modern stack 기반으로 확장 가능하고\n\u00A0\u00A0안정적인 시스템을 구축합니다.",
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800"
    }
];

// 모바일: 스크롤 기반 자동 아코디언
const MobileServiceItem: React.FC<{ service: typeof services[0] }> = ({ service }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -55% 0px" });

    return (
        <div ref={ref} className="border-b border-gray-800">
            <div className="py-8">
                <h3 className={`text-2xl font-serif leading-snug transition-all duration-500 ${isInView ? 'italic text-white' : 'text-gray-400'}`}>
                    {service.title}
                </h3>
                <p className={`text-sm mt-3 leading-relaxed whitespace-pre-wrap transition-colors duration-300 ${isInView ? 'text-gray-300' : 'text-gray-600'}`}>
                    {service.description}
                </p>
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
                        <div className="pb-6">
                            <div className="rounded-xl overflow-hidden aspect-video">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// 서비스 카드 — 모바일: 스크롤 아코디언, 데스크탑: 호버 시 이미지 표시 + 패딩 확장
const ServiceCards = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { setCursorType } = useCursor();

    return (
        <section className="bg-black py-20 md:py-32 px-4 md:px-8 text-white">
            <div className="w-full">
                <div className="mb-12 border-b border-gray-800 pb-6">
                    <h2 className="serif text-4xl md:text-5xl text-white">Our Expertise</h2>
                </div>

                {/* 모바일: 스크롤 아코디언 */}
                <div className="block md:hidden border-t border-gray-800">
                    {services.map((service) => (
                        <MobileServiceItem key={service.id} service={service} />
                    ))}
                </div>

                {/* 데스크톱: 호버 인터랙션 */}
                <div className="hidden md:flex flex-col border-t border-gray-800">
                    {services.map((service, index) => {
                        const isHovered = hoveredIndex === index;

                        return (
                            <motion.div
                                key={service.id}
                                layout
                                className="group border-b border-gray-800 cursor-pointer overflow-hidden relative"
                                onMouseEnter={() => {
                                    setHoveredIndex(index);
                                    setCursorType('view');
                                }}
                                onMouseLeave={() => {
                                    setHoveredIndex(null);
                                    setCursorType('default');
                                }}
                                data-hover="true"
                                initial={{ backgroundColor: "transparent" }}
                                animate={{ backgroundColor: isHovered ? "rgba(20,20,20,0.4)" : "transparent" }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                {/* 호버 시 패딩 py-10→py-24로 확장 */}
                                <div className={`w-full transition-all duration-500 ease-out ${isHovered ? 'py-24' : 'py-10'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                                        {/* 좌: 타이틀 */}
                                        <div className="md:col-span-4 flex items-center gap-6">
                                            <h3 className={`serif text-3xl md:text-5xl leading-tight transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-200'}`}>
                                                {service.title}
                                            </h3>
                                            {/* 호버 시 흰 점 인디케이터 */}
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                                                className="w-3 h-3 bg-white rounded-full flex-shrink-0"
                                            />
                                        </div>

                                        {/* 중앙: 이미지 — 호버 시만 표시 */}
                                        <div className="hidden md:flex md:col-span-4 justify-center items-center h-full min-h-[1px]">
                                            <AnimatePresence>
                                                {isHovered && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0, width: 360 }}
                                                        animate={{ opacity: 1, height: 240, width: 360 }} // 3:2 Landscape Ratio (360px x 240px)
                                                        exit={{ opacity: 0, height: 0, width: 360 }}
                                                        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                                                        className="overflow-hidden rounded-sm relative"
                                                    >
                                                        <img
                                                            src={service.image}
                                                            alt={service.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* 우: 설명 */}
                                        <div className="md:col-span-4 pl-0 md:pl-8">
                                            <p className={`text-base md:text-xl leading-relaxed transition-colors duration-300 whitespace-pre-wrap ${isHovered ? 'text-gray-300' : 'text-gray-500'}`}>
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>{/* end 데스크톱 */}
            </div>
        </section>
    );
};

export default ServiceCards;
