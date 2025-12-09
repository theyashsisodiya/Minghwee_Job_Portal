
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    JobPosting, ManagedEmployer, CandidateProfileData, GlobalApplication, 
    CandidateApplicationStatus, ProgressStatus, JobStatus, UserType, Client, EmployerStatus,
    JobRequirement, Salesperson, UserNotification
} from '../types';
import { 
    MOCK_JOB_POSTINGS, MOCK_MANAGED_EMPLOYERS, MOCK_CANDIDATE_PROFILE,
    MOCK_CLIENTS, MOCK_SALESPERSONS
} from '../constants';

interface StateContextType {
    jobs: JobPosting[];
    employers: ManagedEmployer[];
    candidates: CandidateProfileData[];
    applications: GlobalApplication[];
    clients: Client[];
    jobRequirements: JobRequirement[];
    salespersons: Salesperson[];
    userNotifications: UserNotification[];
    
    addJob: (job: Omit<JobPosting, 'id' | 'postedDate' | 'status'>) => void;
    addEmployer: (employer: Omit<ManagedEmployer, 'id' | 'status'>) => number; // Returns ID
    addCandidate: (candidate: Omit<CandidateProfileData, 'id'>) => void;
    addClient: (client: Client) => void;
    addEmployerAsClient: (employerId: number) => void;
    addJobRequirement: (req: Omit<JobRequirement, 'id' | 'status' | 'submittedDate'>) => void;
    markRequirementConverted: (reqId: number) => void;
    
    // Salesperson Management
    addSalesperson: (sp: Omit<Salesperson, 'id' | 'joinedDate' | 'activeEmployers' | 'jobsPosted' | 'activeJobs' | 'successfulHires' | 'candidatesInProgress' | 'efficiency'>) => void;
    removeSalesperson: (id: number) => void;

    createApplication: (candidateId: number, jobId: number, employerId: number) => void;
    updateApplicationStatus: (appId: number, status: CandidateApplicationStatus) => void;
    getApplicationsByEmployer: (employerId: number) => GlobalApplication[];
    getApplicationsByCandidate: (candidateId: number) => GlobalApplication[];
    getRequirementsByEmployer: (employerId: number) => JobRequirement[];

    // Notifications
    sendNotification: (notification: Omit<UserNotification, 'id' | 'timestamp' | 'read'>) => void;
    markNotificationAsRead: (id: number) => void;
    getNotificationsForUser: (userId: number, userType: UserType) => UserNotification[];
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // ========================================================================
    // INITIAL GLOBAL STATE
    // ========================================================================
    
    const [jobs, setJobs] = useState<JobPosting[]>(MOCK_JOB_POSTINGS);
    const [employers, setEmployers] = useState<ManagedEmployer[]>(MOCK_MANAGED_EMPLOYERS);
    const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
    const [jobRequirements, setJobRequirements] = useState<JobRequirement[]>([]);
    const [salespersons, setSalespersons] = useState<Salesperson[]>(MOCK_SALESPERSONS);
    const [userNotifications, setUserNotifications] = useState<UserNotification[]>([]);

    // Load candidates from localStorage or fallback to mock data
    const [candidates, setCandidates] = useState<CandidateProfileData[]>(() => {
        try {
            const storedCandidates = localStorage.getItem('minghwee_candidates');
            if (storedCandidates) {
                return JSON.parse(storedCandidates);
            }
        } catch (error) {
            console.error("Failed to parse candidates from localStorage", error);
        }
        return [MOCK_CANDIDATE_PROFILE]; // Fallback if localStorage is empty or fails
    });
    
