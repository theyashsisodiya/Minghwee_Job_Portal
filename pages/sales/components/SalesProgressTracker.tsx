
import React, { useState, useMemo, useRef } from 'react';
import { SalesCandidateProgress, ProgressStatus, CandidateApplicationStatus, UserType } from '../../../types';
import { useGlobalState } from '../../../contexts/StateContext';

// --- ICONS ---
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const XCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const UndoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>;

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
        text: 'text-green-700 font-bold',
        line: 'bg-green-500',
    };

    switch (status) {
        case ProgressStatus.Completed: return {
            node: 'bg-blue-600 border-blue-600',
            icon: 'text-white',
            text: 'text-blue-700 font-bold',
            line: 'bg-blue-600',
        };
        case ProgressStatus.InProgress: return {
            node: 'bg-yellow-100 border-yellow-500 ring-2 ring-yellow-200',
            icon: 'text-yellow-600',
            text: 'text-yellow-700 font-bold',
            line: 'bg-gray-200',
        };
        case ProgressStatus.Rejected: return {
            node: 'bg-red-500 border-red-500',
            icon: 'text-white',
            text: 'text-red-700 font-bold',
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

interface ControlProps {
    candidateData: SalesCandidateProgress;
    onUpdate: (appId: number, nextStatus: CandidateApplicationStatus) => void;
    onRevert: (appId: number) => void;
}

const CandidateProgressCard: React.FC<ControlProps> = ({ candidateData, onUpdate, onRevert }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isHired = candidateData.steps.every(s => s.status === ProgressStatus.Completed);
    const isRejected = candidateData.steps.some(s => s.status === ProgressStatus.Rejected);

    // Identify current active step
    const inProgressIndex = candidateData.steps.findIndex(s => s.status === ProgressStatus.InProgress);
    const currentStep = inProgressIndex !== -1 ? candidateData.steps[inProgressIndex] : null;

    const handleMarkComplete = () => {
        let nextStatus = candidateData.status;
        const currentStepName = currentStep ? currentStep.name : '';

        // Logic: What happens when we complete the current step?
        if (currentStepName === 'Interview Invite Sent') nextStatus = CandidateApplicationStatus.InterviewInvited;
        else if (currentStepName === 'Candidate Selected') nextStatus = CandidateApplicationStatus.CandidateSelected; 
        else if (currentStepName === 'Upload Other Documents') nextStatus = CandidateApplicationStatus.MedicalAccepted; 
        else if (currentStepName === 'Send Contract') nextStatus = CandidateApplicationStatus.Hired;

        if (nextStatus !== candidateData.status) {
            onUpdate(candidateData.id, nextStatus);
        }
    };

    const handleContractUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, upload logic here
            alert(`Contract '${file.name}' uploaded and sent successfully to ${candidateData.name}.`);
            // Sending contract completes the "Send Contract" step, moving status to Hired
            onUpdate(candidateData.id, CandidateApplicationStatus.Hired);
        }
    };

    const handleReject = () => {
        onUpdate(candidateData.id, CandidateApplicationStatus.CandidateRejected);
    };

    const handleRevert = () => {
        onRevert(candidateData.id);
    };
    
    const getStatusBadge = () => {
        if (isHired) return <div className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800 border border-green-200">HIRED</div>;
        if (isRejected) return <div className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800 border border-red-200">REJECTED</div>;
        
        if (currentStep) return <div className="px-3 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-100 uppercase">{currentStep.name}</div>;
        return <div className="px-3 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-600 border border-gray-200">PENDING</div>;
    }

    return (
        <div className={`bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md border ${isRejected ? 'border-red-200' : 'border-gray-200'}`}>
            <div className="p-5 flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <img src={candidateData.avatarUrl} alt={candidateData.name} className="w-14 h-14 rounded-full border border-gray-100" />
                        {isRejected && <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-1"><XMarkIcon /></div>}
                        {isHired && <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1"><CheckIcon /></div>}
                    </div>
                    <div>
                        <p className="font-bold text-lg text-gray-800">{candidateData.name}</p>
                        <p className="text-sm text-gray-500">{candidateData.jobTitle} <span className="text-gray-300">|</span> <span className="font-medium text-gray-700">{candidateData.clientName}</span></p>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    {getStatusBadge()}
                    <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </div>
            
            {isExpanded && (
                <div className="bg-gray-50/50 p-6 border-t border-gray-100">
                    {/* Visual Timeline */}
                    <div className="flex items-start mb-8 relative px-4">
                        {candidateData.steps.map((step, index) => {
                             const style = getStyling(step.status, isHired);
                             const icon = step.status === ProgressStatus.Completed ? <CheckIcon /> :
                                          step.status === ProgressStatus.InProgress ? <ClockIcon /> :
                                          step.status === ProgressStatus.Rejected ? <XMarkIcon /> :
                                          getStepIcon(step.name);
                             return (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col items-center relative z-10 w-24">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-sm ${style.node}`}>
                                            <span className={`transition-colors duration-300 ${style.icon}`}>{icon}</span>
                                        </div>
                                        <p className={`text-[10px] mt-2 font-bold text-center uppercase tracking-wide leading-tight ${style.text}`}>{step.name}</p>
                                    </div>
                                    {index < candidateData.steps.length - 1 && (
                                        <div className={`flex-1 h-1 mt-5 transition-all duration-500 ${getStyling(step.status, isHired).line}`}></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Action Control Panel */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Current Stage:</span>
                            <span className={`text-sm font-bold ${isRejected ? 'text-red-600' : isHired ? 'text-green-600' : 'text-blue-600'}`}>
                                {isRejected ? 'Application Rejected' : isHired ? 'Hiring Completed' : currentStep?.name || 'Pending'}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Revert / Undo Action */}
                            <button
                                onClick={(e) => { e.stopPropagation(); handleRevert(); }}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 font-semibold rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-colors text-sm border border-gray-200"
                                title="Undo last action"
                            >
                                <UndoIcon />
                                <span>{isRejected ? 'Reactivate' : 'Revert Step'}</span>
                            </button>

                            {/* Actions Buttons - Only show if active and step exists */}
                            {!isHired && !isRejected && currentStep && (
                                <>
                                    {/* Reject Action */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleReject(); }}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors text-sm"
                                    >
                                        <XCircleIcon />
                                        <span>Reject</span>
                                    </button>

                                    {/* Dynamic Action Button */}
                                    {currentStep.name === 'Send Contract' ? (
                                        <>
                                            <input 
                                                type="file" 
                                                ref={fileInputRef} 
                                                className="hidden" 
                                                accept="application/pdf"
                                                onChange={handleContractUpload}
                                                onClick={(e) => e.stopPropagation()} 
                                            />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                                                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                                            >
                                                <DocumentTextIcon />
                                                <span>Send Contract PDF</span>
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleMarkComplete(); }}
                                            className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                                        >
                                            <CheckCircleIcon />
                                            <span>Mark Complete</span>
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const SalesProgressTracker: React.FC = () => {
    const { applications, candidates, clients, jobs, updateApplicationStatus, revertApplicationStatus } = useGlobalState();
    const [clientFilter, setClientFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Transform global data into the simplified sales view format
    const candidateProgressData = useMemo<SalesCandidateProgress[]>(() => {
        let filteredApps = applications;

        if (clientFilter) {
            filteredApps = filteredApps.filter(app => app.employerId === parseInt(clientFilter));
        }

        return filteredApps.map(app => {
            const candidate = candidates.find(c => c.id === app.candidateId);
            const client = clients.find(c => c.id === app.employerId);
            const job = jobs.find(j => j.id === app.jobId);

            // Map Global Steps to Simple Sales Steps
            const mapGlobalToSalesSteps = (globalStatus: CandidateApplicationStatus) => {
                const salesSteps = [
                    { name: 'Interview Invite Sent', status: ProgressStatus.Pending },
                    { name: 'Candidate Selected', status: ProgressStatus.Pending },
                    { name: 'Upload Other Documents', status: ProgressStatus.Pending },
                    { name: 'Send Contract', status: ProgressStatus.Pending },
                ];

                // If rejected, mark all bubbles as rejected for visual clarity
                if (globalStatus === CandidateApplicationStatus.CandidateRejected || globalStatus === CandidateApplicationStatus.MedicalRejected) {
                     return salesSteps.map(s => ({...s, status: ProgressStatus.Rejected}));
                }

                // If Matched (initial state), set first step as InProgress so buttons appear
                if (globalStatus === CandidateApplicationStatus.Matched) {
                    salesSteps[0].status = ProgressStatus.InProgress;
                    return salesSteps;
                }
                
                salesSteps[0].status = ProgressStatus.Completed; // Invite Sent
                if (globalStatus === CandidateApplicationStatus.InterviewInvited) {
                    salesSteps[1].status = ProgressStatus.InProgress;
                    return salesSteps;
                }

                salesSteps[1].status = ProgressStatus.Completed; // Selected
                if (globalStatus === CandidateApplicationStatus.CandidateSelected) {
                    salesSteps[2].status = ProgressStatus.InProgress;
                    return salesSteps;
                }

                salesSteps[2].status = ProgressStatus.Completed; // Docs/Medical
                if (globalStatus === CandidateApplicationStatus.MedicalAccepted) {
                    salesSteps[3].status = ProgressStatus.InProgress;
                    return salesSteps;
                }

                salesSteps[3].status = ProgressStatus.Completed; // Contract Sent (Hired)
                if (globalStatus === CandidateApplicationStatus.Hired) {
                    // All done
                }
                return salesSteps;
            };

            return {
                id: app.id,
                candidateId: candidate?.id || 0,
                name: candidate?.name || 'N/A',
                avatarUrl: candidate?.avatarUrl || '',
                clientName: client?.employerName || client?.name || 'N/A',
                jobTitle: job?.title || 'N/A',
                steps: mapGlobalToSalesSteps(app.status),
                status: app.status
            };
        });
    }, [applications, candidates, clients, jobs, clientFilter]);

    const filteredCandidates = useMemo(() => {
        return candidateProgressData.filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            c.clientName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [candidateProgressData, searchQuery]);

    const handleUpdateCandidate = (appId: number, nextStatus: CandidateApplicationStatus) => {
        updateApplicationStatus(appId, nextStatus);
    };

    const handleRevertCandidate = (appId: number) => {
        revertApplicationStatus(appId);
    };

    return (
        <div className="pb-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Candidate Progress Tracker</h1>
                    <p className="text-gray-500 mt-1">Manage and update candidate hiring stages.</p>
                </div>
                 <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search candidate..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                        />
                    </div>
                     <div className="relative">
                        <select 
                            value={clientFilter}
                            onChange={(e) => setClientFilter(e.target.value)}
                            className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
                        >
                            <option value="">All Clients</option>
                             {clients.map(c => <option key={c.id} value={c.id}>{c.employerName || c.name}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                           <ChevronDownIcon className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
             <div className="space-y-6">
                {filteredCandidates.length > 0 ? (
                    filteredCandidates.map(candidate => (
                        <CandidateProgressCard 
                            key={candidate.id} 
                            candidateData={candidate} 
                            onUpdate={handleUpdateCandidate} 
                            onRevert={handleRevertCandidate}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <p className="text-gray-500">No candidates found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalesProgressTracker;
