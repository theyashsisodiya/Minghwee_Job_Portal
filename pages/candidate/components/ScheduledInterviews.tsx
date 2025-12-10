
import React, { useState, useMemo } from 'react';
import { ScheduledInterview, CandidateApplicationStatus } from '../../../types';
import { useGlobalState } from '../../../contexts/StateContext';

const Calendar: React.FC<{ selectedDate: Date, setSelectedDate: (date: Date) => void }> = ({ selectedDate, setSelectedDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8, 1)); // September 2024

    const renderHeader = () => {
        const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
        return (
            <div className="flex justify-between items-center mb-4">
                <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">&larr;</button>
                <span className="font-bold text-lg text-gray-800">{dateFormat.format(currentMonth)}</span>
                <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">&rarr;</button>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return <div className="grid grid-cols-7 text-center text-xs text-gray-500 font-semibold">{days.map(day => <div key={day} className="py-2">{day}</div>)}</div>;
    };

    const renderCells = () => {
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(startDate.getDate() - monthStart.getDay());
        const endDate = new Date(monthEnd);
        if (monthEnd.getDay() !== 6) { endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay())); }

        const rows = [];
        let days = [];
        let day = new Date(startDate);
        
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = new Date(day);
                const isSelected = cloneDay.toDateString() === selectedDate.toDateString();
                const isCurrentMonth = cloneDay.getMonth() === currentMonth.getMonth();

                days.push(
                    <div
                        key={day.toString()}
                        className={`py-2 text-center cursor-pointer rounded-full transition-colors ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'} ${isSelected ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-100'}`}
                        onClick={() => setSelectedDate(cloneDay)}
                    >
                        <span>{cloneDay.getDate()}</span>
                    </div>
                );
                day.setDate(day.getDate() + 1);
            }
            rows.push(<div className="grid grid-cols-7" key={day.toString()}>{days}</div>);
            days = [];
        }
        return <div>{rows}</div>;
    };
    
    const nextMonth = () => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
    const prevMonth = () => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
};

const InterviewCard: React.FC<{ interview: ScheduledInterview }> = ({ interview }) => (
    <div className="bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
                <img src={interview.logoUrl} alt={`${interview.employerName} logo`} className="w-14 h-14 rounded-full object-cover border-2 border-white ring-2 ring-gray-200" />
                <div>
                    <p className="font-bold text-lg text-gray-900">{interview.jobTitle}</p>
                    <p className="text-md text-gray-600">{interview.employerName}</p>
                </div>
            </div>
            <span className="text-sm font-bold text-blue-800 bg-blue-100 px-4 py-2 rounded-full">{interview.time} ({interview.timezone})</span>
        </div>
        <div className="mt-4 pt-4 border-t flex justify-end space-x-3">
            <button className="px-4 py-2 text-sm bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
            <button className="px-4 py-2 text-sm bg-yellow-400 text-yellow-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors">Reschedule</button>
            <a href={interview.videoLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">Join Meeting</a>
        </div>
    </div>
);

const ScheduledInterviews: React.FC = () => {
    const { getApplicationsByCandidate, employers, jobs } = useGlobalState();
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock candidate ID 1
    const myApplications = getApplicationsByCandidate(1);

    const interviews = useMemo(() => {
        return myApplications
            .filter(app => app.status === CandidateApplicationStatus.CandidateSelected) // Confirmed schedule
            .map(app => {
                const employer = employers.find(e => e.id === app.employerId);
                const job = jobs.find(j => j.id === app.jobId);
                return {
                    id: app.id,
                    employerName: employer?.employerName || 'Employer',
                    jobTitle: job?.title || 'Job',
                    date: new Date().toISOString(), // Mocking date
                    time: '10:00 AM',
                    timezone: 'SGT',
                    videoLink: '#',
                    logoUrl: 'https://ui-avatars.com/api/?name=' + (employer?.employerName || 'E') + '&background=random',
                    candidateName: 'Me'
                } as ScheduledInterview;
            });
    }, [myApplications, employers, jobs]);

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Scheduled Interviews</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                    <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">
                        Confirmed Interviews
                    </h2>
                    <div className="space-y-4">
                        {interviews.length > 0 ? (
                            interviews.map(interview => (
                                <InterviewCard key={interview.id} interview={interview} />
                            ))
                        ) : (
                            <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-200">
                                 <p className="text-gray-600 font-medium">No confirmed interviews yet. Accept an invite to schedule.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduledInterviews;
