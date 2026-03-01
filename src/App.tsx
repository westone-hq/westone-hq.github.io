import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CursorProvider } from './context/cursor-context';
import { UIProvider, useUI } from './context/ui-context';
import { FluidBackground, NeuralNoiseBackground } from '@/components/backgrounds';
import { ShowcaseBackground } from '@/components/showcase';
import { CustomCursor } from '@/components/interactive/cursor';
import { WhatWeDo } from '@/components/sections/services';
import { ContactSection } from '@/components/sections/contact';
import { NewsSection } from '@/components/sections/news';
import { Navbar } from '@/components/layout';
import { HomePage, ProjectDetailPage, MenuPage } from '@/pages';
import { PROJECTS, DEFAULT_PROJECT } from './data/projects';
import { useProjectNavigation, useHoverProject } from '@/hooks';

// 앱 레이아웃 — 배경, 네브바, 라우팅을 조합하는 루트 컴포넌트
const AppContent: React.FC = () => {
  const {
    isScrolled,
    setIsScrolled,
    isDesktop,
    isTouchDevice,
    hoveredProjectId,
    isHomePage,
    isMenuPage,
    isFullScreenPage,
  } = useUI();

  const { goToHome, goToMenu, goToContact, goBack } = useProjectNavigation();

  const activeProject = useHoverProject(hoveredProjectId);

  // 현재 메뉴 페이지면 닫기, 아니면 열기
  const toggleMenu = () => {
    if (isMenuPage) goBack();
    else goToMenu();
  };

  // 호버 프로젝트 없으면 기본 프로젝트로 대체
  const menuDisplayProject = activeProject || DEFAULT_PROJECT;

  const showShowcaseBackground = isHomePage && !isMenuPage && isDesktop;

  // 프로젝트 호버 시 NeuralNoise 페이드아웃
  const neuralNoiseVisible = !hoveredProjectId || !isDesktop;

  return (
    <div className={`relative w-full ${isFullScreenPage ? 'h-screen overflow-hidden' : 'min-h-screen'} font-sans transition-colors duration-700 ${isMenuPage ? 'text-black' : 'text-white'}`}>

      {!isTouchDevice && <CustomCursor />}

      {/* 배경 레이어 — z-0, fixed */}
      <div className={`${isFullScreenPage ? 'fixed' : 'absolute'} inset-0 z-0 bg-black`}>

        {/* 메뉴 페이지일 때만 마운트 */}
        <AnimatePresence>
          {isMenuPage && (
            <motion.div
              key="fluid-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <FluidBackground mode="light" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 메뉴 페이지가 아닐 때만 마운트 */}
        <AnimatePresence>
          {!isMenuPage && (
            <motion.div
              key="neural-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: neuralNoiseVisible ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <NeuralNoiseBackground />
            </motion.div>
          )}
        </AnimatePresence>

        {showShowcaseBackground && (
          <ShowcaseBackground projects={PROJECTS} activeId={hoveredProjectId} />
        )}

        {/* 메뉴 페이지 — 호버 프로젝트 컬러 오버레이 */}
        <AnimatePresence>
          {isMenuPage && (
            <motion.div
              key="menu-bg-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1, backgroundColor: menuDisplayProject.color }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-0 mix-blend-multiply pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      {/* 네브바 — fixed */}
      <Navbar
        isMenuOpen={isMenuPage}
        toggleMenu={toggleMenu}
        isScrolled={isScrolled}
        onOpenContact={goToContact}
        onLogoClick={goToHome}
      />

      {/* 메인 콘텐츠 — 라우트 */}
      <div className={`relative z-10 ${isFullScreenPage ? 'h-screen' : 'min-h-screen'}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/work/:projectId" element={<ProjectDetailPage onScroll={setIsScrolled} />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/news" element={<NewsSection />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
        </Routes>
      </div>

    </div>
  );
};

// 전역 프로바이더 래핑 — CursorProvider > Router > UIProvider 순서
const App: React.FC = () => {
  return (
    <CursorProvider>
      <Router>
        <UIProvider>
          <AppContent />
        </UIProvider>
      </Router>
    </CursorProvider>
  );
};

export default App;
