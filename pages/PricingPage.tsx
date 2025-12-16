
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Country } from '../types';

interface HeaderProps {
  setCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const Header: React.FC<HeaderProps> = ({ setCountry, selectedCountry }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCountrySelect = (e: React.MouseEvent<HTMLAnchorElement>, country: Country) => {
    e.preventDefault();
    setCountry(country);
    setIsDropdownOpen(false);
  };

  // Common styles for nav links
  const linkBaseClass = "text-lg font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer";
  const activeLinkClass = "bg-brand-beige text-brand-burgundy shadow-sm";
  const inactiveLinkClass = "text-gray-600 hover:bg-brand-cream hover:text-brand-burgundy";

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-brand-beige shadow-sm">
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
           <img src="https://ik.imagekit.io/ui4mpbzoy/removed-background.png?updatedAt=1764657414508" alt="MingHwee" className="h-12 w-auto object-contain transform group-hover:scale-105 transition-transform" />
        </div>
        
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <a onClick={() => navigate('/')} className={`${linkBaseClass} ${inactiveLinkClass}`}>Home</a>
            <a onClick={() => navigate('/about')} className={`${linkBaseClass} ${inactiveLinkClass}`}>About Us</a>
            <a onClick={() => navigate('/pricing')} className={`${linkBaseClass} ${inactiveLinkClass}`}>Pricing</a>
            <a onClick={() => navigate('/contact')} className={`${linkBaseClass} ${inactiveLinkClass}`}>Contact</a>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full hover:bg-brand-beige hover:border-brand-honey/30 transition-all duration-300 text-sm font-semibold text-brand-burgundy shadow-sm"
            >
              <span>{selectedCountry || 'Select Country'}</span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn overflow-hidden">
                <a href="#" onClick={(e) => handleCountrySelect(e, Country.Singapore)} className="block px-6 py-3 text-sm font-medium text-brand-burgundy hover:bg-brand-beige transition-colors">Singapore</a>
                <a href="#" onClick={(e) => handleCountrySelect(e, Country.Philippines)} className="block px-6 py-3 text-sm font-medium text-brand-burgundy hover:bg-brand-beige transition-colors">Philippines</a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => {
    return (
        <footer className="bg-brand-burgundy text-white pt-20 pb-10 text-sm">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
                    <div className="md:col-span-2 pr-8">
                        <div className="flex items-center gap-2 mb-6">
                             <img src="https://ik.imagekit.io/ui4mpbzoy/removed-background.png?updatedAt=1764657414508" alt="MingHwee" className="h-8 w-auto bg-white rounded-lg p-1" />
                           <span className="text-2xl font-bold font-serif">MingHwee</span>
                        </div>
                        <p className="text-gray-300 mb-4">This MingHwee platform is partnered with the following employment agencies:</p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            MingHwee Pte Ltd, licensed by the Ministry of Manpower (licence 23C2048)<br/>
                            Little Big Employment Agency Pte Ltd, licensed by the Ministry of Manpower (license 19C9790)<br/>
                            Living Well Maid Agency Pte Ltd, licensed by the Ministry of Manpower (license 20C0407)
                        </p>
                        <div className="mt-6">
                            <p className="font-bold mb-3 text-brand-terracotta">Connect with us</p>
                            <div className="flex gap-4">
                                <a href="#" className="w-8 h-8 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-brand-terracotta transition-colors"><i className="fab fa-facebook-f">f</i></a>
                                <a href="#" className="w-8 h-8 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-brand-terracotta transition-colors"><i className="fab fa-instagram">in</i></a>
                                <a href="#" className="w-8 h-8 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-brand-terracotta transition-colors"><i className="fab fa-linkedin-in">li</i></a>
                                <a href="#" className="w-8 h-8 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-brand-terracotta transition-colors"><i className="fab fa-youtube">yt</i></a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-brand-honey">Home</h4>
                        <ul className="space-y-3 text-gray-300">
                            <li><a href="#" className="hover:text-brand-terracotta transition-colors">Find a helper</a></li>
                            <li><a href="#" className="hover:text-brand-terracotta transition-colors">Find a job</a></li>
                            <li><a href="#" className="hover:text-brand-terracotta transition-colors">Sign up/Log in</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-brand-honey">Subscription plans</h4>
                        <ul className="space-y-3 text-gray-300">
                            <li><a href="#" className="hover:text-brand-terracotta transition-colors">Concierge services</a></li>
                            <li><a href="#" className="hover:text-brand-terracotta transition-colors">Forum</a></li>
                            <li><a href="#" className="hover:text-brand-terracotta transition-colors">Blogs</a></li>
                        </ul>
                    </div>

                     <div>
                        <h4 className="font-bold mb-6 text-brand-honey">About MingHwee</h4>
                        <ul className="space-y-3 text-gray-300">
                            <li><a href="#" className="hover:text-brand-terracotta transition-colors">FAQs</a></li>
                            <li><a href="#" className="hover:text-brand-terracotta transition-colors">Contact us</a></li>
                            <li><a href="#" className="hover:text-brand-terracotta transition-colors">Terms of use</a></li>
                            <li><a href="#" className="hover:text-brand-terracotta transition-colors">Privacy policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} MingHwee Pte. Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

interface PricingPageProps {
  setCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const PricingPage: React.FC<PricingPageProps> = ({ setCountry, selectedCountry }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-brand-cream font-sans text-brand-burgundy min-h-screen flex flex-col">
      <Header setCountry={setCountry} selectedCountry={selectedCountry} />
      
      <main className="flex-grow">
        {/* Hero / Intro Section */}
        <section className="py-16 bg-brand-beige">
            <div className="container mx-auto px-6 text-center max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-burgundy mb-6 font-serif">Pricing for Hiring a Foreign Domestic Worker</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    At MingHwee, we offer clear and transparent pricing to help you hire a Foreign Domestic Worker (FDW) in Singapore. Our payment structure is designed to be simple and flexible, with two payment options to suit your needs.
                </p>
            </div>
        </section>

        {/* Pricing Options */}
        <section className="py-16 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-full bg-brand-cream/50 z-0"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Option 1: Full Payment - THEME: NAVY */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="bg-brand-burgundy p-6 text-white text-center">
                            <h2 className="text-2xl font-bold font-serif">1. Full Payment Option</h2>
                            <p className="opacity-80 mt-2 text-sm uppercase tracking-wide">Best for immediate hiring</p>
                        </div>
                        <div className="p-8 flex-grow">
                            <p className="text-gray-600 mb-6">
                                Pay the full agency fee upfront to activate the hiring process immediately. This option covers all associated costs and speeds up the entire process.
                            </p>
                            
                            <div className="mb-6">
                                <h3 className="font-bold text-brand-burgundy mb-3 uppercase text-sm tracking-wide">What’s Included:</h3>
                                <ul className="space-y-2">
                                    {['Agency Fees', 'MOM Work Permit Fees', 'Security Bond & Insurance', 'Medical & SIP Costs', 'Monthly Levy (standard $300 or concessionary $60)', 'FDW Monthly Salary ($500-$800)'].map(item => (
                                        <li key={item} className="flex items-start">
                                            <svg className="w-5 h-5 text-brand-honey mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            <span className="text-gray-700 text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-brand-burgundy mb-3 uppercase text-sm tracking-wide">Benefits:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-brand-burgundy mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        <span className="text-gray-700 text-sm">Immediate activation of hiring process</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-brand-burgundy mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span className="text-gray-700 text-sm">Document collection starts immediately</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 text-center border-t border-gray-100">
                            <button onClick={() => navigate('/login?type=employer')} className="w-full py-3 px-6 bg-brand-burgundy text-white font-bold rounded-full hover:bg-gray-900 transition-colors shadow-lg">
                                Choose Full Payment
                            </button>
                        </div>
                    </div>

                    {/* Option 2: Booking Fee - THEME: CORAL */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="bg-brand-terracotta p-6 text-white text-center">
                            <h2 className="text-2xl font-bold font-serif">2. Booking Fee Option</h2>
                            <p className="opacity-90 mt-2 text-sm uppercase tracking-wide">Reserve now, decide later</p>
                        </div>
                        <div className="p-8 flex-grow">
                            <p className="text-gray-600 mb-6">
                                If you’re unsure or need more time to decide, you can opt for a refundable booking fee. This option allows you to temporarily reserve a candidate for 7 days.
                            </p>
                            
                            <div className="mb-6">
                                <h3 className="font-bold text-brand-terracotta mb-3 uppercase text-sm tracking-wide">What’s Included:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-brand-honey mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-gray-700 text-sm">Booking Fee (deducted from full payment if you decide to hire)</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-brand-terracotta mb-3 uppercase text-sm tracking-wide">Benefits:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-brand-terracotta mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        <span className="text-gray-700 text-sm">Reserve a candidate for 7 days</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-brand-terracotta mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span className="text-gray-700 text-sm">No commitment until you're ready</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-brand-terracotta mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                        <span className="text-gray-700 text-sm">Refundable if you don't proceed</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                         <div className="p-6 bg-gray-50 text-center border-t border-gray-100">
                            <button onClick={() => navigate('/login?type=employer')} className="w-full py-3 px-6 bg-brand-terracotta text-white font-bold rounded-full hover:bg-brand-coral transition-colors shadow-lg shadow-brand-terracotta/20">
                                Choose Booking Fee
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Payment Methods */}
        <section className="py-16 bg-brand-beige">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl font-bold text-brand-burgundy mb-8 text-center font-serif">Payment Methods</h2>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-honey/20">
                    <p className="text-gray-600 mb-6 text-center">
                        We accept payments via PayNow (instant bank transfer) and Credit Card (via Stripe or PayPal). Bank transfers are not accepted to ensure faster processing and verification.
                    </p>
                    <div className="flex justify-center gap-8 flex-wrap">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-brand-burgundy/10 rounded-full flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-brand-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </div>
                            <span className="font-semibold text-brand-burgundy">PayNow</span>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-brand-honey/20 rounded-full flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-brand-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                            </div>
                            <span className="font-semibold text-brand-burgundy">Credit Card</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
             <div className="container mx-auto px-6 max-w-5xl">
                <h2 className="text-3xl font-bold text-brand-burgundy mb-12 text-center font-serif">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center group">
                         <div className="w-16 h-16 mx-auto bg-brand-burgundy rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:bg-brand-terracotta transition-colors">1</div>
                         <h3 className="text-xl font-bold mb-2 text-brand-burgundy">Select Payment Option</h3>
                         <p className="text-gray-600">Choose between full payment or booking fee.</p>
                    </div>
                    <div className="text-center group">
                         <div className="w-16 h-16 mx-auto bg-brand-burgundy rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:bg-brand-terracotta transition-colors">2</div>
                         <h3 className="text-xl font-bold mb-2 text-brand-burgundy">Complete Payment</h3>
                         <p className="text-gray-600">Make payment via PayNow or credit card.</p>
                    </div>
                     <div className="text-center group">
                         <div className="w-16 h-16 mx-auto bg-brand-burgundy rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:bg-brand-terracotta transition-colors">3</div>
                         <h3 className="text-xl font-bold mb-2 text-brand-burgundy">Hiring Process Starts</h3>
                         <p className="text-gray-600">Upon payment confirmation, your hiring process is activated.</p>
                    </div>
                </div>
             </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-brand-burgundy text-center text-white relative overflow-hidden">
             <div className="absolute inset-0 bg-brand-terracotta/10 pointer-events-none"></div>
             <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Get Started Today!</h2>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Register now to get matched with verified FDWs and find the perfect fit for your household needs.</p>
                <button onClick={() => navigate('/login?type=employer')} className="px-8 py-4 bg-brand-terracotta text-white font-bold rounded-full shadow-lg hover:bg-brand-coral transition-all transform hover:scale-105">
                    Register as Employer
                </button>
             </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
