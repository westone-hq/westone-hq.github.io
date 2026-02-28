import type { Project, ProjectDetailContent } from '../../types';
import intro0Img from '../../assets/ballpang/intro-0.png';
import intro1Img from '../../assets/ballpang/intro-1.png';
import intro2Img from '../../assets/ballpang/intro-2.png';
import intro3Img from '../../assets/ballpang/intro-3.png';
import heroImg from '../../assets/ballpang/hero.png';
import featureBeforeImg from '../../assets/ballpang/feature-before.png';
import iconImg from '../../assets/ballpang/icon.png';
import auraCardImg from '../../assets/ballpang/aura-card.png';
import visionSectionMainImg from '../../assets/ballpang/vision-section-main.png';
import intro4Img from '../../assets/ballpang/intro-4.png';
import visionGrid2Img from '../../assets/ballpang/vision-grid-2.png';

export const ballpangProject: Project = {
    id: 'ballpang',
    name: 'BallPang',
    client: '졸업작품',
    description: '야구장 통합 정보 플랫폼',
    year: '2025',
    tags: ['Mobile App', 'Flutter', 'Sports Tech'],
    image: heroImg,
    color: '#FF6B35',
    bgImage: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2560&auto=format&fit=crop',
    foregroundImage: intro0Img,
    secondaryImage: heroImg,
    foregroundType: 'mobile',
    theme: 'dark',
    accentColor: '#FFFFFF',
    layoutConfig: {
        titleStyles: 'absolute top-[45%] right-[12%] -translate-y-1/2 text-right italic font-serif z-10',
        descriptionStyles: 'absolute bottom-[15%] right-[12%] text-right max-w-xs',
        imageWrapperStyles: 'absolute top-[10%] left-[25%] w-[280px] md:w-[350px] aspect-[3/4] -rotate-[4deg] shadow-xl scale-90',
        enterAnimation: 'split-slide',
    }
};

export const ballpangDetails: ProjectDetailContent = {
    id: 'ballpang',
    media: {
        hero: [intro1Img, intro2Img, intro3Img],
        visionGrid1: iconImg,
        visionGrid2: auraCardImg,
        auraBento: visionSectionMainImg,
    },
    hero: {
        title: 'BallPang',
        type: 'Mobile App',
        stage: 'Launch',
        deliverables: 'iOS App, Android App, Data Platform'
    },
    intro: {
        text: `야구장 관람객이 복잡한
구장 구조속에서 겪는 불편함을
지도 시각화와 통합 정보 제공
으로 해결하는
크로스 플랫폼 모바일 앱`
    },
    vision: {
        heading: `야구장의 모든 것,
한눈에.`,
        text: '전국 9개 KBO 구장, 630개 이상의 매장 정보를 체계적으로 구조화하여 관람객이 현장에서 필요한 정보를 빠르게 찾을 수 있도록 설계했습니다. 복잡한 구장 구조는 지도 위 마커로 단순화하고, 구역/층/카테고리 필터로 탐색 시간을 획기적으로 단축했습니다.',
    },
    marquee: 'Stadium • Schedule • Map • Store • Menu • Review • Filter • Navigate • ',
    aura: {
        subheading: 'Smart Stadium Guide',
        heading: '복잡함을 단순하게, 정보를 경험으로.',
        text: '좌표 비율 기반 마커 시스템으로 다양한 화면 크기에서도 정확한 위치 표시를 구현했습니다. JSON 데이터 구조화를 통해 구역/층/메뉴 정보를 체계적으로 관리하며, 향후 구장 추가 시에도 확장 가능한 아키텍처를 설계했습니다.',
    },
    feature: {
        subheading: 'Interactive Map',
        heading: `원하는 곳으로,
가장 빠른 길로.`,
        text: '구장 지도 위에 매장 위치를 마커로 표시하고, 구역/층/카테고리 필터를 실시간으로 적용하여 복잡한 야구장 구조 문제를 해결했습니다. 마커 클릭 시 바텀시트로 상세 정보를 확인할 수 있어 직관적인 UX를 제공합니다.'
    },
    discovery: {
        items: [
            { img: visionGrid2Img, title: "매장 정보" },
            { img: visionSectionMainImg, title: "경기 일정" },
            { img: featureBeforeImg, title: "위치 시각화" },
            { img: intro4Img, title: "개인화 설정" }
        ]
    },
    corePillars: [
        {
            number: '01',
            title: '구장 지도',
            description: '좌표 비율 기반 마커 시스템으로 복잡한 구장 내 매장 위치를 지도 위에 정확하게 표시합니다.',
            image: visionSectionMainImg,
        },
        {
            number: '02',
            title: '매장 정보',
            description: '630개 이상의 매장 데이터를 구역·층·카테고리 필터로 빠르게 탐색하고 상세 정보를 확인합니다.',
            image: visionGrid2Img,
        },
        {
            number: '03',
            title: '경기 일정',
            description: '전국 9개 KBO 구장의 경기 일정과 팀 정보를 한눈에 확인할 수 있습니다.',
            image: intro4Img,
        },
        {
            number: '04',
            title: '개인화 설정',
            description: '응원 팀을 설정하면 관련 정보를 우선 노출하고, 즐겨찾기 매장을 빠르게 접근할 수 있습니다.',
            image: intro2Img,
        },
    ],
    stats: {
        stat1: { value: '630+', label: '매장 데이터' },
        stat2: { value: '9개', label: 'KBO 구장' },
        stat3: { value: '73%', label: '로딩 시간 단축' }
    }
};