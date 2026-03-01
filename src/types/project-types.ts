// 프로젝트 관련 열거형 및 인터페이스 타입 정의

// 전경 타입 상수 (모바일/태블릿/데스크탑/이미지/없음)
export const ForegroundType = {
  Mobile: 'mobile',
  Tablet: 'tablet',
  Desktop: 'desktop',
  Image: 'image',
  None: 'none',
} as const;

export type ForegroundTypeValue = (typeof ForegroundType)[keyof typeof ForegroundType];

// 테마 상수 (라이트/다크)
export const Theme = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type ThemeValue = (typeof Theme)[keyof typeof Theme];

// 진입 애니메이션 타입 상수
export const AnimationType = {
  ZoomIn: 'zoom-in',
  FadeUp: 'fade-up',
  Converge: 'converge',
  CrossFade: 'cross-fade',
  SplitSlide: 'split-slide',
  GlideRight: 'glide-right',
  PopIn: 'pop-in',
  SoftDrop: 'soft-drop',
} as const;

export type AnimationTypeValue = (typeof AnimationType)[keyof typeof AnimationType];

// 쇼케이스 레이아웃 설정 — 타이틀/설명/이미지 위치와 진입 애니메이션 지정
export interface LayoutConfig {
  titleStyles: string;
  descriptionStyles: string;
  imageWrapperStyles: string;
  enterAnimation?: string;
  aspectRatio?: string;
}

// 프로젝트 — 목록 표시 및 쇼케이스 렌더링에 필요한 모든 필드
export interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  year: string;
  tags: string[];
  image: string;
  color: string;
  bgImage?: string;
  foregroundImage?: string;
  secondaryImage?: string;
  showcaseImages?: string[];
  foregroundType?: 'mobile' | 'tablet' | 'desktop' | 'image' | 'none';
  theme?: 'light' | 'dark';
  accentColor?: string;
  layoutConfig?: LayoutConfig;
}

// 프로젝트 상세 콘텐츠 — 상세 페이지 각 섹션에 필요한 데이터 구조
export interface ProjectDetailContent {
  id: string;
  media: {
    hero: string | string[];
    visionGrid1: string;
    visionGrid2: string;
    auraBento: string;
  };
  hero: {
    title: string;
    type: string;
    stage: string;
    deliverables: string;
  };
  intro: {
    text: string;
  };
  vision: {
    heading: string;
    text: string;
  };
  marquee: string;
  aura: {
    subheading: string;
    heading: string;
    text: string;
  };
  feature: {
    subheading: string;
    heading: string;
    text: string;
  };
  discovery: {
    items: { img: string; title: string }[];
  };
  corePillars: { title: string; description: string; image: string; number: string }[];
  stats: {
    stat1: { value: string; label: string };
    stat2: { value: string; label: string };
    stat3: { value: string; label: string };
  };
}
