import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const StickyImageItem: React.FC<{ img: string; index: number }> = ({ img, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 35 : -35, index % 2 === 0 ? -35 : 35]);
    const rotateY = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -20 : 20, index % 2 === 0 ? 20 : -20]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.1, 0.6]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{
                y,
                rotateX,
                rotateY,
                scale,
                opacity,
                perspective: 800,
                transformStyle: "preserve-3d"
            }}
            className="relative h-[500px] w-fit rounded-xl overflow-hidden group shadow-[0_45px_100px_-15px_rgba(0,0,0,0.6)] bg-neutral-900 border border-white/10"
        >
            <img
                src={img}
                className="h-full w-auto block transition-transform duration-1000 group-hover:scale-110"
                alt={`Visual ${index}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
};

export const StickyScrollSection: React.FC<{
    heading: string;
    text: string;
    images: string[];
    subheading?: string;
}> = ({ heading, text, images, subheading }) => {
    return (
        <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
                {/* Sticky Text Column */}
                <div className="md:col-span-5 sticky top-32 z-20">
                    <div className="space-y-6">
                        {subheading && (
                            <span className="block text-sm font-semibold uppercase tracking-wider text-purple-400">{subheading}</span>
                        )}
                        <h3 className="text-4xl md:text-6xl font-serif leading-tight whitespace-pre-line">{heading}</h3>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">{text}</p>

                        <div className="pt-12 hidden md:block">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                                <span className="text-sm uppercase tracking-widest font-semibold">Scroll to explore</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrolling Images Column */}
                <div className="md:col-span-7 space-y-8 md:space-y-12 flex flex-col items-center md:items-end">
                    {images.map((img, i) => (
                        <StickyImageItem key={i} img={img} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};
