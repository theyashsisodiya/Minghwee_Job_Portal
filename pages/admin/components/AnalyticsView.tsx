
import React from 'react';

const AnalyticsView: React.FC = () => {
    return (
        <div className="animate-fade-in pb-12">
            <header className="mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">Analytics & Insights</h1>
                <p className="text-gray-500 font-medium text-lg">Real-time performance metrics and pipeline analysis.</p>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-green-50 rounded-2xl group-hover:bg-green-100 transition-colors">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                            -10% vs avg
                        </span>
                    </div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Time to Hire</p>
                    <p className="text-5xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors tracking-tight">18 Days</p>
                    <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[85%] rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-right">Target: 21 Days</p>
                </div>

                <div className="bg-white/90 backdrop-blur-md p-8 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-purple-50 rounded-2xl group-hover:bg-purple-100 transition-colors">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                            Top Tier
                        </span>
                    </div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Interview Success</p>
                    <p className="text-5xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors tracking-tight">42%</p>
                    <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[42%] rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-right">Conversion Rate</p>
                </div>

                <div className="bg-white/90 backdrop-blur-md p-8 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                            Most Active
                        </span>
                    </div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Top Source</p>
                    <p className="text-4xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors tracking-tight truncate">Philippines</p>
                    <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[60%] rounded-full"></div>
                    </div>
                    <p className="text-xs text-blue-600 font-bold mt-2 text-right">60% Volume</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Hiring Speed Bar Chart */}
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-50/20 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <h2 className="text-xl font-bold text-gray-800 mb-10 flex items-center gap-3 relative z-10">
                        <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                        Hiring Velocity
                    </h2>
                    
                    <div className="h-64 flex flex-col justify-end px-4 relative z-10">
                        <div className="flex justify-around items-end h-full w-full space-x-8">
                            {[
                                { label: '< 1 Wk', height: '25%', value: '15%', from: 'from-blue-200', to: 'to-blue-300' },
                                { label: '1-2 Wks', height: '65%', value: '45%', from: 'from-blue-400', to: 'to-indigo-400' },
                                { label: '3-4 Wks', height: '40%', value: '25%', from: 'from-indigo-300', to: 'to-purple-300' },
                                { label: '> 1 Mo', height: '25%', value: '15%', from: 'from-purple-200', to: 'to-pink-200' },
                            ].map((bar, idx) => (
                                <div key={idx} className="flex flex-col items-center justify-end w-full h-full group/bar relative">
                                    <div 
                                        className={`w-full max-w-[50px] rounded-t-lg bg-gradient-to-t ${bar.from} ${bar.to} transition-all duration-500 hover:brightness-105 relative hover:-translate-y-1 shadow-sm`} 
                                        style={{ height: bar.height }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-all duration-200 translate-y-1 group-hover/bar:translate-y-0 shadow-lg">
                                            {bar.value}
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 mt-3 uppercase tracking-wide group-hover/bar:text-indigo-600 transition-colors">{bar.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Skill Demand Progress */}
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-50/20 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="flex justify-between items-center mb-10 relative z-10">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                            Demand by Skill
                        </h2>
                        <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Total: 300 Active</span>
                    </div>
                    
                    <div className="space-y-8 relative z-10">
                        {[
                            { skill: 'Elderly Care', pct: '45%', count: 135, color: 'from-blue-500 to-cyan-400' },
                            { skill: 'Infant/Childcare', pct: '30%', count: 90, color: 'from-green-500 to-emerald-400' },
                            { skill: 'Cooking & Housekeeping', pct: '25%', count: 75, color: 'from-purple-500 to-pink-400' },
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-default">
                                <div className="flex justify-between text-sm mb-2 font-medium">
                                    <span className="text-gray-700 font-bold group-hover:text-gray-900 transition-colors">{item.skill}</span>
                                    <span className="text-gray-900 font-bold bg-white/50 px-2 rounded">{item.pct}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                    <div 
                                        className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-1000 ease-out relative`} 
                                        style={{ width: item.pct }}
                                    >
                                    </div>
                                </div>
                                <p className="text-right text-xs text-gray-400 mt-2 font-medium group-hover:text-gray-600 transition-colors">{item.count} candidates active</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Glass Table */}
            <div className="bg-white/90 backdrop-blur-md rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="p-8 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">Workflow Tracker</h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Real-time status of international candidate pipelines.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-400 border-b border-gray-100 bg-gray-50/50">
                                <th className="py-5 px-8 text-xs font-bold uppercase tracking-widest">Country</th>
                                <th className="py-5 px-8 text-xs font-bold uppercase tracking-widest text-center">Active</th>
                                <th className="py-5 px-8 text-xs font-bold uppercase tracking-widest text-center">Embassy</th>
                                <th className="py-5 px-8 text-xs font-bold uppercase tracking-widest text-center">Pending Arrival</th>
                                <th className="py-5 px-8 text-xs font-bold uppercase tracking-widest text-right">Avg. Delay</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[
                                { country: 'Philippines', active: 120, embassy: 15, pending: 8, delay: '3 days', color: 'bg-blue-500', shadow: 'shadow-blue-200' },
                                { country: 'Indonesia', active: 85, embassy: 10, pending: 5, delay: '5 days', color: 'bg-red-500', shadow: 'shadow-red-200' },
                                { country: 'Myanmar', active: 60, embassy: 12, pending: 4, delay: '7 days', color: 'bg-yellow-500', shadow: 'shadow-yellow-200' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                                    <td className="py-5 px-8 font-bold text-gray-800 flex items-center">
                                        <div className={`w-3 h-3 rounded-full ${row.color} mr-4`}></div>
                                        {row.country}
                                    </td>
                                    <td className="py-5 px-8 text-center text-gray-600 font-bold">{row.active}</td>
                                    <td className="py-5 px-8 text-center text-amber-600 font-bold">{row.embassy}</td>
                                    <td className="py-5 px-8 text-center text-gray-600 font-medium">{row.pending}</td>
                                    <td className="py-5 px-8 text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                            parseInt(row.delay) > 5 
                                            ? 'bg-red-50 text-red-600 border-red-100' 
                                            : 'bg-green-50 text-green-600 border-green-100'
                                        }`}>
                                            {row.delay}
                                        </span>
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

export default AnalyticsView;
