import type { 
    InterviewInvite, JobPosting, MatchedCandidate, CandidateProgress, ScheduledInterview,
    AdminDashboardStats, ManagedCandidate,
    ManagedEmployer, EmployerRegistrationApproval, CandidatePlacementApproval, CandidateProfileData,
    EmployerProfileData, AdminDocument, InterviewedCandidate, Client, SalesCandidateProgress, PreUploadedDocument, JobApplicationProgress, SubmittedDocument
} from './types';
import { ProgressStatus, JobStatus, CandidateApplicationStatus, DocumentStatus, EmployerStatus, PaymentStatus } from './types';

export const MOCK_CLIENTS: Client[] = [
    { id: 1, name: 'BuildWell Construction', email: 'contact@buildwell.com', contact: '+65 1111 2222' },
    { id: 2, name: 'Rapid Logistics PH', email: 'info@rapidlogistics.ph', contact: '+63 917 123 4567' },
    { id: 3, name: 'SG Manufacturing', email: 'hr@sgm.com.sg', contact: '+65 3333 4444' },
];

export const MOCK_INTERVIEW_INVITES: InterviewInvite[] = [
    {
        id: 1,
        companyName: 'WeldRight Fabricators',
        jobTitle: 'Certified Welder',
        location: 'Singapore',
        logoUrl: 'https://picsum.photos/seed/1/50/50',
        description: 'We are looking for a skilled Certified Welder to join our team. The ideal candidate will have experience with TIG and MIG welding and be able to read blueprints.',
        matchReason: 'Your skills in "Welding" match this job.',
        interviewType: 'Live',
        status: 'Active',
        requiredDocuments: ['Passport', 'CV / Resume', 'Police Clearance'],
    },
    {
        id: 2,
        companyName: 'BuildRight Construction',
        jobTitle: 'General Labourer',
        location: 'Singapore',
        logoUrl: 'https://picsum.photos/seed/2/50/50',
        description: 'Seeking hardworking and reliable general labourers for various construction projects. No experience necessary, training will be provided.',
        matchReason: 'Your experience in "Construction" is a good fit.',
        interviewType: 'Recorded',
        status: 'Active',
        requiredDocuments: ['Passport', 'National ID'],
    },
];

export const MOCK_CANDIDATE_APPLICATIONS: JobApplicationProgress[] = [
    {
        id: 1,
        companyName: 'SG Piping Solutions',
        jobTitle: 'Plumber',
        location: 'Singapore',
        logoUrl: 'https://picsum.photos/seed/5/50/50',
        steps: [
            { name: 'Matched', status: ProgressStatus.Completed, date: '2024-07-20' },
            { name: 'Invited', status: ProgressStatus.Completed, date: '2024-07-21' },
            { name: 'Interview Scheduled', status: ProgressStatus.Completed, date: '2024-07-22' },
            { name: 'Interview Completed', status: ProgressStatus.Completed, date: '2024-07-25' },
            { name: 'Awaiting Payment', status: ProgressStatus.InProgress, date: '2024-07-26' },
            { name: 'Documents Submitted', status: ProgressStatus.Pending, date: null },
            { name: 'Documents Verified', status: ProgressStatus.Pending, date: null },
            { name: 'Offer Sent', status: ProgressStatus.Pending, date: null },
            { name: 'Contract Signed', status: ProgressStatus.Pending, date: null },
            { name: 'Pre-Departure', status: ProgressStatus.Pending, date: null },
            { name: 'Handover', status: ProgressStatus.Pending, date: null },
            { name: 'Onboarded', status: ProgressStatus.Pending, date: null },
        ],
        submittedDocuments: [
             { id: 1, type: 'Passport', fileName: 'Passport_JohnDoe.pdf', uploadDate: '2024-07-15', version: 1, status: DocumentStatus.Verified },
             { id: 2, type: 'CV / Resume', fileName: 'JohnDoe_CV_2024.pdf', uploadDate: '2024-07-15', version: 1, status: DocumentStatus.Verified },
        ]
    },
    {
        id: 2,
        companyName: 'Creative Builders',
        jobTitle: 'Electrician',
        location: 'Singapore',
        logoUrl: 'https://picsum.photos/seed/6/50/50',
        steps: [
            { name: 'Matched', status: ProgressStatus.Completed, date: '2024-07-18' },
            { name: 'Invited', status: ProgressStatus.Completed, date: '2024-07-19' },
            { name: 'Interview Scheduled', status: ProgressStatus.Completed, date: '2024-07-20' },
            { name: 'Interview Completed', status: ProgressStatus.Completed, date: '2024-07-21' },
            { name: 'Awaiting Payment', status: ProgressStatus.Completed, date: '2024-07-22' },
            { name: 'Documents Submitted', status: ProgressStatus.Completed, date: '2024-07-23' },
            { name: 'Documents Verified', status: ProgressStatus.Completed, date: '2024-07-24' },
            { name: 'Offer Sent', status: ProgressStatus.InProgress, date: '2024-07-25' },
            { name: 'Contract Signed', status: ProgressStatus.Pending, date: null },
            { name: 'Pre-Departure', status: ProgressStatus.Pending, date: null },
            { name: 'Handover', status: ProgressStatus.Pending, date: null },
            { name: 'Onboarded', status: ProgressStatus.Pending, date: null },
        ],
        requestedDocuments: [
            { type: 'Police Clearance', deadline: '2024-08-15', status: 'Pending' }
        ],
        submittedDocuments: []
    },
];

