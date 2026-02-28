// ============================================================================
// Project Enums
// ============================================================================

/**
 * 전경 타입 값
 */
export const ForegroundType = {
  Mobile: 'mobile',
  Tablet: 'tablet',
  Desktop: 'desktop',
  Image: 'image',
  None: 'none',
} as const;

/**
 * 전경 타입
 */
export type ForegroundTypeValue = (typeof ForegroundType)[keyof typeof ForegroundType];

/**
 * 테마 값
 */
export const Theme = {
  Light: 'light',
  Dark: 'dark',
} as const;

/**
 * 테마 타입
 */
export type ThemeValue = (typeof Theme)[keyof typeof Theme];

/**
 * 애니메이션 타입 값
 */
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

/**
 * 애니메이션 타입
 */
export type AnimationTypeValue = (typeof AnimationType)[keyof typeof AnimationType];

// ============================================================================
// Project Interfaces
// ============================================================================

/**
 * 레이아웃 설정
 */
export interface LayoutConfig {
  titleStyles: string;
  descriptionStyles: string;
  imageWrapperStyles: string;
  enterAnimation?: string;
  aspectRatio?: string;
}

/**
 * 프로젝트
 */
export interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  year: string;
  tags: string[];
  image: string;
  color: string;
  // Showcase Fields
  bgImage?: string;
  foregroundImage?: string;
  secondaryImage?: string;
  showcaseImages?: string[];
  foregroundType?: 'mobile' | 'tablet' | 'desktop' | 'image' | 'none';
  theme?: 'light' | 'dark';
  accentColor?: string;
  layoutConfig?: LayoutConfig;
}

/**
 * 프로젝트 상세 콘텐츠
 */
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