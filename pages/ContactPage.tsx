
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
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.About); }} className="text-gray-600 hover:text-blue-600">About</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.Contact); }} className="text-blue-600 font-semibold">Contact</a>
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

interface ContactPageProps {
  navigateTo: (page: Page, options?: { userType?: UserType }) => void;
  setCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const ContactPage: React.FC<ContactPageProps> = ({ navigateTo, setCountry, selectedCountry }) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header navigateTo={navigateTo} setCountry={setCountry} selectedCountry={selectedCountry} />
      <main className="flex-grow container mx-auto px-6 py-16">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Contact Us</h1>
          <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to provide feedback, please feel free to reach out.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john.doe@example.com" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea id="message" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your message here..."></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Offices</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Singapore Office</h3>
                  <p className="text-gray-600">123 Orchard Road<br/>Singapore 238823<br/>Phone: +65 1234 5678<br/>Email: contact.sg@minghwee.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Philippines Office</h3>
                  <p className="text-gray-600">456 Ayala Avenue<br/>Makati, Metro Manila, Philippines<br/>Phone: +63 987 654 3210<br/>Email: contact.ph@minghwee.com</p>
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
