
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
import { TESTIMONIALS, FAQS } from '../constants';
import { Assistant } from '../components/Assistant';
import { Navbar } from '../components/Navbar';
import { UserType, Country } from '../types';

// Access global GSAP objects from CDN
const getGsap = () => (window as any).gsap;
const getScrollSmoother = () => (window as any).ScrollSmoother;
const getScrollTrigger = () => (window as any).ScrollTrigger;

// Cast motion components to any to resolve type mismatches
const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;

interface HomePageProps {
  setCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const HomePage: React.FC<HomePageProps> = ({ selectedCountry, setCountry }) => {
  const navigate = useNavigate();
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
    // Detect mobile/tablet devices to prevent smooth scroll jitter
    // We check for touch capability or small screen width
    const isMobile = window.matchMedia("(max-width: 1024px)").matches || 
                     ('ontouchstart' in window) ||
                     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // Native scroll behavior for mobile - No Lenis or GSAP ScrollSmoother
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }

    // --- Desktop Only: Initialize Smooth Scroll ---
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

  // CSS for the Frosted Glass Effect
  const FROSTED_GLASS_CSS = `
    .frosted-glass-card {
      /* Strong Frosted glass effect */
      background: rgba(255, 255, 255, 0.70);
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.8);
      
      /* Subtle shadow for depth */
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
      
      /* Ensure text readability */
      color: #003049; /* brand-burgundy */
    }
  `;

  // Generic Reusable Segmented Card Component
  interface SegmentedCardProps {
    quote: string;
    author: string;
  }

  // Updated to have NO spacing and true frosted transparency
  const SegmentedCard: React.FC<SegmentedCardProps> = ({ quote, author }) => (
    <div className="flex flex-col items-start max-w-[85vw] md:max-w-[400px] text-left">
        <style>{FROSTED_GLASS_CSS}</style>
        
        {/* Unified container look, but split for content */}
        <div className="flex flex-col">
            {/* Box 1: Top (Quote) - No bottom margin, rounded top corners */}
            <div className="frosted-glass-card px-7 py-4 w-fit rounded-t-[28px] rounded-br-[28px] rounded-bl-none z-30">
                <p className="text-[17px] leading-[1.4] font-semibold text-brand-burgundy font-serif tracking-tight">
                    "{quote}"
                </p>
            </div>

            {/* Box 2: Middle (Stars) - No margins, connects perfectly */}
            <div className="frosted-glass-card px-7 py-1.5 w-fit rounded-r-[28px] rounded-l-none flex items-center z-20 -mt-[1px] border-t-0 border-b-0">
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#ffce31] stroke-[#d4a017] stroke-[1px]" />
                    ))}
                </div>
            </div>

            {/* Box 3: Bottom (Author) - No top margin, rounded bottom corners */}
            <div className="frosted-glass-card px-7 py-3 w-fit rounded-b-[28px] rounded-tr-[28px] rounded-tl-none z-10 -mt-[1px]">
                <span className="text-[12px] font-bold uppercase tracking-wider text-brand-terracotta">{author}</span>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-brand-burgundy selection:bg-brand-sage selection:text-white overflow-x-hidden relative">
      
      {/* --- AMBIENT BLOBS CONTAINER --- */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

      <Assistant />

      {/* SMOOTH WRAPPER */}
      <div id="smooth-wrapper">
        <div id="smooth-content">

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
                    className="w-full h-[450px] md:h-auto object-cover object-top md:object-center md:min-h-[500px] max-h-[700px] transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />

                  {/* CARD POSITION - INSIDE CORNER (Bottom Left) */}
                  <div className="absolute bottom-0 left-0 z-30 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                      <SegmentedCard 
                        quote="Since 1983, We’ve Nurtured Family Bonds." 
                        author="VERIFIED BY 10,000+ FAMILIES" 
                      />
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
                    className="bg-gradient-to-r from-brand-red-light to-brand-red text-white px-8 py-4 rounded-full font-bold hover:to-brand-red-dark transition-all shadow-xl shadow-brand-red/20 flex items-center justify-center gap-2 group text-lg animate-pulse-slow border border-white/20"
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
                  <div className="relative rounded-[2rem] overflow-hidden aspect-square">
                    <img 
                        src="https://github.com/theyashsisodiya/MingHwee_Detailed_Workflow/blob/main/nano-edit-17641512802620.png?raw=true"
                        alt="Caregiver helping elderly"
                        className="shadow-2xl object-cover h-full w-full transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    
                    {/* Absolute Positioned Card - Inside Bottom Left Corner */}
                    <div className="absolute bottom-0 left-0 z-20">
                        <SegmentedCard 
                          quote="After 3 failed agencies, MingHwee found someone my family trusts completely. She feels like family." 
                          author="— The Lim Family, Singapore" 
                        />
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
                  <div className="relative rounded-[2rem] overflow-hidden aspect-square">
                    <img 
                      src="https://github.com/theyashsisodiya/MingHwee_Detailed_Workflow/blob/main/nano-edit-17641513130171.png?raw=true"
                      alt="Professional domestic cleaning"
                      className="shadow-2xl object-cover h-full w-full transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    
                    {/* Absolute Positioned Card - Inside Bottom Left Corner */}
                    <div className="absolute bottom-0 left-0 z-20">
                      <SegmentedCard 
                          quote="MingHwee didn’t just find me a job they found me a family that respects me." 
                          author="— Siti Rahma, Helper since 2021" 
                      />
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
          <section id="stories" className="py-24 bg-brand-beige rounded-t-[3rem] overflow-hidden z-30 -mt-12 pb-32 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
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
