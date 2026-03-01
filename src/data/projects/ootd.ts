import type { Project, ProjectDetailContent } from '../../types';

import heroImg from '../../assets/ootd/hero.png';
import mainHome from '../../assets/ootd/main_home.png';
import visionMain from '../../assets/ootd/vision-main.png';
import vision1 from '../../assets/ootd/vision-1.png';
import auraCard from '../../assets/ootd/aura-card.png';
import functionBefore from '../../assets/ootd/function-before.png';
import functionAfter from '../../assets/ootd/function-after.png';

export const ootdProject: Project = {
    id: 'ootd',
    name: 'OOTD',
    client: '캡스톤 디자인',
    description:
        '날씨 기반 추천 + AI 가상 피팅으로 옷장/쇼핑 사진을 "나에게 입혀보기"로 미리 확인하고 히스토리로 관리하는 모바일 앱',
    year: '2025',
    tags: ['AI', 'Mobile App', 'Flutter', 'Firebase', 'Virtual Try-On'],
    image: functionAfter,
    color: '#00C9A7',
    bgImage: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2560&auto=format&fit=crop',
    foregroundImage: mainHome,
    showcaseImages: [visionMain, mainHome, auraCard],
    foregroundType: 'mobile',
    theme: 'light',
    accentColor: '#00C9A7',
    layoutConfig: {
        titleStyles: 'absolute top-[15%] right-[20%] text-right w-full',
        descriptionStyles: 'absolute bottom-[15%] left-[20%] text-left max-w-md',
        imageWrapperStyles: 'absolute top-[45%] right-[15%] w-[500px] md:w-[650px]',
        enterAnimation: 'soft-drop',
    }
};

export const ootdDetails: ProjectDetailContent = {
    id: 'ootd',
    media: {
        hero: heroImg,
        visionGrid1: functionBefore,
        visionGrid2: functionAfter,
        auraBento: auraCard,
    },
    hero: {
        title: 'OOTD',
        type: 'AI Fashion Mobile Application',
        stage: 'Launch',
        deliverables: 'Mobile App, Firebase, AI Virtual Try-On, Weather UX'
    },
    intro: {
        text: `OOTD는 사용자의 옷 정보를 입력하면,
이를 기반으로 AI 가상 피팅을 생성하여
'내가 입었을 때' 이미지를 미리보는
개인 맞춤형 코디 보조 서비스 입니다.`
    },
    vision: {
        heading: '코디 고민,\n이제 간편하게.',
        text: '사용자는 내 옷장(카테고리/서브카테고리)에서 옷을 선택하거나, 쇼핑 중 마음에 드는 옷을 촬영/앨범에서 선택해 AI로 즉시 "나에게 입혀보기"를 실행할 수 있습니다. 추천 코디 카드타일로 빠르게 상·하의를 선택해 적용하고, 결과는 저장해 반복 활용하도록 설계했습니다.',
    },
    marquee: 'Weather • Wardrobe • Shopping • AI Try-On • History • Calendar • Flutter • Firebase • ',
    aura: {
        subheading: '매일의 코디 흐름',
        heading: '옷장에서 피팅, 히스토리까지.',
        text: '홈(날씨/추천) → 옷장/쇼핑에서 이미지 선택 → AI 합성 → 결과 저장 → 달력에서 과거 착장 확인/재적용까지 매일 쓰는 흐름을 끊김 없이 연결했습니다. 액세서리 착용 감지 부가기능도 확장 가능한 구조로 구성했습니다.',
    },
    feature: {
        subheading: 'AI 가상 피팅',
        heading: '옷 선택에서\n피팅까지.',
        text: '상의/하의 이미지를 입력으로 받아 AI 가상 피팅 결과를 생성하고, 결과를 홈 화면에서 바로 확인합니다. 생성된 착장은 히스토리에 저장되어 쇼핑/옷장 흐름별로 관리되고, 달력 UI로 날짜별 코디 기록을 직관적으로 조회할 수 있습니다.'
    },
    discovery: {
        items: [
            { img: visionMain, title: '내 옷장' },
            { img: functionBefore, title: '쇼핑 착용하기' },
            { img: vision1, title: '세트 설정' },
            { img: auraCard, title: '히스토리/달력' }
        ]
    },
    corePillars: [
        {
            number: '01',
            title: 'AI 가상 피팅',
            description: '상의·하의 이미지를 선택하면 AI가 나에게 입힌 합성 결과를 즉시 생성합니다.',
            image: functionAfter,
        },
        {
            number: '02',
            title: '내 옷장',
            description: '카테고리·서브카테고리로 옷을 체계적으로 관리하고 피팅 진입점으로 바로 활용합니다.',
            image: visionMain,
        },
        {
            number: '03',
            title: '날씨 추천',
            description: '오늘 날씨에 맞는 코디를 자동 추천해 매일 아침 고민 없이 옷을 선택할 수 있습니다.',
            image: mainHome,
        },
        {
            number: '04',
            title: '코디 히스토리',
            description: '생성한 피팅 결과를 날짜별 달력 UI로 저장·조회해 과거 착장을 쉽게 재활용합니다.',
            image: vision1,
        },
    ],
    stats: {
        stat1: { value: '2', label: '피팅 진입점 (옷장 / 쇼핑)' },
        stat2: { value: '4', label: '인증 방식 (이메일/구글/카카오/페이스북)' },
        stat3: { value: '4+', label: '핵심 기능 (날씨/추천/히스토리/옷장)' }
    }
};
