
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    JobPosting, ManagedEmployer, CandidateProfileData, GlobalApplication, 
    CandidateApplicationStatus, ProgressStatus, JobStatus, UserType, Client, EmployerStatus
} from '../types';
import { 
    MOCK_JOB_POSTINGS, MOCK_MANAGED_EMPLOYERS, MOCK_CANDIDATE_PROFILE,
    MOCK_CLIENTS
} from '../constants';

interface StateContextType {
    jobs: JobPosting[];
    employers: ManagedEmployer[];
    candidates: CandidateProfileData[];
    applications: GlobalApplication[];
    clients: Client[];
    
    addJob: (job: Omit<JobPosting, 'id' | 'postedDate' | 'status'>) => void;
    addEmployer: (employer: Omit<ManagedEmployer, 'id' | 'status'>) => void;
    addCandidate: (candidate: Omit<CandidateProfileData, 'id'>) => void;
    addClient: (client: Client) => void;
    createApplication: (candidateId: number, jobId: number, employerId: number) => void;
    updateApplicationStatus: (appId: number, status: CandidateApplicationStatus) => void;
    getApplicationsByEmployer: (employerId: number) => GlobalApplication[];
    getApplicationsByCandidate: (candidateId: number) => GlobalApplication[];
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // ========================================================================
    // INITIAL GLOBAL STATE
    // ========================================================================
    
    // Load mock data from constants. In a real app, this would be an API fetch.
    const [jobs, setJobs] = useState<JobPosting[]>(MOCK_JOB_POSTINGS);
    const [employers, setEmployers] = useState<ManagedEmployer[]>(MOCK_MANAGED_EMPLOYERS);
    const [candidates, setCandidates] = useState<CandidateProfileData[]>([MOCK_CANDIDATE_PROFILE]);
    const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
    
    // Initial Applications State (Links Candidates <-> Jobs <-> Employers)
    const [applications, setApplications] = useState<GlobalApplication[]>([
        {
            id: 1,
            candidateId: 1, // Matches MOCK_CANDIDATE_PROFILE.id
            jobId: 1,       // Matches first job in MOCK_JOB_POSTINGS
            employerId: 1,  // Matches first employer
            status: CandidateApplicationStatus.InterviewInvited,
            steps: [
                { name: 'Matched', status: ProgressStatus.Completed },
                { name: 'Interview', status: ProgressStatus.InProgress },
                { name: 'Selected', status: ProgressStatus.Pending },
                { name: 'Medical', status: ProgressStatus.Pending },
                { name: 'Contract', status: ProgressStatus.Pending },
                { name: 'Hired', status: ProgressStatus.Pending },
            ],
            paymentMade: false
        }
    ]);

    // ========================================================================
    // ACTIONS & LOGIC
    // ========================================================================

    const addJob = (jobData: Omit<JobPosting, 'id' | 'postedDate' | 'status'>) => {
        const newJob: JobPosting = {
            id: Date.now(),
            postedDate: new Date().toISOString(),
            status: JobStatus.Active,
            ...jobData
        };
        setJobs(prev => [...prev, newJob]);
        
        // AUTO-MATCH LOGIC: 
        // When a job is posted, check if any existing candidates match based on category.
        candidates.forEach(candidate => {
            if (candidate.jobCategories.includes(newJob.category)) {
                createApplication(candidate.id, newJob.id, newJob.employerId);
            }
        });
    };

    const addEmployer = (employerData: Omit<ManagedEmployer, 'id' | 'status'>) => {
        const newEmployer: ManagedEmployer = {
            id: Date.now(),
            status: EmployerStatus.Pending,
            ...employerData
        };
        setEmployers(prev => [...prev, newEmployer]);
    };

    const addCandidate = (candidateData: Omit<CandidateProfileData, 'id'>) => {
        const newId = Date.now();
        const newCandidate = { ...candidateData, id: newId };
        setCandidates(prev => [...prev, newCandidate]);

        // AUTO-MATCH LOGIC: 
        // When a candidate registers, check against existing active jobs.
        jobs.forEach(job => {
            // Simple match logic based on Category overlap
            if (newCandidate.jobCategories.includes(job.category)) {
                createApplication(newId, job.id, job.employerId);
            }
        });
    };

    const addClient = (client: Client) => {
        // Sales Dashboard: Add a client to the managed list.
        // Check if already exists to prevent duplicates.
        if (!clients.find(c => c.id === client.id)) {
            setClients(prev => [...prev, client]);
        }
    };

    const createApplication = (candidateId: number, jobId: number, employerId: number) => {
        // Prevent duplicate applications for the same candidate/job pair
        const exists = applications.find(app => app.candidateId === candidateId && app.jobId === jobId);
        if (exists) return;

        const newApp: GlobalApplication = {
            id: Date.now(),
            candidateId,
            jobId,
            employerId,
            status: CandidateApplicationStatus.Matched,
            steps: [
                { name: 'Matched', status: ProgressStatus.Completed },
                { name: 'Interview', status: ProgressStatus.Pending },
                { name: 'Selected', status: ProgressStatus.Pending },
                { name: 'Medical', status: ProgressStatus.Pending },
                { name: 'Contract', status: ProgressStatus.Pending },
                { name: 'Hired', status: ProgressStatus.Pending },
            ],
            paymentMade: false
        };
        setApplications(prev => [...prev, newApp]);
    };

    const updateApplicationStatus = (appId: number, status: CandidateApplicationStatus) => {
        setApplications(prev => prev.map(app => {
            if (app.id !== appId) return app;
            
            // Logic to auto-complete previous steps based on the new status
            const newSteps = [...app.steps];
            
            const completeUpTo = (stepName: string) => {
                let found = false;
                return newSteps.map(s => {
                    if (s.name === stepName) {
                        found = true;
                        return { ...s, status: ProgressStatus.InProgress }; // Set current step to In Progress
                    }
                    if (!found) return { ...s, status: ProgressStatus.Completed }; // Mark previous steps complete
                    return { ...s, status: ProgressStatus.Pending }; // Future steps pending
                });
            };

            let updatedSteps = newSteps;
            if (status === CandidateApplicationStatus.InterviewInvited) updatedSteps = completeUpTo('Interview');
            if (status === CandidateApplicationStatus.CandidateSelected) updatedSteps = completeUpTo('Selected');
            if (status === CandidateApplicationStatus.MedicalAccepted) updatedSteps = completeUpTo('Medical');
            if (status === CandidateApplicationStatus.SendContract) updatedSteps = completeUpTo('Contract');
            if (status === CandidateApplicationStatus.Hired) {
                 updatedSteps = newSteps.map(s => ({ ...s, status: ProgressStatus.Completed }));
            }

            return { ...app, status, steps: updatedSteps };
        }));
    };

    // --- Selectors ---

    const getApplicationsByEmployer = (employerId: number) => {
        return applications.filter(app => app.employerId === employerId);
    };

    const getApplicationsByCandidate = (candidateId: number) => {
        return applications.filter(app => app.candidateId === candidateId);
    };

    return (
        <StateContext.Provider value={{
            jobs, employers, candidates, applications, clients,
            addJob, addEmployer, addCandidate, addClient,
            createApplication, updateApplicationStatus,
            getApplicationsByEmployer, getApplicationsByCandidate
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a StateProvider');
    }
    return context;
};
