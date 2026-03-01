import React from 'react';

interface CarouselItem {
    img: string;
    title: string;
}

interface ImageCarouselProps {
    items: CarouselItem[];
    containImages?: boolean;
}

// CSS 키프레임 무한 스크롤 캐러셀 — 4배 복제 후 -50% 이동으로 끊김 없이 루프
export const ImageCarousel: React.FC<ImageCarouselProps> = ({ items, containImages = false }) => {
    // 4세트 복제: CSS 애니메이션 -50% 이동 시 seamless 루프 보장
    const displayItems = [...items, ...items, ...items, ...items];

    return (
        <div className="w-full overflow-hidden pb-12 select-none">
            <div className="flex w-max animate-scroll pause-on-hover">
                {displayItems.map((item, index) => (
                    <div
                        key={index}
                        className={`mx-4 relative w-[280px] md:w-[400px] h-[380px] md:h-[500px] flex-shrink-0 rounded-lg overflow-hidden group cursor-pointer ${containImages ? 'bg-[#a3a3a3]' : 'bg-neutral-900'}`}
                    >
                        <img
                            src={item.img}
                            alt={item.title}
                            loading="lazy"
                            className={`absolute inset-0 w-full h-full transition-all duration-700 ${
                                containImages
                                    ? 'object-contain p-4 opacity-100 group-hover:scale-105'
                                    : 'object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105'
                            }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                        <div className="absolute bottom-8 left-8">
                            <h4 className="text-2xl font-serif mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white">{item.title}</h4>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
