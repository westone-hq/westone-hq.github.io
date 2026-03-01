import React, { useState } from 'react';
import { MenuSection } from '@/components/layout/menu';
import { DEFAULT_PROJECT } from '@/data/projects';
import { useProjectNavigation, useHoverProject } from '@/hooks';

// 메뉴 페이지 — 프로젝트 호버/열기, 페이지 이동 이벤트를 MenuSection에 주입
export const MenuPage: React.FC = () => {
  // 상태
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const activeProject = useHoverProject(hoveredProjectId);

  const {
    openProject,
    goToContact,
    goToNews,
    goToWhatWeDo,
    goToHome,
  } = useProjectNavigation();

  // 이벤트 버블링 차단 후 프로젝트 열기
  const handleOpenProject = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    openProject(id);
  };

  // 호버 프로젝트 없으면 기본값으로 대체
  const displayProject = activeProject || DEFAULT_PROJECT;

  return (
    <MenuSection
      displayProject={displayProject}
      onProjectHover={setHoveredProjectId}
      onOpenProject={handleOpenProject}
      onOpenContact={goToContact}
      onOpenNews={goToNews}
      onOpenWhatWeDo={goToWhatWeDo}
      onGoHome={goToHome}
    />
  );
};
