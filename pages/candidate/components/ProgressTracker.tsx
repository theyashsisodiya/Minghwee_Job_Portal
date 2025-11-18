import React, { useState } from 'react';
import { MOCK_CANDIDATE_APPLICATIONS, MOCK_PRE_UPLOADED_DOCUMENTS } from '../../../constants';
import { JobApplicationProgress, ProgressStatus, DetailedProgressStep, Notification } from '../../../types';

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" /></svg>;

const StepNode: React.FC<{ step: DetailedProgressStep }> = ({ step }) => {
    const base = "w-7 h-7 rounded-full flex items-center justify-center border-2 z-10";
    
    switch (step.status) {
        case ProgressStatus.Completed: return <div className={`${base} bg-blue-600 border-blue-600`}><CheckIcon /></div>;
        case ProgressStatus.InProgress: return <div className={`${base} bg-yellow-500 border-yellow-500`}><ClockIcon /></div>;
        default: return <div className={`${base} bg-white border-gray-300`}></div>;
    }
};

const ApplicationTracker: React.FC<{ progress: JobApplicationProgress; addNotification: (message: string, type: Notification['type']) => void; }> = ({ progress, addNotification }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const actionRequired = progress.requestedDocuments && progress.requestedDocuments.length > 0;

    const [selectedDocs, setSelectedDocs] = useState<number[]>([]);

    const handleDocSelection = (docId: number) => {
        setSelectedDocs(prev => 
            prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
        );
    };

    const handleSubmitDocs = () => {
        if (selectedDocs.length === 0) {
            addNotification('Please select at least one document to submit.', 'error');
            return;
        }
        addNotification(`${selectedDocs.length} document(s) submitted for review.`, 'success');
        setSelectedDocs([]);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 transition-shadow duration-300 hover:shadow-xl">
            <div className="p-5 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                        <img src={progress.logoUrl} alt="" className="w-12 h-12 rounded-full"/>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">{progress.jobTitle}</h3>
                            <p className="text-sm font-semibold text-gray-600">{progress.companyName}</p>
                        </div>
                    </div>
                     <div className="flex items-center space-x-3">
                        {actionRequired && !isExpanded && <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-800">Action Required</span>}
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
                 <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                    {progress.steps.slice(0, 6).map((step, index) => (
                        <div key={index} className="flex flex-col items-center flex-shrink-0 w-20">
                            <StepNode step={step} />
                            <p className={`mt-1.5 text-xs text-center ${step.status !== ProgressStatus.Pending ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>{step.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {isExpanded && (
                <div className="p-5 border-t bg-gray-50">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Full Application Timeline</h4>
                    <ul className="space-y-4">
                        {progress.steps.map((step, index) => (
                            <li key={index} className="flex items-start">
                                <div className="flex flex-col items-center mr-4">
                                    <StepNode step={step} />
                                    {index < progress.steps.length - 1 && <div className={`w-0.5 h-8 mt-1 ${step.status === ProgressStatus.Completed ? 'bg-blue-600' : 'bg-gray-300'}`}></div>}
                                </div>
                                <div>
                                    <p className={`font-semibold ${step.status !== ProgressStatus.Pending ? 'text-gray-800' : 'text-gray-500'}`}>{step.name}</p>
                                    <p className="text-xs text-gray-500">{step.date ? new Date(step.date).toLocaleDateString() : 'Pending'}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {actionRequired && (
                         <div className="mt-6 pt-6 border-t border-gray-300">
                             <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-r-lg mb-4">
                                <h4 className="font-bold">Action Required: Submit Documents</h4>
                                <p className="text-sm">The employer has requested the following documents for your application.</p>
                             </div>
                            <div className="space-y-2 mb-4">
                                {progress.requestedDocuments?.map(doc => (
                                     <div key={doc.type} className="flex justify-between items-center p-3 bg-white rounded-md border">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">{doc.type}</p>
                                            <p className="text-sm text-red-600 font-semibold">Deadline: {doc.deadline}</p>
                                        </div>
                                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-gray-200 text-gray-700">{doc.status}</span>
                                     </div>
                                ))}
                             </div>
                             <h5 className="text-sm font-semibold text-gray-700 mb-2">Select from your pre-uploaded documents:</h5>
                             <div className="space-y-2 max-h-48 overflow-y-auto pr-2 bg-white p-2 rounded-lg border">
                                {MOCK_PRE_UPLOADED_DOCUMENTS.map(doc => (
                                     <label key={doc.id} className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors ${selectedDocs.includes(doc.id) ? 'bg-blue-50 border border-blue-300' : 'border border-transparent hover:bg-gray-100'}`}>
                                         <input type="checkbox" checked={selectedDocs.includes(doc.id)} onChange={() => handleDocSelection(doc.id)} className="form-checkbox h-4 w-4 rounded text-blue-600" />
                                         <p className="text-sm font-medium text-gray-700">{doc.fileName} <span className="text-gray-500">({doc.type})</span></p>
                                     </label>
                                ))}
                             </div>
                             <div className="mt-4 flex space-x-3">
                                <button onClick={handleSubmitDocs} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 text-sm">Submit Selected Docs</button>
                                <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 text-sm">Upload New</button>
                             </div>
                         </div>
                    )}
                </div>
            )}
        </div>
    );
};

interface ProgressTrackerProps {
    addNotification: (message: string, type: Notification['type']) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ addNotification }) => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Progress Tracker</h1>
            <div className="space-y-6">
                {MOCK_CANDIDATE_APPLICATIONS.map(app => <ApplicationTracker key={app.id} progress={app} addNotification={addNotification} />)}
            </div>
        </div>
    );
};

export default ProgressTracker;