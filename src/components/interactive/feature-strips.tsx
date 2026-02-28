import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const InteractiveFeatureStrips: React.FC<{
    items: { title: string; description: string; image: string; number: string }[];
}> = ({ items }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full h-[600px] md:h-[800px] flex flex-col md:flex-row gap-2 overflow-hidden px-4 md:px-0">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{
                        flex: hoveredIndex === index ? 3 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="relative h-full min-h-[150px] md:min-h-0 overflow-hidden cursor-pointer group rounded-2xl md:rounded-none first:rounded-t-2xl md:first:rounded-none last:rounded-b-2xl md:last:rounded-none"
                >
                    {/* Background Image */}
                    <motion.div
                        animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                    </motion.div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-mono text-white/50 group-hover:text-white transition-colors">{item.number}</span>
                            <motion.div
                                animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ArrowUpRight className="w-5 h-5" />
                            </motion.div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-3xl md:text-5xl font-serif leading-none">{item.title}</h4>
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="text-white/70 text-sm md:text-base max-w-md leading-relaxed"
                                    >
                                        {item.description}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Decorative Border (Desktop only) */}
                    <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-white/10 group-hover:opacity-0 transition-opacity" />
                </motion.div>
            ))}
        </div>
    );
};
