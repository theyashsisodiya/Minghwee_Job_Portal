
import React, { useState } from 'react';

const FinancialView: React.FC = () => {
    const [revenueRange, setRevenueRange] = useState<'6months' | 'year'>('6months');

    const handleSendReminder = (name: string) => {
        alert(`Payment reminder sent successfully to ${name}.`);
    };

    // Dynamic Mock Data
    const revenueData = {
        '6months': [
            { label: 'Apr', val: 40 },
            { label: 'May', val: 65 },
            { label: 'Jun', val: 55 },
            { label: 'Jul', val: 80 },
            { label: 'Aug', val: 70 },
            { label: 'Sep', val: 90 },
        ],
        'year': [
            { label: 'Q1', val: 120 },
            { label: 'Q2', val: 150 },
            { label: 'Q3', val: 180 },
            { label: 'Q4', val: 210 },
        ]
    };

    const currentData = revenueData[revenueRange];
    const maxVal = Math.max(...currentData.map(d => d.val));

    return (
        <div className="pb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Financial Overview</h1>

            {/* Modern Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-[2rem] shadow-lg text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform">
                        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05 1.18 1.91 2.53 1.91 1.29 0 2.13-.81 2.13-1.88 0-1.1-.92-1.76-2.93-2.25-2.29-.56-3.25-1.55-3.25-3.11 0-1.6 1.28-2.73 2.83-3.09V4h2.67v1.93c1.38.3 2.48 1.22 2.67 2.91h-1.96c-.15-.82-.93-1.47-2.03-1.47-1.07 0-1.8.69-1.8 1.61 0 .96.86 1.5 2.8 1.98 2.4.61 3.38 1.63 3.38 3.14 0 1.69-1.33 2.85-3.03 3.19z"/></svg>
                    </div>
                    <p className="text-green-100 font-medium text-sm uppercase tracking-wide">Total Revenue (YTD)</p>
                    <p className="text-4xl font-bold mt-2">$450,000</p>
                    <div className="mt-4 inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                        +15% vs last year
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-full blur-3xl -z-10"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 font-bold text-xs uppercase tracking-wide">Pending Payments</p>
                            <p className="text-4xl font-bold text-gray-800 mt-2">$12,500</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-2xl">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    </div>
                    <div className="mt-6">
                        <span className="text-yellow-700 bg-yellow-50 border border-yellow-100 px-3 py-1 rounded-full text-xs font-bold">8 Invoices Overdue</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -z-10"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 font-bold text-xs uppercase tracking-wide">Refunds Processed</p>
                            <p className="text-4xl font-bold text-gray-800 mt-2">$1,200</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-2xl">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                        </div>
                    </div>
                    <div className="mt-6">
                        <span className="text-gray-500 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-xs font-bold">Last 30 days</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Payment Mode Pie Chart */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-center items-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-8 self-start">Payment Distribution</h2>
                    <div className="flex items-center justify-center gap-10">
                        {/* CSS Conic Gradient Pie Chart */}
                        <div 
                            className="w-56 h-56 rounded-full shadow-lg relative"
                            style={{
                                background: 'conic-gradient(#3B82F6 0% 60%, #8B5CF6 60% 90%, #F3F4F6 90% 100%)'
                            }}
                        >
                            <div className="absolute inset-0 m-auto w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                                <span className="text-3xl font-bold text-gray-800">452</span>
                                <span className="text-xs font-bold text-gray-400 uppercase mt-1">Transactions</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 shadow-sm shadow-blue-200"></div>
                                <div>
                                    <span className="block text-sm font-bold text-gray-700">PayNow</span>
                                    <span className="text-xs text-gray-500">60%</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 shadow-sm shadow-purple-200"></div>
                                <div>
                                    <span className="block text-sm font-bold text-gray-700">Credit Card</span>
                                    <span className="text-xs text-gray-500">30%</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-gray-200 rounded-full mr-3"></div>
                                <div>
                                    <span className="block text-sm font-bold text-gray-700">Other</span>
                                    <span className="text-xs text-gray-500">10%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Monthly Revenue Bar Chart - Fixed Overlap & Dynamic */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Revenue Trend</h2>
                            <p className="text-sm text-gray-500">Income over time.</p>
                        </div>
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            <button 
                                onClick={() => setRevenueRange('6months')}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${revenueRange === '6months' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Last 6 Months
                            </button>
                            <button 
                                onClick={() => setRevenueRange('year')}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${revenueRange === 'year' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                This Year
                            </button>
                        </div>
                    </div>
                    
                    {/* Flexible container that pushes bottom elements down */}
                    <div className="flex-1 flex items-end justify-between gap-4 h-64 min-h-[200px]">
                        {currentData.map((data, idx) => {
                            // Calculate height dynamically
                            const heightPercentage = (data.val / maxVal) * 100;
                            return (
                                <div key={idx} className="flex flex-col items-center flex-1 group h-full justify-end">
                                    <div className="relative w-full flex justify-center items-end h-full">
                                        <span className="absolute -top-8 text-xs font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded shadow-sm border border-gray-100 z-10 whitespace-nowrap">
                                            ${data.val}k
                                        </span>
                                        <div 
                                            className="w-full max-w-[40px] bg-indigo-500 rounded-t-xl hover:bg-indigo-600 transition-all duration-500 ease-out relative group-hover:shadow-lg shadow-indigo-200"
                                            style={{ height: `${heightPercentage}%` }} 
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-3 font-bold uppercase">{data.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Pending Payments Queue</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase rounded-tl-xl">Employer</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">Service</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">Amount</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase text-right rounded-tr-xl">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <tr className="hover:bg-blue-50/30 transition-colors">
                                <td className="py-5 px-6 font-bold text-gray-800">Mr. Tan's Household</td>
                                <td className="py-5 px-6 text-gray-600 text-sm">Full Placement Fee</td>
                                <td className="py-5 px-6 text-gray-800 font-bold">$2,500</td>
                                <td className="py-5 px-6">
                                    <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-100">Overdue</span>
                                </td>
                                <td className="py-5 px-6 text-right">
                                    <button 
                                        onClick={() => handleSendReminder("Mr. Tan")}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        Send Reminder
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-blue-50/30 transition-colors">
                                <td className="py-5 px-6 font-bold text-gray-800">Mrs. Lee's Household</td>
                                <td className="py-5 px-6 text-gray-600 text-sm">Booking Fee</td>
                                <td className="py-5 px-6 text-gray-800 font-bold">$500</td>
                                <td className="py-5 px-6">
                                    <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">Due Today</span>
                                </td>
                                <td className="py-5 px-6 text-right">
                                    <button 
                                        onClick={() => handleSendReminder("Mrs. Lee")}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        Send Reminder
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FinancialView;
