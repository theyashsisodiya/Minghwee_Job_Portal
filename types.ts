
export enum Page {
  Home = 'home',
  Login = 'login',
  Dashboard = 'dashboard',
  About = 'about',
  Contact = 'contact',
  Pricing = 'pricing',
}

export enum UserType {
  Candidate = 'candidate',
  Employer = 'employer',
  Admin = 'admin',
  Sales = 'sales',
}

export enum Country {
  Singapore = 'Singapore',
  Philippines = 'Philippines',
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum ProgressStatus {
    Completed = 'completed',
    InProgress = 'inProgress',
    Pending = 'pending',
    Rejected = 'rejected',
}

export enum DocumentStatus {
    Pending = 'Pending Verification',
    Verified = 'Verified',
    Rejected = 'Rejected',
}

export interface Client {
    id: number;
    name: string; // Contact Person Name
    companyName?: string;
    email: string;
    contact: string;
    isRegistered?: boolean; // If they have their own employer account
}

export interface PreUploadedDocument {
    id: number;
    type: string;
    fileName: string;
    uploadDate: string;
    expiryDate?: string; // For passport, etc.
}

export interface SubmittedDocument extends PreUploadedDocument {
    version: number;
    status: DocumentStatus;
}


export interface ProgressStep {
    name: string;
    status: ProgressStatus;
}

// New detailed progress pipeline for candidate view
export type DetailedProgressStepName = 
    | 'Matched' | 'Invited' | 'Interview Scheduled' | 'Interview Completed' 
    | 'Awaiting Payment' | 'Payment Triggered' // Alias for Awaiting Payment
    | 'Documents Submitted' | 'Documents Verified' | 'Offer Sent' 
    | 'Contract Signed' | 'Pre-Departure' | 'Handover' | 'Onboarded';

export interface DetailedProgressStep {
    name: DetailedProgressStepName;
    status: ProgressStatus;
    date: string | null;
}

export interface RequestedDocument {
    type: string;
    deadline: string;
    status: 'Pending' | 'Submitted';
}

export interface JobApplicationProgress {
    id: number;
    companyName: string;
    logoUrl: string;
    jobTitle: string;
    location: string;
    steps: DetailedProgressStep[];
    requestedDocuments?: RequestedDocument[];
    submittedDocuments?: SubmittedDocument[];
}


export interface InterviewInvite {
    id: number;
    companyName: string;
    logoUrl: string;
    jobTitle: string;
    location: string;
    description: string;
    matchReason: string;
    interviewType: 'Live' | 'Recorded';
    status: 'Pending Admin Approval' | 'Active' | 'Expired';
    requiredDocuments: string[];
}

// --- Employer Types ---
export enum JobStatus {
    Active = 'Active',
    Inactive = 'Inactive',
}

export interface JobPosting {
    id: number;
    employerId: number;
    title: string;
    status: JobStatus;
    category: string;
    postedDate: string;
    location: string;
    description: string;
    salary: { min: number; max: number; currency: string };
}

export interface MatchedCandidate {
    id: number;
    name: string;
    location: string;
    avatarUrl: string;
    experience: string;
    jobCategories: string[];
    skills: string[];
}

export enum CandidateApplicationStatus {
    Matched = 'Matched',
    InterviewInvited = 'Interview Invited',
    CandidateSelected = 'Candidate Selected',
    CandidateRejected = 'Candidate Rejected',
    MedicalAccepted = 'Medical Accepted',
    MedicalRejected = 'Medical Rejected',
    SendContract = 'Send Contract',
    Hired = 'Hired',
}

export interface CandidateProgress {
    id: number;
    candidateId: number;
    name: string;
    jobTitle: string;
    avatarUrl: string;
    status: CandidateApplicationStatus;
    steps: ProgressStep[];
    paymentMade: boolean;
}

export interface ScheduledInterview {
    id: number;
    candidateName: string;
    jobTitle: string;
    date: string; // e.g., "2021-09-11"
    time: string; // e.g., "10:00 AM"
    clientName?: string;
    companyName?: string;
    logoUrl?: string;
    timezone?: string;
    videoLink?: string;
    avatarUrl?: string;
}

export interface SalesCandidateProgress {
    id: number;
    name: string;
    avatarUrl: string;
    clientName: string;
    jobTitle: string;
    steps: ProgressStep[];
}

// --- Admin Types ---
export interface AdminDashboardStats {
    totalCandidates: number;
    activeEmployers: number;
    newJobPosts: number;
    pendingApprovals: number;
    // Time-series data for chart (arrays of numbers)
    candidatesHired: { week: number[], month: number[], year: number[] };
    activeJobsSeries: { week: number[], month: number[], year: number[] };
    employerGrowth: { week: number[], month: number[], year: number[] };
    sales: { week: number[], month: number[], year: number[] };
    jobsByCategory: { category: string, value: number }[];
}

export interface ManagedCandidate {
    id: number;
    name: string;
    jobCategory: string;
    appliedCategories: string[];
}

export interface CandidateProfileData {
    id: number;
    name: string;
    role: string;
    avatarUrl: string;
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        gender: string;
        dob: string;
    };
    skills: string[];
    jobCategories: string[];
    processHistory: CandidateProcessHistory[];
}

export interface CandidateProcessHistory {
    jobTitle: string;
    company: string;
    status: 'Invited' | 'Accepted' | 'Rejected';
    date: string;
}

export enum EmployerStatus {
    Approved = 'Approved',
    Pending = 'Pending',
    Declined = 'Declined',
}

export interface ManagedEmployer {
    id: number;
    name: string;
    company: string;
    status: EmployerStatus;
    email: string;
    contact: string;
}

export interface EmployerProfileData {
    id: number;
    companyName: string;
    employerName: string;
    email: string;
    description: string;
    postedJobs: EmployerPostedJob[];
}

export interface EmployerPostedJob {
    id: number;
    title: string;
    postedDate: string;
    status: JobStatus;
}

export interface InterviewedCandidate {
    id: number;
    name: string;
    location: string;
    avatarUrl: string;
    status: 'Approve' | 'Pending' | 'Reject';
}

export interface EmployerRegistrationApproval {
    id: number;
    employer: string;
    contact: string;
    email: string;
}

export enum PaymentStatus {
    Done = 'Done',
    Pending = 'Pending'
}

export interface CandidatePlacementApproval {
    id: number;
    candidate: string;
    jobTitle: string;
    employer: string;
    payment: PaymentStatus;
}

export interface AdminDocument {
    id: number;
    name: string;
    category: string;
    uploaded: string;
}

// --- App-wide ---
export interface Notification {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

// --- GLOBAL STATE TYPES ---
export interface GlobalApplication {
    id: number;
    candidateId: number;
    jobId: number;
    employerId: number;
    status: CandidateApplicationStatus;
    steps: ProgressStep[];
    paymentMade: boolean;
}
