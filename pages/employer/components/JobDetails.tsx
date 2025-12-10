
import React, { useState, useMemo } from 'react';
import { MatchedCandidate, CandidateApplicationStatus } from '../../../types';
import { useGlobalState } from '../../../contexts/StateContext';

interface JobDetailsProps {
    onBack: () => void;
    isAdminView?: boolean;
    jobId?: number | null;
    onInvite?: (applicationId: number) => void;
}

const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const OptionsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v7a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zm-1 3V4a1 1 0 112 0v1h-2z" clipRule="evenodd" /></svg>;
const CategoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>;
const SkillIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;

interface CandidateCardProps {
    candidate: MatchedCandidate;
    applicationId: number;
    isInvited: boolean;
    onInvite: (id: number) => void;
    isExpanded: boolean;
    onToggleExpand: (id: number) => void;
}
const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, applicationId, isInvited, onInvite, isExpanded, onToggleExpand }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:border-blue-300">
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
                    onClick={(e) => { e.stopPropagation(); onInvite(applicationId); }}
                    disabled={isInvited}
                    className={`px-5 py-2 font-semibold rounded-md transition-colors text-sm ${
                        isInvited
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    {isInvited ? 'Invite Sent' : 'Invite for Interview'}
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

const ReadOnlyJobView: React.FC<{ onBack: () => void, jobId: number | null }> = ({ onBack, jobId }) => {
    const { jobs } = useGlobalState();
    const jobData = jobs.find(j => j.id === jobId);

    if (!jobData) {
        return (
             <div>
                <button onClick={onBack} className="text-blue-600 hover:underline font-semibold flex items-center mb-4">&larr; Back</button>
                <p>Job not found.</p>
            </div>
        )
    }

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
                    Back
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
                    <Section title="Compensation">
                        <DetailItem label="Salary Range (per month)">{`${jobData.salary.currency} ${jobData.salary.min.toLocaleString()} - ${jobData.salary.max.toLocaleString()}`}</DetailItem>
                    </Section>
                </div>
            </div>
        </div>
    );
};

const JobDetails: React.FC<JobDetailsProps> = ({ onBack, isAdminView = false, jobId = null, onInvite }) => {
    const { jobs, applications, candidates, updateApplicationStatus } = useGlobalState();
    const [expandedCandidateId, setExpandedCandidateId] = useState<number | null>(null);

    const job = jobs.find(j => j.id === jobId);

    const matchedCandidates = useMemo(() => {
        if (!jobId) return [];
        return applications
            .filter(app => app.jobId === jobId)
            .map(app => {
                const candidateProfile = candidates.find(c => c.id === app.candidateId);
                if (!candidateProfile) return null;
                return {
                    applicationId: app.id,
                    isInvited: app.status !== CandidateApplicationStatus.Matched,
                    candidate: {
                        id: candidateProfile.id,
                        name: candidateProfile.name,
                        location: candidateProfile.personalInfo.location,
                        avatarUrl: candidateProfile.avatarUrl,
                        experience: '5+ years', // Mocked, as this is not in main profile data
                        jobCategories: candidateProfile.jobCategories,
                        skills: candidateProfile.skills,
                    } as MatchedCandidate
                };
            })
            .filter(Boolean);
    }, [jobId, applications, candidates]);


    if (isAdminView) {
        return <ReadOnlyJobView onBack={onBack} jobId={jobId} />;
    }
    
    if (!job) {
        return <div>Job not found. <button onClick={onBack} className="text-blue-600">Go Back</button></div>
    }

    const handleToggleExpand = (candidateId: number) => {
        setExpandedCandidateId(prevId => (prevId === candidateId ? null : candidateId));
    };

    const handleInviteInternal = (applicationId: number) => {
        // If an onInvite prop is provided (e.g. from Sales Dashboard), use it.
        // Otherwise, use internal logic to update state.
        if (onInvite) {
            onInvite(applicationId);
        } else {
            updateApplicationStatus(applicationId, CandidateApplicationStatus.InterviewInvited);
            alert("Invitation sent to candidate!");
        }
    }

    return (
        <div>
             <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">View Details</h1>
             </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center space-x-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
                        <div className="flex items-center text-gray-600 mt-1">
                            <LocationIcon />
                            <span>{job.location}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Matched Candidates</h3>
                <div className="space-y-4">
                    {matchedCandidates.length > 0 ? (
                        matchedCandidates.map(match => (
                            match && <CandidateCard
                                key={match.candidate.id}
                                candidate={match.candidate}
                                applicationId={match.applicationId}
                                isInvited={match.isInvited}
                                onInvite={handleInviteInternal}
                                isExpanded={expandedCandidateId === match.candidate.id}
                                onToggleExpand={handleToggleExpand}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No candidates matched yet.</p>
                    )}
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