export const MOCK_PRE_UPLOADED_DOCUMENTS: PreUploadedDocument[] = [
    { id: 1, type: 'Passport', fileName: 'Passport_JohnDoe.pdf', uploadDate: '2024-07-15', expiryDate: '2028-12-31' },
    { id: 2, type: 'CV / Resume', fileName: 'JohnDoe_CV_2024.pdf', uploadDate: '2024-07-15' },
    { id: 3, type: 'National ID', fileName: 'National_ID_JD.jpg', uploadDate: '2024-07-15' },
    { id: 4, type: 'Experience Certificate', fileName: 'Previous_Company_Ref.pdf', uploadDate: '2024-07-18' },
];

export const DOCUMENT_TYPES = [
    'Passport', 'National ID', 'CV / Resume', 'Passport-size Photo',
    'Medical Certificate', 'Experience Certificate', 'Police Clearance / PCC',
    'Insurance Policy', 'Security Bond', 'Embassy-stamped Docs', 'IPA Scan',
    'OEC', 'Airline Ticket', 'Job Offer Form', 'Signed Employment Contract'
];


export const MOCK_SALES_CANDIDATE_PROGRESS: SalesCandidateProgress[] = [
    {
        id: 1,
        name: 'Arjun Sharma',
        avatarUrl: 'https://i.pravatar.cc/150?u=arjun',
        clientName: 'BuildWell Construction',
        jobTitle: 'General Labourer',
        steps: [
            { name: 'Interview Invite Sent', status: ProgressStatus.Completed },
            { name: 'Candidate Selected', status: ProgressStatus.InProgress },
            { name: 'Upload Other Documents', status: ProgressStatus.Pending },
            { name: 'Send Contract', status: ProgressStatus.Pending },
        ]
    },
    {
        id: 2,
        name: 'Priya Patel',
        avatarUrl: 'https://i.pravatar.cc/150?u=priya',
        clientName: 'Rapid Logistics PH',
        jobTitle: 'Warehouse Packer',
        steps: [
            { name: 'Interview Invite Sent', status: ProgressStatus.Completed },
            { name: 'Candidate Selected', status: ProgressStatus.Completed },
            { name: 'Upload Other Documents', status: ProgressStatus.InProgress },
            { name: 'Send Contract', status: ProgressStatus.Pending },
        ]
    },
    {
        id: 3,
        name: 'Vikram Singh',
        avatarUrl: 'https://i.pravatar.cc/150?u=vikram',
        clientName: 'SG Manufacturing',
        jobTitle: 'Assembly Line Worker',
        steps: [
            { name: 'Interview Invite Sent', status: ProgressStatus.Completed },
            { name: 'Candidate Selected', status: ProgressStatus.Completed },
            { name: 'Upload Other Documents', status: ProgressStatus.Completed },
            { name: 'Send Contract', status: ProgressStatus.Completed },
        ]
    },
     {
        id: 4,
        name: 'Deepika Verma',
        avatarUrl: 'https://i.pravatar.cc/150?u=deepika',
        clientName: 'BuildWell Construction',
        jobTitle: 'General Labourer',
        steps: [
            { name: 'Interview Invite Sent', status: ProgressStatus.Completed },
            { name: 'Candidate Selected', status: ProgressStatus.Rejected },
            { name: 'Upload Other Documents', status: ProgressStatus.Pending },
            { name: 'Send Contract', status: ProgressStatus.Pending },
        ]
    },
];


