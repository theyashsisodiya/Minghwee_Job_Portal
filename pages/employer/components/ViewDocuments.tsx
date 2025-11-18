import React from 'react';
import { CandidateProgress } from '../../../types';
import { EmployerPage } from '../EmployerDashboard';
import { MOCK_CANDIDATE_FULL_DOCS } from '../../../constants';

interface ViewDocumentsProps {
  navigate: (page: EmployerPage) => void;
  candidate: CandidateProgress | null;
  navigateToPayment: () => void;
}

// --- ICONS ---
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;

const VideoInterviewCard: React.FC<{ isLocked?: boolean }> = ({ isLocked = false }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">One-Way Video Interview</h2>
        {isLocked && <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm z-10"></div>}
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <video
                src="https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4"
                controls
                className="w-full h-full"
            >
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
);

const ViewDocuments: React.FC<ViewDocumentsProps> = ({ navigate, candidate, navigateToPayment }) => {
    if (!candidate) {
        return (
            <div>
                <h1 className="text-xl font-bold text-gray-800">No candidate selected.</h1>
                <button onClick={() => navigate('progress')} className="text-blue-600 hover:underline font-semibold mt-4">
                    Return to Progress Tracker
                </button>
            </div>
        );
    }
  
    const mockLockedDocs = ['Passport', 'National ID', 'Medical Certificate', 'Experience Certificates', 'Police Clearance'];

    // --- RENDER LOCKED VIEW ---
    if (!candidate.paymentMade) {
        return (
             <div>
                <div className="flex items-center mb-8">
                    <button onClick={() => navigate('progress')} className="text-blue-600 hover:underline font-semibold flex items-center">
                    <BackIcon />
                    Back to Progress Tracker
                    </button>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Documents for <span className="text-blue-600">{candidate.name}</span>
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <VideoInterviewCard />

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                             <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">Resume / CV Preview</h2>
                             <div className="p-4 bg-gray-50 rounded-lg border">
                                <p className="font-bold text-lg">{candidate.name}</p>
                                <p className="text-gray-600">{candidate.jobTitle}</p>
                                <div className="mt-4 h-24 bg-gray-200 rounded animate-pulse flex items-center justify-center">
                                    <p className="text-gray-500 font-semibold">Full resume available after payment</p>
                                </div>
                             </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                             <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">Locked Documents</h2>
                             <ul className="space-y-3">
                                {mockLockedDocs.map(docName => (
                                <li key={docName} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-gray-200">
                                    <p className="font-medium text-gray-500">{docName}</p>
                                    <LockIcon />
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-8">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center border-b pb-3">Unlock Full Access</h2>
                            <p className="text-sm text-center text-gray-600 mb-4">Proceed with payment to view all of this candidate's documents and continue the hiring process.</p>
                             <button onClick={navigateToPayment} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                                Make Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    // --- RENDER UNLOCKED VIEW ---
    return (
        <div>
        <div className="flex items-center mb-8">
            <button onClick={() => navigate('progress')} className="text-blue-600 hover:underline font-semibold flex items-center">
            <BackIcon />
            Back to Progress Tracker
            </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Documents for <span className="text-blue-600">{candidate.name}</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <VideoInterviewCard />
                {Object.entries(MOCK_CANDIDATE_FULL_DOCS).map(([category, docs]) => (
                    <div key={category} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">{category}</h2>
                    <ul className="space-y-3">
                        {docs.map(doc => (
                        <li key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center">
                            <DocumentIcon />
                            <div>
                                <p className="font-medium text-gray-800">{doc.name}</p>
                                <p className="text-sm text-gray-500">Uploaded on {doc.uploaded}</p>
                            </div>
                            </div>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-100 transition-colors text-sm">
                            View
                            </button>
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
            </div>

            <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center border-b pb-3">Contact Candidate</h2>
                <div className="flex flex-col items-center mt-4">
                <img src={candidate.avatarUrl} alt={candidate.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-100" />
                <h3 className="text-lg font-bold text-gray-800 mt-4">{candidate.name}</h3>
                <p className="text-sm text-gray-500">email@example.com</p>
                <p className="text-sm text-gray-500">+65 8888 7777</p>
                </div>
                <div className="mt-6 space-y-3">
                <a href={`mailto:email@example.com`} className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    <MailIcon />
                    Send Email
                </a>
                <a href={`tel:+6588887777`} className="w-full flex items-center justify-center px-4 py-2.5 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                    <PhoneIcon />
                    Call Candidate
                </a>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default ViewDocuments;