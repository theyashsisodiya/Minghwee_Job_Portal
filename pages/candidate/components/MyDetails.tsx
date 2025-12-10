
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MOCK_PRE_UPLOADED_DOCUMENTS, PREDEFINED_SKILLS, JOB_CATEGORIES } from '../../../constants';
import { PreUploadedDocument, Notification, CandidateProfileData } from '../../../types';


interface MyDetailsProps {
    addNotification: (message: string, type: Notification['type']) => void;
    profileData: CandidateProfileData | null;
}

const MyDetails: React.FC<MyDetailsProps> = ({ addNotification, profileData }) => {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingPreferences, setIsEditingPreferences] = useState(false);
    const [documents, setDocuments] = useState<PreUploadedDocument[]>(MOCK_PRE_UPLOADED_DOCUMENTS);

    const [personalInfo, setPersonalInfo] = useState(
        profileData?.personalInfo || {
            fullName: "John Doe",
            dob: "1995-08-15",
            nationality: "Filipino",
            gender: "Male",
            location: "Manila, Philippines",
            phone: "+63 917 123 4567",
            email: "john.doe@email.com",
        }
    );

    const [employmentInfo, setEmploymentInfo] = useState(
        profileData ? {
            role: profileData.role,
            experience: "5", // Note: experience is not in profileData, using default
            categories: profileData.jobCategories,
            skills: profileData.skills,
        } : {
            role: "Certified Welder",
            experience: "5",
            categories: ["Skilled Trades", "Construction"],
            skills: ["TIG Welding", "MIG Welding", "Blueprint Reading"],
        }
    );

    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [videoUrl, setVideoUrl] = useState<string | null>(null); 
    const [consent, setConsent] = useState(false);

    // Apply stream to video element when it becomes available
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const cleanup = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        setStream(null);
        mediaRecorderRef.current = null;
    }, [stream]);

    const startRecording = async () => {
        if (!consent) {
            addNotification("Please provide consent to record.", 'error');
            return;
        }
        cleanup();
        setVideoUrl(null);
        setRecordedChunks([]);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            
            const mediaRecorder = new MediaRecorder(mediaStream);
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks(prev => [...prev, event.data]);
                }
            };
            mediaRecorder.onstop = () => {
                const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
                if (videoBlob.size > 50 * 1024 * 1024) { // 50MB limit
                    addNotification("Video size exceeds 50MB limit. Please record a shorter video.", 'error');
                    setVideoUrl(null);
                } else {
                    const url = URL.createObjectURL(videoBlob);
                    setVideoUrl(url);
                    // Mock save to local storage
                    localStorage.setItem('saved_video_profile', url);
                }
                cleanup();
            };
            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing media devices.", err);
            addNotification("Could not access camera or microphone. Please check permissions.", 'error');
        }
    };
    
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };
    
    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 50 * 1024 * 1024) { // 50MB limit
                 addNotification("Video file size exceeds 50MB limit.", 'error');
                 return;
            }
            cleanup();
            const url = URL.createObjectURL(file);
            setVideoUrl(url);
            localStorage.setItem('saved_video_profile', url);
            addNotification("Video uploaded successfully.", 'info');
        }
    };

    const handleSaveVideo = () => {
        if (videoUrl) {
            addNotification("Video saved to your profile successfully!", 'success');
        } else {
            addNotification("No video recorded or uploaded to save.", 'error');
        }
    };

    const handleProfileUpdate = () => {
        setIsEditingProfile(false);
        addNotification("Profile information updated successfully.", 'success');
    };

    const handlePreferencesUpdate = () => {
        setIsEditingPreferences(false);
        addNotification("Employment preferences updated successfully.", 'success');
    };

    return (
        <div className="px-8 py-10 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                        {personalInfo.fullName.substring(0, 2).toUpperCase() || 'JD'}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{personalInfo.fullName}</h2>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                            <span className="material-icons-outlined text-base">check_circle</span>
                            <span>Profile 75% Complete</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Profile Information */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                                <button 
                                    onClick={isEditingProfile ? handleProfileUpdate : () => setIsEditingProfile(true)} 
                                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${isEditingProfile ? 'text-white bg-green-600 hover:bg-green-700' : 'text-blue-600 bg-blue-100 hover:bg-blue-200'}`}
                                >
                                    {isEditingProfile ? 'Save' : 'Edit'}
                                </button>
                            </div>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <div>
                                    <label className="text-sm text-gray-500 block mb-1">Full Name</label>
                                    {isEditingProfile ? (
                                        <input 
                                            type="text" 
                                            value={personalInfo.fullName} 
                                            onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="font-semibold text-gray-900">{personalInfo.fullName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 block mb-1">Date of Birth</label>
                                    {isEditingProfile ? (
                                        <input 
                                            type="date" 
                                            value={personalInfo.dob} 
                                            onChange={(e) => setPersonalInfo({...personalInfo, dob: e.target.value})}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="font-semibold text-gray-900">{personalInfo.dob}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 block mb-1">Location</label>
                                    {isEditingProfile ? (
                                        <input 
                                            type="text" 
                                            value={personalInfo.location} 
                                            onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="font-semibold text-gray-900">{personalInfo.location}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 block mb-1">Gender</label>
                                    {isEditingProfile ? (
                                        <select 
                                            value={personalInfo.gender} 
                                            onChange={(e) => setPersonalInfo({...personalInfo, gender: e.target.value})}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    ) : (
                                        <p className="font-semibold text-gray-900">{personalInfo.gender}</p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm text-gray-500 block mb-1">Contact</label>
                                    {isEditingProfile ? (
                                        <input 
                                            type="tel" 
                                            value={personalInfo.phone} 
                                            onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="font-semibold text-gray-900">{personalInfo.phone}</p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm text-gray-500 block mb-1">Email</label>
                                    {isEditingProfile ? (
                                        <input 
                                            type="email" 
                                            value={personalInfo.email} 
                                            onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="font-semibold text-gray-900">{personalInfo.email}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Employment & Preferences */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Employment & Preferences</h3>
                                <button 
                                    onClick={isEditingPreferences ? handlePreferencesUpdate : () => setIsEditingPreferences(true)} 
                                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${isEditingPreferences ? 'text-white bg-green-600 hover:bg-green-700' : 'text-blue-600 bg-blue-100 hover:bg-blue-200'}`}
                                >
                                    {isEditingPreferences ? 'Save' : 'Edit'}
                                </button>
                            </div>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <div>
                                    <label className="text-sm text-gray-500 block mb-1">Current Role</label>
                                    {isEditingPreferences ? (
                                        <input 
                                            type="text" 
                                            value={employmentInfo.role} 
                                            onChange={(e) => setEmploymentInfo({...employmentInfo, role: e.target.value})}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="font-semibold text-gray-900">{employmentInfo.role}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 block mb-1">Years of Experience</label>
                                    {isEditingPreferences ? (
                                        <input 
                                            type="number" 
                                            value={employmentInfo.experience} 
                                            onChange={(e) => setEmploymentInfo({...employmentInfo, experience: e.target.value})}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="font-semibold text-gray-900">{employmentInfo.experience}</p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm text-gray-500 block mb-1">Desired Job Categories</label>
                                    {isEditingPreferences ? (
                                        <input 
                                            type="text" 
                                            value={employmentInfo.categories.join(', ')} 
                                            onChange={(e) => setEmploymentInfo({...employmentInfo, categories: e.target.value.split(',').map(s => s.trim())})}
                                            placeholder="Comma separated values"
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {employmentInfo.categories.map((cat, idx) => <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">{cat}</span>)}
                                        </div>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm text-gray-500 block mb-1">Skills</label>
                                    {isEditingPreferences ? (
                                        <input 
                                            type="text" 
                                            value={employmentInfo.skills.join(', ')} 
                                            onChange={(e) => setEmploymentInfo({...employmentInfo, skills: e.target.value.split(',').map(s => s.trim())})}
                                            placeholder="Comma separated values"
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {employmentInfo.skills.map((skill, idx) => <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">{skill}</span>)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Pre-Uploaded Documents */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">Pre-Uploaded Documents</h3>
                            <p className="mt-1 text-sm text-gray-500">These documents can be quickly attached to any job application.</p>
                            <div className="mt-6 space-y-3">
                                {documents.map(doc => (
                                    <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons-outlined text-gray-500">description</span>
                                            <div>
                                                <p className="font-medium text-sm text-gray-900">{doc.fileName}</p>
                                                <p className="text-xs text-gray-500">{doc.type} - Uploaded on {doc.uploadDate}</p>
                                            </div>
                                        </div>
                                        <button className="text-sm font-medium text-blue-600 hover:underline">Replace</button>
                                    </div>
                                ))}
                                <button className="w-full flex justify-center items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                                    <span className="material-icons-outlined text-base">add</span>
                                    Add New Document
                                </button>
                            </div>
                        </div>

                        {/* One-way Video Interview */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">One-way Video Interview</h3>
                            <p className="mt-1 text-sm text-gray-500">A pre-recorded video helps employers get to know you better. Maximum 4 minutes, 50MB limit.</p>
                            <div className="mt-6 bg-gray-900 rounded-lg overflow-hidden aspect-video relative">
                                <video 
                                    ref={videoRef} 
                                    className="w-full h-full object-cover" 
                                    muted={isRecording || !videoUrl} // Mute when recording to prevent echo
                                    playsInline
                                    autoPlay={isRecording}
                                    controls={!!videoUrl && !isRecording} 
                                    src={videoUrl || undefined} 
                                    key={videoUrl}
                                >
                                    Your browser does not support the video tag.
                                </video>
                                {isRecording && (
                                    <div className="absolute top-4 right-4 w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-lg"></div>
                                )}
                                {!isRecording && !videoUrl && (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <p>No video recorded yet</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="flex items-center">
                                    <input id="consent-checkbox" type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <label htmlFor="consent-checkbox" className="ml-2 block text-sm text-gray-600">I consent to my video being recorded and stored for job application purposes.</label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={isRecording ? stopRecording : startRecording} className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
                                        {isRecording ? 'Stop' : (videoUrl ? 'Re-record' : 'Record')}
                                    </button>
                                    <button onClick={() => fileInputRef.current?.click()} className="px-5 py-2.5 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">Upload Video</button>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="video/*" onChange={handleVideoUpload} />
                                    <button onClick={handleSaveVideo} className="px-5 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 transition-colors">Save Video</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyDetails;
