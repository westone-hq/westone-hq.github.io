import React, { useState } from 'react';
import type { NewsItem } from '../../../types';
import { ArrowUpRight } from 'lucide-react';

interface NewsCardProps {
    news: NewsItem;
}

// 뉴스 카드 — 호버 시 이미지 scale + grayscale 해제, 우측 상단 화살표 아이콘 표시
export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group flex flex-col gap-6 py-12 border-t border-white/10 col-span-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full overflow-hidden bg-white/5 aspect-[16/9] md:aspect-[16/10] lg:aspect-[16/9]">
                {news.image && (
                    <img
                        src={news.image}
                        alt={news.title}
                        className={`object-cover w-full h-full transition-all duration-700 ease-out ${isHovered ? 'scale-105 grayscale-0' : 'scale-100 grayscale'}`}
                        loading="lazy"
                    />
                )}
                <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />

                <div className={`absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-md rounded-full text-white transform transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    <ArrowUpRight className="w-5 h-5" />
                </div>
            </div>

            <div className="flex flex-col gap-1 px-1">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-2xl md:text-3xl font-serif font-medium text-white group-hover:underline decoration-1 underline-offset-4 whitespace-pre-line">
                        {news.title}
                    </h3>
                    <span className="hidden md:inline-block text-xs font-medium tracking-widest uppercase text-gray-500">
                        {news.date}
                    </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-gray-500">
                        <span className="uppercase tracking-wider text-xs text-meta-purple/80">{news.category}</span>
                    </div>
                    {/* 모바일 날짜 */}
                    <span className="md:hidden text-xs font-medium tracking-widest uppercase text-gray-500">
                        {news.date}
                    </span>
                </div>
            </div>
        </div>
    );
};
