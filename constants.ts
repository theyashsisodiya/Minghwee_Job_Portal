
import type { 
    InterviewInvite, JobPosting, MatchedCandidate, CandidateProgress, ScheduledInterview,
    AdminDashboardStats, ManagedCandidate,
    ManagedEmployer, EmployerRegistrationApproval, CandidatePlacementApproval, CandidateProfileData,
    EmployerProfileData, AdminDocument, InterviewedCandidate, Client, SalesCandidateProgress, PreUploadedDocument, JobApplicationProgress, SubmittedDocument,
    Testimonial, FaqItem, NavItem, Salesperson
} from './types';
import { ProgressStatus, JobStatus, CandidateApplicationStatus, DocumentStatus, EmployerStatus, PaymentStatus } from './types';

// ============================================================================
// LANDING PAGE CONTENT
// ============================================================================

export const NAV_LINKS: NavItem[] = [
  { label: 'For Employers', href: '#employers' },
  { label: 'For Helpers', href: '#helpers' },
  { label: 'Frequently Asked Questions', href: '#faq' },
  { label: 'Stories', href: '#stories' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "MingHwee helped me find not just an employer, but a family who truly values my work. I feel respected and supported every day.",
    author: "Maria Santos",
    role: "Domestic Helper",
    image: "https://github.com/theyashsisodiya/MingHwee_Detailed_Workflow/blob/main/nano-edit-17641513130172.png?raw=true"
  },
  {
    id: 2,
    quote: "The peace of mind knowing our helper was thoroughly vetted made all the difference. Our family feels complete now.",
    author: "The Tan Family",
    role: "Employers",
    image: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    quote: "Professional, transparent, and kind. The training resources provided helped me secure a better salary.",
    author: "Siti Rahma",
    role: "Caregiver",
    image: "https://plus.unsplash.com/premium_photo-1661775756810-82dbd209fc95?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "How long does the hiring process take?",
    answer: "Typically 2–4 weeks from candidate shortlisting to handover. Timeline breakdown:\n\n• Matching & one-way video review: 24–72 hours\n• Live interviews & decision: 2–7 days (depends on availability)\n• Payment & document collection: 1–3 days after payment confirmation\n• Regulatory processing, visa/work permit & travel: varies by country (admin will update timeline)"
  },
  {
    question: "What background checks do you perform?",
    answer: "We perform multi-step checks:\n\n• Employment history & reference verification.\n• Criminal record check / police clearance (country-specific).\n• Identity verification (passport/ID).\n• Skills & certifications validation (when submitted).\n\nAll checks are logged; results shared with employer only after payment/activation where required."
  },
  {
    question: "Are there fees for helpers?",
    answer: "No — domestic workers (candidates) are not charged placement fees. Employers pay service and processing fees; helpers are never charged by MingHwee."
  },
  {
    question: "What payment options do you accept?",
    answer: "We accept credit/debit cards (Stripe) and local fast-pay options (PayNow or local PSP where supported). Booking fee and full-payment flows supported; receipts issued automatically."
  },
  {
    question: "What is the difference between booking fee and full payment?",
    answer: "Booking fee: Small refundable fee to reserve a candidate for 7 days. If you proceed to full payment within 7 days it’s deducted from the balance. If you cancel within policy window, it’s refunded.\n\nFull payment: Activates the hiring process immediately — document collection and regulatory workflows start."
  },
  {
    question: "What documents are required from the employer?",
    answer: "Minimum at signup: name, contact. After candidate selection/payment we request:\n\n• Valid ID / passport copy\n• Proof of residence / address\n• Proof of salary budget or bank details (as needed for regulatory forms)\n\nAll documents are uploaded securely and reviewed by admin."
  },
  {
    question: "What documents are required from the candidate?",
    answer: "Collected after payment (only when hiring is activated):\n\n• Passport copy\n• Police clearance (NBI or country-equivalent)\n• Medical certificate / health check as required\n• Employment references / certificates (if any)"
  },
  {
    question: "Can I view candidate videos before payment?",
    answer: "Yes — after the sales consultation step (or after the platform grants access), employers can view one-way intro videos and general candidate info (name, age, nationality, years of experience). Sensitive documents are shared only after payment."
  },
  {
    question: "What if I’m unhappy with the candidate after hiring?",
    answer: "We offer a replacement & support policy (terms apply):\n\n• Immediate post-handover check-ins (1 week, 1 month, 3 months).\n• If issues are raised under policy, MingHwee support and admin will mediate and provide replacement options or remediation steps per the service agreement."
  },
  {
    question: "How does MingHwee ensure the safety of both parties?",
    answer: "Safety measures we enforce:\n\n• Verified employer & candidate profiles.\n• Background checks and document verification.\n• Secure document storage & access controls (only authorized staff after payment).\n• Clear code of conduct & placement support (mediation & channels for complaints)."
  },
  {
    question: "Do you help with visa / work permit applications?",
    answer: "Yes — once payment is confirmed, admin will guide and prepare regulatory submissions (work permit / IPA / embassy steps) and coordinate with overseas agents as required for the candidate’s country."
  },
  {
    question: "How does refunds work?",
    answer: "Booking fee refunds: Processed if cancellation falls within policy window (usually within 7 days), handled automatically — expect 3–5 business days for bank/card refunds.\n\nFull payment refunds: Handled per the service agreement and case basis (e.g., regulatory rejection). All refunds are logged and visible in your account."
  }
];

