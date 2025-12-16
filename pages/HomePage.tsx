
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Star,
  ShieldCheck, Target, Zap, HeartHandshake,
  Home, Sparkles, Briefcase, TrendingUp, ChevronDown, MessageCircle, Bot, Phone,
  Check
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
    <div className="min-h-screen bg-brand-cream font-sans text-brand-burgundy selection:bg-brand-sage selection:text-white overflow-x-hidden relative">
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
            <span className="text-xl md:text-2xl font-serif font-bold text-brand-burgundy tracking-tight">MingHwee</span>
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
                className="bg-brand-terracotta text-white px-6 py-2.5 rounded-full hover:bg-brand-coral transition-all transform hover:scale-105 shadow-md text-sm font-bold whitespace-nowrap animate-pulse-slow"
            >
              Get Started Today
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
            Get Started Today
          </button>
        </div>
      )}

      <Assistant />

      {/* SMOOTH WRAPPER */}
      <div id="smooth-wrapper">
        <div id="smooth-content" className="will-change-transform">

          {/* HERO SECTION */}
          <header className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
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
                  
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-12 md:right-auto bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-xl md:rounded-2xl shadow-lg z-20 max-w-[calc(100%-2rem)] md:max-w-sm border border-white/50 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                      <p className="text-gray-700 italic mb-2 font-medium text-sm md:text-lg leading-snug">"Since 1983, We’ve Nurtured Family Bonds."</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" />)}
                        </div>
                        <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider ml-1 md:ml-2">VERIFIED BY 10,000+ FAMILIES</span>
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
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-brand-burgundy leading-tight">
                  Where Trust Meets Care. <br/>
                  <span className="text-brand-terracotta italic">Bringing Harmony Back to Your Home.</span>
                </h1>
                
                {/* 2. Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                  <button 
                    onClick={() => navigate('/login?type=employer')}
                    className="bg-brand-terracotta text-white px-8 py-4 rounded-full font-bold hover:bg-brand-coral transition-all shadow-xl shadow-brand-terracotta/30 flex items-center justify-center gap-2 group text-lg animate-pulse-slow"
                  >
                    FIND YOUR PERFECT MATCH TODAY <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => navigate('#stories')}
                    className="bg-transparent text-brand-burgundy border-2 border-brand-burgundy/20 px-8 py-4 rounded-full font-bold hover:bg-brand-burgundy hover:text-white transition-all flex items-center justify-center gap-2 text-lg"
                  >
                    Explore Helper Stories
                  </button>
                </div>

                {/* 3. Subtitle */}
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  Connecting families with <span className="font-bold text-brand-burgundy">personally vetted</span> domestic helpers through respect, safety, and heart.
                </p>
                
                {/* 4. Stats / Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mt-4">
                  <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white">
                    <ShieldCheck className="w-4 h-4 text-brand-sage" />
                    <span>Personally Vetted Since 1983</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white">
                    <Home className="w-4 h-4 text-brand-sage" />
                    <span>10,000+ Happy Families</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white">
                    <Star className="w-4 h-4 text-brand-sage" />
                    <span>#1 Trusted Platform in SG</span>
                  </div>
                </div>
                
              </MotionDiv>

            </div>
          </header>

          {/* Employers Section */}
          <section id="employers" className="py-24 bg-brand-beige rounded-t-[3rem] overflow-hidden z-10 relative pb-32 -mt-12 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)]">
            <div className="w-full max-w-[90%] 2xl:max-w-[1600px] mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-burgundy leading-tight">Your New Family Member Awaits Personally Chosen for Your Home</h2>
                  <p className="text-lg text-gray-600">
                    We don’t just <em>place</em> helpers — we welcome a <strong>new family member</strong> into your home. For <strong>40 years</strong>, our boutique matching process has united families with caring, dedicated helpers who become part of your daily life.
                  </p>

                  <div className="space-y-6">
                    {[
                      { title: "PERSONALLY VETTED BY OUR TEAM SINCE 1983", desc: "Every helper undergoes a 12‑step verification process background checks, reference calls, home visits & personality profiling. No algorithms. Just human care." },
                      { title: "BOUQUET MATCHING: WE KNOW YOUR FAMILY & THEIRS", desc: "We don’t use generic filters. Our consultants spend time understanding your family’s rhythm, values, and needs — then hand‑select helpers whose hearts align." },
                      { title: "HIRE WITH EASE, NOT HASSLE", desc: "We streamline the hiring process, ensuring a smooth journey from interview to placement. Your dedicated consultant will support you through every step, ensuring there are no confusing forms or unnecessary delays" },
                      { title: "LIFELONG CARE: 24/7 COUNSELING & LOYALTY BONUSES", desc: "Our relationship doesn’t end at handover. Access 24/7 support, quarterly check‑ins, conflict resolution, AND loyalty bonuses for helpers who stay 2+ years." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 group">
                        <div className="w-8 h-8 rounded-full bg-brand-sage/20 text-brand-sage flex items-center justify-center shrink-0 mt-1">
                          <Check className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-brand-burgundy group-hover:text-brand-terracotta transition-colors">{item.title}</h4>
                          <p className="text-gray-600 text-base mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                      <button 
                        onClick={() => navigate('/login?type=employer')}
                        className="bg-brand-terracotta text-white px-8 py-4 rounded-full font-bold hover:bg-brand-coral transition-all shadow-lg shadow-brand-terracotta/25 uppercase tracking-wide text-sm"
                      >
                        Find Your Family Match →
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
                      <p className="text-gray-600 italic mb-2 font-medium text-lg leading-snug">"After 3 failed agencies, MingHwee found someone my family trusts completely. She feels like family."</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs font-bold text-brand-burgundy uppercase">— The Lim Family, Singapore</span>
                        <div className="flex gap-1 text-brand-honey">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        </div>
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
                    className="relative z-10 rounded-[2rem] shadow-2xl object-cover h-[600px] w-full transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg z-20 max-w-xs border border-white/50">
                    <p className="text-gray-600 italic mb-2 text-lg leading-snug">"MingHwee didn’t just find me a job  they found me a family that respects me."</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xs font-bold text-brand-burgundy uppercase">— Siti Rahma, Helper since 2021</span>
                        <div className="flex gap-1 text-brand-honey">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-8">
                  {/* Updated Text Copy */}
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-burgundy leading-tight">Find a Family Who Values Your Care Not Just Your Work</h2>
                  <p className="text-lg text-gray-600">
                    You deserve respect, fairness, and a home where you’re truly appreciated. At MingHwee, we connect <strong>skilled, compassionate helpers</strong> with families committed to <strong>dignity, fair wages, and care</strong>.
                  </p>

                  <div className="space-y-6">
                    {[
                      { title: "VERIFIED EMPLOYERS", desc: "Every family is interviewed, vetted, and signed to our Fair Treatment Pledge guaranteeing respectful working conditions, clear contracts & timely payment." },
                      { title: "SHOWCASE YOUR JOURNEY", desc: "Build a professional profile highlighting your skills, personality, and aspirations. We help you shine!" },
                      { title: "FAIR OPPORTUNITIES & LOYALTY BONUSES", desc: "Transparent salaries (min. SGD $650+), clear expectations, AND a loyalty bonus when you reach 2 years with a family!" },
                      { title: "GROW YOUR CAREER", desc: "Free access to our Career Advancement Hub: Professional training (first‑aid, childcare, elderly care), language classes, and promotion pathways." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 group">
                        <div className="w-8 h-8 rounded-full bg-brand-sage/20 text-brand-sage flex items-center justify-center shrink-0 mt-1">
                          <Check className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-brand-burgundy group-hover:text-brand-terracotta transition-colors">{item.title}</h4>
                          <p className="text-gray-600 text-base mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <button 
                        onClick={() => navigate('/login?type=candidate')}
                        className="bg-brand-terracotta text-white px-8 py-4 rounded-full font-bold hover:bg-brand-coral transition-colors shadow-lg uppercase tracking-wide text-sm"
                    >
                        Upload Your Profile & Find Your Home →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stories Section */}
          <section id="stories" className="py-24 bg-brand-cream rounded-t-[3rem] overflow-hidden z-30 -mt-12 pb-32 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="w-full max-w-[90%] 2xl:max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-burgundy">Real Bonds, Real Stories</h2>
                <p className="text-lg text-gray-600 mt-2">See how MingHwee brings harmony to homes.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((story) => (
                  <MotionDiv 
                    key={story.id}
                    whileHover={{ y: -10 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-brand-beige flex flex-col items-center text-center relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-sage to-brand-honey"></div>
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-brand-cream shadow-md">
                      <img src={story.image} alt={story.author} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <p className="text-gray-600 italic mb-6 text-lg leading-relaxed">"{story.quote}"</p>
                    <div className="mt-auto">
                      <h4 className="font-bold text-brand-burgundy text-lg">{story.author}</h4>
                      <span className="text-xs text-brand-terracotta font-bold uppercase tracking-wide">{story.role}</span>
                    </div>
                  </MotionDiv>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <button className="text-brand-terracotta font-bold hover:text-brand-burgundy transition-colors text-sm uppercase tracking-wide border-b-2 border-transparent hover:border-brand-burgundy pb-1">
                    Read More Stories →
                </button>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-24 bg-white/90 backdrop-blur-sm rounded-t-[3rem] overflow-hidden z-40 -mt-12 pb-32 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="w-full max-w-[90%] 2xl:max-w-[1200px] mx-auto px-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-burgundy mb-12 text-center">Frequently Asked Questions</h2>
              
              <div className="grid md:grid-cols-1 gap-4 max-w-3xl mx-auto">
                {FAQS.map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  
                  return (
                    <MotionDiv 
                      key={i} 
                      className={`rounded-2xl p-6 transition-all cursor-pointer border ${
                        isOpen 
                          ? 'bg-brand-beige border-brand-sage/30 shadow-md' 
                          : 'bg-white border-gray-100 hover:bg-gray-50'
                      }`}
                      onClick={() => toggleFaq(i)}
                      layout
                    >
                      <div className="flex items-center justify-between font-semibold text-gray-800">
                        <span className={`text-lg ${isOpen ? 'text-brand-burgundy' : 'text-gray-700'}`}>{faq.question}</span>
                        <MotionSpan animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-brand-terracotta' : 'text-gray-400'}`} />
                        </MotionSpan>
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <MotionDiv
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="overflow-hidden text-gray-600 leading-relaxed text-base"
                          >
                            {faq.answer}
                          </MotionDiv>
                        )}
                      </AnimatePresence>
                    </MotionDiv>
                  );
                })}
              </div>
              
              <div className="mt-12 text-center">
                <button className="text-gray-500 hover:text-brand-burgundy transition-colors text-sm font-medium">
                    View Full FAQ →
                </button>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-24 bg-brand-burgundy text-white relative overflow-hidden rounded-t-[3rem] z-0 -mt-12 pb-48">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2CC8F_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="w-full max-w-[90%] 2xl:max-w-[1600px] mx-auto px-6 text-center relative z-10">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to Build a Relationship That Lasts?</h2>
              <p className="text-xl text-brand-cream/80 mb-10 max-w-2xl mx-auto">Join <strong>10,000+ families and helpers</strong> who found harmony, respect, and trust with MingHwee.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    onClick={() => navigate('/login')}
                    className="bg-brand-terracotta text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-coral transition-colors shadow-xl uppercase tracking-wide transform hover:scale-105"
                >
                  Get Started Today →
                </button>
                <button 
                    onClick={() => navigate('/contact')}
                    className="bg-transparent border-2 border-brand-cream/30 text-brand-cream px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-cream/10 transition-colors uppercase tracking-wide"
                >
                  Speak to a Consultant
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-[#2d3047] text-gray-400 py-16 rounded-t-[3rem] overflow-hidden z-10 -mt-24 relative shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.5)]">
            <div className="w-full max-w-[90%] 2xl:max-w-[1600px] mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-12 border-b border-gray-700 pb-12 mb-12">
                <div className="space-y-4">
                  <span className="font-serif text-3xl font-bold text-white block tracking-tight">MingHwee</span>
                  <p className="text-sm text-gray-400 italic leading-relaxed">Restoring dignity and trust to domestic work, one family bond at a time since 1983.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">For Employers</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Browse Helpers</a></li>
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Pricing</a></li>
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Safety Guide</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">For Helpers</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Find Jobs</a></li>
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Upload Profile</a></li>
                    <li><a href="#" className="hover:text-brand-terracotta transition-colors">Training Hub</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Contact</h4>
                  <ul className="space-y-2 text-sm">
                    <li>support@minghwee.com</li>
                    <li>+65 1234 5678</li>
                    <li>123 Orchard Road, Singapore</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; 2024 MingHwee. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0 mb-4 md:mb-0">
                  <a href="#" className="hover:text-white">Privacy Policy</a>
                  <a href="#" className="hover:text-white">Terms of Service</a>
                </div>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-700/50 text-xs font-bold uppercase tracking-widest text-gray-500">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-honey rounded-full"></div> 🏆 Est. 1983</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-honey rounded-full"></div> 🔒 100% Secure Process</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-honey rounded-full"></div> 📜 Fair Treatment Pledge Signed</span>
              </div>
            </div>
          </footer>

        </div>{/* End of smooth-content */}
      </div>{/* End of smooth-wrapper */}
    </div>
  );
};

export default HomePage;
