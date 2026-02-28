export interface Project {
    id: string;
    name: string;
    type: string;
    image: string;
}

export interface ProjectDetailContent {
    hero: {
        title: string;
        type: string;
        stage: string;
        deliverables: string[];
    };
    heroContainImages?: boolean;
    intro: {
        text: string;
    };
    vision: {
        heading: string;
        text: string;
        image1Title: string;
        image1Subtitle: string;
        image3HoverText: string;
    };
    visionImageContain?: boolean;
    media: {
        hero: string | string[];
        visionToggle1?: string;
        visionToggle2?: string;
        visionGrid1: string;
        visionGrid2: string;
        auraBento: string;
        widgetImages?: string[];
        featureInit: string;
        featureResult: string;
    };
    marquee: string;
    aura: {
        subheading: string;
        heading: string;
        text: string;
        bigText: string;
        card2Text: string;
    };
    feature: {
        subheading: string;
        heading: string;
        text: string;
    };
    discovery: {
        heading: string;
        items: {
            image: string;
            title: string;
            category: string;
        }[];
    };
    stats: {
        stat1: { value: string; label: string };
        stat2: { value: string; label: string };
        stat3: { value: string; label: string };
    };
}
