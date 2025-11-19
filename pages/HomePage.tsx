
import React, { useState } from 'react';
import { Page, Country, UserType } from '../types';

interface HeaderProps {
  navigateTo: (page: Page, options?: { userType?: UserType }) => void;
  setCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

// --- UI Components ---
const AccordionItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-800">{title}</span>
        <svg
          className={`w-5 h-5 text-purple-600 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 leading-relaxed">{children}</p>
      </div>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ navigateTo, setCountry, selectedCountry }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCountrySelect = (e: React.MouseEvent<HTMLAnchorElement>, country: Country) => {
    e.preventDefault();
    setCountry(country);
    setIsDropdownOpen(false);
  };

  // Common styles for nav links
  const linkBaseClass = "text-lg font-semibold px-5 py-2.5 rounded-xl transition-all duration-200";
  const activeLinkClass = "bg-purple-100 text-purple-700 shadow-sm";
  const inactiveLinkClass = "text-gray-600 hover:bg-purple-50 hover:text-purple-600";

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100 shadow-sm">
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo(Page.Home)}>
           <div className="bg-purple-600 text-white p-2 rounded-xl shadow-lg shadow-purple-600/20 group-hover:scale-105 transition-transform">
               {/* Logo Icon */}
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.28-1.25-.743-1.659M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.28-1.25.743-1.659M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79-4-4-1.79-4-4-4z" /></svg>
           </div>
           <span className="text-2xl font-bold text-gray-900 tracking-tight">MingHwee</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.Home); }} className={`${linkBaseClass} ${activeLinkClass}`}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.About); }} className={`${linkBaseClass} ${inactiveLinkClass}`}>About Us</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.Pricing); }} className={`${linkBaseClass} ${inactiveLinkClass}`}>Pricing</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.Contact); }} className={`${linkBaseClass} ${inactiveLinkClass}`}>Contact</a>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full hover:bg-purple-50 hover:border-purple-200 transition-all duration-300 text-sm font-semibold text-gray-700 shadow-sm"
            >
              <span>{selectedCountry || 'Select Country'}</span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn overflow-hidden">
                <a href="#" onClick={(e) => handleCountrySelect(e, Country.Singapore)} className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">Singapore</a>
                <a href="#" onClick={(e) => handleCountrySelect(e, Country.Philippines)} className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">Philippines</a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

const HeroSection: React.FC<{ navigateTo: (page: Page, options?: { userType?: UserType }) => void }> = ({ navigateTo }) => (
    <section className="relative bg-gradient-to-b from-purple-100 via-pink-50 to-white overflow-hidden pb-20 pt-10 lg:pt-20">
        {/* Decorative curve */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
             <div className="absolute -top-[40%] -right-[10%] w-[80rem] h-[80rem] bg-purple-200/30 rounded-full blur-3xl"></div>
             <div className="absolute top-[20%] -left-[10%] w-[60rem] h-[60rem] bg-pink-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 text-center lg:text-left z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-wider text-purple-700 uppercase bg-white rounded-full shadow-sm border border-purple-100">
                         <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
                         Verified Employment Platform
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.15]">
                        Connecting Talent with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Opportunity</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Your trusted partner in finding verified, safe blue-collar jobs across Singapore and the Philippines. Fair, transparent, and ethical.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button 
                            onClick={() => navigateTo(Page.Login, { userType: UserType.Employer })}
                            className="px-8 py-4 bg-purple-700 text-white font-bold text-sm tracking-wide uppercase rounded-full shadow-xl shadow-purple-900/20 hover:bg-purple-800 hover:shadow-purple-900/30 hover:-translate-y-1 transition-all duration-300"
                        >
                            I'm an Employer
                        </button>
                        <button 
                            onClick={() => navigateTo(Page.Login, { userType: UserType.Candidate })}
                            className="px-8 py-4 bg-pink-500 text-white font-bold text-sm tracking-wide uppercase rounded-full shadow-xl shadow-pink-600/20 hover:bg-pink-600 hover:shadow-pink-600/30 hover:-translate-y-1 transition-all duration-300"
                        >
                            I'm a Helper
                        </button>
                    </div>
                    <p className="mt-6 text-purple-800 font-medium">
                        Better connections make better <span className="text-pink-600 font-bold">homes</span>
                    </p>
                </div>
                
                <div className="lg:w-1/2 relative">
                    <div className="relative mx-auto w-full max-w-2xl lg:max-w-4xl">
                         {/* Main Image */}
                         <img 
                            src="https://github.com/theyashsisodiya/Minghwee_Job_Portal/blob/main/nano-edit-1763546262410.png?raw=true" 
                            alt="Family and Helper" 
                            className="w-full h-auto object-contain mix-blend-multiply scale-125 brightness-110 contrast-105"
                        />
                         {/* Floating Badge */}
                         <div className="absolute bottom-12 left-0 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 animate-bounce-slow hidden md:block">
                             <div className="flex items-center gap-3">
                                 <div className="bg-green-100 p-2 rounded-full">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                 </div>
                                 <div>
                                     <p className="font-bold text-gray-900 text-sm">Verified Candidates</p>
                                     <p className="text-xs text-gray-500">100% Safe Hiring</p>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const PhilosophySection = () => (
    <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Match. Manage. Grow.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                Empowering domestic employment through stronger connections. At MingHwee, we believe great outcomes come when employers, helpers, and agencies work in harmony.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-12 text-sm text-gray-700 font-medium">
                <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Agencies offer experience and expertise.
                </div>
                <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Helpers bring dedication and aspirations.
                </div>
                <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Employers provide trust and a welcoming home.
                </div>
            </div>
        </div>
    </section>
);

const WhyChooseSection = () => {
    const features = [
        {
            title: 'Support at every step',
            desc: 'From smart search tools and messaging to contracts and subscriptions, our dedicated Client Services Team is here to guide you.',
        },
        {
            title: 'Transparent and Trusted',
            desc: 'With no hidden costs, helpers join for free and employers enjoy clear, upfront pricing. Thousands of families rely on our platform.',
        },
        {
            title: 'Choose your hiring style',
            desc: 'Pick the approach that suits your needs: Direct Hire, Concierge, or Agent. We handle the process your way.',
        },
        {
            title: 'Ethical',
            desc: 'We uphold the highest ethical standards. Our direct and concierge helpers come without loans. Fees are fully disclosed.',
        }
    ];

    return (
        <section className="py-24 bg-[#C23B8B] text-white relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Why choose MingHwee?</h2>
                    <p className="mt-4 opacity-90 max-w-2xl mx-auto">MingHwee is the all-in-one platform for domestic employment in Singapore—trusted by employers, helpers, and agencies alike.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {features.map((feat, idx) => (
                        <div key={idx} className="bg-white text-gray-900 p-8 rounded-2xl shadow-xl flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
                             <div className="flex-shrink-0 mt-1">
                                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                             </div>
                             <div>
                                 <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
                                 <p className="text-gray-600 text-sm leading-relaxed">{feat.desc}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PopularCategoriesSection = () => {
    const categories = [
        { name: 'Plumber', image: 'https://plus.unsplash.com/premium_photo-1663040178972-ee22589c5950?w=500&auto=format&fit=crop&q=60' },
        { name: 'Babysitter', image: 'https://images.unsplash.com/photo-1610043831879-720483722565?w=500&auto=format&fit=crop&q=60' },
        { name: 'Chef', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&auto=format&fit=crop&q=60' },
        { name: 'Electrician', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60' },
        { name: 'Cleaner', image: 'https://images.unsplash.com/photo-1584621645335-359b81b48167?w=500&auto=format&fit=crop&q=60' },
        { name: 'Driver', image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=500&auto=format&fit=crop&q=60' },
        { name: 'Gardener', image: 'https://images.unsplash.com/photo-1611735341450-74d61e66bbad?w=500&auto=format&fit=crop&q=60' },
        { name: 'Construction', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&auto=format&fit=crop&q=60' },
    ];

    return (
        <section className="py-24 bg-purple-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explore Top Job Categories</h2>
                    <p className="mt-2 text-gray-600">Find the right role for your skillset</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.name} className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3] cursor-pointer">
                            <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                                <span className="text-white font-bold text-lg">{cat.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = () => {
    const reviews = [
        { text: "Excellent service! I recently hired directly from overseas (PH) using their concierge service which is quite cheaper than other agencies. Very smooth process.", author: "H Flores" },
        { text: "MingHwee made finding a job in Singapore so easy. They helped me with my paperwork and I got an interview in just one week.", author: "Javier Reyes" },
        { text: "Very user friendly platform. As an employer, I found it very easy to shortlist candidates and arrange interviews.", author: "Sarah Tan" }
    ];

    return (
        <section className="py-24 bg-[#F9EAF5]">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Testimonials</h2>
                <p className="text-gray-600 mb-16">Actual reviews from our happy and satisfied clients</p>
                
                <div className="flex overflow-x-auto gap-6 pb-8 snap-x justify-center">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="min-w-[300px] max-w-md bg-white p-8 rounded-3xl shadow-sm snap-center flex flex-col justify-center">
                            <p className="text-gray-700 italic mb-6 leading-relaxed">"{review.text}"</p>
                            <div className="flex justify-center items-center gap-2">
                                <span className="font-bold text-gray-900">{review.author}</span>
                                <div className="flex text-yellow-400">
                                    {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-2 mt-4">
                    <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                    <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                    <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                </div>
            </div>
        </section>
    );
};

const FAQSection = () => (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-2">
                <AccordionItem title="What does it cost?">
                    Employers can browse for free. To contact helpers, we offer affordable subscription plans. Helpers join for free.
                </AccordionItem>
                <AccordionItem title="What are the key success factors for an employer-helper relationship?">
                    Communication, clear expectations, and mutual respect are key. We provide templates and guides to help facilitate this.
                </AccordionItem>
                <AccordionItem title="Why would I keep my subscription after I found my helper?">
                    Your subscription gives you continued access to our support team, contract management tools, and replacement guarantees.
                </AccordionItem>
            </div>
            <div className="text-center mt-12">
                <button className="px-8 py-3 bg-purple-900 text-white font-bold rounded-full text-sm hover:bg-purple-800 transition-colors">SEE MORE</button>
            </div>
        </div>
    </section>
);

const VideoAndInfoSection = () => (
    <section className="py-24 bg-[#431c53] text-white">
        <div className="container mx-auto px-6">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

                <div className="lg:w-1/2 w-full z-10">
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-inner group cursor-pointer">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60" alt="Video Thumbnail" className="w-full h-full object-cover opacity-80" />
                        <p className="absolute top-4 left-4 text-gray-900 font-bold bg-white/80 px-3 py-1 rounded-lg text-sm">Watch our brand video</p>
                    </div>
                </div>
                <div className="lg:w-1/2 text-gray-900 z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Not a maid agency, <br/> <span className="text-purple-600">we are so much more!</span></h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Our mission is simple, we want to provide equal access and progress for all, to help build a culture of respect between employers and domestic helper in Singapore.
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        We are not a maid agency, instead we provide you with all the tools and support to help you to find a helper yourself. You can choose to DIY without an agent and expensive fees or relax and enjoy our concierge service.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => {
    return (
        <footer className="bg-[#2D1B4E] text-white pt-20 pb-10 text-sm">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
                    <div className="md:col-span-2 pr-8">
                        <div className="flex items-center gap-2 mb-6">
                             <div className="bg-white text-purple-900 p-1 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.28-1.25-.743-1.659M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.28-1.25.743-1.659M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79-4-4-1.79-4-4-4z" /></svg>
                           </div>
                           <span className="text-2xl font-bold">MingHwee</span>
                        </div>
                        <p className="text-gray-400 mb-4">This MingHwee platform is partnered with the following employment agencies:</p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            MingHwee Pte Ltd, licensed by the Ministry of Manpower (licence 23C2048)<br/>
                            Little Big Employment Agency Pte Ltd, licensed by the Ministry of Manpower (license 19C9790)<br/>
                            Living Well Maid Agency Pte Ltd, licensed by the Ministry of Manpower (license 20C0407)
                        </p>
                        <div className="mt-6">
                            <p className="font-bold mb-3">Connect with us</p>
                            <div className="flex gap-4">
                                <a href="#" className="w-8 h-8 bg-white text-purple-900 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"><i className="fab fa-facebook-f">f</i></a>
                                <a href="#" className="w-8 h-8 bg-white text-purple-900 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"><i className="fab fa-instagram">in</i></a>
                                <a href="#" className="w-8 h-8 bg-white text-purple-900 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"><i className="fab fa-linkedin-in">li</i></a>
                                <a href="#" className="w-8 h-8 bg-white text-purple-900 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"><i className="fab fa-youtube">yt</i></a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Home</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-white">Find a helper</a></li>
                            <li><a href="#" className="hover:text-white">Find a job</a></li>
                            <li><a href="#" className="hover:text-white">Sign up/Log in</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Subscription plans</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-white">Concierge services</a></li>
                            <li><a href="#" className="hover:text-white">Forum</a></li>
                            <li><a href="#" className="hover:text-white">Blogs</a></li>
                        </ul>
                    </div>

                     <div>
                        <h4 className="font-bold mb-6">About MingHwee</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-white">FAQs</a></li>
                            <li><a href="#" className="hover:text-white">Contact us</a></li>
                            <li><a href="#" className="hover:text-white">Terms of use</a></li>
                            <li><a href="#" className="hover:text-white">Privacy policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-purple-800 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} MingHwee Pte. Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

interface HomePageProps {
  navigateTo: (page: Page, options?: { userType?: UserType }) => void;
  setCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo, setCountry, selectedCountry }) => {
  return (
    <div className="bg-white font-sans text-gray-900">
      <Header navigateTo={navigateTo} setCountry={setCountry} selectedCountry={selectedCountry} />
      <main>
        <HeroSection navigateTo={navigateTo} />
        <PhilosophySection />
        <WhyChooseSection />
        <TestimonialsSection />
        <FAQSection />
        <VideoAndInfoSection />
        <PopularCategoriesSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
