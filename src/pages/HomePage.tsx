import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { ShowcaseDisplay } from '@/components/showcase';
import { HeroSection } from '@/components/sections/hero';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileHome } from '@/components/mobile';
import { useUI } from '@/context/ui-context';
import { useProjectNavigation, useHoverProject } from '@/hooks';

// 홈 페이지 — 데스크탑: 히어로+쇼케이스+사이드바, 모바일: MobileHome
export const HomePage: React.FC = () => {
  const { isDesktop, hoveredProjectId, setHoveredProjectId } = useUI();
  const { openProject } = useProjectNavigation();
  const activeProject = useHoverProject(hoveredProjectId);

  // 모바일은 별도 레이아웃으로 분기
  if (!isDesktop) {
    return <MobileHome />;
  }

  return (
    <>
      {/* 프로젝트 호버 시 ShowcaseDisplay, 기본은 HeroSection */}
      <AnimatePresence mode="wait">
        {hoveredProjectId && isDesktop && activeProject ? (
          <ShowcaseDisplay key="showcase" activeProject={activeProject} />
        ) : (
          <HeroSection
            key="hero"
            activeProject={activeProject}
            onOpenProject={openProject}
          />
        )}
      </AnimatePresence>

      <Sidebar
        onHoverProject={setHoveredProjectId}
        onOpenProject={openProject}
      />

      {/* 소셜 아이콘 — 우측 하단 고정 */}
      <div className="fixed bottom-10 right-6 z-20 flex gap-4 text-white/60">
        <button className="hover:text-white transition-colors">
          <Instagram className="w-5 h-5" />
        </button>
        <button className="hover:text-white transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
      </div>
    </>
  );
};
