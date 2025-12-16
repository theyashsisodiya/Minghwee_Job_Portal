
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
            <a onClick={() => navigate('/about')} className={`${linkBaseClass} ${activeLinkClass}`}>About Us</a>
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

const Footer: React.FC = () => (
    <footer className="bg-white border-t border-brand-beige">
        <div className="container mx-auto px-6 py-8 text-center text-sm text-gray-500">
            <p>@2024 MingHwee Job Portal. All rights reserved.</p>
        </div>
    </footer>
);

interface AboutPageProps {
  setCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const AboutPage: React.FC<AboutPageProps> = ({ setCountry, selectedCountry }) => {
  return (
    <div className="bg-brand-cream min-h-screen flex flex-col font-sans">
      <Header setCountry={setCountry} selectedCountry={selectedCountry} />
      <main className="flex-grow container mx-auto px-6 py-16">
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl max-w-4xl mx-auto border border-brand-beige">
          <h1 className="text-4xl font-bold text-brand-burgundy mb-6 text-center font-serif">About Us</h1>
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <p>Welcome to <strong>MingHwee Job Portal</strong>, your premier destination for connecting blue-collar talent with top employers in Singapore and the Philippines. Our mission is to bridge the gap between skilled workers and the companies that need them, creating opportunities for growth and success for everyone involved.</p>
            <p>Founded on the principles of integrity, efficiency, and dedication, MingHwee utilizes state-of-the-art AI technology to intelligently match candidate profiles with employer requirements. This ensures a seamless and effective hiring process, saving time and resources for both parties.</p>
            <div className="pt-6">
                <h2 className="text-2xl font-bold text-brand-burgundy text-center mb-4">Our Vision</h2>
                <p className="text-center max-w-2xl mx-auto">We envision a world where every skilled worker has access to meaningful employment and every employer can easily find the talent they need to thrive. We are committed to building a robust and reliable platform that supports the blue-collar workforce and contributes to economic development in the regions we serve.</p>
            </div>
            <div className="pt-6">
                 <h2 className="text-2xl font-bold text-brand-burgundy text-center mb-4">Our Team</h2>
                <p className="text-center max-w-2xl mx-auto">Our team is composed of passionate professionals from the HR, technology, and customer service sectors. We work tirelessly to improve our platform and provide exceptional support to our users. Your success is our success.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
