
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, CheckCircle, Star,
  ShieldCheck, Target, Zap, HeartHandshake,
  Home, Sparkles, Briefcase, TrendingUp, ChevronDown, MessageCircle, Bot, Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { NAV_LINKS, TESTIMONIALS, FAQS } from '../constants';
import { Assistant } from '../components/Assistant';
import { UserType, Country } from '../types';

// Access global GSAP objects from CDN
const getGsap = () => (window as any).gsap;
const getScrollSmoother = () => (window as any).ScrollSmoother;
const getScrollTrigger = () => (window as any).ScrollTrigger;

// Cast motion components to any to resolve type mismatches
const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;

// --- Custom CSS for Glass Nav Switcher ---
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
  color: #224;
  font-weight: 500;
  transition: color 160ms;
  border-radius: 99em;
  z-index: 1;
  font-size: 0.95rem;
  white-space: nowrap; /* Prevent breaking on overlap */
}

.glass-nav-item:hover {
  color: #0052f5;
}

.glass-nav-item.active {
  color: #000;
  font-weight: 600;
}
`;

// --- Custom Typewriter Component ---
const TypewriterTitle = () => {
  const [stage, setStage] = useState(0); // 0: First part, 1: Highlight, 2: Last part
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  
  const part1 = "Where Trust Meets ";
  const highlight = "Care";
  const part2 = " in Domestic Work.";

  useEffect(() => {
    // Type Part 1
    if (stage === 0) {
      if (text1.length < part1.length) {
        const timeout = setTimeout(() => {
          setText1(part1.slice(0, text1.length + 1));
        }, 50); // Speed
        return () => clearTimeout(timeout);
      } else {
        // Finished Part 1, move to highlight
        const timeout = setTimeout(() => setStage(1), 200);
        return () => clearTimeout(timeout);
      }
    }
    
    // Highlight Reveal (Handled by render opacity/scale), move to Part 2
    if (stage === 1) {
      const timeout = setTimeout(() => setStage(2), 600); // Wait for highlight animation
      return () => clearTimeout(timeout);
    }

    // Type Part 2
    if (stage === 2) {
      if (text2.length < part2.length) {
        const timeout = setTimeout(() => {
          setText2(part2.slice(0, text2.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      }
    }
  }, [stage, text1, text2]);

  return (
    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-brand-burgundy leading-tight min-h-[1.2em]">
      {text1}
      <span 
        className={`text-brand-terracotta italic inline-block transition-all duration-500 transform ${
          stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 w-0'
        }`}
      >
        {highlight}
      </span>
      {text2}
      <span className="w-[3px] h-[1em] bg-brand-terracotta inline-block ml-1 align-middle animate-blink-cursor"></span>
    </h1>
  );
};

// --- Glassmorphism SVG Filter ---
const GlassFilter = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
    <filter id="displacementFilter">
        <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="2" result="turbulence" />
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
);

interface HomePageProps {
  setCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const HomePage: React.FC<HomePageProps> = ({ selectedCountry, setCountry }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Navigation State for Glass Effect
  const [activeSection, setActiveSection] = useState('');
  
  const { scrollY } = useScroll();
  
  // Refs to hold scroll instances for click handlers
  const lenisRef = useRef<Lenis | null>(null);
  const smootherRef = useRef<any>(null);
  
  // Scroll Spy Effect
  useEffect(() => {
    const handleScrollSpy = () => {
      // Default to nothing if at very top
      if (window.scrollY < 100) {
          setActiveSection('');
          return;
      }

      const sections = document.querySelectorAll('section[id]');
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;
        // Adjusted offset for better trigger point
        if (window.scrollY >= (sectionTop - 300)) {
          currentSection = '#' + section.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);
  
  useEffect(() => {
    const gsap = getGsap();
    const ScrollSmoother = getScrollSmoother();
    const ScrollTrigger = getScrollTrigger();
    
    let rafId: number;

    if (gsap && ScrollSmoother && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      
      try {
        smootherRef.current = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            effects: true,
        });
      } catch (e) {
        // Fallback to Lenis if GSAP fails
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        const raf = (time: number) => {
            lenisRef.current?.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      }
    } else {
      // Fallback to Lenis
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenisRef.current?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisRef.current) lenisRef.current.destroy();
      window.removeEventListener('scroll', handleScroll);
      
      try {
        if (smootherRef.current) smootherRef.current.kill(); 
        const st = getScrollTrigger();
        if(st) {
            const allTriggers = st.getAll();
            if (Array.isArray(allTriggers)) allTriggers.forEach((t: any) => t.kill());
        }
      } catch (error) {
        console.warn("Error cleaning up GSAP instance:", error);
      }
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Smooth Scroll Handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveSection(href); // Immediate feedback

    // 1. Handle "Home" or top of page
    if (href === '#' || href === '/') {
        if (lenisRef.current) lenisRef.current.scrollTo(0);
        else if (smootherRef.current) smootherRef.current.scrollTo(0, true);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    // 2. Handle Section Anchors (e.g. #employers)
    if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
            const navHeight = 80; // Approx navbar height for offset
            
            if (lenisRef.current) {
                lenisRef.current.scrollTo(href, { offset: -navHeight });
            } else if (smootherRef.current) {
                smootherRef.current.scrollTo(target, true, "power2.out");
            } else {
                // Native fallback
                const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - navHeight,
                    behavior: 'smooth'
                });
            }
        }
    } else {
        // 3. Handle External Routes
        navigate(href);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-gray-800 selection:bg-brand-purple selection:text-white overflow-x-hidden relative">
      <style>{CUSTOM_NAV_CSS}</style>
      <GlassFilter />
      
      {/* --- AMBIENT BLOBS CONTAINER --- */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* 
        UPDATED NAVBAR - FULL GLASS BAR 
      */}
      <nav className="fixed top-[15px] left-0 right-0 z-50 flex justify-center px-4">
        {/* The glass container now wraps the ENTIRE nav content */}
        <div className="glass-nav-container w-full max-w-[1200px] gap-2 md:gap-8">
          
          {/* Logo - Left */}
          <a href="#" className="flex-shrink-0 flex items-center pl-2" onClick={(e) => handleNavClick(e, '#')}>
            <img 
              src="https://ik.imagekit.io/ui4mpbzoy/removed-background.png?updatedAt=1764657414508" 
              alt="MingHwee Logo" 
              className="h-8 md:h-10 w-auto object-contain" 
            />
          </a>

          {/* 
            Center Navigation Links - Hidden on Mobile 
          */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href;
              
              return (
                <a 
                  key={link.label} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`glass-nav-item ${isActive ? 'active' : ''}`}
                >
                  {(isActive) && (
                    <MotionDiv
                      layoutId="glass-nav-bg"
                      className="glass-nav-active-bg absolute inset-0 z-[-1]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 text-sm font-semibold">
                      {link.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 pr-1">
            {/* Desktop Button: Request Consultation */}
            <button 
                onClick={() => navigate('/contact')}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-brand-burgundy transition-all duration-300 hover:bg-white/40 border border-transparent hover:border-white/50"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Request Consultation</span>
            </button>

            {/* Main CTA */}
            <button 
                onClick={() => navigate('/login')}
                className="bg-brand-terracotta text-white px-5 py-2.5 rounded-full hover:bg-brand-coral transition-all transform hover:scale-105 shadow-md text-sm font-bold whitespace-nowrap"
            >
              Get Started
            </button>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-gray-700 ml-1" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl p-6 flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-200">
          <button className="absolute top-6 right-6 p-2 text-gray-500 hover:text-red-500" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          {NAV_LINKS.map(link => (
            <a 
                key={link.label} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-serif text-brand-burgundy hover:text-brand-terracotta font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="w-16 h-1 bg-gray-100 rounded-full my-4"></div>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); navigate('/contact'); }}
            className="text-xl font-bold text-brand-burgundy flex items-center gap-2"
          >
            <Phone className="w-5 h-5" /> Request Consultation
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }}
            className="bg-brand-terracotta text-white px-8 py-3 rounded-full text-lg shadow-xl"
          >
            Get Started
          </button>
        </div>
      )}

      <Assistant />

      {/* SMOOTH WRAPPER */}
      <div id="smooth-wrapper">
        <div id="smooth-content" className="will-change-transform">

          {/* HERO SECTION */}
          <header className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            {/* Container Update: Wider Layout */}
            <div className="w-full max-w-[90%] 2xl:max-w-[1600px] mx-auto px-6 flex flex-col items-center text-center">
              
              {/* Image Above Text */}
              <MotionDiv 
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-6xl mx-auto will-change-transform z-0 mb-12 group"
              >
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white/60">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none" />
                  
                  {/* Hover Effect added to Image */}
                  <img 
                    src="https://ik.imagekit.io/ui4mpbzoy/f615f450-e572-4d98-a385-1db1213e3b4e-1764685317.jpg?updatedAt=1764685521004"
                    alt="Happy family and helper in a trusting environment" 
                    className="w-full h-auto object-cover md:min-h-[500px] max-h-[700px] transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  
                  <div className="absolute bottom-8 left-8 right-8 md:right-auto md:left-12 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-lg z-20 max-w-sm border border-white/50 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                      <p className="text-gray-700 italic mb-2 font-medium text-lg leading-snug">"Bringing harmony back to our home."</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-2">Verified Review</span>
                      </div>
                  </div>
                </div>
              </MotionDiv>

              {/* Text Content */}
              <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-4xl space-y-6 flex flex-col items-center z-10"
              >
                {/* 1. Title */}
                <TypewriterTitle />
                
                {/* 2. Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button 
                    onClick={() => navigate('/login?type=employer')}
                    className="bg-brand-terracotta text-white px-8 py-4 rounded-full font-bold hover:bg-brand-coral transition-all shadow-xl shadow-brand-terracotta/30 flex items-center justify-center gap-2 group text-lg"
                  >
                    Find a Helper <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => navigate('/login?type=candidate')}
                    className="bg-white text-brand-terracotta border-2 border-brand-terracotta/20 px-8 py-4 rounded-full font-bold hover:bg-brand-beige transition-all flex items-center justify-center gap-2 text-lg hover:border-brand-terracotta/40"
                  >
                    Find a Job
                  </button>
                </div>

                {/* 3. Subtitle */}
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  Connecting families with verified helpers through respect, safety, and heart. We believe every home deserves peace of mind.
                </p>
                
                {/* 4. Stats */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-base font-semibold text-gray-500">
                  <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    <ShieldCheck className="w-5 h-5 text-brand-terracotta" />
                    <span>100% Verified Helpers</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Home className="w-5 h-5 text-brand-terracotta" />
                    <span>10,000+ Happy Families</span>
                  </div>
                </div>

                {/* 5. Tagline */}
                <span className="inline-block px-4 py-1.5 bg-brand-terracotta/10 text-brand-terracotta rounded-full text-sm font-bold tracking-wide border border-brand-terracotta/20">
                  #1 TRUSTED PLATFORM {selectedCountry ? `IN ${selectedCountry.toUpperCase()}` : ''}
                </span>
                
              </MotionDiv>

            </div>
          </header>

          {/* Employers Section */}
          <section id="employers" className="py-24 bg-brand-beige rounded-t-[3rem] overflow-hidden z-10 relative pb-32 -mt-12 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)]">
            <div className="w-full max-w-[90%] 2xl:max-w-[1600px] mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-burgundy">Your New Family Member Awaits</h2>
                  <p className="text-lg text-gray-600">
                    We connect you with caring, verified domestic helpers who become part of your family. Hire with peace of mind.
                  </p>

                  <div className="space-y-8">
                    {[
                      { Icon: ShieldCheck, title: "Verified & Trusted Helpers", desc: "Pre-screened professionals committed to quality care." },
                      { Icon: Target, title: "Requirement-Based Matching", desc: "Candidates are shortlisted using your specific household details and job expectations." },
                      { Icon: Zap, title: "Supported Hiring Experience", desc: "Clear steps, timely updates, and assistance throughout the process." },
                      { Icon: HeartHandshake, title: "Ongoing Support", desc: "We're here to ensure a smooth, successful placement." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 group">
                        <div className="w-14 h-14 bg-white text-brand-terracotta rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                          <item.Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 group-hover:text-brand-terracotta transition-colors">{item.title}</h4>
                          <p className="text-gray-600 text-lg mt-2 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => navigate('/login?type=employer')}
                        className="bg-brand-terracotta text-white px-8 py-4 rounded-full font-bold hover:bg-brand-coral transition-all shadow-lg shadow-brand-terracotta/25"
                      >
                        Find a Helper
                      </button>
                  </div>
                </div>

                <div className="flex-1 relative will-change-transform group">
                  <img 
                      src="https://github.com/theyashsisodiya/MingHwee_Detailed_Workflow/blob/main/nano-edit-17641512802620.png?raw=true"
                      alt="Caregiver helping elderly"
                      className="rounded-[2rem] shadow-2xl object-cover h-[600px] w-full relative z-10 transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg z-20 max-w-xs border border-white/50">
                      <p className="text-gray-600 italic mb-2 font-medium text-lg">"I found someone my family trusts completely."</p>
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Helpers Section */}
          <section id="helpers" className="py-24 bg-white/90 backdrop-blur-sm relative overflow-hidden rounded-t-[3rem] z-20 -mt-12 pb-32 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="w-full max-w-[90%] 2xl:max-w-[1600px] mx-auto px-6">
              <div className="flex flex-col-reverse md:flex-row items-center gap-16">
                <div className="flex-1 relative will-change-transform group">
                  <img 
                    src="https://github.com/theyashsisodiya/MingHwee_Detailed_Workflow/blob/main/nano-edit-17641513130171.png?raw=true"
                    alt="Professional domestic cleaning"
                    className="relative z-10 rounded-[2rem] shadow-2xl object-cover h-[500px] w-full transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg z-20 max-w-xs">
                    <p className="text-gray-600 italic mb-2 text-lg">"I found a family that respects me."</p>
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-8">
                  {/* Updated Text Copy */}
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-burgundy">Find a Family Who Values Your Care</h2>
                  <p className="text-lg text-gray-600">
                    We connect you with families who value your skills and dedication. Build your career with dignity.
                  </p>

                  <div className="space-y-8">
                    {[
                      { Icon: Home, title: "Verified Employers", desc: "Work with families committed to fair treatment." },
                      { Icon: Sparkles, title: "Showcase Your Skills", desc: "Professional profiles that highlight your experience." },
                      { Icon: Briefcase, title: "Fair Opportunities", desc: "Transparent salaries and clear expectations." },
                      { Icon: TrendingUp, title: "Career Growth", desc: "Access training resources and career support." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 group">
                        <div className="w-14 h-14 bg-brand-cream text-brand-burgundy rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                          <item.Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 group-hover:text-brand-terracotta transition-colors">{item.title}</h4>
                          <p className="text-gray-600 text-lg mt-2 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => navigate('/login?type=candidate')}
                    className="bg-brand-honey text-white px-8 py-4 rounded-full font-bold hover:bg-brand-terracotta transition-colors shadow-lg"
                  >
                    Get a Job
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Stories Section */}
          <section id="stories" className="py-24 bg-brand-cream rounded-t-[3rem] overflow-hidden z-30 -mt-12 pb-32 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="w-full max-w-[90%] 2xl:max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-burgundy">Stories of Trust</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((story) => (
                  <MotionDiv 
                    key={story.id}
                    whileHover={{ y: -10 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-brand-beige flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-brand-cream">
                      <img src={story.image} alt={story.author} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-600 italic mb-6 text-lg">"{story.quote}"</p>
                    <div>
                      <h4 className="font-bold text-brand-burgundy">{story.author}</h4>
                      <span className="text-sm text-brand-terracotta font-medium uppercase tracking-wide">{story.role}</span>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section with Messenger Style Animation */}
          <section id="faq" className="py-24 bg-white/90 backdrop-blur-sm rounded-t-[3rem] overflow-hidden z-40 -mt-12 pb-32 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="w-full max-w-[90%] 2xl:max-w-[1600px] mx-auto px-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-burgundy mb-12 text-center">Frequently Asked Questions</h2>
              
              {/* FAQ Grid: 2 Columns */}
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
                {FAQS.map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  
                  return (
                    <MotionDiv 
                      key={i} 
                      className={`rounded-2xl p-6 transition-all cursor-pointer border ${
                        isOpen 
                          ? 'bg-blue-50/50 border-blue-100 shadow-md scale-[1.01]' 
                          : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200'
                      }`}
                      onClick={() => toggleFaq(i)}
                      layout
                    >
                      {/* Question Header */}
                      <div className="flex items-center justify-between font-semibold text-gray-800">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 border border-gray-200'}`}>
                            <MessageCircle className="w-5 h-5" />
                          </div>
                          <span className={`text-lg transition-colors ${isOpen ? 'text-blue-700' : 'text-gray-700'}`}>{faq.question}</span>
                        </div>
                        <MotionSpan
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-blue-600' : 'text-gray-400'}`} />
                        </MotionSpan>
                      </div>

                      {/* Chat Bubble Answer Animation */}
                      <AnimatePresence>
                        {isOpen && (
                          <MotionDiv
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-6 flex gap-4 pl-2 items-start">
                              {/* Bot Avatar */}
                              <MotionDiv 
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                                className="w-8 h-8 rounded-full bg-brand-terracotta text-white flex items-center justify-center shrink-0 mt-1 shadow-sm border border-white"
                              >
                                <Bot className="w-5 h-5" />
                              </MotionDiv>

                              {/* Message Bubble */}
                              <MotionDiv 
                                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                                className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-gray-600 leading-relaxed text-base relative"
                              >
                                {faq.answer}
                                {/* Tiny tail for the bubble */}
                                <div className="absolute top-0 -left-[8px] w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent transform rotate-0 drop-shadow-sm" style={{ filter: 'drop-shadow(-1px 1px 1px rgba(0,0,0,0.05))' }} />
                              </MotionDiv>
                            </div>
                          </MotionDiv>
                        )}
                      </AnimatePresence>
                    </MotionDiv>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-24 bg-brand-terracotta text-white relative overflow-hidden rounded-t-[3rem] z-0 -mt-12 pb-48">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="w-full max-w-[90%] 2xl:max-w-[1600px] mx-auto px-6 text-center relative z-10">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to find your match?</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Join thousands of families and helpers building better lives together.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    onClick={() => navigate('/login')}
                    className="bg-white text-brand-terracotta px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
                >
                  Get Started Today
                </button>
                <button 
                    onClick={() => navigate('/contact')}
                    className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300 py-16 rounded-t-[3rem] overflow-hidden z-10 -mt-24 relative shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.5)]">
            <div className="w-full max-w-[90%] 2xl:max-w-[1600px] mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-12 border-b border-gray-800 pb-12 mb-12">
                <div className="space-y-4">
                  <span className="font-serif text-2xl font-bold text-white block">MingHwee</span>
                  <p className="text-sm text-gray-400">Restoring dignity and trust to domestic work, one connection at a time.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">For Employers</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Browse Helpers</a></li>
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Pricing</a></li>
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Safety Guide</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">For Helpers</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Find Jobs</a></li>
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Upload Profile</a></li>
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Training</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">Contact</h4>
                  <ul className="space-y-2 text-sm">
                    <li>support@minghwee.com</li>
                    <li>+65 1234 5678</li>
                    <li>123 Orchard Road, Singapore</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; 2024 MingHwee. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white">Privacy</a>
                  <a href="#" className="hover:text-white">Terms</a>
                </div>
              </div>
            </div>
          </footer>

        </div>{/* End of smooth-content */}
      </div>{/* End of smooth-wrapper */}
    </div>
  );
};

export default HomePage;
