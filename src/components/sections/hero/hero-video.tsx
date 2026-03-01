import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from "@/context/cursor-context";

// 히어로 비디오 섹션 — 호버 시 영상 컨테이너가 85%→100% 확장, 커서 play 타입으로 변경
const HeroVideo = () => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { setCursorType } = useCursor();

    return (
        <section className="w-full py-24 md:py-32 bg-black text-white overflow-hidden flex flex-col items-center justify-center">

            {/* 타이틀 — 이미지 외부, 슬라이드인 애니메이션 */}
            <div className="w-full max-w-[90%] md:max-w-7xl px-4 md:px-12 mb-12 md:mb-16 z-10 relative">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="serif text-5xl md:text-7xl lg:text-8xl leading-[1.2] tracking-tight text-center md:text-left"
                >
                    <span className="hidden md:inline">기술과 디자인, 두 언어로</span>
                    <span className="md:hidden">기술과 디자인,<br />두 언어로</span>
                    <br />
                    <span className="text-gray-500 italic block mt-2 md:mt-0">
                        <span className="hidden md:inline">완성도 높은 제품을 만듭니다</span>
                        <span className="md:hidden">완성도 높은 제품을<br />만듭니다</span>
                    </span>
                </motion.h1>
            </div>

            {/* 비디오 컨테이너 — 호버 시 가로 확장, 커서 play로 전환 */}
            <motion.div
                className="relative z-0 overflow-hidden"
                animate={{
                    width: isHovered ? "100%" : "85%",
                    borderRadius: isHovered ? 0 : 12,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ aspectRatio: 16 / 9 }}
                onMouseEnter={() => {
                    setIsHovered(true);
                    setCursorType('play');
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setCursorType('default');
                }}
                data-hover="true"
            >
                <div className="w-full h-full relative bg-gray-900">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
                        autoPlay
                        loop
                        muted
                        playsInline
                        src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_25fps.mp4"
                        poster="https://picsum.photos/1920/1080?grayscale"
                    />
                    {/* 오버레이 — 호버 시 사라짐 */}
                    <motion.div
                        className="absolute inset-0 bg-black/20 pointer-events-none"
                        animate={{ opacity: isHovered ? 0 : 0.4 }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </motion.div>



        </section>
    );
};

export default HeroVideo;
