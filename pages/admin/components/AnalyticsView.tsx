
import React from 'react';

const AnalyticsView: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics & Hiring Insights</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Avg. Time to Hire</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">18 Days</p>
                    <p className="text-xs text-green-600 mt-1 font-semibold flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        2 days faster than last month
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Interview Success Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">42%</p>
                    <p className="text-xs text-gray-500 mt-1">Candidates hired / interviewed</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Most Demanded Nationality</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">Philippines</p>
                    <p className="text-xs text-blue-600 mt-1 font-semibold">60% of total requests</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Hiring Speed Analysis</h2>
                    <div className="h-64 flex flex-col justify-end px-4">
                        <div className="flex justify-around items-end h-full w-full space-x-6">
                            {[
                                { label: '< 1 Week', height: '25%', value: '15%', color: 'bg-blue-300' },
                                { label: '1-2 Weeks', height: '65%', value: '45%', color: 'bg-blue-500' },
                                { label: '3-4 Weeks', height: '40%', value: '25%', color: 'bg-indigo-500' },
                                { label: '> 1 Month', height: '25%', value: '15%', color: 'bg-purple-500' },
                            ].map((bar, idx) => (
                                <div key={idx} className="flex flex-col items-center justify-end w-full h-full group relative">
                                    <span className="text-xs font-bold text-gray-600 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{bar.value}</span>
                                    <div 
                                        className={`w-full max-w-[60px] rounded-t-lg transition-all duration-500 hover:brightness-110 ${bar.color}`} 
                                        style={{ height: bar.height }}
                                    ></div>
                                    <span className="text-xs text-gray-500 mt-3 font-medium">{bar.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-6 text-center">Distribution of time taken from job posting to contract signing.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Candidate Demand by Skill</h2>
                    <div className="space-y-6">
                        {[
                            { skill: 'Elderly Care', pct: '45%', count: 135, color: 'bg-blue-600' },
                            { skill: 'Infant/Childcare', pct: '30%', count: 90, color: 'bg-green-500' },
                            { skill: 'Cooking & Housekeeping', pct: '25%', count: 75, color: 'bg-purple-500' },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-2 font-medium">
                                    <span className="text-gray-700">{item.skill}</span>
                                    <span className="text-gray-900">{item.pct} <span className="text-gray-400 font-normal ml-1">({item.count} candidates)</span></span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3">
                                    <div className={`${item.color} h-3 rounded-full transition-all duration-700 ease-out`} style={{ width: item.pct }}></div>
                                </div>
                            </div>
                        ))}
                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-500">Total Active Requirements: <span className="font-bold text-gray-800">300</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Country-Specific Workflow Tracker</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Country</th>
                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Active Candidates</th>
                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Embassy Processing</th>
                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Pending Arrival</th>
                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Avg. Delay</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50">
                                <td className="py-4 px-4 font-medium text-gray-800 flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                                    Philippines
                                </td>
                                <td className="py-4 px-4 text-gray-600">120</td>
                                <td className="py-4 px-4 text-amber-600 font-bold">15</td>
                                <td className="py-4 px-4 text-gray-600">8</td>
                                <td className="py-4 px-4 text-sm"><span className="bg-green-100 text-green-800 px-2 py-1 rounded">3 days</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="py-4 px-4 font-medium text-gray-800 flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                                    Indonesia
                                </td>
                                <td className="py-4 px-4 text-gray-600">85</td>
                                <td className="py-4 px-4 text-amber-600 font-bold">10</td>
                                <td className="py-4 px-4 text-gray-600">5</td>
                                <td className="py-4 px-4 text-sm"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">5 days</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="py-4 px-4 font-medium text-gray-800 flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                                    Myanmar
                                </td>
                                <td className="py-4 px-4 text-gray-600">60</td>
                                <td className="py-4 px-4 text-amber-600 font-bold">12</td>
                                <td className="py-4 px-4 text-gray-600">4</td>
                                <td className="py-4 px-4 text-sm"><span className="bg-red-100 text-red-800 px-2 py-1 rounded">7 days</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;
