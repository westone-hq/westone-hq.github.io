import React, { useEffect, useState } from 'react';

interface DetailHeaderProps {
    title: string;
    type: string;
    stage: string;
    deliverables: string;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({ title, type, stage, deliverables }) => {
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        // Trigger animation shortly after mount
        const timer = setTimeout(() => {
            setIsRevealed(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`
        grid transition-[grid-template-rows] duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]
        ${isRevealed ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
      `}
        >
            <div className="overflow-hidden bg-black text-white">
                <div
                    className={`
            px-6 md:px-12 pb-12 md:pb-24 pt-32 flex flex-col justify-end min-h-[50vh] md:min-h-[60vh]
            transition-all duration-1000 delay-300 transform
            ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
          `}
                >
                    {/* Main Title */}
                    <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[8rem] lg:text-[12rem] leading-[0.85] font-serif mb-12 md:mb-24 break-words">
                        {title}
                    </h1>

                    {/* Project Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 border-t border-white/20 pt-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-1 text-white/80">Project Type</h3>
                            <p className="text-white/60 font-light">{type}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-1 text-white/80">Stage</h3>
                            <p className="text-white/60 font-light">{stage}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-1 text-white/80">Deliverables</h3>
                            <p className="text-white/60 font-light">{deliverables}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
