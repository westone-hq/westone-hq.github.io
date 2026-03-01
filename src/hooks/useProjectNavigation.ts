import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '@/data/projects';

// react-router 기반 페이지 이동 유틸 훅
export const useProjectNavigation = () => {
  const navigate = useNavigate();

  const openProject = (projectId: string) => {
    navigate(`/work/${projectId}`);
  };

  // PROJECTS 배열 순서 기반으로 다음 프로젝트 순환
  const getNextProject = (currentProjectId: string) => {
    const currentIndex = PROJECTS.findIndex(p => p.id === currentProjectId);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    return PROJECTS[nextIndex];
  };

  const goToNextProject = (currentProjectId: string) => {
    const nextProject = getNextProject(currentProjectId);
    navigate(`/work/${nextProject.id}`);
  };

  const goToHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const goToMenu = () => navigate('/menu');
  const goToContact = () => navigate('/contact');
  const goToNews = () => navigate('/news');
  const goToWhatWeDo = () => navigate('/what-we-do');
  const goBack = () => navigate(-1);

  return {
    openProject,
    getNextProject,
    goToNextProject,
    goToHome,
    goToMenu,
    goToContact,
    goToNews,
    goToWhatWeDo,
    goBack,
  };
};
