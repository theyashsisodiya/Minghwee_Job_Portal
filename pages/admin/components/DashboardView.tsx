import React from 'react';
import { MOCK_ADMIN_STATS } from '../../../constants';

const StatCard: React.FC<{ label: string; value: string | number; }> = ({ label, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value.toLocaleString()}</p>
    </div>
);

const DashboardView: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Candidates" value={MOCK_ADMIN_STATS.totalCandidates} />
                <StatCard label="Active Employers" value={MOCK_ADMIN_STATS.activeEmployers} />
                <StatCard label="New Job Posts (30d)" value={MOCK_ADMIN_STATS.newJobPosts} />
                <StatCard label="Pending Approvals" value={MOCK_ADMIN_STATS.pendingApprovals} />
            </div>
            {/* Additional charts and data visualizations can be added here */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">More stats coming soon!</h2>
                <p className="text-gray-500">Analytics on candidates hired, jobs by category, and more will be displayed here.</p>
            </div>
        </div>
    );
};

export default DashboardView;
