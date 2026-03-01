import type { Project, ProjectDetailContent } from '../../types';

// 개별 프로젝트 파일 export
export { freeKioskProject, freeKioskDetails } from './westone-kiosk';
export { ootdProject, ootdDetails } from './ootd';
export { ballpangProject, ballpangDetails } from './ballpang';
export { recyclerProject, recyclerDetails } from './recycler';
export { AIToDoProject, AIToDoDetails } from './ai-todo';

// 집계용 재import
import { freeKioskProject, freeKioskDetails } from './westone-kiosk';
import { ootdProject, ootdDetails } from './ootd';
import { ballpangProject, ballpangDetails } from './ballpang';
import { recyclerProject, recyclerDetails } from './recycler';
import { AIToDoProject, AIToDoDetails } from './ai-todo';

// 전체 프로젝트 배열 — 사이드바/모바일 목록 순서 결정
export const PROJECTS: Project[] = [
    freeKioskProject,
    ootdProject,
    ballpangProject,
    recyclerProject,
    AIToDoProject,
];

// 프로젝트 상세 레코드 — projectId로 접근
export const PROJECT_DETAILS: Record<string, ProjectDetailContent> = {
    'westone-kiosk': freeKioskDetails,
    'ootd': ootdDetails,
    'ballpang': ballpangDetails,
    'recycler': recyclerDetails,
    'ai-todo': AIToDoDetails,
};

// 호버 프로젝트 없을 때 표시할 기본값
export const DEFAULT_PROJECT: Project = {
    id: 'default',
    name: 'Westone',
    client: 'Agency',
    description: 'Building software that scales',
    year: '2025',
    tags: ['Agency', 'Showcase'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
    color: '#3B2F63'
};
