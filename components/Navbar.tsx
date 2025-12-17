
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const MotionDiv = motion.div as any;

const CUSTOM_NAV_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100..1000&display=swap');

/* Main Navigation Bar Container - The "Liquid Glass" Body */
.glass-nav-container {
  --c-glass: #bbbbbc;
  --c-light: #fff;
  --c-dark: #000;
  
  --c-content: #224;
  --c-action: #0052f5;
  
  --glass-reflex-dark: 1;
  --glass-reflex-light: 1;
  
  --saturation: 150%;
  
  font-family: "DM Sans", sans-serif;
  
  display: flex;
  align-items: center;
  justify-content: space-between; /* Ensure spacing between logo, links, buttons */
  
  /* Fixed height/padding for the bar */
  padding: 8px 12px;
  border-radius: 99em;
  background-color: color-mix(in srgb, var(--c-glass) 12%, transparent);
  backdrop-filter: blur(12px) saturate(var(--saturation));
  -webkit-backdrop-filter: blur(12px) saturate(var(--saturation));
  
  /* Complex Glass Shadows */
  box-shadow: 
    inset 0 0 0 1px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 10%), transparent),
    inset 1.8px 3px 0px -2px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 90%), transparent), 
    inset -2px -2px 0px -2px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 80%), transparent), 
    inset -3px -8px 1px -6px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 60%), transparent), 
    inset -0.3px -1px 4px 0px color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 12%), transparent), 
    inset -1.5px 2.5px 0px -2px color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 20%), transparent), 
    inset 0px 3px 4px -2px color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 20%), transparent), 
    inset 2px -6.5px 1px -4px color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 10%), transparent), 
    0px 1px 5px 0px color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 10%), transparent), 
    0px 6px 16px 0px color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 8%), transparent);
    
  transition: 
    background-color 400ms cubic-bezier(1, 0.0, 0.4, 1),
    box-shadow 400ms cubic-bezier(1, 0.0, 0.4, 1);
}

/* Glass Card Style - Matching Navbar Transparency */
.glass-card {
  --c-glass: #bbbbbc;
  --c-light: #fff;
  --c-dark: #000;
  --glass-reflex-dark: 1;
  --glass-reflex-light: 1;
  --saturation: 150%;

  /* Adjusted for more transparency/frosted look as requested */
  background-color: rgba(255, 255, 255, 0.6); 
  backdrop-filter: blur(16px) saturate(var(--saturation));
  -webkit-backdrop-filter: blur(16px) saturate(var(--saturation));
  
  box-shadow: 
    inset 0 0 0 1px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 20%), transparent),
    inset 1.8px 3px 0px -2px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 50%), transparent), 
    0px 8px 20px 0px rgba(0,0,0,0.1);
    
  color: #1a1a1a;
}

/* Active Item Style - The "Pill" inside the glass */
.glass-nav-active-bg {
  border-radius: 99em;
  background-color: color-mix(in srgb, var(--c-glass) 36%, transparent);
  box-shadow: 
    inset 0 0 0 1px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 10%), transparent),
    inset 2px 1px 0px -1px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 90%), transparent), 
    inset -1.5px -1px 0px -1px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 80%), transparent), 
    inset -2px -6px 1px -5px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 60%), transparent), 
    inset -1px 2px 3px -1px color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 20%), transparent), 
    inset 0px -4px 1px -2px color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 10%), transparent), 
    0px 3px 6px 0px color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 8%), transparent);
}

.glass-nav-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  color: #3D405B;
  font-weight: 500;
  transition: color 160ms;
  border-radius: 99em;
  z-index: 1;
  font-size: 0.95rem;
  white-space: nowrap; /* Prevent breaking on overlap */
}

.glass-nav-item:hover {
  color: #E07A5F;
}

.glass-nav-item.active {
  color: #000;
  font-weight: 600;
}
`;

// --- Glassmorphism SVG Filter ---
const GlassFilter = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
    <filter id="displacementFilter">
        <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="2" result="turbulence" />
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
);

interface NavbarProps {
  activeSection?: string;
  onNavClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  hideCta?: boolean;
  extraActions?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = '', onNavClick, hideCta = false, extraActions }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (onNavClick) {
      onNavClick(e, href);
    } else {
        if (href === '#' || href === '/') {
            navigate('/');
            window.scrollTo(0,0);
        } else if (href.startsWith('#')) {
            navigate('/' + href);
        } else {
            navigate(href);
        }
    }
  };

  return (
    <>
      <style>{CUSTOM_NAV_CSS}</style>
      <GlassFilter />
      <nav className="fixed top-[15px] left-0 right-0 z-50 flex justify-center px-4">
        <div className="glass-nav-container w-full max-w-[1200px] gap-2 md:gap-8">
            {/* Logo */}
            <a href="#" className="flex-shrink-0 flex items-center pl-2" onClick={(e) => handleLinkClick(e, '#')}>
                <img src="https://ik.imagekit.io/ui4mpbzoy/removed-background.png?updatedAt=1764657414508" alt="MingHwee" className="h-8 md:h-10 w-auto object-contain" />
            </a>

            {/* Links */}
            <div className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map(link => {
                    const isActive = activeSection === link.href || (link.href === '#' && activeSection === '');
                    return (
                        <a key={link.label} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className={`glass-nav-item ${isActive ? 'active' : ''}`}>
                            {isActive && <MotionDiv layoutId="glass-nav-bg" className="glass-nav-active-bg absolute inset-0 z-[-1]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                            <span className="relative z-10 text-sm font-semibold">{link.label}</span>
                        </a>
                    )
                })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 pr-1">
                {!hideCta && (
                    <>
                    <button 
                        onClick={() => navigate('/contact')} 
                        className="hidden lg:flex relative items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-brand-burgundy transition-all duration-300 bg-white border border-gray-200 hover:bg-gray-50"
                    >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Request Consultation</span>
                    </button>
                    <button 
                        onClick={() => navigate('/login')} 
                        className="hidden md:block bg-brand-terracotta text-white px-6 py-2.5 rounded-full hover:bg-brand-coral transition-all transform hover:scale-105 shadow-md text-sm font-bold whitespace-nowrap"
                    >
                        Get Started Today
                    </button>
                    </>
                )}
                {extraActions}
                <button className="md:hidden p-2 text-gray-700 ml-1" onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl p-6 flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-200">
          <button className="absolute top-6 right-6 p-2 text-gray-500 hover:text-red-500" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          {NAV_LINKS.map(link => (
            <a 
                key={link.label} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-2xl font-serif text-brand-burgundy hover:text-brand-terracotta font-medium"
            >
              {link.label}
            </a>
          ))}
          {!hideCta && (
            <>
                <div className="w-16 h-1 bg-gray-100 rounded-full my-4"></div>
                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/contact'); }} className="text-xl font-bold text-brand-burgundy flex items-center gap-2">
                    <Phone className="w-5 h-5" /> Request Consultation
                </button>
                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }} className="bg-brand-terracotta text-white px-8 py-3 rounded-full text-lg shadow-xl">
                    Get Started Today
                </button>
            </>
          )}
        </div>
      )}
    </>
  );
};