export const JOB_CATEGORIES = [
  "Construction",
  "Manufacturing",
  "Logistics & Warehouse",
  "Hospitality",
  "Cleaning Services",
  "Domestic Helper",
  "Automotive",
  "Agriculture",
  "Skilled Trades",
  "Retail",
  "Security Services",
  "Customer Service",
  "Operations",
  "Other",
];

export const PREDEFINED_SKILLS = [
  "Welding",
  "Plumbing",
  "Electrical Wiring",
  "Carpentry",
  "Forklift Operation",
  "Commercial Driving",
  "Heavy Equipment Operation",
  "Food Preparation & Safety",
  "Housekeeping",
  "Customer Service",
  "Cash Handling",
  "Basic First Aid",
];

// --- Employer Mock Data ---
export const MOCK_JOB_POSTINGS: JobPosting[] = [
    { id: 1, title: 'Construction Worker', status: JobStatus.Active, category: 'Construction', postedDate: '2024-07-28T09:00:00Z' },
    { id: 2, title: 'Delivery Driver', status: JobStatus.Inactive, category: 'Logistics & Warehouse', postedDate: '2024-07-25T14:30:00Z' },
    { id: 3, title: 'Warehouse Assistant', status: JobStatus.Active, category: 'Logistics & Warehouse', postedDate: '2024-07-29T11:00:00Z' },
    { id: 4, title: 'Hotel Housekeeper', status: JobStatus.Active, category: 'Hospitality', postedDate: '2024-06-30T18:00:00Z' },
];

export const MOCK_MATCHED_CANDIDATES: MatchedCandidate[] = [
    { id: 1, name: 'Ethan', location: 'Singapore', avatarUrl: 'https://i.pravatar.cc/150?u=ethan', experience: '5+ years', jobCategories: ['Construction', 'Logistics & Warehouse'], skills: ['Heavy Equipment Operation', 'Forklift Operation', 'Welding'] },
    { id: 2, name: 'Olivia', location: 'Manila', avatarUrl: 'https://i.pravatar.cc/150?u=olivia', experience: '1-2 years', jobCategories: ['Hospitality'], skills: ['Customer Service', 'Food Preparation & Safety', 'Housekeeping'] },
    { id: 3, name: 'Liam', location: 'Singapore', avatarUrl: 'https://i.pravatar.cc/150?u=liam', experience: '3-5 years', jobCategories: ['Manufacturing', 'Automotive'], skills: ['Electrical Wiring', 'Carpentry'] },
    { id: 4, name: 'Sophia', location: 'Cebu', avatarUrl: 'https://i.pravatar.cc/150?u=sophia', experience: '1-2 years', jobCategories: ['Cleaning Services', 'Domestic Helper'], skills: ['Housekeeping', 'Basic First Aid'] },
    { id: 5, name: 'Noah', location: 'Singapore', avatarUrl: 'https://i.pravatar.cc/150?u=noah', experience: 'No experience', jobCategories: ['Agriculture'], skills: ['Commercial Driving'] },
];

