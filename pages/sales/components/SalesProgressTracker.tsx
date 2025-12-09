
import React, { useState, useMemo } from 'react';
import { SalesCandidateProgress, ProgressStatus, CandidateApplicationStatus, UserType } from '../../../types';
import { useGlobalState } from '../../../contexts/StateContext';

// --- ICONS ---
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;

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

const CandidateProgressCard: React.FC<{ candidateData: SalesCandidateProgress }> = ({ candidateData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [message, setMessage] = useState('');
    const { updateApplicationStatus, sendNotification } = useGlobalState();

    const isHired = candidateData.status === CandidateApplicationStatus.Hired;
    const isRejected = [CandidateApplicationStatus.CandidateRejected, CandidateApplicationStatus.MedicalRejected].includes(candidateData.status);

    const handleMarkComplete = () => {
        const currentStepIndex = candidateData.steps.findIndex(s => s.status === ProgressStatus.InProgress);
        const currentStepName = currentStepIndex !== -1 ? candidateData.steps[currentStepIndex].name : null;

        let nextStatus = candidateData.status;

        // Logic to determine next global status based on current Sales View steps
        if (currentStepName === 'Interview Invite Sent') nextStatus = CandidateApplicationStatus.CandidateSelected;
        else if (currentStepName === 'Candidate Selected') nextStatus = CandidateApplicationStatus.MedicalAccepted; // Simulate docs done
        else if (currentStepName === 'Upload Other Documents') nextStatus = CandidateApplicationStatus.SendContract;
        else if (currentStepName === 'Send Contract') nextStatus = CandidateApplicationStatus.Hired;

        updateApplicationStatus(candidateData.id, nextStatus);
    };

    const handleRequestReupload = () => {
        sendNotification({
            userId: candidateData.candidateId,
            userType: UserType.Candidate,
            message: `Action Required: Please re-upload your documents for ${candidateData.jobTitle} application.`,
            sender: 'Sales Team'
        });
        alert(`Notification sent to ${candidateData.name} to re-upload documents.`);
    };

    const handleSendMessage = () => {
        if (!message.trim()) return;
        sendNotification({
            userId: candidateData.candidateId,
            userType: UserType.Candidate,
            message: `Message from Sales: ${message}`,
            sender: 'Sales Team'
        });
        alert(`Message sent to ${candidateData.name}.`);
        setMessage('');
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
        <div className="bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg border border-gray-200">
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

                    <div className="mt-8 flex flex-col md:flex-row gap-6">
                        {/* Actions Panel */}
                        <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Workflow Actions</h4>
                            {!isHired && !isRejected && inProgressStep ? (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-500">Current Step:</p>
                                        <p className="font-semibold text-blue-600">{inProgressStep.name}</p>
                                    </div>
                                    <button
                                        onClick={handleMarkComplete}
                                        className="px-5 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                                    >
                                        Mark as Complete
                                    </button>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 italic">No active workflow actions available.</p>
                            )}
                        </div>

                        {/* Communication Panel */}
                        <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Communication</h4>
                            <div className="space-y-3">
                                <button 
                                    onClick={handleRequestReupload}
                                    className="w-full px-4 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 font-semibold rounded-lg hover:bg-yellow-100 text-sm flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                    Request Document Re-upload
                                </button>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Send a message to candidate..." 
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <button 
                                        onClick={handleSendMessage}
                                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const SalesProgressTracker: React.FC = () => {
    const { applications, candidates, clients, jobs } = useGlobalState();
    
    // Transform global data into the simplified sales view format
    const candidateProgressData = useMemo<SalesCandidateProgress[]>(() => {
        return applications.map(app => {
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

                // Simple logic to fill bubbles based on global status enum order
                if (globalStatus === CandidateApplicationStatus.Matched) return salesSteps;
                
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
    }, [applications, candidates, clients, jobs]);


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
                            <option>Filter by Employer</option>
                             {clients.map(c => <option key={c.id} value={c.id}>{c.employerName || c.name}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                           <ChevronDownIcon className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
             <div className="space-y-5">
                {candidateProgressData.map(candidate => (
                    <CandidateProgressCard key={candidate.id} candidateData={candidate} />
                ))}
            </div>
        </div>
    );
};

export default SalesProgressTracker;
