import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const InteractiveTypographicList: React.FC<{
    items: { img: string; title: string }[];
}> = ({ items }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const imageX = useSpring(mouseX, springConfig);
    const imageY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <div onMouseMove={handleMouseMove} className="relative">
            <div className="flex flex-col border-t border-white/10">
                {items.map((item, i) => (
                    <div
                        key={i}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="group relative border-b border-white/10 py-10 px-6 md:px-12 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors"
                    >
                        <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16">
                            <span className="text-xs font-mono text-gray-500 w-6 flex-shrink-0">0{i + 1}</span>
                            <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif group-hover:italic transition-all duration-500 leading-none">{item.title}</h4>
                        </div>
                        <ArrowUpRight className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
                    </div>
                ))}
            </div>

            {/* Floating Image Preview */}
            <AnimatePresence>
                {hoveredIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                            position: 'fixed',
                            left: imageX,
                            top: imageY,
                            x: '-50%',
                            y: '-50%',
                            pointerEvents: 'none',
                            zIndex: 100
                        }}
                        className="w-[300px] md:w-[450px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        <img
                            src={items[hoveredIndex].img}
                            className="w-full h-auto block"
                            alt="Preview"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
