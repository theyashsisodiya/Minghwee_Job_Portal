import React, { useState } from 'react';
import { MOCK_INTERVIEW_INVITES, MOCK_PRE_UPLOADED_DOCUMENTS } from '../../../constants';
import type { InterviewInvite, PreUploadedDocument, Notification } from '../../../types';

const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const DocumentCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-800 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6v12a1 1 0 11-2 0V4zm8 11.293l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l6-6a1 1 0 00-1.414-1.414L12 13.586z" clipRule="evenodd" /></svg>;


const StatusBadge: React.FC<{ status: InterviewInvite['status'] }> = ({ status }) => {
    const styles = {
        'Active': 'bg-green-100 text-green-800',
        'Pending Admin Approval': 'bg-yellow-100 text-yellow-800',
        'Expired': 'bg-gray-100 text-gray-700'
    };
    return <span className={`px-3 py-1 text-xs font-bold rounded-full ${styles[status]}`}>{status}</span>;
}

const SubmitDocsModal: React.FC<{ isOpen: boolean; onClose: () => void; onSubmit: () => void; }> = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Submit Documents</h2>
                <p className="text-gray-600 mb-6">Select your pre-uploaded documents to submit for this application. You can add more documents later if needed.</p>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {MOCK_PRE_UPLOADED_DOCUMENTS.map(doc => (
                        <label key={doc.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border cursor-pointer hover:bg-gray-100">
                             <input type="checkbox" className="form-checkbox h-5 w-5 rounded text-blue-600" />
                            <div>
                               <p className="font-medium text-gray-800">{doc.fileName}</p>
                               <p className="text-xs text-gray-500">{doc.type}</p>
                            </div>
                        </label>
                    ))}
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Skip for Now</button>
                    <button type="button" onClick={onSubmit} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Submit Selected</button>
                </div>
            </div>
        </div>
    );
};

const InviteCard: React.FC<{ invite: InterviewInvite; addNotification: (message: string, type: Notification['type']) => void; }> = ({ invite, addNotification }) => {
    const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
    
    const handleAccept = () => {
        setIsDocsModalOpen(true);
    };

    const handleDocsSubmit = () => {
        addNotification("Documents submitted successfully!", 'success');
        setIsDocsModalOpen(false);
    }

    return (
        <>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
            <div className="flex items-start space-x-5">
                <img src={invite.logoUrl} alt={`${invite.companyName} logo`} className="w-16 h-16 rounded-full object-cover border" />
                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{invite.jobTitle}</h3>
                            <p className="text-md font-semibold text-gray-600">{invite.companyName}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1"><LocationIcon />{invite.location}</div>
                        </div>
                        <StatusBadge status={invite.status} />
                    </div>
                     <div className="text-sm bg-blue-50 text-blue-800 p-3 rounded-lg my-4 border border-blue-200">
                        <strong>Match Reason:</strong> {invite.matchReason}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{invite.description}</p>
                     <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                        <h4 className="text-md font-bold text-amber-900 mb-3 flex items-center"><DocumentCheckIcon />Required Documents</h4>
                        <div className="flex flex-wrap gap-2">
                            {invite.requiredDocuments.map(doc => (
                                <span key={doc} className="bg-amber-100 text-amber-900 px-3 py-1 text-xs font-medium rounded-full">{doc}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
             <div className="mt-6 pt-4 border-t flex justify-end items-center space-x-3">
                <span className="text-sm font-semibold text-gray-700 mr-auto">Interview Type: <span className="font-bold">{invite.interviewType}</span></span>
                <button className="px-5 py-2 text-sm bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors">Reject</button>
                <button className="px-5 py-2 text-sm bg-yellow-400 text-yellow-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors">Reschedule</button>
                <button onClick={handleAccept} className="px-5 py-2 text-sm bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-sm hover:shadow-lg transition-all" disabled={invite.status !== 'Active'}>Accept Invite</button>
            </div>
        </div>
        <SubmitDocsModal isOpen={isDocsModalOpen} onClose={() => setIsDocsModalOpen(false)} onSubmit={handleDocsSubmit} />
        </>
    );
}

interface InterviewInvitesProps {
    addNotification: (message: string, type: Notification['type']) => void;
}

const InterviewInvites: React.FC<InterviewInvitesProps> = ({ addNotification }) => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Interview Invites</h1>
            <div className="space-y-6">
                {MOCK_INTERVIEW_INVITES.map(invite => <InviteCard key={invite.id} invite={invite} addNotification={addNotification} />)}
            </div>
        </div>
    );
};

export default InterviewInvites;