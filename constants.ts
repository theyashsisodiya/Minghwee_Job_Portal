
import type { 
    InterviewInvite, JobPosting, MatchedCandidate, CandidateProgress, ScheduledInterview,
    AdminDashboardStats, ManagedCandidate,
    ManagedEmployer, EmployerRegistrationApproval, CandidatePlacementApproval, CandidateProfileData,
    EmployerProfileData, AdminDocument, InterviewedCandidate, Client, SalesCandidateProgress, PreUploadedDocument, JobApplicationProgress, SubmittedDocument,
    Testimonial, FaqItem, NavItem
} from './types';
import { ProgressStatus, JobStatus, CandidateApplicationStatus, DocumentStatus, EmployerStatus, PaymentStatus } from './types';

// ============================================================================
// LANDING PAGE CONTENT
// ============================================================================

export const NAV_LINKS: NavItem[] = [
  { label: 'For Employers', href: '#employers' },
  { label: 'For Helpers', href: '#helpers' },
  { label: 'How It Works', href: '#how-it-works' },
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
    question: "How do refunds work?",
    answer: "Booking fee refunds: Processed if cancellation falls within policy window (usually within 7 days), handled automatically — expect 3–5 business days for bank/card refunds.\n\nFull payment refunds: Handled per the service agreement and case basis (e.g., regulatory rejection). All refunds are logged and visible in your account."
  }
];

// ============================================================================
// SHARED CONSTANTS (Lists & Configs)
// ============================================================================

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
        title: 'Construction Worker', 
        status: JobStatus.Active, 
        category: 'Construction', 
        postedDate: '2024-07-28T09:00:00Z',
        location: 'Singapore',
        description: 'General construction worker needed for various sites.',
        salary: { min: 1800, max: 2400, currency: 'SGD' }
    },
    { 
        id: 2, 
        employerId: 2,
        title: 'Delivery Driver', 
        status: JobStatus.Inactive, 
        category: 'Logistics & Warehouse', 
        postedDate: '2024-07-25T14:30:00Z',
        location: 'Singapore',
        description: 'Class 3/4 driving license required.',
        salary: { min: 2200, max: 2800, currency: 'SGD' }
    },
    { 
        id: 3, 
        employerId: 1,
        title: 'Warehouse Assistant', 
        status: JobStatus.Active, 
        category: 'Logistics & Warehouse', 
        postedDate: '2024-07-29T11:00:00Z',
        location: 'Jurong West, Singapore',
        description: 'Packing and sorting goods in warehouse environment.',
        salary: { min: 1600, max: 2000, currency: 'SGD' }
    },
    { 
        id: 4, 
        employerId: 3,
        title: 'Hotel Housekeeper', 
        status: JobStatus.Active, 
        category: 'Hospitality', 
        postedDate: '2024-06-30T18:00:00Z',
        location: 'Sentosa, Singapore',
        description: 'Housekeeping duties for 5-star hotel.',
        salary: { min: 1800, max: 2200, currency: 'SGD' }
    },
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
        candidateId: 101,
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
        candidateId: 102,
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
        candidateId: 103,
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
        candidateId: 104,
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
        candidateId: 105,
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
        candidateId: 106,
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

// ============================================================================
// CANDIDATE DASHBOARD MOCKS
// ============================================================================

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

// ============================================================================
// SALES DASHBOARD MOCKS
// ============================================================================

export const MOCK_CLIENTS: Client[] = [
    { id: 1, name: 'BuildWell Construction', email: 'contact@buildwell.com', contact: '+65 1111 2222' },
    { id: 2, name: 'Rapid Logistics PH', email: 'info@rapidlogistics.ph', contact: '+63 917 123 4567' },
    { id: 3, name: 'SG Manufacturing', email: 'hr@sgm.com.sg', contact: '+65 3333 4444' },
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

// ============================================================================
// ADMIN DASHBOARD MOCKS
// ============================================================================

export const MOCK_ADMIN_STATS: AdminDashboardStats = {
    totalCandidates: 12345,
    activeEmployers: 2567,
    newJobPosts: 345,
    pendingApprovals: 12,
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
    { id: 1, name: 'Arjun Sharma', company: 'BuildWell Construction', status: EmployerStatus.Approved, email: 'arjun@buildwell.com', contact: '+65 9123 4567' },
    { id: 2, name: 'Priya Verma', company: 'Rapid Logistics PH', status: EmployerStatus.Pending, email: 'priya@rapidlogistics.ph', contact: '+63 912 345 6789' },
    { id: 3, name: 'Rahul Kapoor', company: 'SG Manufacturing', status: EmployerStatus.Approved, email: 'rahul@sgmfg.com', contact: '+65 6123 4567' },
    { id: 4, name: 'Sneha Patel', company: 'CleanSweep Services', status: EmployerStatus.Declined, email: 'sneha@cleanswip.com', contact: '+65 6789 0123' },
    { id: 5, name: 'Vikram Singh', company: 'Automotive Experts SG', status: EmployerStatus.Approved, email: 'vikram@autoexperts.sg', contact: '+65 8123 4567' },
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
