
import React, { useState } from 'react';
import { useGlobalState } from '../contexts/StateContext';
import { UserType } from '../types';

interface DashboardHeaderProps {
    userName: string;
    userType: UserType;
    userId: number; // To filter notifications
}

const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, userType, userId }) => {
    const { getNotificationsForUser, markNotificationAsRead } = useGlobalState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const notifications = getNotificationsForUser(userId, userType);
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleBellClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
        // Mark as read when opening (optional, or mark individually)
    };

    return (
        <div className="flex justify-between items-center py-4 px-8 bg-white border-b border-gray-200 mb-6">
            <div>
                <h1 className="text-xl font-bold text-gray-800">Welcome, {userName}</h1>
                <p className="text-sm text-gray-500 capitalize">{userType} Dashboard</p>
            </div>
            
            <div className="relative">
                <button 
                    onClick={handleBellClick}
                    className="p-2 rounded-full hover:bg-gray-100 relative text-gray-600 focus:outline-none"
                >
                    <BellIcon />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                    )}
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                        <div className="p-3 bg-gray-50 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-700">Notifications</h3>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <p className="p-4 text-center text-sm text-gray-500">No notifications.</p>
                            ) : (
                                notifications.map(notif => (
                                    <div 
                                        key={notif.id} 
                                        onClick={() => markNotificationAsRead(notif.id)}
                                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.read ? 'bg-blue-50' : ''}`}
                                    >
                                        <p className="text-sm text-gray-800 font-medium mb-1">{notif.message}</p>
                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                            <span>From: {notif.sender}</span>
                                            <span>{new Date(notif.timestamp).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardHeader;
