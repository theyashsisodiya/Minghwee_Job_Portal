
import React, { useState } from 'react';
import { useGlobalState } from '../contexts/StateContext';
import { UserType, UserNotification } from '../types';

interface DashboardHeaderProps {
    userName: string;
    userType: UserType;
    userId: number; // To filter notifications
    onNavigate?: (view: any, params?: any) => void; // Optional callback for navigation
    searchBar?: React.ReactNode;
    profileNode?: React.ReactNode;
}

const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;

const NotificationModal: React.FC<{ notification: UserNotification | null; onClose: () => void; onViewProfile?: (id: number) => void }> = ({ notification, onClose, onViewProfile }) => {
    if (!notification) return null;

    const isHelpRequest = notification.type === 'help_request';

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {isHelpRequest ? 'Help Request' : 'Notification'}
                </h3>
                <div className="text-xs text-gray-500 mb-6 flex justify-between">
                    <span>From: {notification.sender}</span>
                    <span>{new Date(notification.timestamp).toLocaleString()}</span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-sm mb-8 leading-relaxed border border-gray-100">
                    {notification.message}
                </div>

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onClose} 
                        className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 font-semibold rounded-xl transition-colors"
                    >
                        Close
                    </button>
                    {isHelpRequest && onViewProfile && notification.senderId && (
                        <button 
                            onClick={() => {
                                onViewProfile(notification.senderId!);
                                onClose();
                            }}
                            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors"
                        >
                            View Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, userType, userId, onNavigate, searchBar, profileNode }) => {
    const { getNotificationsForUser, markNotificationAsRead } = useGlobalState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<UserNotification | null>(null);

    const notifications = getNotificationsForUser(userId, userType);
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleBellClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleNotificationClick = (notification: UserNotification) => {
        markNotificationAsRead(notification.id);
        setSelectedNotification(notification);
        setIsDropdownOpen(false);
    };

    const handleViewProfile = (senderId: number) => {
        if (onNavigate) {
            onNavigate('sales', { viewProfileId: senderId });
        }
    };

    return (
        <div className="flex items-center justify-between py-3 px-8 mb-1">
            <div className="flex items-center gap-6 shrink-0">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Welcome, {userName}</h1>
                    <p className="text-sm text-gray-500 capitalize">{userType} Dashboard</p>
                </div>
                
                {/* Bell Icon placed between Welcome text and Search */}
                <div className="relative">
                    <button 
                        onClick={handleBellClick}
                        className="p-2 rounded-full hover:bg-white/50 relative text-gray-600 focus:outline-none transition-colors"
                    >
                        <BellIcon />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                            <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-700 text-sm">Notifications</h3>
                                {unreadCount > 0 && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">{unreadCount} New</span>}
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <p className="p-8 text-center text-sm text-gray-500">No notifications.</p>
                                ) : (
                                    notifications.map(notif => (
                                        <div 
                                            key={notif.id} 
                                            onClick={() => handleNotificationClick(notif)}
                                            className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`text-xs font-bold ${notif.type === 'help_request' ? 'text-red-500' : 'text-blue-600'} uppercase tracking-wide`}>
                                                    {notif.type === 'help_request' ? 'Help Needed' : 'System'}
                                                </span>
                                                <span className="text-[10px] text-gray-400">{new Date(notif.timestamp).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-sm text-gray-800 font-medium mb-1 line-clamp-2">{notif.message}</p>
                                            <div className="flex justify-between items-center text-xs text-gray-500">
                                                <span>From: {notif.sender}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Search Bar Area */}
            <div className="flex-1 mx-8 max-w-3xl">
                {searchBar}
            </div>

            {/* Profile Area */}
            <div className="shrink-0 relative z-50">
                {profileNode}
            </div>

            <NotificationModal 
                notification={selectedNotification} 
                onClose={() => setSelectedNotification(null)}
                onViewProfile={handleViewProfile} 
            />
        </div>
    );
};

export default DashboardHeader;
