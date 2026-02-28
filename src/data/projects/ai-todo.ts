import type { Project, ProjectDetailContent } from '../../types';
import listCheckImg from '../../assets/ai-todo/list-check.png';
import intro1Img from '../../assets/ai-todo/intro1.png';
import intro2Img from '../../assets/ai-todo/intro2.png';
import intro3Img from '../../assets/ai-todo/intro3.png';
import aiInsertCloseImg from '../../assets/ai-todo/ai-insert-close.png';
import setDirectInsertImg from '../../assets/ai-todo/set+direct-insert.png';
import mainDarkImg from '../../assets/ai-todo/main-dark.png';
import dateTimeSetImg from '../../assets/ai-todo/date-time-set.png';
import alertImg from '../../assets/ai-todo/alert.png';

export const AIToDoProject: Project = {
    id: 'ai-todo',
    name: 'AI ToDo',
    client: '자체 프로젝트',
    description: `AI 기반 자연어 입력을 지원하는
스마트 할일 관리 데스크톱 앱`,
    year: '2025',
    tags: ['Desktop App', 'AI/LLM', 'Electron'],
    image: mainDarkImg,
    color: '#FFFFFF',
    bgImage: 'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=2560&auto=format&fit=crop',
    foregroundImage: listCheckImg,
    foregroundType: 'desktop',
    theme: 'light',
    accentColor: '#6366F1',
    layoutConfig: {
        titleStyles: 'absolute top-[20%] left-[18%] text-left z-10',
        descriptionStyles: 'absolute bottom-[25%] left-[18%] text-left max-w-xs',
        imageWrapperStyles: 'absolute top-1/2 -translate-y-1/2 right-[10%] w-[400px] md:w-[480px]',
        enterAnimation: 'converge',
        aspectRatio: 'aspect-auto',
    }
};

export const AIToDoDetails: ProjectDetailContent = {
    id: 'ai-todo',

    media: {
        hero: [intro1Img, intro2Img, intro3Img],
        visionGrid1: setDirectInsertImg,
        visionGrid2: mainDarkImg,
        auraBento: dateTimeSetImg,
    },

    hero: {
        title: 'AI ToDo',
        type: 'AI Desktop App',
        stage: 'Launch',
        deliverables: 'Desktop App, AI Integration, UX Design'
    },

    intro: {
        text: '"내일 3시에 팀 미팅" 한 문장이면,\n할일을 자동으로 분류하고\n알림까지 설정해주는\nAI 기반 스마트 투두 앱.'
    },

    vision: {
        heading: 'Type naturally, organize automatically.',
        text: '복잡한 입력 폼 대신 자연스러운 한국어 문장 하나로 할일을 등록하세요. AI가 제목, 카테고리, 마감일, 알림 시간을 자동으로 추출하고 분류합니다. "30분 후 약 먹기", "다음 주 금요일까지 보고서 제출" 같은 상대적 시간 표현도 완벽하게 이해합니다.',
    },

    marquee: 'Natural Language • Auto Categorize • Smart Alerts • Dark Mode • Cross Platform • ',

    aura: {
        subheading: 'Intelligent Task Management',
        heading: 'From chaos to clarity.',
        text: 'Work, Study, Health, Schedule 등 6개 카테고리로 자동 분류되고, 우선순위와 예상 소요 시간까지 AI가 분석합니다. 시스템 트레이 상주와 글로벌 단축키(Ctrl+Shift+T)로 언제든 빠르게 접근할 수 있습니다.',
    },

    feature: {
        subheading: 'AI Integration',
        heading: '한국어 자연어 처리의 정교함',
        text: '"11시 반"을 "11:30"으로, "모레 오후"를 정확한 날짜로 변환합니다. 위치 기반 필터링("[장소]에서" 패턴), 학교 관련 단어의 맥락별 분류 등 한국어 특화 로직으로 높은 정확도를 제공합니다.'
    },

    discovery: {
        items: [
            { img: aiInsertCloseImg, title: "자연어 입력" },
            { img: intro1Img, title: "단축키 사용" },
            { img: alertImg, title: "스마트 알림" },
            { img: mainDarkImg, title: "다크 모드" }
        ]
    },

    corePillars: [
        {
            number: '01',
            title: '자연어 입력',
            description: '"내일 3시에 팀 미팅" 한 문장이면 제목·카테고리·마감일·알림을 AI가 자동으로 분석해 등록합니다.',
            image: aiInsertCloseImg,
        },
        {
            number: '02',
            title: '자동 분류',
            description: 'Work·Study·Health 등 6개 카테고리로 자동 분류하고 우선순위와 소요 시간까지 AI가 제안합니다.',
            image: mainDarkImg,
        },
        {
            number: '03',
            title: '스마트 알림',
            description: '"30분 후", "다음 주 금요일" 같은 상대적 시간 표현도 정확하게 파악해 알림을 설정합니다.',
            image: alertImg,
        },
        {
            number: '04',
            title: '빠른 접근',
            description: '시스템 트레이 상주와 글로벌 단축키(Ctrl+Shift+T)로 어느 앱을 쓰는 중에도 즉시 할일을 추가합니다.',
            image: setDirectInsertImg,
        },
    ],
    stats: {
        stat1: { value: '6', label: 'Auto Categories' },
        stat2: { value: '3', label: 'Platforms Supported' },
        stat3: { value: 'AI', label: 'AI Model' }
    }
};
