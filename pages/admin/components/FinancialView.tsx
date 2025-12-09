
import React from 'react';

const FinancialView: React.FC = () => {
    const handleSendReminder = (name: string) => {
        alert(`Payment reminder sent successfully to ${name}.`);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Payment & Financial Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
                    <p className="text-sm font-medium text-gray-500">Total Revenue (YTD)</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">$450,000</p>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full mt-2 inline-block">+15% vs last year</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
                    <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">$12,500</p>
                    <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full mt-2 inline-block">8 Invoices overdue</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500 hover:shadow-md transition-shadow">
                    <p className="text-sm font-medium text-gray-500">Refunds Processed</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">$1,200</p>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-full mt-2 inline-block">Last 30 days</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Payment Mode Pie Chart */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Payment Mode Distribution</h2>
                    <div className="flex items-center justify-center gap-8">
                        {/* CSS Conic Gradient Pie Chart */}
                        <div 
                            className="w-48 h-48 rounded-full shadow-inner relative"
                            style={{
                                background: 'conic-gradient(#3B82F6 0% 60%, #8B5CF6 60% 90%, #E5E7EB 90% 100%)'
                            }}
                        >
                            <div className="absolute inset-0 m-auto w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-sm font-bold text-gray-500">Total Txns</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">PayNow (60%)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Credit Card (30%)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-gray-200 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Other (10%)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Monthly Revenue Bar Chart */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800">Monthly Revenue Trend</h2>
                        <select className="text-xs border rounded p-1 bg-gray-50 text-gray-600">
                            <option>Last 6 Months</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    
                    <div className="h-48 flex items-end justify-between gap-2 px-2">
                        {[
                            { month: 'Apr', val: 40, height: '40%' },
                            { month: 'May', val: 65, height: '65%' },
                            { month: 'Jun', val: 55, height: '55%' },
                            { month: 'Jul', val: 80, height: '80%' },
                            { month: 'Aug', val: 70, height: '70%' },
                            { month: 'Sep', val: 90, height: '90%' },
                        ].map((data, idx) => (
                            <div key={idx} className="flex flex-col items-center flex-1 group cursor-pointer">
                                <div className="relative w-full flex justify-center">
                                    <span className="absolute -top-6 text-xs font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">${data.val}k</span>
                                    <div 
                                        className="w-full max-w-[40px] bg-indigo-500 rounded-t-md hover:bg-indigo-600 transition-all duration-300"
                                        style={{ height: `${data.val * 2}px` }} // scaling purely for visual
                                    ></div>
                                </div>
                                <span className="text-xs text-gray-500 mt-2 font-medium">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Pending Payments Queue</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Employer</th>
                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Service</th>
                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-blue-50 transition-colors">
                                <td className="py-4 px-4 font-medium text-gray-800">Mr. Tan's Household</td>
                                <td className="py-4 px-4 text-gray-600 text-sm">Full Placement Fee</td>
                                <td className="py-4 px-4 text-gray-800 font-bold">$2,500</td>
                                <td className="py-4 px-4">
                                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Overdue (2 days)</span>
                                </td>
                                <td className="py-4 px-4 text-right">
                                    <button 
                                        onClick={() => handleSendReminder("Mr. Tan")}
                                        className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        Send Reminder
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-blue-50 transition-colors">
                                <td className="py-4 px-4 font-medium text-gray-800">Mrs. Lee's Household</td>
                                <td className="py-4 px-4 text-gray-600 text-sm">Booking Fee</td>
                                <td className="py-4 px-4 text-gray-800 font-bold">$500</td>
                                <td className="py-4 px-4">
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">Due Today</span>
                                </td>
                                <td className="py-4 px-4 text-right">
                                    <button 
                                        onClick={() => handleSendReminder("Mrs. Lee")}
                                        className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
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
