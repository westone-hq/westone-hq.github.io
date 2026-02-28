import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export const DetailHeader: React.FC<{ title: string; type: string; stage: string; deliverables: string[] }> = ({ title, type, stage, deliverables }) => (
    <header className="pt-32 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
        <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-[8vw] font-serif leading-[0.9] whitespace-pre-line"
        >
            {title}
        </motion.h1>
        <div className="grid grid-cols-2 gap-8 text-sm uppercase tracking-widest font-semibold text-gray-400">
            <div>
                <p className="mb-2 text-purple-400">Type</p>
                <p className="text-white">{type}</p>
            </div>
            <div>
                <p className="mb-2 text-purple-400">Stage</p>
                <p className="text-white">{stage}</p>
            </div>
            <div className="col-span-2">
                <p className="mb-2 text-purple-400">Deliverables</p>
                <div className="flex flex-wrap gap-x-4 text-white">
                    {deliverables.map(d => <span key={d}>{d}</span>)}
                </div>
            </div>
        </div>
    </header>
);

export const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: delay / 1000, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={className}
    >
        {children}
    </motion.div>
);

export const Marquee: React.FC<{ text: string }> = ({ text }) => (
    <div className="overflow-hidden whitespace-nowrap border-y border-white/10 py-8">
        <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="inline-block text-6xl md:text-9xl font-serif italic opacity-20"
        >
            {text.repeat(10)}
        </motion.div>
    </div>
);

export const DraggableImageCarousel: React.FC<{ items: any[]; containImages?: boolean }> = ({ items }) => (
    <div className="flex gap-8 px-6 md:px-12 overflow-x-auto no-scrollbar py-12">
        {items.map((item, i) => (
            <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="min-w-[300px] md:min-w-[500px] aspect-[4/5] bg-neutral-900 rounded-2xl overflow-hidden relative group"
            >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-8 left-8">
                    <p className="text-xs uppercase tracking-widest text-purple-400 mb-2">{item.category}</p>
                    <h4 className="text-2xl font-serif">{item.title}</h4>
                </div>
            </motion.div>
        ))}
    </div>
);
