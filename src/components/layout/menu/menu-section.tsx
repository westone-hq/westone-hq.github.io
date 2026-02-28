import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project, MenuItem, NewsItem } from '@/types';
import { MENU_ITEMS } from '@/data/constants/menu';
import { PROJECTS } from '@/data/projects';
import { NEWS_ITEMS } from '@/data/constants/news';
import { ArrowRightIcon } from '@/components/common/icons';
import { useUI } from '@/context/ui-context';

// Sub Components
const MenuLink: React.FC<{ item: MenuItem, index: number, onOpenContact: () => void, onOpenNews: () => void, onOpenWhatWeDo: () => void }> = ({ item, index, onOpenContact, onOpenNews, onOpenWhatWeDo }) => {
    const handleClick = (e: React.MouseEvent) => {
        if (item.href === '#contact') {
            e.preventDefault();
            onOpenContact();
        } else if (item.href === '#news') {
            e.preventDefault();
            onOpenNews();
        } else if (item.href === '#what-we-do') {
            e.preventDefault();
            onOpenWhatWeDo();
        }
    };

    return (
        <motion.a
            href={item.href}
            onClick={handleClick}
            className="block group relative py-0 w-fit whitespace-nowrap"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            data-hover="true"
        >
            <span className="font-serif text-2xl md:text-3xl lg:text-4xl text-gray-900 group-hover:text-black group-hover:italic transition-all duration-300">
                {item.label}
            </span>
        </motion.a>
    )
}

const MenuProjectPill: React.FC<{ project: Project; index: number; onHover: (id: string | null) => void; onClick: () => void }> = ({ project, index, onHover, onClick }) => {
    return (
        <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + (index * 0.05) }}
            onMouseEnter={() => onHover(project.id)}
            onClick={onClick}
            onMouseLeave={() => onHover(null)}
            className="group flex items-center gap-3 px-3 py-2 rounded-full bg-gray-50 hover:bg-black transition-colors duration-300 w-full max-w-[200px]"
            data-hover="true"
        >
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-green-400 transition-colors" />
            <span className="text-sm font-medium text-gray-500 group-hover:text-white transition-colors">{project.name}</span>
            <span className="text-[10px] text-gray-300 ml-auto group-hover:text-gray-500 transition-colors opacity-0 group-hover:opacity-100">{project.year}</span>
        </motion.button>
    )
}

interface MenuSectionProps {
    displayProject: Project;
    onProjectHover: (id: string | null) => void;
    onOpenProject: (id: string) => void;
    onOpenContact: () => void;
    onOpenNews: () => void;
    onOpenWhatWeDo: () => void;
    onGoHome: () => void;
}

// Mobile News Card for horizontal carousel
const MobileNewsCard: React.FC<{ news: NewsItem; index: number }> = ({ news, index }) => (
    <motion.div
        className="relative flex-shrink-0 w-[200px] bg-white border border-gray-100 shadow-sm rounded-xl p-3 cursor-pointer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 + (index * 0.05) }}
        data-hover="true"
    >
        <div className="absolute top-3 right-3 text-gray-300">
            <ArrowRightIcon />
        </div>

        {news.image && (
            <div className="w-full h-20 rounded-lg overflow-hidden mb-3 bg-gray-100">
                <img src={news.image} alt="" className="w-full h-full object-cover grayscale" />
            </div>
        )}

        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase text-meta-purple/60">{news.category}</span>
                <span className="text-[9px] text-gray-300">•</span>
                <span className="text-[9px] text-gray-400">{news.date}</span>
            </div>
            <h4 className="text-xs font-serif font-medium leading-snug text-gray-900 line-clamp-2">{news.title}</h4>
        </div>
    </motion.div>
);

