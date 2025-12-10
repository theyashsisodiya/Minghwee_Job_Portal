
import React, { useState } from 'react';
import { MOCK_ADMIN_STATS } from '../../../constants';

const StatCard: React.FC<{ label: string; value: string | number; change?: string; isPositive?: boolean }> = ({ label, value, change, isPositive }) => (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent pointer-events-none"></div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest relative z-10">{label}</p>
        <div className="flex items-end justify-between mt-4 relative z-10">
            <p className="text-4xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors tracking-tight">{value.toLocaleString()}</p>
            {change && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    isPositive 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                    {change}
                </span>
            )}
        </div>
    </div>
);

const StatsAreaChart: React.FC = () => {
    // Mock data points
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
    const maxVal = 300; 

    const getX = (index: number) => padding + (index * (maxX - padding)) / (months.length - 1);
    const getY = (value: number) => maxY - (value / maxVal) * (maxY - padding);

    // Curve Smoothing (Catmull-Rom or simplified Bezier) - Using L for simplicity but with area close
    const createAreaPath = (data: number[]) => {
        let path = `M ${getX(0)} ${maxY} L ${getX(0)} ${getY(data[0])}`;
        for(let i = 1; i < data.length; i++) {
            path += ` L ${getX(i)} ${getY(data[i])}`;
        }
        path += ` L ${getX(data.length - 1)} ${maxY} Z`;
        return path;
    };

    const createLinePath = (data: number[]) => {
        return data.map((val, i) => 
            `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(val)}`
        ).join(' ');
    };

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-200 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            {/* Ambient Background Gradient for Chart - Subtle */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/20 rounded-full blur-3xl -z-10" />

            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold text-gray-800 tracking-tight">Platform Growth Trends</h2>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Hired</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span><span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Jobs</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span><span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Growth</span></div>
                </div>
            </div>
            
            <div className="relative w-full h-[350px]">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#22c55e" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
                        </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    {[0, 100, 200, 300].map(val => (
                        <g key={val}>
                            <line x1={padding} y1={getY(val)} x2={width} y2={getY(val)} stroke="#e2e8f0" strokeWidth="1" />
                            <text x={0} y={getY(val) + 4} className="text-[10px] fill-gray-400 font-sans font-bold">{val}</text>
                        </g>
                    ))}

                    {/* Areas (Gradient Fills) */}
                    <path d={createAreaPath(dataPoints.hired)} fill="url(#blueGradient)" stroke="none" />
                    <path d={createAreaPath(dataPoints.jobs)} fill="url(#greenGradient)" stroke="none" />
                    <path d={createAreaPath(dataPoints.growth)} fill="url(#purpleGradient)" stroke="none" />

                    {/* Lines with Shadows Removed */}
                    {/* Hired Line - Blue */}
                    <path d={createLinePath(dataPoints.hired)} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />

                    {/* Jobs Line - Green */}
                    <path d={createLinePath(dataPoints.jobs)} fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />

                    {/* Growth Line - Purple */}
                    <path d={createLinePath(dataPoints.growth)} fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />

                    {/* Hover Interaction Areas */}
                    {months.map((_, i) => (
                        <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                            <rect x={getX(i) - 20} y={0} width={40} height={maxY} fill="transparent" cursor="pointer" />
                            <text x={getX(i)} y={height} textAnchor="middle" className="text-[10px] font-bold fill-gray-400 font-sans uppercase tracking-wide">{_}</text>

                            {hoveredIndex === i && (
                                <>
                                    <line x1={getX(i)} y1={padding} x2={getX(i)} y2={maxY} stroke="#cbd5e1" strokeDasharray="4 4" />
                                    <circle cx={getX(i)} cy={getY(dataPoints.hired[i])} r="6" fill="#3b82f6" stroke="white" strokeWidth="3" className="shadow-md" />
                                    <circle cx={getX(i)} cy={getY(dataPoints.jobs[i])} r="6" fill="#22c55e" stroke="white" strokeWidth="3" className="shadow-md" />
                                    <circle cx={getX(i)} cy={getY(dataPoints.growth[i])} r="6" fill="#a855f7" stroke="white" strokeWidth="3" className="shadow-md" />
                                    
                                    <g transform={`translate(${getX(i) > width/2 ? getX(i) - 160 : getX(i) + 20}, ${getY(dataPoints.hired[i]) - 80})`}>
                                        <rect width="140" height="90" rx="12" fill="rgba(255, 255, 255, 0.98)" className="drop-shadow-xl" stroke="#e2e8f0" />
                                        <text x="15" y="25" className="text-[11px] font-bold fill-gray-800 uppercase tracking-wider">{months[i]} Stats</text>
                                        <text x="15" y="48" className="text-[11px] fill-blue-600 font-bold">Hired: {dataPoints.hired[i]}</text>
                                        <text x="15" y="64" className="text-[11px] fill-green-600 font-bold">Jobs: {dataPoints.jobs[i]}</text>
                                        <text x="15" y="80" className="text-[11px] fill-purple-600 font-bold">Growth: {dataPoints.growth[i]}</text>
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
        <div className="animate-fade-in pb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-10 tracking-tight">Admin Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                <div className="relative group">
                    <div className="relative h-full">
                        <StatCard label="Total Candidates" value={MOCK_ADMIN_STATS.totalCandidates} change="+12%" isPositive={true} />
                    </div>
                </div>
                <div className="relative group">
                    <div className="relative h-full">
                        <StatCard label="Active Employers" value={MOCK_ADMIN_STATS.activeEmployers} change="+5%" isPositive={true} />
                    </div>
                </div>
                <div className="relative group">
                    <div className="relative h-full">
                        <StatCard label="Active Salespersons" value={MOCK_ADMIN_STATS.activeSalespersons} />
                    </div>
                </div>
                <div className="relative group">
                    <div className="relative h-full">
                        <StatCard label="Pending Payments" value={MOCK_ADMIN_STATS.pendingPayments} change="+3" isPositive={false} />
                    </div>
                </div>
            </div>

            <StatsAreaChart />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Real-Time Alerts</h2>
                        <span className="bg-red-50 text-red-600 text-[10px] px-3 py-1 rounded-full font-bold border border-red-100 uppercase tracking-wider">Live</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-5 p-5 bg-red-50/40 rounded-3xl border border-red-100/50 hover:bg-red-50/70 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800">Payment Overdue</p>
                                <p className="text-xs text-gray-500 mt-1 font-medium">Mr. Tan's Household has a pending payment for 3 days.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-5 p-5 bg-yellow-50/40 rounded-3xl border border-yellow-100/50 hover:bg-yellow-50/70 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800">Document Verification Required</p>
                                <p className="text-xs text-gray-500 mt-1 font-medium">New helper Maria Santos uploaded medical report.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-5 p-5 bg-blue-50/40 rounded-3xl border border-blue-100/50 hover:bg-blue-50/70 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800">New Registration</p>
                                <p className="text-xs text-gray-500 mt-1 font-medium">Mrs. Lee registered as a new employer.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">System Health</h2>
                    <div className="space-y-8">
                        <div className="group">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Server Uptime</span>
                                <span className="text-sm font-bold text-green-600">99.9%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                <div className="bg-green-500 h-3 rounded-full w-[99.9%]"></div>
                            </div>
                        </div>
                        <div className="group">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Database Load</span>
                                <span className="text-sm font-bold text-blue-600">Normal</span>
                            </div>
                             <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                <div className="bg-blue-500 h-3 rounded-full w-[45%]"></div>
                            </div>
                        </div>
                        <div className="group">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">API Latency</span>
                                <span className="text-sm font-bold text-purple-600">24ms</span>
                            </div>
                             <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                <div className="bg-purple-500 h-3 rounded-full w-[15%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
