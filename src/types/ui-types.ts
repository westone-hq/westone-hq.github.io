// UI 관련 타입 정의 — 커서/컴포넌트 Props/뉴스/메뉴
import type React from 'react';

// 커서 타입 상수 (default/play/view/drag/hover)
export const CursorType = {
  Default: 'default',
  Play: 'play',
  View: 'view',
  Drag: 'drag',
  Hover: 'hover',
} as const;

export type CursorTypeValue = (typeof CursorType)[keyof typeof CursorType];

// 커서 컨텍스트 타입
export interface CursorContextType {
  cursorType: CursorTypeValue;
  setCursorType: (type: CursorTypeValue) => void;
}

// ScrollReveal 컴포넌트 Props
export interface ScrollRevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  className?: string;
}

// 뉴스 아이템
export interface NewsItem {
  id: string;
  date: string;
  title: string;
  category: string;
  image?: string;
}

// 메뉴 아이템
export interface MenuItem {
  label: string;
  href: string;
  description: string;
}