// ============================================================================
// SHARED CONSTANTS (Lists & Configs)
// ============================================================================

export const JOB_CATEGORIES = [
  "Domestic Helper",
  "Elderly Care",
  "Childcare",
  "Housekeeping",
  "Cooking",
  "Pet Care",
  "Construction", // Keeping some other categories for flexibility
  "Hospitality",
  "Gardening",
  "Driving"
];

export const PREDEFINED_SKILLS = [
  "Infant Care",
  "Elderly Care",
  "Cooking (Chinese)",
  "Cooking (Western)",
  "Housekeeping",
  "Pet Care (Dogs)",
  "Pet Care (Cats)",
  "First Aid",
  "Car Washing",
  "Gardening",
  "Grocery Shopping"
];

export const DOCUMENT_TYPES = [
    'Passport', 'National ID', 'CV / Resume', 'Passport-size Photo',
    'Medical Certificate', 'Experience Certificate', 'Police Clearance / PCC',
    'Insurance Policy', 'Security Bond', 'Embassy-stamped Docs', 'IPA Scan',
    'OEC', 'Airline Ticket', 'Job Offer Form', 'Signed Employment Contract'
];

// ============================================================================
// EMPLOYER DASHBOARD MOCKS
// ============================================================================

export const MOCK_JOB_POSTINGS: JobPosting[] = [
    { 
        id: 1, 
        employerId: 1,
        title: 'Domestic Helper for Elderly Care', 
        status: JobStatus.Active, 
        category: 'Elderly Care', 
        postedDate: '2024-07-28T09:00:00Z',
        location: 'Singapore',
        description: 'Looking for a patient helper to assist with elderly care and general housekeeping.',
        salary: { min: 600, max: 800, currency: 'SGD' }
    },
    { 
        id: 2, 
        employerId: 2,
        title: 'Housekeeper & Cook', 
        status: JobStatus.Inactive, 
        category: 'Housekeeping', 
        postedDate: '2024-07-25T14:30:00Z',
        location: 'Singapore',
        description: 'Need assistance with daily cooking and cleaning for a family of 4.',
        salary: { min: 700, max: 900, currency: 'SGD' }
    },
    { 
        id: 3, 
        employerId: 1,
        title: 'Nanny for Toddler', 
        status: JobStatus.Active, 
        category: 'Childcare', 
        postedDate: '2024-07-29T11:00:00Z',
        location: 'Jurong West, Singapore',
        description: 'Experienced nanny needed for a 3-year-old child.',
        salary: { min: 650, max: 850, currency: 'SGD' }
    },
];

export const MOCK_MATCHED_CANDIDATES: MatchedCandidate[] = [
    { id: 1, name: 'Maria', location: 'Manila', avatarUrl: 'https://i.pravatar.cc/150?u=maria', experience: '5+ years', jobCategories: ['Elderly Care', 'Housekeeping'], skills: ['First Aid', 'Cooking (Chinese)'] },
    { id: 2, name: 'Siti', location: 'Jakarta', avatarUrl: 'https://i.pravatar.cc/150?u=siti', experience: '3 years', jobCategories: ['Childcare', 'Cooking'], skills: ['Infant Care', 'Cooking (Western)'] },
    { id: 3, name: 'Aya', location: 'Yangon', avatarUrl: 'https://i.pravatar.cc/150?u=aya', experience: '2 years', jobCategories: ['Housekeeping'], skills: ['Cleaning', 'Car Washing'] },
];

