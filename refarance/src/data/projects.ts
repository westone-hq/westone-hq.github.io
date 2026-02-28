import { Project, ProjectDetailContent } from '../types';

export const PROJECTS: Project[] = [
    { id: '1', name: 'Aura Intelligence', type: 'Product Design', image: 'https://picsum.photos/seed/aura/1200/800' },
    { id: '2', name: 'Nebula System', type: 'Brand Identity', image: 'https://picsum.photos/seed/nebula/1200/800' },
];

export const PROJECT_DETAILS: Record<string, ProjectDetailContent> = {
    '1': {
        hero: {
            title: 'Aura\nIntelligence',
            type: 'AI Platform',
            stage: '2024 Release',
            deliverables: ['UI/UX Design', 'Motion Graphics', 'Brand Strategy']
        },
        intro: {
            text: "Defining the next generation of\nambient computing through\nfluid interfaces and AI."
        },
        vision: {
            heading: "The future is\nnot requested,\nit is felt.",
            text: "We focused on creating a system that anticipates user needs before they are explicitly stated, using subtle visual cues and haptic feedback.",
            image1Title: "Core Interface",
            image1Subtitle: "Dynamic Response",
            image3HoverText: "Deep Learning"
        },
        media: {
            hero: [
                'https://picsum.photos/seed/aura1/800/1200',
                'https://picsum.photos/seed/aura2/800/1200',
                'https://picsum.photos/seed/aura3/800/1200'
            ],
            visionGrid1: 'https://picsum.photos/seed/v1/800/800',
            visionGrid2: 'https://picsum.photos/seed/v2/800/800',
            auraBento: 'https://picsum.photos/seed/bento/1200/800',
            featureInit: 'https://picsum.photos/seed/f1/600/1200',
            featureResult: 'https://picsum.photos/seed/f2/800/800',
        },
        marquee: "INTELLIGENT • AMBIENT • FLUID • HUMAN • FUTURE • ",
        aura: {
            subheading: "Visual Identity",
            heading: "A spectrum of\npossibilities.",
            text: "The color palette shifts dynamically based on the time of day and user mood, creating a living brand experience.",
            bigText: "AURA\n01",
            card2Text: "The <i>essence</i> of<br/>digital craft."
        },
        feature: {
            subheading: "Interaction",
            heading: "Generative\nMoments.",
            text: "Every interaction is unique, generated in real-time to match the user's specific context and intent."
        },
        discovery: {
            heading: "Exploring the\nunknown.",
            items: [
                { image: 'https://picsum.photos/seed/d1/800/600', title: 'Neural Mapping', category: 'Research' },
                { image: 'https://picsum.photos/seed/d2/800/600', title: 'Fluid Motion', category: 'Motion' },
                { image: 'https://picsum.photos/seed/d3/800/600', title: 'Ambient Sound', category: 'Audio' },
                { image: 'https://picsum.photos/seed/d4/800/600', title: 'Haptic Feedback', category: 'UX' },
            ]
        },
        stats: {
            stat1: { value: '98%', label: 'User Satisfaction' },
            stat2: { value: '2.4s', label: 'Avg. Response Time' },
            stat3: { value: '12M', label: 'Active Nodes' }
        }
    }
};
