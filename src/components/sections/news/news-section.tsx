import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NewsCard } from "@/components/common/cards";
import { NEWS_ITEMS } from '../../../data/constants/news';
import type { NewsItem } from '../../../types';

const CATEGORIES = ['All', 'Milestone', 'Award'];

// 뉴스 섹션 — 카테고리 필터 + 더보기(+4), 필터 변경 시 300ms 페이드 전환
const NewsSection: React.FC = () => {
    // 상태
    const [activeCategory, setActiveCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(6);
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>(NEWS_ITEMS);
    const [isAnimating, setIsAnimating] = useState(false);

    // 카테고리 변경 시 300ms 딜레이 후 필터 적용
    useEffect(() => {
        setIsAnimating(true);
        const timeout = setTimeout(() => {
            const filtered = activeCategory === 'All'
                ? NEWS_ITEMS
                : NEWS_ITEMS.filter(item => item.category === activeCategory);
            setFilteredNews(filtered);
            setVisibleCount(6);
            setIsAnimating(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, [activeCategory]);

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    const visibleNews = filteredNews.slice(0, visibleCount);
    const hasMore = visibleCount < filteredNews.length;

    return (
        <motion.div
            className="absolute inset-0 z-40 w-full min-h-screen bg-black flex flex-col overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="pt-32 px-6 max-w-7xl mx-auto w-full pb-20">

                {/* 타이틀 + 카테고리 필터 바 */}
                <div className="mb-20 mt-10">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight text-white">
                        Latest <br className="hidden md:block" />
                        <span className="italic text-gray-500">Updates</span> & News.
                    </h1>

                    {/* 카테고리 필터 — 스크롤 시 상단 고정 */}
                    <div className="flex flex-wrap gap-3 mt-12 sticky top-20 z-40 py-4 bg-black/95 backdrop-blur-sm -mx-6 px-6 md:mx-0 md:px-0 border-b border-white/10 md:border-none">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                  ${activeCategory === cat
                                        ? 'bg-white text-black border-white'
                                        : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-500 hover:text-white'}
                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 뉴스 카드 그리드 — 필터 중 opacity 50% */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                    {visibleNews.map((news) => (
                        <NewsCard key={news.id} news={news} />
                    ))}
                </div>

                {/* 결과 없음 */}
                {visibleNews.length === 0 && (
                    <div className="py-20 text-center border-t border-white/10">
                        <p className="text-xl text-gray-500 font-serif italic">No news found in this category.</p>
                    </div>
                )}

                {/* 더보기 버튼 */}
                {hasMore && (
                    <div className="flex justify-center py-20 border-t border-white/10">
                        <button
                            onClick={handleShowMore}
                            className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border border-gray-700 text-white transition-all hover:border-white"
                        >
                            <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                            <span className="relative text-sm font-medium uppercase tracking-widest group-hover:text-black">Show more</span>
                        </button>
                    </div>
                )}

                {/* 진행 상태 바 */}
                <div className="text-center py-8 text-sm text-gray-600">
                    You've seen {visibleNews.length} of {filteredNews.length} updates
                    <div className="h-0.5 w-full bg-gray-900 mt-4 relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-white transition-all duration-500"
                            style={{ width: `${(visibleNews.length / filteredNews.length) * 100}%` }}
                        />
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default NewsSection;
