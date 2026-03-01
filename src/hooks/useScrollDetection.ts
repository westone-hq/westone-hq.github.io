import { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '@/config';

interface UseScrollDetectionProps {
  onScroll: (isScrolled: boolean) => void;
  threshold?: number;
}

// 스크롤 위치가 threshold를 넘으면 onScroll(true) 호출
export const useScrollDetection = ({
  onScroll,
  threshold = SITE_CONFIG.ui.scrollThreshold
}: UseScrollDetectionProps) => {
  // ref로 최신 콜백 추적 — listener 재등록 없이 onScroll 변경 반영
  const onScrollRef = useRef(onScroll);
  onScrollRef.current = onScroll;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      onScrollRef.current(scrollTop > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);
};
