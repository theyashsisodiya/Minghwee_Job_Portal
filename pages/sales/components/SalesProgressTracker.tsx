import React, { useState } from 'react';
import { MOCK_SALES_CANDIDATE_PROGRESS } from '../../../constants';
import { SalesCandidateProgress, ProgressStatus, ProgressStep } from '../../../types';

// --- ICONS ---
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>;

// Step Icons
const EnvelopeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;
const UserCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /><path d="M15.854 12.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708L12.5 14.793l2.646-2.647a.5.5 0 01.708 0z" /></svg>;
const DocumentArrowUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6v12a1 1 0 11-2 0V4zm3 9.707a.5.5 0 01.854.353V15.5a.5.5 0 001 0v-1.44a.5.5 0 01.854-.353l1.465 1.465a.5.5 0 00.707-.707l-2.121-2.121a.5.5 0 00-.707 0l-2.121 2.121a.5.5 0 00.707.707L7 13.707z" clipRule="evenodd" /></svg>;
const DocumentTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v1a1 1 0 102 0v-1zm5-1a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1zm-2-2a1 1 0 10-2 0v1a1 1 0 102 0V9z" clipRule="evenodd" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const XMarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>;


const getStepIcon = (stepName: string) => {
    const stepIcons: { [key: string]: React.ReactNode } = {
        'Interview Invite Sent': <EnvelopeIcon />,
        'Candidate Selected': <UserCheckIcon />,
        'Upload Other Documents': <DocumentArrowUpIcon />,
        'Send Contract': <DocumentTextIcon />,
    };
    return stepIcons[stepName] || <CheckIcon />;
};

const getStyling = (status: ProgressStatus, isHired: boolean) => {
    if (isHired) return {
        node: 'bg-green-500 border-green-500',
        icon: 'text-white',
        text: 'text-green-700',
        line: 'bg-green-500',
    };

    switch (status) {
        case ProgressStatus.Completed: return {
            node: 'bg-blue-600 border-blue-600',
            icon: 'text-white',
            text: 'text-blue-700',
            line: 'bg-blue-600',
        };
        case ProgressStatus.InProgress: return {
            node: 'bg-yellow-100 border-yellow-500',
            icon: 'text-yellow-600',
            text: 'text-yellow-700',
            line: 'bg-gray-200',
        };
        case ProgressStatus.Rejected: return {
            node: 'bg-red-500 border-red-500',
            icon: 'text-white',
            text: 'text-red-700',
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

const CandidateProgressCard: React.FC<{ candidateData: SalesCandidateProgress, onUpdate: (updatedCandidate: SalesCandidateProgress) => void }> = ({ candidateData, onUpdate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isHired = candidateData.steps.every(s => s.status === ProgressStatus.Completed);
    const isRejected = candidateData.steps.some(s => s.status === ProgressStatus.Rejected);

    const handleMarkComplete = () => {
        const inProgressIndex = candidateData.steps.findIndex(s => s.status === ProgressStatus.InProgress);
        if (inProgressIndex === -1) return;

        const updatedSteps = [...candidateData.steps];
        updatedSteps[inProgressIndex].status = ProgressStatus.Completed;
        if (inProgressIndex + 1 < updatedSteps.length) {
            updatedSteps[inProgressIndex + 1].status = ProgressStatus.InProgress;
        }
        onUpdate({ ...candidateData, steps: updatedSteps });
    };

    const handleSendContract = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.doc,.docx';
        fileInput.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                alert(`Contract "${file.name}" uploaded for ${candidateData.name}.`);
                handleMarkComplete();
            }
        };
        fileInput.click();
    };
    
    const getStatusBadge = () => {
        if (isHired) return <div className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">Hired</div>;
        if (isRejected) return <div className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">Rejected</div>;
        const inProgressStep = candidateData.steps.find(s => s.status === ProgressStatus.InProgress);
        if (inProgressStep) return <div className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">In Progress</div>;
        return <div className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">Pending</div>;
    }
    
    const inProgressStep = candidateData.steps.find(s => s.status === ProgressStatus.InProgress);

    return (
        <div className="bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg">
            <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center space-x-4">
                    <img src={candidateData.avatarUrl} alt={candidateData.name} className="w-14 h-14 rounded-full" />
                    <div>
                        <p className="font-bold text-lg text-gray-800">{candidateData.name}</p>
                        <p className="text-sm text-gray-500">{candidateData.jobTitle} @ <span className="font-medium text-gray-600">{candidateData.clientName}</span></p>
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
                        {candidateData.steps.map((step, index) => {
                             const style = getStyling(step.status, isHired);
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
                                        <p className={`text-xs mt-2 font-semibold text-center w-24 transition-colors duration-300 ${style.text}`}>{step.name}</p>
                                    </div>
                                    {index < candidateData.steps.length - 1 && (
                                        <div className={`flex-1 h-1 mt-5 transition-colors duration-300 ${getStyling(step.status, isHired).line}`}></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {!isHired && !isRejected && inProgressStep && (
                        <div className="mt-8 pt-4 border-t flex justify-between items-center">
                            <div>
                               <p className="text-sm text-gray-600">Next Action:</p>
                               <p className="text-sm font-medium text-gray-800">{inProgressStep.name}</p>
                            </div>
                            {inProgressStep.name === "Send Contract" ? (
                                <button
                                    onClick={handleSendContract}
                                    className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-sm"
                                >
                                    Upload & Send Contract
                                </button>
                            ) : (
                                <button
                                    onClick={handleMarkComplete}
                                    className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-sm shadow-sm"
                                >
                                    Mark as Complete
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const SalesProgressTracker: React.FC = () => {
    const [candidates, setCandidates] = useState<SalesCandidateProgress[]>(MOCK_SALES_CANDIDATE_PROGRESS);

    const handleUpdateCandidate = (updatedCandidate: SalesCandidateProgress) => {
        setCandidates(prev => prev.map(c => c.id === updatedCandidate.id ? updatedCandidate : c));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Candidate Progress Tracker</h1>
                 <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Search candidate..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                    </div>
                     <div className="relative">
                        <select className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Filter by Client</option>
                            <option>BuildWell Construction</option>
                            <option>Rapid Logistics PH</option>
                            <option>SG Manufacturing</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                           <ChevronDownIcon className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
             <div className="space-y-5">
                {candidates.map(candidate => (
                    <CandidateProgressCard key={candidate.id} candidateData={candidate} onUpdate={handleUpdateCandidate} />
                ))}
            </div>
        </div>
    );
};

export default SalesProgressTracker;
