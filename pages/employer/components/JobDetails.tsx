
import React, { useState } from 'react';
import { MOCK_MATCHED_CANDIDATES } from '../../../constants';
import { MatchedCandidate } from '../../../types';

interface JobDetailsProps {
    onBack: () => void;
    isAdminView?: boolean;
}

const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const OptionsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v7a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zm-1 3V4a1 1 0 112 0v1h-2z" clipRule="evenodd" /></svg>;
const CategoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>;
const SkillIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;

interface CandidateCardProps {
    candidate: MatchedCandidate;
    isInvited: boolean;
    onInvite: (id: number) => void;
    isExpanded: boolean;
    onToggleExpand: (id: number) => void;
}
const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, isInvited, onInvite, isExpanded, onToggleExpand }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300">
        <div
            className="p-4 flex items-center justify-between cursor-pointer"
            onClick={() => onToggleExpand(candidate.id)}
            role="button"
            aria-expanded={isExpanded}
            aria-controls={`candidate-details-${candidate.id}`}
        >
            <div className="flex items-center space-x-4">
                <img src={candidate.avatarUrl} alt={candidate.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                    <p className="font-semibold text-gray-800">{candidate.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                        <LocationIcon />
                        <span>{candidate.location}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    onClick={(e) => { e.stopPropagation(); onInvite(candidate.id); }}
                    disabled={isInvited}
                    className={`px-5 py-2 font-semibold rounded-md transition-colors text-sm ${
                        isInvited
                            ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    {isInvited ? 'Invited' : 'Invite for Interview'}
                </button>
                <button onClick={(e) => e.stopPropagation()} className="p-1 rounded-full hover:bg-gray-100">
                    <OptionsIcon />
                </button>
            </div>
        </div>
        {isExpanded && (
            <div id={`candidate-details-${candidate.id}`} className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                    <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center"><BriefcaseIcon />Experience</h4>
                        <p className="text-gray-800 font-medium">{candidate.experience}</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center"><CategoryIcon />Job Categories</h4>
                        <div className="flex flex-wrap gap-2">
                            {candidate.jobCategories.map(cat => (
                                <span key={cat} className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-medium rounded-full">{cat}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center"><SkillIcon />Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {candidate.skills.map(skill => (
                                <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
);

const ReadOnlyJobView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const jobData = {
        title: 'Construction Worker',
        category: 'Construction',
        location: 'Singapore',
        description: 'Seeking hardworking and reliable general labourers for various construction projects. Responsibilities include site preparation, loading/unloading materials, operating basic hand and power tools, and assisting skilled tradespeople. No experience necessary, training will be provided. Must be physically fit and able to work outdoors in various weather conditions. Safety-conscious attitude is a must.',
        workingHours: '8 AM - 5 PM, Mon-Sat',
        salary: { min: 2200, max: 3000, currency: 'SGD' },
        experience: 'No experience required',
        skills: ['Heavy Lifting', 'Basic Hand Tools', 'Teamwork'],
        physicalReqs: 'Able to lift up to 25kg, able to stand for long hours.',
        certs: 'Safety Induction Course (Construction) is a plus.'
    };
    const DetailItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-md text-gray-800">{children}</p>
        </div>
    );
    const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">{title}</h3>
            {children}
        </div>
    );
   
    return (
        <div>
            <div className="mb-6">
                 <button onClick={onBack} className="text-blue-600 hover:underline font-semibold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Employer Profile
                </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-6 pb-6 border-b">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{jobData.title}</h1>
                        <div className="flex items-center text-gray-600 mt-1">
                            <LocationIcon />
                            <span>{jobData.location}</span>
                        </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 text-sm font-semibold rounded-full">{jobData.category}</span>
                </div>
               
                <div className="space-y-8">
                    <Section title="Job Description">
                        <p className="text-gray-600 whitespace-pre-line">{jobData.description}</p>
                    </Section>
                    <Section title="Schedule & Compensation">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem label="Working Hours">{jobData.workingHours}</DetailItem>
                            <DetailItem label="Salary Range (per month)">{`${jobData.salary.currency} ${jobData.salary.min.toLocaleString()} - ${jobData.salary.max.toLocaleString()}`}</DetailItem>
                        </div>
                    </Section>
                   
                    <Section title="Candidate Requirements">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem label="Years of Experience">{jobData.experience}</DetailItem>
                            <DetailItem label="Required Skills">
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {jobData.skills.map(skill => (
                                        <span key={skill} className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-medium rounded-full">{skill}</span>
                                    ))}
                                </div>
                            </DetailItem>
                            <div className="md:col-span-2">
                                <DetailItem label="Physical Requirements">{jobData.physicalReqs}</DetailItem>
                            </div>
                             <div className="md:col-span-2">
                                <DetailItem label="Certifications / Licenses">{jobData.certs}</DetailItem>
                            </div>
                         </div>
                    </Section>
                </div>
            </div>
        </div>
    );
};

const JobDetails: React.FC<JobDetailsProps> = ({ onBack, isAdminView = false }) => {
   
    if (isAdminView) {
        return <ReadOnlyJobView onBack={onBack} />;
    }

    const [invitedCandidates, setInvitedCandidates] = useState<number[]>([]);
    const [expandedCandidateId, setExpandedCandidateId] = useState<number | null>(null);

    const handleInvite = (candidateId: number) => {
        setInvitedCandidates(prev => [...prev, candidateId]);
    };

    const handleToggleExpand = (candidateId: number) => {
        setExpandedCandidateId(prevId => (prevId === candidateId ? null : candidateId));
    };

    return (
        <div>
             <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">View Details</h1>
                <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Filter</option>
                        <option>By Experience</option>
                        <option>By Location</option>
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center space-x-4">
                    <img src="https://picsum.photos/seed/tech/80/80" alt="Company Logo" className="w-20 h-20 rounded-lg object-cover" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Construction Worker</h2>
                        <div className="flex items-center text-gray-600 mt-1">
                            <LocationIcon />
                            <span>Singapore</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">List of Candidates</h3>
                <div className="space-y-4">
                    {MOCK_MATCHED_CANDIDATES.map(candidate => (
                        <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                            isInvited={invitedCandidates.includes(candidate.id)}
                            onInvite={handleInvite}
                            isExpanded={expandedCandidateId === candidate.id}
                            onToggleExpand={handleToggleExpand}
                        />
                    ))}
                </div>
            </div>
             <div className="mt-8">
                <button onClick={onBack} className="text-blue-600 hover:underline font-semibold">
                    &larr; Back to View Jobs
                </button>
            </div>
        </div>
    );
};

export default JobDetails;
