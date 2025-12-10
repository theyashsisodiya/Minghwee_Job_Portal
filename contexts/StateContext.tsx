
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

interface AdminProfile {
    name: string;
    email: string;
    phone: string;
    role: string;
    employeeId: string;
}

interface StateContextType {
    jobs: JobPosting[];
    employers: ManagedEmployer[];
    candidates: CandidateProfileData[];
    applications: GlobalApplication[];
    clients: Client[];
    jobRequirements: JobRequirement[];
    salespersons: Salesperson[];
    userNotifications: UserNotification[];
    adminProfile: AdminProfile;
    
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
    revertApplicationStatus: (appId: number) => void;
    getApplicationsByEmployer: (employerId: number) => GlobalApplication[];
    getApplicationsByCandidate: (candidateId: number) => GlobalApplication[];
    getRequirementsByEmployer: (employerId: number) => JobRequirement[];

    // Notifications & Messages
    sendNotification: (notification: Omit<UserNotification, 'id' | 'timestamp' | 'read'>) => void;
    sendHelpMessage: (senderId: number, senderName: string, message: string) => void;
    markNotificationAsRead: (id: number) => void;
    getNotificationsForUser: (userId: number, userType: UserType) => UserNotification[];

    // Admin Profile
    updateAdminProfile: (data: Partial<AdminProfile>) => void;
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
    
    // Admin Profile State
    const [adminProfile, setAdminProfile] = useState<AdminProfile>({
        name: 'Administrator',
        email: 'admin@minghwee.com',
        phone: '+65 6789 0123',
        role: 'Super Admin',
        employeeId: 'ADM-001'
    });

    // Initial notifications (Mock data for demo)
    const [userNotifications, setUserNotifications] = useState<UserNotification[]>([
        {
            id: 1,
            userId: 0,
            userType: UserType.Admin,
            message: "System maintenance scheduled for midnight.",
            sender: "System",
            timestamp: new Date().toISOString(),
            read: false,
            type: 'general'
        }
    ]);

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
            
            // Logic to update step statuses based on the global Application Status
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
            
            // Special handling for rejection
            if (status === CandidateApplicationStatus.CandidateRejected || status === CandidateApplicationStatus.MedicalRejected) {
                // Find current in-progress and mark as rejected
                updatedSteps = newSteps.map(s => 
                    s.status === ProgressStatus.InProgress ? { ...s, status: ProgressStatus.Rejected } : s
                );
            } else if (status === CandidateApplicationStatus.Matched) {
                // Reset
                updatedSteps = newSteps.map((s, i) => ({ 
                    ...s, 
                    status: i === 0 ? ProgressStatus.Completed : (i === 1 ? ProgressStatus.Pending : ProgressStatus.Pending) 
                }));
            } else {
                // Normal progression
                if (status === CandidateApplicationStatus.InterviewInvited) updatedSteps = completeUpTo('Interview');
                if (status === CandidateApplicationStatus.CandidateSelected) updatedSteps = completeUpTo('Selected');
                if (status === CandidateApplicationStatus.MedicalAccepted) updatedSteps = completeUpTo('Medical');
                if (status === CandidateApplicationStatus.SendContract) updatedSteps = completeUpTo('Contract');
                if (status === CandidateApplicationStatus.Hired) {
                     updatedSteps = newSteps.map(s => ({ ...s, status: ProgressStatus.Completed }));
                }
            }

            return { ...app, status, steps: updatedSteps };
        }));
    };

    const revertApplicationStatus = (appId: number) => {
        const app = applications.find(a => a.id === appId);
        if (!app) return;

        let prevStatus = app.status;
        switch (app.status) {
            case CandidateApplicationStatus.Hired: prevStatus = CandidateApplicationStatus.SendContract; break;
            case CandidateApplicationStatus.SendContract: prevStatus = CandidateApplicationStatus.MedicalAccepted; break;
            case CandidateApplicationStatus.MedicalAccepted: prevStatus = CandidateApplicationStatus.CandidateSelected; break;
            case CandidateApplicationStatus.CandidateSelected: prevStatus = CandidateApplicationStatus.InterviewInvited; break;
            case CandidateApplicationStatus.InterviewInvited: prevStatus = CandidateApplicationStatus.Matched; break;
            // If rejected, allow reset to Matched or the step before rejection? 
            // For simplicity, reactivating implies starting fresh or going to Matched/Invited.
            // Let's go to Matched to be safe and let user fast forward.
            case CandidateApplicationStatus.CandidateRejected:
            case CandidateApplicationStatus.MedicalRejected:
                prevStatus = CandidateApplicationStatus.Matched; 
                break;
            default: break;
        }
        
        if (prevStatus !== app.status) {
            updateApplicationStatus(appId, prevStatus);
        }
    };

    // --- Notification & Message Logic ---
    
    const sendNotification = (notification: Omit<UserNotification, 'id' | 'timestamp' | 'read'>) => {
        const newNotification: UserNotification = {
            ...notification,
            id: Date.now(),
            timestamp: new Date().toISOString(),
            read: false
        };
        setUserNotifications(prev => [newNotification, ...prev]);
    };

    // New Function specifically for Salesperson -> Admin Help Requests
    const sendHelpMessage = (senderId: number, senderName: string, message: string) => {
        const newNotification: UserNotification = {
            id: Date.now(),
            userId: 0, // 0 usually targets All Admins in this logic
            userType: UserType.Admin,
            message: message,
            sender: senderName, // Display name
            senderId: senderId, // ID for profile lookup
            timestamp: new Date().toISOString(),
            read: false,
            type: 'help_request' // Distinction for UI logic
        };
        // Persist to state immediately
        setUserNotifications(prev => [newNotification, ...prev]);
        console.log("Help message stored in global state:", newNotification);
    };

    const markNotificationAsRead = (id: number) => {
        setUserNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const getNotificationsForUser = (userId: number, userType: UserType) => {
        // userId 0 implies broadcast to all users of that type (e.g. all admins)
        return userNotifications.filter(n => n.userType === userType && (n.userId === userId || n.userId === 0)); 
    };

    // --- Admin Profile ---
    const updateAdminProfile = (data: Partial<AdminProfile>) => {
        setAdminProfile(prev => ({ ...prev, ...data }));
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
            jobs, employers, candidates, applications, clients, jobRequirements, salespersons, userNotifications, adminProfile,
            addJob, addEmployer, addCandidate, addClient, addEmployerAsClient,
            addJobRequirement, markRequirementConverted, addSalesperson, removeSalesperson,
            createApplication, updateApplicationStatus, revertApplicationStatus,
            getApplicationsByEmployer, getApplicationsByCandidate, getRequirementsByEmployer,
            sendNotification, sendHelpMessage, markNotificationAsRead, getNotificationsForUser,
            updateAdminProfile
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