export const MOCK_SCHEDULED_INTERVIEWS: ScheduledInterview[] = [
  { id: 1, candidateName: 'Arjun Sharma', companyName: 'Rapid Logistics PH', jobTitle: 'Delivery Associate', date: '2024-09-11', time: '10:00', timezone: 'SGT', videoLink: '#', logoUrl: 'https://picsum.photos/seed/rp/50/50', avatarUrl: 'https://i.pravatar.cc/150?u=arjun' },
  { id: 2, candidateName: 'Priya Verma', companyName: 'SG Manufacturing', jobTitle: 'Warehouse Assistant', date: '2024-09-11', time: '14:00', timezone: 'SGT', videoLink: '#', logoUrl: 'https://picsum.photos/seed/sgm/50/50', avatarUrl: 'https://i.pravatar.cc/150?u=priya' },
  { id: 3, candidateName: 'Ethan', companyName: 'BuildWell Construction', jobTitle: 'Construction Worker', date: '2024-09-12', time: '11:00', timezone: 'SGT', videoLink: '#', logoUrl: 'https://picsum.photos/seed/bw/50/50', avatarUrl: 'https://i.pravatar.cc/150?u=ethan' },
];


export const MOCK_CANDIDATE_PROGRESS: CandidateProgress[] = [
    { 
        id: 1, 
        name: 'Arjun Sharma', 
        jobTitle: 'House Cleaning', 
        avatarUrl: 'https://i.pravatar.cc/150?u=arjun', 
        status: CandidateApplicationStatus.InterviewInvited,
        steps: [
            { name: 'Interview', status: ProgressStatus.InProgress },
            { name: 'Selected', status: ProgressStatus.Pending },
            { name: 'Medical', status: ProgressStatus.Pending },
            { name: 'Contract', status: ProgressStatus.Pending },
            { name: 'Hired', status: ProgressStatus.Pending },
        ],
        paymentMade: false,
    },
    { 
        id: 2, 
        name: 'Priya Patel', 
        jobTitle: 'House Cleaning', 
        avatarUrl: 'https://i.pravatar.cc/150?u=priya', 
        status: CandidateApplicationStatus.CandidateSelected,
        steps: [
            { name: 'Interview', status: ProgressStatus.Completed },
            { name: 'Selected', status: ProgressStatus.InProgress },
            { name: 'Medical', status: ProgressStatus.Pending },
            { name: 'Contract', status: ProgressStatus.Pending },
            { name: 'Hired', status: ProgressStatus.Pending },
        ],
        paymentMade: false,
    },
    { 
        id: 3, 
        name: 'Vikram Singh', 
        jobTitle: 'House Cleaning', 
        avatarUrl: 'https://i.pravatar.cc/150?u=vikram', 
        status: CandidateApplicationStatus.MedicalRejected,
        steps: [
            { name: 'Interview', status: ProgressStatus.Completed },
            { name: 'Selected', status: ProgressStatus.Completed },
            { name: 'Medical', status: ProgressStatus.Rejected },
            { name: 'Contract', status: ProgressStatus.Pending },
            { name: 'Hired', status: ProgressStatus.Pending },
        ],
        paymentMade: false,
    },
    { 
        id: 4, 
        name: 'Deepika Verma', 
        jobTitle: 'House Cleaning', 
        avatarUrl: 'https://i.pravatar.cc/150?u=deepika', 
        status: CandidateApplicationStatus.MedicalAccepted,
        steps: [
            { name: 'Interview', status: ProgressStatus.Completed },
            { name: 'Selected', status: ProgressStatus.Completed },
            { name: 'Medical', status: ProgressStatus.InProgress },
            { name: 'Contract', status: ProgressStatus.Pending },
            { name: 'Hired', status: ProgressStatus.Pending },
        ],
        paymentMade: true,
    },
    { 
        id: 5, 
        name: 'Rohan Kapoor', 
        jobTitle: 'House Cleaning', 
        avatarUrl: 'https://i.pravatar.cc/150?u=rohan', 
        status: CandidateApplicationStatus.SendContract,
        steps: [
            { name: 'Interview', status: ProgressStatus.Completed },
            { name: 'Selected', status: ProgressStatus.Completed },
            { name: 'Medical', status: ProgressStatus.Completed },
            { name: 'Contract', status: ProgressStatus.InProgress },
            { name: 'Hired', status: ProgressStatus.Pending },
        ],
        paymentMade: true,
    },
    { 
        id: 6, 
        name: 'Aarav Gupta', 
        jobTitle: 'Construction', 
        avatarUrl: 'https://i.pravatar.cc/150?u=aarav', 
        status: CandidateApplicationStatus.Hired,
        steps: [
            { name: 'Interview', status: ProgressStatus.Completed },
            { name: 'Selected', status: ProgressStatus.Completed },
            { name: 'Medical', status: ProgressStatus.Completed },
            { name: 'Contract', status: ProgressStatus.Completed },
            { name: 'Hired', status: ProgressStatus.Completed },
        ],
        paymentMade: true,
    },
];

