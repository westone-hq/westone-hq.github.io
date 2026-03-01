import React from 'react';
import { motion } from 'framer-motion';
import { HeroVideo } from '@/components/sections/hero';
import { HorizontalScroll } from '@/components/interactive/scroll';
import { ServiceCards } from '@/components/sections/services';
import { ServiceCategories } from '@/components/sections/services';
import { Marquee } from '@/components/interactive/animations';
import { DraggableCarousel } from '@/components/interactive/carousel';
import { ProcessGrid } from '@/components/sections/services';
import { CinematicFrame } from '@/components/interactive/animations';
import { ImpactStats } from '@/components/stats';

// What We Do 페이지 — 슬라이드인 애니메이션으로 진입, 서비스 관련 섹션 전체 조합
const WhatWeDo: React.FC = () => {
    return (
        <motion.div
            className="absolute inset-0 bg-black text-white overflow-y-auto z-40"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="w-full pt-20">
                <HeroVideo />
                <HorizontalScroll />
                <ServiceCards />
                <ServiceCategories />
                <Marquee />
                <DraggableCarousel />
                <ProcessGrid />
                <CinematicFrame />
                <ImpactStats />
            </div>
        </motion.div>
    );
};

export default WhatWeDo;
