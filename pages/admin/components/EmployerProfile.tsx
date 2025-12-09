
import React from 'react';
import { MOCK_EMPLOYER_PROFILE } from '../../../constants';
import { AdminPage } from '../AdminDashboard';
import { JobStatus } from '../../../types';
import JobDetails from '../../employer/components/JobDetails';

const EmployerProfile: React.FC<{ navigate: (page: AdminPage) => void }> = ({ navigate }) => {
    const employer = MOCK_EMPLOYER_PROFILE;
    const [viewingJob, setViewingJob] = React.useState<boolean>(false);

    if (viewingJob) {
        return <JobDetails onBack={() => setViewingJob(false)} isAdminView />;
    }

    return (
        <div>
            <div className="mb-6">
                <button onClick={() => navigate('employers')} className="text-blue-600 hover:underline font-semibold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Employers
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="pb-8 border-b">
                    <h1 className="text-3xl font-bold text-gray-800">{employer.employerName}</h1>
                    <p className="text-lg text-gray-600 mt-2">Contact: {employer.contactPerson} ({employer.email})</p>
                </div>

                <div className="py-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Company Description</h2>
                    <p className="text-gray-600">{employer.description}</p>
                </div>

                <div className="pt-8 border-t">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Posted Jobs</h2>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Job Title</th>
                                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Date Posted</th>
                                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Status</th>
                                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employer.postedJobs.map(job => (
                                <tr key={job.id} className="hover:bg-gray-50 border-b">
                                    <td className="py-3 px-3 font-medium text-gray-800">{job.title}</td>
                                    <td className="py-3 px-3 text-gray-600">{job.postedDate}</td>
                                    <td className="py-3 px-3">
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${job.status === JobStatus.Active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3">
                                        <button onClick={() => setViewingJob(true)} className="text-blue-600 hover:underline text-sm font-medium">View Job</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployerProfile;