export const MOCK_CANDIDATE_FULL_DOCS: { [key: string]: { id: number; name: string; uploaded: string }[] } = {
    'Resume': [{ id: 1, name: 'Resume_AaravGupta_Full.pdf', uploaded: '2024-07-15' }],
    'Certifications': [
        { id: 2, name: 'Construction_Safety_Cert.pdf', uploaded: '2024-07-18' },
        { id: 3, name: 'Heavy_Machinery_License.pdf', uploaded: '2024-07-18' },
    ],
    'Identification': [
        { id: 4, name: 'Passport_Scan_Aarav.pdf', uploaded: '2024-07-20' },
        { id: 5, name: 'National_ID_Aarav.jpg', uploaded: '2024-07-20' },
    ],
    'Medical': [{ id: 6, name: 'Medical_Fit_Report.pdf', uploaded: '2024-07-22' }],
};


// --- Admin Mock Data ---
export const MOCK_ADMIN_STATS: AdminDashboardStats = {
    totalCandidates: 12345,
    activeEmployers: 2567,
    newJobPosts: 345,
    pendingApprovals: 12,
    candidatesHired: {
        week: [1500, 2300, 2200, 3100, 3800, 4200, 4500],
        month: [2100, 2500, 2800, 3200, 3500, 3900, 4100, 4300, 4600, 4800, 5000, 5200].slice(0, 4).map(v => v * 4),
        year: [2100, 2500, 2800, 3200, 3500, 3900, 4100, 4300, 4600, 4800, 5000, 5200].map(v => v * 52)
    },
    jobsByCategory: [
        { category: 'Domestic Helper', value: 45 },
        { category: 'Hospitality', value: 35 },
        { category: 'Skilled Trades', value: 48 },
        { category: 'Retail', value: 20 },
        { category: 'Other', value: 15 },
    ]
};

export const MOCK_MANAGED_CANDIDATES: ManagedCandidate[] = [
    { id: 1, name: 'Arjun Sharma', jobCategory: 'Domestic Helper', appliedCategories: ['Domestic Helper'] },
    { id: 2, name: 'Priya Verma', jobCategory: 'Hospitality', appliedCategories: ['Hospitality', 'Retail'] },
    { id: 3, name: 'Rahul Kapoor', jobCategory: 'Skilled Trades', appliedCategories: ['Skilled Trades'] },
    { id: 4, name: 'Sneha Patel', jobCategory: 'Domestic Helper', appliedCategories: ['Domestic Helper'] },
    { id: 5, name: 'Vikram Singh', jobCategory: 'Skilled Trades', appliedCategories: ['Skilled Trades', 'Construction'] },
];

export const MOCK_CANDIDATE_PROFILE: CandidateProfileData = {
    id: 1,
    name: "Priya Sharma",
    role: "Certified Welder",
    avatarUrl: "https://i.pravatar.cc/150?u=priya-sharma",
    personalInfo: {
        fullName: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "+65 9876 5432",
        location: "Singapore",
        gender: "Female",
        dob: "15th August 1995"
    },
    skills: ["TIG Welding", "MIG Welding", "Stick Welding", "Blueprint Reading", "Metal Fabrication"],
    jobCategories: ["Skilled Trades", "Construction"],
    processHistory: [
        { jobTitle: 'Lead Welder', company: 'MetalWorks SG', status: 'Invited', date: '2023-10-20' },
        { jobTitle: 'Pipefitter', company: 'BuildWell Construction', status: 'Accepted', date: '2023-11-15' },
        { jobTitle: 'Fabricator', company: 'SG Fabricators', status: 'Rejected', date: '2023-12-05' },
    ]
};

