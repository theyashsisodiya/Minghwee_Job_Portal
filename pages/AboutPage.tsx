
import React, { useState } from 'react';
import { Page, Country, UserType } from '../types';

interface HeaderProps {
  navigateTo: (page: Page, options?: { userType?: UserType }) => void;
  setCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, setCountry, selectedCountry }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleCountrySelect = (e: React.MouseEvent<HTMLAnchorElement>, country: Country) => {
    e.preventDefault();
    setCountry(country);
    setIsDropdownOpen(false);
  };
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-6 py-3 flex items-center">
        <div className="flex-1">
          <div className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigateTo(Page.Home)}>MingHwee</div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.Home); }} className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.About); }} className="text-blue-600 font-semibold">About</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.Contact); }} className="text-gray-600 hover:text-blue-600">Contact</a>
        </div>
        <div className="flex-1 flex justify-end">
            <div className="flex items-center space-x-4">
            <button
                onClick={() => navigateTo(Page.Login, { userType: UserType.Candidate })}
                className="px-6 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
                Login
            </button>
            <div className="relative">
                <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-6 py-1 border border-gray-300 rounded-md flex items-center space-x-2 hover:bg-gray-100"
                >
                <span>{selectedCountry || 'Select Country'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <a href="#" onClick={(e) => handleCountrySelect(e, Country.Singapore)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Singapore</a>
                    <a href="#" onClick={(e) => handleCountrySelect(e, Country.Philippines)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Philippines</a>
                </div>
                )}
            </div>
            </div>
        </div>
      </nav>
    </header>
  );
};

const Footer: React.FC = () => (
    <footer className="bg-white">
        <div className="container mx-auto px-6 py-8 text-center text-sm text-gray-500">
            <p>@2024 MingHwee Job Portal. All rights reserved.</p>
        </div>
    </footer>
);

interface AboutPageProps {
  navigateTo: (page: Page, options?: { userType?: UserType }) => void;
  setCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const AboutPage: React.FC<AboutPageProps> = ({ navigateTo, setCountry, selectedCountry }) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header navigateTo={navigateTo} setCountry={setCountry} selectedCountry={selectedCountry} />
      <main className="flex-grow container mx-auto px-6 py-16">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">About Us</h1>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>Welcome to <strong>MingHwee Job Portal</strong>, your premier destination for connecting blue-collar talent with top employers in Singapore and the Philippines. Our mission is to bridge the gap between skilled workers and the companies that need them, creating opportunities for growth and success for everyone involved.</p>
            <p>Founded on the principles of integrity, efficiency, and dedication, MingHwee utilizes state-of-the-art AI technology to intelligently match candidate profiles with employer requirements. This ensures a seamless and effective hiring process, saving time and resources for both parties.</p>
            <div className="pt-6">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">Our Vision</h2>
                <p className="text-center max-w-2xl mx-auto">We envision a world where every skilled worker has access to meaningful employment and every employer can easily find the talent they need to thrive. We are committed to building a robust and reliable platform that supports the blue-collar workforce and contributes to economic development in the regions we serve.</p>
            </div>
            <div className="pt-6">
                 <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">Our Team</h2>
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