    // Initial Applications State (Links Candidates <-> Jobs <-> Employers)
    const [applications, setApplications] = useState<GlobalApplication[]>([
        {
            id: 1,
            candidateId: 1, // Matches MOCK_CANDIDATE_PROFILE.id
            jobId: 1,       // Matches first job in MOCK_JOB_POSTINGS
            employerId: 1,  // Matches first employer
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
        
        candidates.forEach(candidate => {
            if (candidate.jobCategories.includes(newJob.category)) {
                createApplication(candidate.id, newJob.id, newJob.employerId);
            }
        });
    };

    const addEmployer = (employerData: Omit<ManagedEmployer, 'id' | 'status'>) => {
        const newId = Date.now();
        const newEmployer: ManagedEmployer = {
            id: newId,
            status: EmployerStatus.Pending,
            ...employerData
        };
        setEmployers(prev => [...prev, newEmployer]);
        return newId;
    };

    const addCandidate = (candidateData: Omit<CandidateProfileData, 'id'>) => {
        const newId = Date.now();
        const newCandidate: CandidateProfileData = { ...candidateData, id: newId };
        
        setCandidates(prev => {
            const updatedCandidates = [...prev, newCandidate];
            try {
                localStorage.setItem('minghwee_candidates', JSON.stringify(updatedCandidates));
            } catch (error) {
                console.error("Failed to save candidates to localStorage", error);
            }
            return updatedCandidates;
        });

        jobs.forEach(job => {
            if (newCandidate.jobCategories.includes(job.category)) {
                createApplication(newId, job.id, job.employerId);
            }
        });
    };

    const addClient = (client: Client) => {
        setClients(prev => {
            if (prev.find(c => c.id === client.id)) return prev;
            return [...prev, client];
        });
    };

    const addEmployerAsClient = (employerId: number) => {
        const employer = employers.find(e => e.id === employerId);
        if (!employer) return;

        const clientExists = clients.some(c => c.id === employer.id);
        if (clientExists) return;

        const newClient: Client = {
            id: employer.id,
            name: employer.name,
            employerName: employer.employerName, 
            email: employer.email,
            contact: employer.contact,
            isRegistered: true
        };
        setClients(prev => [...prev, newClient]);
    };

    const addJobRequirement = (req: Omit<JobRequirement, 'id' | 'status' | 'submittedDate'>) => {
        const newReq: JobRequirement = {
            id: Date.now(),
            status: 'Pending Review',
            submittedDate: new Date().toISOString(),
            ...req
        };
        setJobRequirements(prev => [...prev, newReq]);
    };

    const markRequirementConverted = (reqId: number) => {
        setJobRequirements(prev => prev.map(req => 
            req.id === reqId ? { ...req, status: 'Converted to Job' } : req
        ));
    };

    // --- Salesperson Management Actions ---
    
    const addSalesperson = (spData: Omit<Salesperson, 'id' | 'joinedDate' | 'activeEmployers' | 'jobsPosted' | 'activeJobs' | 'successfulHires' | 'candidatesInProgress' | 'efficiency'>) => {
        const newSalesperson: Salesperson = {
            id: Date.now(),
            joinedDate: new Date().toISOString(),
            activeEmployers: 0,
            jobsPosted: 0,
            activeJobs: 0,
            successfulHires: 0,
            candidatesInProgress: 0,
            efficiency: 0,
            ...spData
        };
        setSalespersons(prev => [...prev, newSalesperson]);
    };

    const removeSalesperson = (id: number) => {
        setSalespersons(prev => prev.filter(sp => sp.id !== id));
    };

    const createApplication = (candidateId: number, jobId: number, employerId: number) => {
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
            
            const newSteps = [...app.steps];
            const completeUpTo = (stepName: string) => {
                let found = false;
                return newSteps.map(s => {
                    if (s.name === stepName) {
                        found = true;
                        return { ...s, status: ProgressStatus.InProgress };
                    }
                    if (!found) return { ...s, status: ProgressStatus.Completed };
                    return { ...s, status: ProgressStatus.Pending };
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

    // --- Notification Logic ---
    const sendNotification = (notification: Omit<UserNotification, 'id' | 'timestamp' | 'read'>) => {
        const newNotification: UserNotification = {
            ...notification,
            id: Date.now(),
            timestamp: new Date().toISOString(),
            read: false
        };
        setUserNotifications(prev => [newNotification, ...prev]);
    };

    const markNotificationAsRead = (id: number) => {
        setUserNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const getNotificationsForUser = (userId: number, userType: UserType) => {
        // For demonstration, if userId is 0 or -1, return all for that type, or filter by specific ID
        // In a real app, strict filtering by ID is needed.
        // Here, we'll try to match exact ID if possible, otherwise mostly match type.
        
        // Using a loose match for demo simplicity since we use mock IDs like '1' for everyone
        return userNotifications.filter(n => n.userType === userType && (n.userId === userId || n.userId === 0)); 
    };

    // --- Selectors ---

    const getApplicationsByEmployer = (employerId: number) => {
        return applications.filter(app => app.employerId === employerId);
    };

    const getApplicationsByCandidate = (candidateId: number) => {
        return applications.filter(app => app.candidateId === candidateId);
    };

    const getRequirementsByEmployer = (employerId: number) => {
        return jobRequirements.filter(req => req.employerId === employerId);
    };

    return (
        <StateContext.Provider value={{
            jobs, employers, candidates, applications, clients, jobRequirements, salespersons, userNotifications,
            addJob, addEmployer, addCandidate, addClient, addEmployerAsClient,
            addJobRequirement, markRequirementConverted, addSalesperson, removeSalesperson,
            createApplication, updateApplicationStatus,
            getApplicationsByEmployer, getApplicationsByCandidate, getRequirementsByEmployer,
            sendNotification, markNotificationAsRead, getNotificationsForUser
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
