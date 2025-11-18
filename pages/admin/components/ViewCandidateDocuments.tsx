import React from 'react';
import { MOCK_ADMIN_CANDIDATE_DOCS } from '../../../constants';
import { AdminPage } from '../AdminDashboard';

interface ViewCandidateDocumentsProps {
    navigate: (page: AdminPage) => void;
}

const ViewCandidateDocuments: React.FC<ViewCandidateDocumentsProps> = ({ navigate }) => {
    const documentsByCategory: { [key: string]: typeof MOCK_ADMIN_CANDIDATE_DOCS } = 
        MOCK_ADMIN_CANDIDATE_DOCS.reduce((acc, doc) => {
            (acc[doc.category] = acc[doc.category] || []).push(doc);
            return acc;
        }, {} as { [key: string]: typeof MOCK_ADMIN_CANDIDATE_DOCS });

    return (
        <div>
            <div className="mb-8">
                 <button onClick={() => navigate('candidates')} className="text-blue-600 hover:underline font-semibold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Candidates
                </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Priya Sharma's Documents</h1>
            <p className="text-gray-500 mb-8">Role: Certified Welder</p>
            
            <div className="space-y-8">
                {Object.entries(documentsByCategory).map(([category, docs]) => (
                    <div key={category} className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">{category}</h2>
                        <ul className="space-y-3">
                            {docs.map(doc => (
                                <li key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
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
        </div>
    );
};

export default ViewCandidateDocuments;