// Mobile Menu Layout
const MobileMenuSection: React.FC<MenuSectionProps> = ({ displayProject, onOpenContact, onOpenNews, onOpenWhatWeDo, onGoHome }) => {
    return (
        <motion.div
            className="absolute inset-0 z-20 flex flex-col pt-20 w-full h-full overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Project Image - Top */}
            <div className="px-4 mb-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={displayProject.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-lg relative"
                    >
                        <img src={displayProject.image} alt={displayProject.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-serif text-2xl italic mb-1">{displayProject.name}</h3>
                            <p className="text-xs opacity-80">{displayProject.description}</p>
                            <div className="flex gap-2 mt-2">
                                {displayProject.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 rounded border border-white/30 text-[9px] uppercase tracking-wide bg-white/10">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Menu Links */}
            <div className="px-6 mb-6">
                <motion.a
                    href="#case-studies"
                    onClick={(e) => {
                        e.preventDefault();
                        onGoHome();
                    }}
                    className="block py-1"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                >
                    <span className="font-serif text-2xl text-gray-900">Case Studies</span>
                </motion.a>
                {MENU_ITEMS.map((item: MenuItem, index: number) => (
                    <MenuLink key={item.label} item={item} index={index + 1} onOpenContact={onOpenContact} onOpenNews={onOpenNews} onOpenWhatWeDo={onOpenWhatWeDo} />
                ))}
            </div>

            {/* Spacer to push news to bottom */}
            <div className="flex-1 min-h-[16px]" />

            {/* News Carousel - Bottom */}
            <div className="pb-6">
                <div className="flex justify-between items-center mb-3 px-6">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Latest News</span>
                    <span className="text-[10px] text-gray-400">Scroll →</span>
                </div>
                <div
                    className="flex gap-3 overflow-x-auto no-scrollbar px-6 pb-2"
                    style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
                >
                    {NEWS_ITEMS.map((news: NewsItem, i: number) => (
                        <MobileNewsCard key={news.id} news={news} index={i} />
                    ))}
                    {/* 마지막 아이템 우측 여백 */}
                    <div className="flex-shrink-0 w-3" />
                </div>
            </div>
        </motion.div>
    );
};

// Desktop Menu Layout
const DesktopMenuSection: React.FC<MenuSectionProps> = ({ displayProject, onProjectHover, onOpenProject, onOpenContact, onOpenNews, onOpenWhatWeDo }) => {
    const newsScrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startScrollTop = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startY.current = e.clientY;
        startScrollTop.current = newsScrollRef.current?.scrollTop || 0;
    };
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const delta = e.clientY - startY.current;
        if (newsScrollRef.current) {
            newsScrollRef.current.scrollTop = startScrollTop.current - delta;
        }
    };
    const handleMouseUp = () => { isDragging.current = false; };

    return (
        <motion.div
            className="absolute inset-0 z-20 flex flex-col pt-24 pb-8 px-6 md:px-12 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 h-full items-center">

                <div className="md:col-span-3 flex flex-col h-full overflow-hidden justify-center">
                    <div className="flex flex-col space-y-0 mb-6 shrink-0">
                        {MENU_ITEMS.map((item: MenuItem, index: number) => (
                            <MenuLink key={item.label} item={item} index={index} onOpenContact={onOpenContact} onOpenNews={onOpenNews} onOpenWhatWeDo={onOpenWhatWeDo} />
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar mask-gradient-b max-h-[50vh]">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 block pl-1">Case Studies</span>
                        <div className="flex flex-col items-start gap-1 pl-1 pb-4">
                            {PROJECTS.map((project: Project, i: number) => (
                                <MenuProjectPill
                                    key={project.id}
                                    project={project}
                                    index={i}
                                    onHover={onProjectHover}
                                    onClick={() => onOpenProject(project.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-6 flex items-center justify-center p-2 relative h-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={displayProject.id}
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.3, ease: "circOut" }}
                            className="w-auto h-full max-h-[70vh] aspect-[4/5] rounded-sm overflow-hidden shadow-2xl relative"
                        >
                            <img src={displayProject.image} alt={displayProject.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="font-serif text-4xl italic mb-1">{displayProject.name}</h3>
                                <p className="text-xs opacity-90 max-w-xs">{displayProject.description}</p>
                                <div className="flex gap-2 mt-3">
                                    {displayProject.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 rounded border border-white/20 text-[10px] uppercase tracking-wide bg-white/10 backdrop-blur-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="md:col-span-3 flex flex-col h-full pl-2 justify-center overflow-hidden relative">
                    <div className="flex justify-between items-center mb-4 px-4 py-3 bg-gray-100/80 backdrop-blur-md rounded-xl border border-gray-200/50 shrink-0 z-10 shadow-sm">
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Latest News</span>
                        <span className="text-[10px] text-gray-400">Scroll ↓</span>
                    </div>

                    <div
                        ref={newsScrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-2 max-h-[75vh] cursor-grab active:cursor-grabbing select-none"
                    >
                        {NEWS_ITEMS.map((news: NewsItem, i: number) => (
                            <motion.div
                                key={news.id}
                                className="group relative bg-white border border-gray-100 shadow-sm rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-300"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 + (i * 0.05) }}
                                data-hover="true"
                            >
                                <div className="absolute top-4 right-4 text-gray-300 group-hover:text-black transition-colors">
                                    <ArrowRightIcon />
                                </div>

                                {news.image && (
                                    <div className="w-full h-24 rounded-lg overflow-hidden mb-4 bg-gray-100">
                                        <img src={news.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                                    </div>
                                )}

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold uppercase text-meta-purple/60">{news.category}</span>
                                        <span className="text-[10px] text-gray-300">•</span>
                                        <span className="text-[10px] text-gray-400">{news.date}</span>
                                    </div>
                                    <h4 className="text-sm font-serif font-medium leading-snug text-gray-900 group-hover:text-meta-purple transition-colors">{news.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>


                </div>
            </div>
        </motion.div>
    );
};

export const MenuSection: React.FC<MenuSectionProps> = (props) => {
    const { isDesktop } = useUI();

    if (!isDesktop) {
        return <MobileMenuSection {...props} />;
    }

    return <DesktopMenuSection {...props} />;
}