export const MOCK_SCHEDULED_INTERVIEWS: ScheduledInterview[] = [
  { id: 1, candidateName: 'Maria Santos', employerName: 'Mr. Tan', jobTitle: 'Domestic Helper', date: '2024-09-11', time: '10:00', timezone: 'SGT', videoLink: '#', logoUrl: 'https://ui-avatars.com/api/?name=Mr+Tan&background=random', avatarUrl: 'https://i.pravatar.cc/150?u=maria' },
  { id: 2, candidateName: 'Siti Rahma', employerName: 'Mrs. Lee', jobTitle: 'Nanny', date: '2024-09-11', time: '14:00', timezone: 'SGT', videoLink: '#', logoUrl: 'https://ui-avatars.com/api/?name=Mrs+Lee&background=random', avatarUrl: 'https://i.pravatar.cc/150?u=siti' },
];

export const MOCK_CANDIDATE_PROGRESS: CandidateProgress[] = [
    { 
        id: 1, 
        candidateId: 101,
        name: 'Maria Santos', 
        jobTitle: 'Domestic Helper', 
        avatarUrl: 'https://i.pravatar.cc/150?u=maria', 
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
        candidateId: 102,
        name: 'Siti Rahma', 
        jobTitle: 'Nanny', 
        avatarUrl: 'https://i.pravatar.cc/150?u=siti', 
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
];

export const MOCK_CANDIDATE_FULL_DOCS: { [key: string]: { id: number; name: string; uploaded: string }[] } = {
    'Resume': [{ id: 1, name: 'Resume_Maria.pdf', uploaded: '2024-07-15' }],
    'Certifications': [
        { id: 2, name: 'Caregiver_Cert.pdf', uploaded: '2024-07-18' },
    ],
    'Identification': [
        { id: 4, name: 'Passport_Scan.pdf', uploaded: '2024-07-20' },
    ],
    'Medical': [{ id: 6, name: 'Medical_Fit_Report.pdf', uploaded: '2024-07-22' }],
};

// ============================================================================
// CANDIDATE DASHBOARD MOCKS
// ============================================================================

export const MOCK_INTERVIEW_INVITES: InterviewInvite[] = [
    {
        id: 1,
        employerName: 'Mr. Tan',
        jobTitle: 'Elderly Care Helper',
        location: 'Singapore',
        logoUrl: 'https://ui-avatars.com/api/?name=Mr+Tan&background=random',
        description: 'We are looking for a kind helper to take care of our grandmother.',
        matchReason: 'Your skills in "Elderly Care" match this job.',
        interviewType: 'Live',
        status: 'Active',
        requiredDocuments: ['Passport', 'CV / Resume', 'Police Clearance'],
    },
    {
        id: 2,
        employerName: 'Mrs. Wong',
        jobTitle: 'General Housekeeper',
        location: 'Singapore',
        logoUrl: 'https://ui-avatars.com/api/?name=Mrs+Wong&background=random',
        description: 'Seeking reliable helper for general housework and cooking.',
        matchReason: 'Your experience in "Housekeeping" is a good fit.',
        interviewType: 'Recorded',
        status: 'Active',
        requiredDocuments: ['Passport', 'National ID'],
    },
];

export const MOCK_CANDIDATE_APPLICATIONS: JobApplicationProgress[] = [
    {
        id: 1,
        employerName: 'Mr. Lim',
        jobTitle: 'Domestic Helper',
        location: 'Singapore',
        logoUrl: 'https://ui-avatars.com/api/?name=Mr+Lim&background=random',
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
             { id: 1, type: 'Passport', fileName: 'Passport_Maria.pdf', uploadDate: '2024-07-15', version: 1, status: DocumentStatus.Verified },
        ]
    },
];

export const MOCK_PRE_UPLOADED_DOCUMENTS: PreUploadedDocument[] = [
    { id: 1, type: 'Passport', fileName: 'Passport_Maria.pdf', uploadDate: '2024-07-15', expiryDate: '2028-12-31' },
    { id: 2, type: 'CV / Resume', fileName: 'Maria_CV.pdf', uploadDate: '2024-07-15' },
];

// ============================================================================
// SALES DASHBOARD MOCKS
// ============================================================================

