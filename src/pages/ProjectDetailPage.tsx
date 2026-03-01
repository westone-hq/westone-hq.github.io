import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectDetail } from '@/components/showcase';
import { PROJECT_DETAILS } from '@/data/projects';
import { useScrollDetection, useProjectNavigation } from '@/hooks';

interface ProjectDetailPageProps {
  onScroll: (isScrolled: boolean) => void;
}

// 프로젝트 상세 페이지 — URL 파라미터로 프로젝트 로드, 없으면 홈으로 리다이렉트
export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onScroll }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getNextProject, goToNextProject, goToHome } = useProjectNavigation();

  // 스크롤 50px 초과 시 상위 onScroll 호출
  useScrollDetection({ onScroll, threshold: 50 });

  // 프로젝트 이동 시 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // 유효하지 않은 프로젝트 ID면 홈으로 이동
  if (!projectId || !PROJECT_DETAILS[projectId]) {
    goToHome();
    return null;
  }

  const handleNextProject = () => {
    if (!projectId) return;
    goToNextProject(projectId);
  };

  return (
    <ProjectDetail
      details={PROJECT_DETAILS[projectId]}
      nextProject={getNextProject(projectId)}
      onNextProject={handleNextProject}
    />
  );
};
