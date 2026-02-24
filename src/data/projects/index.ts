import type { Project, ProjectDetailContent } from '../../types';

// Individual project imports
export { freeKioskProject, freeKioskDetails } from './westone-kiosk';
export { ootdProject, ootdDetails } from './ootd';
export { ballpangProject, ballpangDetails } from './ballpang';
export { recyclerProject, recyclerDetails } from './recycler';
export { AIToDoProject, AIToDoDetails } from './ai-todo';

// Re-import for aggregation
import { freeKioskProject, freeKioskDetails } from './westone-kiosk';
import { ootdProject, ootdDetails } from './ootd';
import { ballpangProject, ballpangDetails } from './ballpang';
import { recyclerProject, recyclerDetails } from './recycler';
import { AIToDoProject, AIToDoDetails } from './ai-todo';

// Aggregated exports
export const PROJECTS: Project[] = [
    freeKioskProject,
    ootdProject,
    ballpangProject,
    recyclerProject,
    AIToDoProject,
];

export const PROJECT_DETAILS: Record<string, ProjectDetailContent> = {
    'westone-kiosk': freeKioskDetails,
    'ootd': ootdDetails,
    'ballpang': ballpangDetails,
    'recycler': recyclerDetails,
    'ai-todo': AIToDoDetails,
};

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