export const MOCK_CLIENTS: Client[] = [
    { id: 1, name: 'Mr. Tan', employerName: 'Tan Household', email: 'tan@email.com', contact: '+65 1111 2222' },
    { id: 2, name: 'Mrs. Lee', employerName: 'Lee Household', email: 'lee@email.com', contact: '+65 3333 4444' },
    { id: 3, name: 'Mr. Wong', employerName: 'Wong Household', email: 'wong@email.com', contact: '+65 5555 6666' },
];

export const MOCK_SALES_CANDIDATE_PROGRESS: SalesCandidateProgress[] = [
    {
        id: 1,
        candidateId: 101,
        name: 'Maria Santos',
        avatarUrl: 'https://i.pravatar.cc/150?u=maria',
        clientName: 'Tan Household',
        jobTitle: 'Domestic Helper',
        status: CandidateApplicationStatus.InterviewInvited,
        steps: [
            { name: 'Interview Invite Sent', status: ProgressStatus.Completed },
            { name: 'Candidate Selected', status: ProgressStatus.InProgress },
            { name: 'Upload Other Documents', status: ProgressStatus.Pending },
            { name: 'Send Contract', status: ProgressStatus.Pending },
        ]
    },
    {
        id: 2,
        candidateId: 102,
        name: 'Siti Rahma',
        avatarUrl: 'https://i.pravatar.cc/150?u=siti',
        clientName: 'Lee Household',
        jobTitle: 'Nanny',
        status: CandidateApplicationStatus.CandidateSelected,
        steps: [
            { name: 'Interview Invite Sent', status: ProgressStatus.Completed },
            { name: 'Candidate Selected', status: ProgressStatus.Completed },
            { name: 'Upload Other Documents', status: ProgressStatus.InProgress },
            { name: 'Send Contract', status: ProgressStatus.Pending },
        ]
    }
];

// ============================================================================
// ADMIN DASHBOARD MOCKS
// ============================================================================

export const MOCK_ADMIN_STATS: AdminDashboardStats = {
    totalCandidates: 12345,
    activeEmployers: 2567,
    newJobPosts: 345,
    pendingApprovals: 12,
    activeSalespersons: 15,
    pendingPayments: 45,
    candidatesHired: {
        week: [120, 150, 180, 200, 250, 300, 350],
        month: [1000, 1200, 1300, 1500],
        year: [12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000]
    },
    activeJobsSeries: {
        week: [300, 310, 320, 330, 340, 345, 350],
        month: [1200, 1250, 1300, 1350],
        year: [10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000]
    },
    employerGrowth: {
        week: [10, 12, 15, 18, 20, 22, 25],
        month: [80, 90, 100, 120],
        year: [2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100]
    },
    sales: {
        week: [5000, 6000, 7500, 8000, 9500, 11000, 12000],
        month: [40000, 45000, 50000, 60000],
        year: [400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 1000000]
    },
    jobsByCategory: [
        { category: 'Domestic Helper', value: 45 },
        { category: 'Childcare', value: 35 },
        { category: 'Elderly Care', value: 48 },
        { category: 'Housekeeping', value: 20 },
        { category: 'Other', value: 15 },
    ]
};

export const MOCK_MANAGED_CANDIDATES: ManagedCandidate[] = [
    { id: 1, name: 'Maria Santos', jobCategory: 'Domestic Helper', appliedCategories: ['Domestic Helper'], nationality: 'Philippines' },
    { id: 2, name: 'Siti Rahma', jobCategory: 'Childcare', appliedCategories: ['Childcare'], nationality: 'Indonesia' },
    { id: 3, name: 'Aya Maung', jobCategory: 'Elderly Care', appliedCategories: ['Elderly Care'], nationality: 'Myanmar' },
];

export const MOCK_CANDIDATE_PROFILE: CandidateProfileData = {
    id: 1,
    name: "Maria Santos",
    role: "Domestic Helper",
    avatarUrl: "https://i.pravatar.cc/150?u=maria",
    personalInfo: {
        fullName: "Maria Santos",
        email: "maria.santos@email.com",
        phone: "+63 9876 5432",
        location: "Manila, Philippines",
        gender: "Female",
        dob: "15th August 1990"
    },
    skills: ["Childcare", "Housekeeping", "Cooking"],
    jobCategories: ["Domestic Helper", "Childcare"],
    processHistory: [
        { jobTitle: 'Helper', employer: 'Tan Household', status: 'Invited', date: '2023-10-20' },
    ]
};

