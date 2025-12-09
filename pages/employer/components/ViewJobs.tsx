import React, { useState, useMemo } from 'react';
import { JOB_CATEGORIES } from '../../../constants';
import { JobStatus, JobPosting, Country } from '../../../types';
import { useGlobalState } from '../../../contexts/StateContext';

interface ViewJobsProps {
    navigate: (page: 'postJob' | 'jobDetails' | 'editJob', jobId?: number) => void;
    country: Country;
    employerId: number;
    allowPosting?: boolean;
}

// Icons
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const EmptyStateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2-2H5a2 2 0 01-2-2z" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;

const JobCard: React.FC<{ job: JobPosting; onStatusToggle: (id: number) => void; navigate: ViewJobsProps['navigate']; allowPosting: boolean }> = ({ job, onStatusToggle, navigate, allowPosting }) => {
    const isActive = job.status === JobStatus.Active;

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:border-blue-300">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 pr-4">{job.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">{job.category}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <CalendarIcon />
                    <span>Posted on {new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <div className="flex items-center space-x-2">
                        <span className={`text-sm font-semibold ${isActive ? 'text-green-600' : 'text-gray-500'}`}>{job.status}</span>
                        {allowPosting && (
                            <button
                                onClick={() => onStatusToggle(job.id)}
                                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                                aria-label={`Set status to ${isActive ? 'Inactive' : 'Active'}`}
                            >
                                <span
                                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                        )}
                        {!allowPosting && (
                             <span className={`px-2 py-0.5 text-xs rounded border ${isActive ? 'border-green-200 bg-green-50 text-green-700' : 'border-gray-200 bg-gray-50 text-gray-500'}`}>
                                {isActive ? 'Open' : 'Closed'}
                             </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="border-t pt-4 mt-auto flex space-x-3">
                <button 
                    onClick={() => navigate('jobDetails', job.id)} 
                    className="flex-1 text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors text-sm shadow-sm"
                >
                    View Details
                </button>
                {allowPosting && (
                    <button 
                        onClick={() => navigate('editJob', job.id)} 
                        className="flex-1 text-center px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors text-sm"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};


const ViewJobs: React.FC<ViewJobsProps> = ({ navigate, country, employerId, allowPosting = false }) => {
    const { jobs } = useGlobalState(); // Fetch jobs from global state
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [timeFilter, setTimeFilter] = useState<string>('all');

    // Filter jobs for the specific employer
    const employerJobs = useMemo(() => {
        return jobs.filter(job => job.employerId === employerId);
    }, [jobs, employerId]);

    const toggleStatus = (id: number) => {
        // In a real app, you would call an update function from global state here.
        console.log("Toggle status for job", id);
    };

    const filteredAndSortedJobs = useMemo(() => {
        let filtered = [...employerJobs];
        if (filterCategory !== 'all') {
            filtered = filtered.filter(job => job.category === filterCategory);
        }
        if (timeFilter !== 'all') {
            const now = new Date();
            const cutoffDate = new Date();
            switch (timeFilter) {
                case '30days': cutoffDate.setDate(now.getDate() - 30); break;
                case '3months': cutoffDate.setMonth(now.getMonth() - 3); break;
                case '6months': cutoffDate.setMonth(now.getMonth() - 6); break;
            }
            filtered = filtered.filter(job => new Date(job.postedDate) >= cutoffDate);
        }
        filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        return filtered;
    }, [employerJobs, filterCategory, timeFilter]);

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">Your Job Postings</h1>
                    {allowPosting && (
                        <button 
                            onClick={() => navigate('postJob')}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            <PlusIcon />
                            Post Job
                        </button>
                    )}
                </div>
                
                <div className="flex items-center space-x-4 w-full md:w-auto">
                     <div className="relative flex-1 md:flex-none">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Categories</option>
                            {JOB_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                     <div className="relative flex-1 md:flex-none">
                        <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Time</option>
                            <option value="30days">Last 30 days</option>
                            <option value="3months">Last 3 months</option>
                            <option value="6months">Last 6 months</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {filteredAndSortedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedJobs.map(job => (
                        <JobCard key={job.id} job={job} onStatusToggle={toggleStatus} navigate={navigate} allowPosting={allowPosting} />
                    ))}
                </div>
            ) : (
                <div className="text-center bg-white p-12 rounded-lg shadow-md border">
                    <EmptyStateIcon />
                    <h3 className="mt-2 text-xl font-semibold text-gray-900">No Job Postings Found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {employerJobs.length === 0 ? "No jobs have been posted yet." : "There are no jobs that match your current filters."}
                    </p>
                    {allowPosting && employerJobs.length === 0 && (
                        <button 
                            onClick={() => navigate('postJob')}
                            className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Post Your First Job
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewJobs;
