import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface UIContextType {
  // UI State
  isScrolled: boolean;
  setIsScrolled: (scrolled: boolean) => void;
  isDesktop: boolean;
  isTouchDevice: boolean;

  // Hover State
  hoveredProjectId: string | null;
  setHoveredProjectId: (id: string | null) => void;

  // Route-based computed values
  isHomePage: boolean;
  isMenuPage: boolean;
  isProjectDetailPage: boolean;
  isFullScreenPage: boolean;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();

  // UI State
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isTouchDevice, setIsTouchDevice] = useState(() =>
    window.matchMedia('(pointer: coarse)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Hover State
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Route-based computed values
  const isHomePage = location.pathname === '/';
  const isMenuPage = location.pathname === '/menu';
  const isProjectDetailPage = location.pathname.startsWith('/work/');
  const isFullScreenPage = isHomePage || isMenuPage ||
    location.pathname === '/contact' ||
    location.pathname === '/news' ||
    location.pathname === '/what-we-do';

  // Reset scroll state when navigating to full-screen pages
  useEffect(() => {
    if (isHomePage || isMenuPage) {
      setIsScrolled(false);
      window.scrollTo(0, 0);
    }
  }, [isHomePage, isMenuPage]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const value: UIContextType = {
    isScrolled,
    setIsScrolled,
    isDesktop,
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
