
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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex items-center">
        <div className="flex-1">
          <div className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigateTo(Page.Home)}>MingHwee</div>
        </div>
        <div className="flex-grow flex justify-center">
            <div className="hidden md:flex items-center space-x-6">
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.Home); }} className="text-blue-600 font-semibold">Home</a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.About); }} className="text-gray-600 hover:text-blue-600">About</a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.Contact); }} className="text-gray-600 hover:text-blue-600">Contact</a>
            </div>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="flex items-center space-x-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigateTo(Page.Login, { userType: UserType.Employer }); }}
              className="px-6 py-1 text-gray-700 font-semibold rounded-md hover:bg-gray-100 transition duration-300"
            >
              For Employers
            </a>
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

const WhyChooseUs = () => {
  const features = [
    { title: 'Verified & Safe Jobs', description: 'We partner only with trusted and verified employers. Your safety and fair treatment are our top priorities.', imageUrl: 'https://picsum.photos/870/400?image=1' },
    { title: 'We Value Your Skills', description: 'Whether you\'re experienced or just starting, we help you showcase your skills to find the right job.', imageUrl: 'https://picsum.photos/870/400?image=2' },
    { title: 'Smart Job Matching', description: 'Our smart system finds jobs that match your skills and preferences, so you get relevant interview invites.', imageUrl: 'https://picsum.photos/870/400?image=3' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Work With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(feature => (
            <div key={feature.title} className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-left transition-transform transform hover:-translate-y-2">
              <img src={feature.imageUrl} alt={feature.title} className="h-48 w-full object-cover rounded-md mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
    const steps = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: '1. Create Your Profile',
            description: 'Fill out your details, skills, and job preferences in minutes. It’s free and easy.'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
            title: '2. Get Matched',
            description: 'Our smart system finds verified employers looking for someone just like you.'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.93L5.5 8m7 2H5M5 8h2m-2 0h2m0 0h2m-2 0h2" /></svg>,
            title: '3. Get Hired',
            description: 'Receive interview invites, get help with your documents, and start your new job.'
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Get a Job in 3 Simple Steps</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    {steps.map(step => (
                        <div key={step.title} className="p-6">
                            <div className="flex justify-center mb-4">{step.icon}</div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const JobCategories = () => {
  const categories = [
    { name: 'Plumber', imageUrl: 'https://picsum.photos/400/400?image=10' },
    { name: 'Babysitter', imageUrl: 'https://picsum.photos/400/400?image=11' },
    { name: 'Chef', imageUrl: 'https://picsum.photos/400/400?image=12' },
    { name: 'Electrician', imageUrl: 'https://picsum.photos/400/400?image=13' },
    { name: 'Cleaner', imageUrl: 'https://picsum.photos/400/400?image=14' },
    { name: 'Driver', imageUrl: 'https://picsum.photos/400/400?image=15' },
    { name: 'Gardener', imageUrl: 'https://picsum.photos/400/400?image=16' },
  ];
  return (
    <section className="py-20 bg-[#FFFBF5]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Popular Job Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {categories.map(category => (
            <div key={category.name} className="text-center group">
              <div className="overflow-hidden rounded-lg shadow-md">
                <img src={category.imageUrl} alt={category.name} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110" />
              </div>
              <p className="font-semibold text-gray-700 mt-4">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: 'Javier Reyes', company: 'Now working at SG Piping Solutions', avatarUrl: 'https://i.pravatar.cc/150?u=javier', quote: 'MingHwee made finding a job in Singapore so easy. They helped me with my paperwork and I got an interview in just one week. I\'m very happy with my new job!' },
    { name: 'Maria Santos', company: 'Hired by CleanSweep Services', avatarUrl: 'https://i.pravatar.cc/150?u=maria', quote: "I was worried about finding a safe job. The employers on MingHwee are verified, and the process was clear. I feel secure and respected in my new role." },
    { name: 'Li Wei', company: 'Placed with Creative Builders', avatarUrl: 'https://i.pravatar.cc/150?u=liwei', quote: 'The smart matching is great! I only received invitations for jobs that were a perfect fit for my skills as an electrician. It saved me a lot of time.' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800">Hear from Workers Like You</h2>
        <p className="text-center text-gray-600 mt-4 mb-12 max-w-3xl mx-auto">See how we've helped others find great jobs and build better futures.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(t => (
            <div key={t.name} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <p className="text-6xl text-gray-300 font-serif -mt-4 -ml-4">“</p>
              <p className="text-gray-600 mb-6 -mt-8">{t.quote}</p>
              <div className="flex items-center">
                <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <p className="font-semibold text-gray-800">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewFooter = () => {
    const InstagramIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm0 2.163c-2.359 0-2.693.01-3.638.056-.945.045-1.505.207-1.944.372a2.734 2.734 0 00-1.047.748 2.734 2.734 0 00-.748 1.047c-.165.44-.327.999-.372 1.944-.046.945-.056 1.279-.056 3.638s.01 2.693.056 3.638c.045.945.207 1.505.372 1.944a2.734 2.734 0 00.748 1.047 2.734 2.734 0 001.047.748c.44.165.999.327 1.944.372.945.046 1.279.056 3.638.056s2.693-.01 3.638-.056c.945-.045 1.505-.207 1.944-.372a2.734 2.734 0 001.047-.748 2.734 2.734 0 00.748-1.047c.165-.44.327-.999.372-1.944.046-.945.056-1.279.056-3.638s-.01-2.693-.056-3.638c-.045-.945-.207-1.505-.372-1.944a2.734 2.734 0 00-.748-1.047 2.734 2.734 0 00-1.047-.748c-.44-.165-.999-.327-1.944-.372C15.008 4.173 14.674 4.163 12.315 4.163zM12 8.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zM12 17a3 3 0 110-6 3 3 0 010 6zm4.805-7.75a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" clipRule="evenodd"/></svg>;
    const FacebookIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>;
    const WhatsAppIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.42 1.32 4.92L2 22l5.25-1.38c1.45.79 3.08 1.21 4.75 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12 20.15c-1.48 0-2.92-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32c-.82-1.32-1.26-2.85-1.26-4.43 0-4.42 3.6-8.03 8.04-8.03s8.04 3.6 8.04 8.03-3.61 8.03-8.04 8.03zm4.91-6.15c-.28-.14-1.65-.81-1.9-.91-.25-.1-.43-.14-.62.14-.19.28-.72.91-.88 1.1-.16.19-.32.22-.59.07-.28-.15-1.17-.43-2.23-1.38-.83-.72-1.39-1.61-1.55-1.88s-.01-.43.13-.57c.12-.13.28-.34.42-.51.14-.17.19-.28.28-.46.09-.19.05-.37-.02-.51-.07-.15-.62-1.49-.85-2.04-.23-.55-.46-.48-.62-.48-.15 0-.33-.02-.51-.02s-.46.07-.7.35c-.24.28-.91.88-1.11 2.15s.75 2.92.85 3.12c.1.2 1.8 2.91 4.39 4.22 2.59 1.3 2.59.88 3.06.85.47-.03 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32z"/></svg>;

    return (
        <footer className="bg-[#F0F5FA] border-t border-gray-200">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">MingHwee</h3>
                    <p className="text-gray-600">Connecting talent with opportunity, empowering blue-collar workers across Southeast Asia.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Our services</h4>
                    <ul className="space-y-2 text-gray-600">
                    <li><a href="#" className="hover:text-blue-600">Find job</a></li>
                    <li><a href="#" className="hover:text-blue-600">Create resume</a></li>
                    <li><a href="#" className="hover:text-blue-600">Auto Job Selection</a></li>
                    <li><a href="#" className="hover:text-blue-600">Pricing Plan</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Links</h4>
                    <ul className="space-y-2 text-gray-600">
                    <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                    <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
                    <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
                    <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-blue-600">About us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Contact Us</h4>
                    <div className="flex space-x-4 mb-4">
                        <a href="#" className="text-gray-600 hover:text-blue-600" aria-label="Instagram"><InstagramIcon /></a>
                        <a href="#" className="text-gray-600 hover:text-blue-600" aria-label="Facebook"><FacebookIcon /></a>
                        <a href="#" className="text-gray-600 hover:text-blue-600" aria-label="WhatsApp"><WhatsAppIcon /></a>
                    </div>
                    <p className="text-gray-600">1500 Marilla St, Dallas, TX 75201</p>
                    <p className="text-gray-600">1(847)555-5550</p>
                </div>
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
    <div className="bg-gray-50">
      <Header navigateTo={navigateTo} setCountry={setCountry} selectedCountry={selectedCountry} />
      <main>
        <div className="bg-gray-50 pt-10 pb-16">
            <div className="container mx-auto px-6">
                <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div 
                    className="relative bg-cover bg-center h-[500px]" 
                    style={{ backgroundImage: "url('https://picsum.photos/2069/1381')" }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">Connecting Talent with Opportunity</h1>
                    <p className="text-lg text-gray-200 mb-8 max-w-3xl">
                        Your trusted partner for finding good, safe blue-collar jobs in Singapore & the Philippines. Register for free and let us match you with verified employers.
                    </p>
                    <button 
                    onClick={() => navigateTo(Page.Login, { userType: UserType.Candidate })}
                    className="px-10 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
                    >
                    Register as a Candidate
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        
        <WhyChooseUs />
        <HowItWorks />
        <JobCategories />
        <Testimonials />
      </main>
      <NewFooter />
    </div>
  );
};

export default HomePage;