export const MOCK_ADMIN_CANDIDATE_DOCS: AdminDocument[] = [
    { id: 1, name: 'Resume.pdf', category: 'Resume', uploaded: '2024-01-15' },
    { id: 2, name: 'Caregiver_Cert.pdf', category: 'Certifications', uploaded: '2024-02-20' },
];

export const MOCK_MANAGED_EMPLOYERS: ManagedEmployer[] = [
    { id: 1, name: 'Mr. Tan', employerName: 'Tan Household', status: EmployerStatus.Approved, email: 'tan@email.com', contact: '+65 9123 4567', nationality: 'Singapore' },
    { id: 2, name: 'Mrs. Lee', employerName: 'Lee Household', status: EmployerStatus.Pending, email: 'lee@email.com', contact: '+65 912 345 6789', nationality: 'Singapore' },
    { id: 3, name: 'Mr. Wong', employerName: 'Wong Household', status: EmployerStatus.Approved, email: 'wong@email.com', contact: '+65 6123 4567', nationality: 'Singapore' },
];

export const MOCK_ADMIN_EMPLOYER_DOCS: AdminDocument[] = [
    { id: 1, name: 'ID_Proof.pdf', category: 'Documents', uploaded: '2024-01-15' },
    { id: 2, name: 'Address_Proof.pdf', category: 'Others', uploaded: '2024-02-20' },
];

export const MOCK_EMPLOYER_PROFILE: EmployerProfileData = {
    id: 1,
    employerName: 'Tan Household',
    contactPerson: 'Mr. Tan',
    email: 'tan@email.com',
    description: 'Family of 4 living in a condo in Bishan.',
    postedJobs: [
        { id: 1, title: 'Domestic Helper', postedDate: '2024-07-15', status: JobStatus.Active },
    ]
};

export const MOCK_INTERVIEWED_CANDIDATES: InterviewedCandidate[] = [
    { id: 1, name: 'Maria', location: 'Manila', avatarUrl: 'https://i.pravatar.cc/150?u=maria', status: 'Approve' },
    { id: 2, name: 'Siti', location: 'Jakarta', avatarUrl: 'https://i.pravatar.cc/150?u=siti', status: 'Approve' },
];

export const MOCK_EMPLOYER_REGISTRATIONS: EmployerRegistrationApproval[] = [
    { id: 1, employer: 'Tan Household', contact: 'Mr. Tan', email: 'tan@email.com' },
    { id: 2, employer: 'Lee Household', contact: 'Mrs. Lee', email: 'lee@email.com' },
];

export const MOCK_CANDIDATE_PLACEMENTS: CandidatePlacementApproval[] = [
    { id: 1, candidate: 'Maria Santos', jobTitle: 'Domestic Helper', employer: 'Tan Household', payment: PaymentStatus.Done },
    { id: 2, candidate: 'Siti Rahma', jobTitle: 'Nanny', employer: 'Lee Household', payment: PaymentStatus.Pending },
];

export const MOCK_SALESPERSONS: Salesperson[] = [
    { 
        id: 1, 
        name: "Alice Tan", 
        email: "alice.tan@minghwee.com",
        password: "password123",
        phone: "+65 9111 2222",
        joinedDate: "2023-01-15",
        activeEmployers: 12, 
        jobsPosted: 8,
        activeJobs: 5,
        successfulHires: 45, 
        candidatesInProgress: 3,
        efficiency: 92 
    },
    { 
        id: 2, 
        name: "Bob Lim", 
        email: "bob.lim@minghwee.com",
        password: "password123",
        phone: "+65 9333 4444",
        joinedDate: "2023-05-20",
        activeEmployers: 8, 
        jobsPosted: 4,
        activeJobs: 2,
        successfulHires: 30, 
        candidatesInProgress: 1,
        efficiency: 88 
    },
    { 
        id: 3, 
        name: "Charlie Ng", 
        email: "charlie.ng@minghwee.com",
        password: "password123",
        phone: "+65 9555 6666",
        joinedDate: "2022-11-10",
        activeEmployers: 15, 
        jobsPosted: 12,
        activeJobs: 8,
        successfulHires: 55, 
        candidatesInProgress: 5,
        efficiency: 95 
    }
];
