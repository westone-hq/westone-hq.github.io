import React from 'react';
import { Mail } from 'lucide-react';

interface NavbarProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    isScrolled: boolean;
    onOpenContact: () => void;
    onLogoClick: () => void;
}

// 상단 고정 네브바 — 스크롤 시 pill 형태로 축소, 메뉴/메일/로고 포함
export const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, toggleMenu, isScrolled, onOpenContact, onLogoClick }) => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 md:pt-8 pointer-events-none transition-all duration-500">
            <nav
                className={`
          pointer-events-auto flex items-center justify-between transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] border
          ${isScrolled
                        ? 'w-[92%] md:w-[640px] bg-[#1a1a1a]/80 backdrop-blur-2xl rounded-full px-3 py-2 border-white/10 shadow-2xl translate-y-2'
                        : 'w-full px-6 md:px-10 bg-transparent border-transparent translate-y-0'
                    }
        `}
            >
                {/* 좌측: 메뉴 토글 버튼 */}
                <div className="relative z-10 flex items-center">
                    <button
                        onClick={toggleMenu}
                        className={`
                    transition-all duration-500 ease-out px-5 py-2 rounded-full text-sm font-medium tracking-wide
                    ${isScrolled
                                ? 'bg-transparent text-white/90 hover:text-white'
                                : isMenuOpen
                                    ? 'bg-black/10 backdrop-blur-md hover:bg-black/20 text-black'
                                    : 'bg-white/20 backdrop-blur-md hover:bg-white/30 text-white'
                            }
                `}
                    >
                        {isMenuOpen ? 'Close' : 'Menu'}
                    </button>
                </div>

                {/* 중앙: 로고 (절대 위치로 가운데 고정) */}
                <button
                    onClick={onLogoClick}
                    className={`
            absolute left-1/2 transform -translate-x-1/2 font-semibold text-xl tracking-tight transition-all duration-500 cursor-pointer border-none bg-transparent
            ${isScrolled
                            ? 'text-white'
                            : isMenuOpen
                                ? 'text-black'
                                : 'text-white mix-blend-difference'
                        }
          `}
                >
                    Westone
                </button>

                {/* 우측: 메일 아이콘 + 호버 시 텍스트 슬라이드 */}
                <div className="flex items-center space-x-4 md:space-x-6 z-10 pr-2">
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={onOpenContact}
                            className={`p-2 rounded-full transition-all duration-300 ${isMenuOpen ? 'hover:bg-black/10 text-black' : 'hover:bg-white/10 text-white'} flex items-center group overflow-hidden`}
                        >
                            <span className={`max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap text-sm font-medium ${isMenuOpen ? 'text-black' : 'text-white'} mr-0 group-hover:mr-2`}>
                                Get In Touch
                            </span>
                            <Mail size={18} className={`${isMenuOpen ? 'text-black' : 'text-white'} shrink-0`} />
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};
