
import React, { useState } from 'react';
import { MOCK_ADMIN_STATS } from '../../../constants';

const StatCard: React.FC<{ label: string; value: string | number; change?: string; isPositive?: boolean }> = ({ label, value, change, isPositive }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
            {change && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {change}
                </span>
            )}
        </div>
    </div>
);

const StatsLineChart: React.FC = () => {
    // Mock data points for the 12 months (derived from constants or simulated)
    const dataPoints = {
        hired: [120, 132, 145, 160, 155, 170, 185, 190, 210, 225, 240, 255],
        jobs: [80, 95, 110, 125, 120, 135, 140, 160, 175, 180, 200, 215],
        growth: [20, 25, 30, 45, 50, 60, 75, 80, 90, 100, 110, 125]
    };
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // SVG Config
    const width = 800;
    const height = 300;
    const padding = 40;
    const maxX = width - padding;
    const maxY = height - padding;
    const maxVal = 300; // Max Y value scale

    // Helper to scale points
    const getX = (index: number) => padding + (index * (maxX - padding)) / (months.length - 1);
    const getY = (value: number) => maxY - (value / maxVal) * (maxY - padding);

    // Generate Path D string
    const createPath = (data: number[]) => {
        return data.map((val, i) => 
            `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(val)}`
        ).join(' ');
    };

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Platform Growth Trends</h2>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="text-sm text-gray-600">Candidates Hired</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span><span className="text-sm text-gray-600">Active Jobs</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span><span className="text-sm text-gray-600">Employer Growth</span></div>
                </div>
            </div>
            
            <div className="relative w-full h-[350px]">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Grid Lines */}
                    {[0, 100, 200, 300].map(val => (
                        <g key={val}>
                            <line x1={padding} y1={getY(val)} x2={width} y2={getY(val)} stroke="#f3f4f6" strokeWidth="1" />
                            <text x={0} y={getY(val) + 4} className="text-[10px] fill-gray-400 font-sans">{val}</text>
                        </g>
                    ))}

                    {/* Lines */}
                    <path d={createPath(dataPoints.hired)} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <path d={createPath(dataPoints.jobs)} fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                    <path d={createPath(dataPoints.growth)} fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />

                    {/* Hover Interaction Areas */}
                    {months.map((_, i) => (
                        <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                            {/* Invisible Rect for hit testing */}
                            <rect x={getX(i) - 15} y={0} width={30} height={maxY} fill="transparent" cursor="pointer" />
                            
                            {/* X-Axis Label */}
                            <text x={getX(i)} y={height} textAnchor="middle" className="text-[10px] fill-gray-500 font-sans">{_}</text>

                            {/* Hover Indicators */}
                            {hoveredIndex === i && (
                                <>
                                    <line x1={getX(i)} y1={padding} x2={getX(i)} y2={maxY} stroke="#e5e7eb" strokeDasharray="4 4" />
                                    <circle cx={getX(i)} cy={getY(dataPoints.hired[i])} r="5" fill="#3b82f6" stroke="white" strokeWidth="2" />
                                    <circle cx={getX(i)} cy={getY(dataPoints.jobs[i])} r="5" fill="#22c55e" stroke="white" strokeWidth="2" />
                                    <circle cx={getX(i)} cy={getY(dataPoints.growth[i])} r="5" fill="#a855f7" stroke="white" strokeWidth="2" />
                                    
                                    {/* Tooltip (Simplified SVG overlay) */}
                                    <g transform={`translate(${getX(i) > width/2 ? getX(i) - 140 : getX(i) + 10}, ${getY(dataPoints.hired[i]) - 60})`}>
                                        <rect width="130" height="80" rx="8" fill="white" className="shadow-lg drop-shadow-md" stroke="#e5e7eb" />
                                        <text x="10" y="20" className="text-[12px] font-bold fill-gray-800">{months[i]} Stats</text>
                                        <text x="10" y="40" className="text-[10px] fill-blue-600 font-bold">Hired: {dataPoints.hired[i]}</text>
                                        <text x="10" y="55" className="text-[10px] fill-green-600 font-bold">Jobs: {dataPoints.jobs[i]}</text>
                                        <text x="10" y="70" className="text-[10px] fill-purple-600 font-bold">Growth: {dataPoints.growth[i]}</text>
                                    </g>
                                </>
                            )}
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
};


const DashboardView: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Candidates" value={MOCK_ADMIN_STATS.totalCandidates} change="+12%" isPositive={true} />
                <StatCard label="Active Employers" value={MOCK_ADMIN_STATS.activeEmployers} change="+5%" isPositive={true} />
                <StatCard label="Active Salespersons" value={MOCK_ADMIN_STATS.activeSalespersons} />
                <StatCard label="Pending Payments" value={MOCK_ADMIN_STATS.pendingPayments} change="+3" isPositive={false} />
            </div>

            <StatsLineChart />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Real-Time Alerts</h2>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold">New</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-3 bg-red-50 rounded-lg border border-red-100">
                            <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Payment Overdue</p>
                                <p className="text-xs text-gray-500">Mr. Tan's Household has a pending payment for 3 days.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                            <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Document Verification Required</p>
                                <p className="text-xs text-gray-500">New helper Maria Santos uploaded medical report.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">New Registration</p>
                                <p className="text-xs text-gray-500">Mrs. Lee registered as a new employer.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">System Health</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Server Uptime</span>
                            <span className="text-sm font-bold text-green-600">99.9%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '99.9%' }}></div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-sm font-medium text-gray-600">Database Load</span>
                            <span className="text-sm font-bold text-blue-600">Normal</span>
                        </div>
                         <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
