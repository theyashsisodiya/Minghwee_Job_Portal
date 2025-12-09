
import React, { useState, useMemo } from 'react';
import { ScheduledInterview, CandidateApplicationStatus } from '../../../types';
import { useGlobalState } from '../../../contexts/StateContext';

const RescheduleModal: React.FC<{ interview: ScheduledInterview | null; isOpen: boolean; onClose: () => void; onReschedule: (id: number, newDate: string, newTime: string) => void; }> = ({ interview, isOpen, onClose, onReschedule }) => {
    if (!isOpen || !interview) return null;
    
    const [date, setDate] = useState(interview.date);
    const [time, setTime] = useState(interview.time);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onReschedule(interview.id, date, time);
        onClose();
    };

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Reschedule Interview</h2>
                <p className="mb-6 text-gray-600">For: <span className="font-semibold">{interview.candidateName}</span> ({interview.jobTitle})</p>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="interviewDate">New Date</label>
                            <input type="date" id="interviewDate" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="interviewTime">New Time</label>
                            <input type="time" id="interviewTime" value={time} onChange={e => setTime(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SalesScheduledInterviews: React.FC = () => {
    const { applications, candidates, jobs, clients, updateApplicationStatus } = useGlobalState();

    const scheduledInterviews = useMemo(() => {
        return applications
            .filter(app => app.status === CandidateApplicationStatus.InterviewInvited)
            .map(app => {
                const candidate = candidates.find(c => c.id === app.candidateId);
                const job = jobs.find(j => j.id === app.jobId);
                const client = clients.find(c => c.id === app.employerId);
                return {
                    id: app.id,
                    candidateName: candidate?.name || 'N/A',
                    jobTitle: job?.title || 'N/A',
                    clientName: client?.employerName || client?.name || 'N/A',
                    date: new Date().toISOString().split('T')[0], // Mock date
                    time: '10:00', // Mock time
                } as ScheduledInterview;
            });
    }, [applications, candidates, jobs, clients]);
    
    // Note: We are now using local state initialized from global to support the specific UI interactions
    // In a real app, reschedule would update the global backend.
    const [interviews, setInterviews] = useState<ScheduledInterview[]>(scheduledInterviews);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState<ScheduledInterview | null>(null);

    const handleOpenModal = (interview: ScheduledInterview) => {
        setSelectedInterview(interview);
        setIsModalOpen(true);
    };

    const handleReschedule = (id: number, newDate: string, newTime: string) => {
        setInterviews(prev => prev.map(iv => iv.id === id ? { ...iv, date: newDate, time: newTime } : iv));
        alert('Interview rescheduled successfully!');
    };
    
    const handleMarkCompleted = (applicationId: number) => {
        updateApplicationStatus(applicationId, CandidateApplicationStatus.CandidateSelected);
        alert('Interview marked as completed. Candidate status updated.');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Scheduled Interviews</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Candidate</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Job Title</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Employer</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Date & Time</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {interviews.length > 0 ? interviews.map(interview => (
                            <tr key={interview.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-4 px-4 font-medium text-gray-800">{interview.candidateName}</td>
                                <td className="py-4 px-4 text-gray-600">{interview.jobTitle}</td>
                                <td className="py-4 px-4 text-gray-600">{interview.clientName}</td>
                                <td className="py-4 px-4 text-gray-600">{new Date(interview.date).toLocaleDateString()} - {interview.time}</td>
                                <td className="py-4 px-4 space-x-4">
                                    <button onClick={() => handleOpenModal(interview)} className="text-blue-600 hover:underline font-semibold text-sm">Reschedule</button>
                                    <button onClick={() => handleMarkCompleted(interview.id)} className="text-green-600 hover:underline font-semibold text-sm">Mark as Completed</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-500">No scheduled interviews found.</td>
                            </tr>
                        )}
                    </tbody>
                 </table>
            </div>
            <RescheduleModal
                interview={selectedInterview}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onReschedule={handleReschedule}
            />
        </div>
    );
};

export default SalesScheduledInterviews;
