import type { Project, ProjectDetailContent } from '../../types';

import hero from '../../assets/freekiosk/hero.png';

import scrollview1 from '../../assets/freekiosk/scrollview-1.jpg';
import scrollview2 from '../../assets/freekiosk/scrollview-2.jpg';

import corepillars1 from '../../assets/freekiosk/corepillars-1.png';
import corepillars2 from '../../assets/freekiosk/corepillars-2.png';
import corepillars3 from '../../assets/freekiosk/corepillars-3.png';
import corepillars4 from '../../assets/freekiosk/corepillars-4.png';

import pointerview1 from '../../assets/freekiosk/pointerview-1.png';
import pointerview2 from '../../assets/freekiosk/pointerview-2.png';
import pointerview3 from '../../assets/freekiosk/pointerview-3.png';

import discovery1 from '../../assets/freekiosk/discovery-1.png';
import discovery2 from '../../assets/freekiosk/discovery-2.png';
import discovery3 from '../../assets/freekiosk/discovery-3.png';
import discovery4 from '../../assets/freekiosk/discovery-4.png';

export const freeKioskProject: Project = {
    id: 'westone-kiosk',
    name: 'FreeKiosk',
    client: '자체 프로젝트',
    description: '소상공인을 위한 무료 셀프 키오스크\n주방 디스플레이 · POS 통합 태블릿 앱',
    year: '2025',
    tags: ['Tablet App', 'Flutter', 'Firebase', 'POS'],
    image: hero,
    color: '#2563EB',
    bgImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2560&auto=format&fit=crop',
    foregroundImage: corepillars1,
    secondaryImage: corepillars2,
    showcaseImages: [hero, scrollview1, scrollview2],
    foregroundType: 'tablet',
    theme: 'dark',
    accentColor: '#2563EB',
    layoutConfig: {
        titleStyles: 'absolute top-[15%] left-[20%] text-left w-full',
        descriptionStyles: 'absolute bottom-[15%] right-[20%] text-right max-w-md',
        imageWrapperStyles: 'absolute top-[15%] right-[15%]',
        enterAnimation: 'fade-up',
    }
};

export const freeKioskDetails: ProjectDetailContent = {
    id: 'westone-kiosk',
    media: {
        hero: hero,
        visionGrid1: scrollview1,
        visionGrid2: scrollview2,
        auraBento: pointerview1,
        pointerImages: [pointerview1, pointerview2, pointerview3],
    },
    hero: {
        title: 'FreeKiosk',
        type: 'Tablet Kiosk Platform',
        stage: 'Launch',
        deliverables: 'Tablet App, KDS, POS, Admin Dashboard'
    },
    intro: {
        text: `소상공인을 위한
무료 셀프 주문 키오스크.
QR 스캔 한 번으로
주문부터 주방관리, 매출 분석까지
매장운영을 완성합니다.`
    },
    vision: {
        heading: '매장 운영,\n태블릿 하나로.',
        text: '고객은 테이블 QR 코드를 스캔해 메뉴를 탐색하고 바로 주문합니다. 주문은 실시간으로 주방 디스플레이에 표시되고, POS 화면에서 테이블별 결제를 처리합니다. 관리자 대시보드에서는 메뉴·카테고리·테이블 설정부터 매출 리포트까지 한곳에서 관리할 수 있습니다.',
    },
    marquee: 'Self-Order • Kitchen Display • POS • QR Code • Real-time • Revenue • ',
    aura: {
        subheading: '끊김 없는 매장 흐름',
        heading: '주문에서 결제까지,\n하나의 흐름.',
        text: '고객 QR 주문 → 주방 디스플레이 수신 → 조리 상태 업데이트 → POS 결제 처리. 모든 단계가 Firebase 실시간 동기화로 연결되어 별도 장비 없이 태블릿만으로 운영할 수 있습니다. 테이블 합석·이동, 부분 결제 등 실제 매장에서 필요한 기능을 모두 지원합니다.',
    },
    feature: {
        subheading: '실시간 주방 연동',
        heading: '주문 접수부터\n조리 완료까지.',
        text: '주문이 들어오면 주방 디스플레이에 즉시 표시되고, 조리 상태를 접수 → 조리 중 → 완료로 업데이트합니다. 새 주문 알림 사운드, 메뉴별 수량 집계, 주문 이력 조회까지 주방 운영에 필요한 모든 것을 제공합니다.'
    },
    discovery: {
        items: [
            { img: discovery1, title: '셀프 주문' },
            { img: discovery2, title: 'POS 결제' },
            { img: discovery3, title: '메뉴 관리' },
            { img: discovery4, title: '테이블 설정' }
        ]
    },
    corePillars: [
        {
            number: '01',
            title: '셀프 주문',
            description: '테이블 QR 코드 스캔 한 번으로 메뉴 탐색부터 주문·결제까지 고객이 직접 처리합니다.',
            image: corepillars1,
        },
        {
            number: '02',
            title: '주방 디스플레이',
            description: '주문이 들어오는 즉시 주방 화면에 표시됩니다. 접수·조리·완료 상태를 실시간으로 업데이트합니다.',
            image: corepillars2,
        },
        {
            number: '03',
            title: 'POS 결제',
            description: '테이블별 주문 내역 확인, 부분 결제, 합산 결제까지 매장 운영에 필요한 모든 결제 시나리오를 지원합니다.',
            image: corepillars3,
        },
        {
            number: '04',
            title: '메뉴 관리',
            description: '관리자 대시보드에서 메뉴·카테고리·테이블을 설정하고 매출 리포트를 한곳에서 확인합니다.',
            image: corepillars4,
        },
    ],
    stats: {
        stat1: { value: '4', label: '통합 모듈 (주문·주방·POS·관리)' },
        stat2: { value: '0원', label: '소상공인 이용 비용' },
        stat3: { value: 'Real-time', label: 'Firebase 실시간 동기화' }
    }
};
