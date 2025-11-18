import React, { useState } from 'react';
import { MOCK_CANDIDATE_PROGRESS } from '../../../constants';
import { CandidateApplicationStatus, CandidateProgress, ProgressStatus, ProgressStep } from '../../../types';
import { EmployerPage } from '../EmployerDashboard';

// --- ICONS ---
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;

// Step Icons
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const XMarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;
const UserCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /><path d="M15.854 12.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708L12.5 14.793l2.646-2.647a.5.5 0 01.708 0z" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>;
const DocumentTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v1a1 1 0 102 0v-1zm5-1a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1zm-2-2a1 1 0 10-2 0v1a1 1 0 102 0V9z" clipRule="evenodd" /></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 9a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM9 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6H6a1 1 0 010-2h1V3a1 1 0 011-1zm3 1a1 1 0 100 2h1v1a1 1 0 102 0V6h1a1 1 0 100-2h-1V3a1 1 0 10-2 0v1h-1zM9 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H6a1 1 0 110-2h1v-1a1 1 0 011-1zm3 1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1a1 1 0 10-2 0v1h-1z" clipRule="evenodd" /></svg>;


const getStepIcon = (stepName: string) => {
    const stepIcons: { [key: string]: React.ReactNode } = {
        'Interview': <CalendarIcon />,
        'Selected': <UserCheckIcon />,
        'Medical': <HeartIcon />,
        'Contract': <DocumentTextIcon />,
        'Hired': <SparklesIcon />,
    };
    return stepIcons[stepName] || <CheckIcon />;
};

const getStyling = (status: ProgressStatus) => {
    switch (status) {
        case ProgressStatus.Completed: return {
            node: 'bg-blue-600 border-blue-600',
            icon: 'text-white',
            text: 'text-blue-700 font-semibold',
            line: 'bg-blue-600',
        };
        case ProgressStatus.InProgress: return {
            node: 'bg-yellow-100 border-yellow-500 ring-4 ring-yellow-200',
            icon: 'text-yellow-600',
            text: 'text-yellow-700 font-semibold',
            line: 'bg-gray-200',
        };
        case ProgressStatus.Rejected: return {
            node: 'bg-red-500 border-red-500',
            icon: 'text-white',
            text: 'text-red-700 font-semibold',
            line: 'bg-gray-200',
        };
        case ProgressStatus.Pending:
        default: return {
            node: 'bg-gray-100 border-gray-300',
            icon: 'text-gray-400',
            text: 'text-gray-500',
            line: 'bg-gray-200',
        };
    }
};

interface EmployerProgressTrackerProps {
    navigate: (page: EmployerPage, candidateId: number) => void;
    candidates: CandidateProgress[];
}

const CandidateProgressCard: React.FC<{ candidate: CandidateProgress; navigate: (page: EmployerPage, candidateId: number) => void; }> = ({ candidate, navigate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const getStatusBadge = () => {
        if (candidate.paymentMade) {
             return <div className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">Payment Done</div>;
        }
        switch(candidate.status) {
            case CandidateApplicationStatus.Hired:
                return <div className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">Hired</div>;
            case CandidateApplicationStatus.CandidateRejected:
            case CandidateApplicationStatus.MedicalRejected:
                return <div className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">Rejected</div>;
            default:
                const inProgressStep = candidate.steps.find(s => s.status === ProgressStatus.InProgress);
                if (inProgressStep) return <div className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">In Progress</div>;
                return <div className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">Pending</div>;
        }
    }
    
    return (
        <div className="bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg border border-gray-200">
            <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center space-x-4">
                    <img src={candidate.avatarUrl} alt={candidate.name} className="w-14 h-14 rounded-full" />
                    <div>
                        <p className="font-bold text-lg text-gray-800">{candidate.name}</p>
                        <p className="text-sm text-gray-500">{candidate.jobTitle}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {getStatusBadge()}
                    <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </div>
            {isExpanded && (
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                    <div className="flex items-start">
                        {candidate.steps.map((step, index) => {
                             const style = getStyling(step.status);
                             const icon = step.status === ProgressStatus.Completed ? <CheckIcon /> :
                                          step.status === ProgressStatus.InProgress ? <ClockIcon /> :
                                          step.status === ProgressStatus.Rejected ? <XMarkIcon /> :
                                          getStepIcon(step.name);
                             return (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-colors duration-300 ${style.node}`}>
                                            <span className={`transition-colors duration-300 ${style.icon}`}>{icon}</span>
                                        </div>
                                        <p className={`text-xs mt-2 text-center w-20 transition-colors duration-300 ${style.text}`}>{step.name}</p>
                                    </div>
                                    {index < candidate.steps.length - 1 && (
                                        <div className={`flex-1 h-1 mt-5 transition-colors duration-300 ${getStyling(step.status).line}`}></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                    <div className="mt-6 pt-4 border-t flex justify-end items-center space-x-3">
                        <button onClick={() => navigate('viewDocuments', candidate.id)} className="px-5 py-2 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200 transition-colors text-sm">
                            View Documents
                        </button>
                        <button
                            onClick={() => navigate('payment', candidate.id)}
                            disabled={candidate.status !== CandidateApplicationStatus.CandidateSelected || candidate.paymentMade}
                            className="px-5 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors text-sm disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                        >
                            {candidate.paymentMade ? 'Payment Complete' : 'Proceed to Payment'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const EmployerProgressTracker: React.FC<EmployerProgressTrackerProps> = ({ navigate, candidates }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Progress Tracker</h1>
           
            <div className="flex justify-between items-center mb-6">
                 <div className="relative w-full max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a candidate..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                </div>
                <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Filter</option>
                        <option>By Job Category</option>
                        <option>By Timeline</option>
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                {candidates.map(candidate => (
                    <CandidateProgressCard key={candidate.id} candidate={candidate} navigate={navigate} />
                ))}
            </div>
        </div>
    );
};

export default EmployerProgressTracker;