export const MOCK_ADMIN_CANDIDATE_DOCS: AdminDocument[] = [
    { id: 1, name: 'Resume.pdf', category: 'Resume', uploaded: '2024-01-15' },
    { id: 2, name: 'Welding_Certification.pdf', category: 'Certifications', uploaded: '2024-02-20' },
    { id: 3, name: 'Safety_Training_Certificate.pdf', category: 'Certifications', uploaded: '2024-03-10' },
    { id: 4, name: 'Medical_Report.pdf', category: 'Medical', uploaded: '2024-02-20' },
    { id: 5, name: 'MOM_Work_Permit.pdf', category: 'Others', uploaded: '2024-02-20' },
];

export const MOCK_MANAGED_EMPLOYERS: ManagedEmployer[] = [
    { id: 1, name: 'Arjun Sharma', company: 'BuildWell Construction', status: EmployerStatus.Approved },
    { id: 2, name: 'Priya Verma', company: 'Rapid Logistics PH', status: EmployerStatus.Pending },
    { id: 3, name: 'Rahul Kapoor', company: 'SG Manufacturing', status: EmployerStatus.Approved },
    { id: 4, name: 'Sneha Patel', company: 'CleanSweep Services', status: EmployerStatus.Declined },
    { id: 5, name: 'Vikram Singh', company: 'Automotive Experts SG', status: EmployerStatus.Approved },
];

export const MOCK_ADMIN_EMPLOYER_DOCS: AdminDocument[] = [
    { id: 1, name: 'Business_Registration.pdf', category: 'Documents', uploaded: '2024-01-15' },
    { id: 2, name: 'MOM_Approval.pdf', category: 'Others', uploaded: '2024-02-20' },
];

export const MOCK_EMPLOYER_PROFILE: EmployerProfileData = {
    id: 1,
    companyName: 'BuildWell Construction',
    employerName: 'Rajesh Kumar',
    email: 'rajesh.kumar@buildwell.com',
    description: 'BuildWell Construction is a leading construction company in Singapore, specializing in residential and commercial projects. We are committed to safety and quality workmanship.',
    postedJobs: [
        { id: 1, title: 'General Labourer', postedDate: '2024-07-15', status: JobStatus.Active },
        { id: 2, title: 'Site Supervisor', postedDate: '2024-06-20', status: JobStatus.Inactive },
        { id: 3, title: 'Safety Officer', postedDate: '2024-05-10', status: JobStatus.Active },
    ]
};

export const MOCK_INTERVIEWED_CANDIDATES: InterviewedCandidate[] = [
    { id: 1, name: 'Ethan', location: 'Singapore', avatarUrl: 'https://i.pravatar.cc/150?u=ethan-interviewed', status: 'Approve' },
    { id: 2, name: 'Olivia', location: 'Singapore', avatarUrl: 'https://i.pravatar.cc/150?u=olivia-interviewed', status: 'Approve' },
    { id: 3, name: 'Liam', location: 'Singapore', avatarUrl: 'https://i.pravatar.cc/150?u=liam-interviewed', status: 'Pending' },
];

export const MOCK_EMPLOYER_REGISTRATIONS: EmployerRegistrationApproval[] = [
    { id: 1, employer: 'BuildWell Construction', contact: 'Priya Sharma', email: 'priya.sharma@buildwell.com' },
    { id: 2, employer: 'Rapid Logistics PH', contact: 'Arjun Verma', email: 'arjun.verma@rapidlogistics.com' },
    { id: 3, employer: 'SG Manufacturing', contact: 'Divya Patel', email: 'divya.patel@sgmanufacturing.com' },
];

export const MOCK_CANDIDATE_PLACEMENTS: CandidatePlacementApproval[] = [
    { id: 1, candidate: 'Rohan Kapoor', jobTitle: 'General Labourer', employer: 'BuildWell Construction', payment: PaymentStatus.Done },
    { id: 2, candidate: 'Anika Desai', jobTitle: 'Warehouse Packer', employer: 'Rapid Logistics PH', payment: PaymentStatus.Pending },
    { id: 3, candidate: 'Vikram Singh', jobTitle: 'Assembly Line Worker', employer: 'SG Manufacturing', payment: PaymentStatus.Done },
];