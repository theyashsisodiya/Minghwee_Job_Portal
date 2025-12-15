
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
           <div className="bg-brand-burgundy text-white p-2 rounded-xl shadow-lg shadow-brand-burgundy/20 group-hover:scale-105 transition-transform">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.28-1.25-.743-1.659M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.28-1.25.743-1.659M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79-4-4-1.79-4-4-4z" /></svg>
           </div>
           <span className="text-2xl font-bold text-brand-burgundy tracking-tight font-serif">MingHwee</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <a onClick={() => navigate('/')} className={`${linkBaseClass} ${inactiveLinkClass}`}>Home</a>
            <a onClick={() => navigate('/about')} className={`${linkBaseClass} ${inactiveLinkClass}`}>About Us</a>
            <a onClick={() => navigate('/pricing')} className={`${linkBaseClass} ${inactiveLinkClass}`}>Pricing</a>
            <a onClick={() => navigate('/contact')} className={`${linkBaseClass} ${activeLinkClass}`}>Contact</a>
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

interface ContactPageProps {
  setCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const ContactPage: React.FC<ContactPageProps> = ({ setCountry, selectedCountry }) => {
  return (
    <div className="bg-brand-cream min-h-screen flex flex-col font-sans text-brand-burgundy">
      <Header setCountry={setCountry} selectedCountry={selectedCountry} />
      <main className="flex-grow container mx-auto px-6 py-16">
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl max-w-5xl mx-auto border border-brand-beige">
          <h1 className="text-4xl font-bold text-brand-burgundy mb-4 text-center font-serif">Contact Us</h1>
          <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to provide feedback, please feel free to reach out.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-brand-burgundy mb-4">Get in Touch</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-brand-burgundy font-medium mb-2">Your Name</label>
                  <input type="text" id="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-honey focus:border-transparent bg-brand-cream" placeholder="John Doe" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-brand-burgundy font-medium mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-honey focus:border-transparent bg-brand-cream" placeholder="john.doe@example.com" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-brand-burgundy font-medium mb-2">Message</label>
                  <textarea id="message" rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-honey focus:border-transparent bg-brand-cream" placeholder="Your message here..."></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-terracotta text-white font-bold py-3 px-4 rounded-full hover:bg-brand-coral transition duration-300 shadow-md">
                  Send Message
                </button>
              </form>
            </div>
            <div className="bg-brand-beige p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-brand-burgundy mb-4">Our Offices</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-brand-burgundy">Singapore Office</h3>
                  <p className="text-gray-600 mt-1">123 Orchard Road<br/>Singapore 238823<br/>Phone: +65 1234 5678<br/>Email: contact.sg@minghwee.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-burgundy">Philippines Office</h3>
                  <p className="text-gray-600 mt-1">456 Ayala Avenue<br/>Makati, Metro Manila, Philippines<br/>Phone: +63 987 654 3210<br/>Email: contact.ph@minghwee.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
