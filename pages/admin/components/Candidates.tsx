
import React, { useState } from 'react';
import { MOCK_MANAGED_CANDIDATES, JOB_CATEGORIES } from '../../../constants';
import { AdminPage } from '../AdminDashboard';

interface CandidatesProps {
    navigate: (page: AdminPage) => void;
}

const Candidates: React.FC<CandidatesProps> = ({ navigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Filter by Category');

    const filteredCandidates = MOCK_MANAGED_CANDIDATES.filter(candidate => {
        const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Filter by Category' || candidate.jobCategory === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Candidate Management</h1>
                    <p className="text-gray-500 mt-1">Manage and review candidate applications.</p>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:max-w-md">
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search candidates by name..." 
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>
                <div className="relative w-full md:w-auto">
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 cursor-pointer shadow-sm"
                    >
                        <option>Filter by Category</option>
                        {JOB_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {filteredCandidates.length > 0 ? (
                    filteredCandidates.map(candidate => (
                        <div key={candidate.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-200">
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-xl font-bold text-blue-600 shadow-inner border border-white">
                                    {candidate.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{candidate.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-gray-500">{candidate.nationality}</span>
                                        <span className="text-gray-300">•</span>
                                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md font-medium border border-gray-200">{candidate.jobCategory}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 w-full md:w-auto flex flex-col items-center justify-center">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Applied Categories</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {candidate.appliedCategories.map(cat => (
                                        <span key={cat} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                <button 
                                    onClick={() => navigate('candidateDocuments')} 
                                    className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm shadow-sm"
                                >
                                    Documents
                                </button>
                                <button 
                                    onClick={() => navigate('candidateProfile')} 
                                    className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-md shadow-blue-200 border border-blue-600"
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 bg-white rounded-2xl border border-gray-200">
                        <p className="text-gray-500 font-medium">No candidates found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Candidates;
