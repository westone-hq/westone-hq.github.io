import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

// 전역 UI 상태 — 스크롤, 반응형, 호버, 라우트 파생 플래그를 하나의 컨텍스트로 관리
interface UIContextType {
  // UI 상태
  isScrolled: boolean;
  setIsScrolled: (scrolled: boolean) => void;
  isDesktop: boolean;
  isMobile: boolean;
  isTouchDevice: boolean;

  // 호버 상태
  hoveredProjectId: string | null;
  setHoveredProjectId: (id: string | null) => void;

  // 라우트 기반 파생값
  isHomePage: boolean;
  isMenuPage: boolean;
  isProjectDetailPage: boolean;
  isFullScreenPage: boolean;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();

  // UI 상태
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTouchDevice, setIsTouchDevice] = useState(() =>
    window.matchMedia('(pointer: coarse)').matches
  );

  // 포인터 타입 변경 감지 (마우스 ↔ 터치 전환)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 호버 상태
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // 라우트 기반 파생값
  const isHomePage = location.pathname === '/';
  const isMenuPage = location.pathname === '/menu';
  const isProjectDetailPage = location.pathname.startsWith('/work/');
  const isFullScreenPage = isHomePage || isMenuPage ||
    location.pathname === '/contact' ||
    location.pathname === '/news' ||
    location.pathname === '/what-we-do';

  // 풀스크린 페이지 진입 시 스크롤 위치 초기화
  useEffect(() => {
    if (isHomePage || isMenuPage) {
      setIsScrolled(false);
      window.scrollTo(0, 0);
    }
  }, [isHomePage, isMenuPage]);

  // 창 크기 변경 시 반응형 플래그 갱신
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const value: UIContextType = {
    isScrolled,
    setIsScrolled,
    isDesktop,
    isMobile,
    isTouchDevice,
    hoveredProjectId,
    setHoveredProjectId,
    isHomePage,
    isMenuPage,
    isProjectDetailPage,
    isFullScreenPage,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
