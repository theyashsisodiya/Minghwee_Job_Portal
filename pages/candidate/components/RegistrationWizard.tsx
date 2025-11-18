import React, { useState, useRef, useCallback } from 'react';
import { JOB_CATEGORIES, PREDEFINED_SKILLS } from '../../../constants';
import { Notification } from '../../../types';

interface RegistrationWizardProps {
    onComplete: () => void;
    addNotification: (message: string, type: Notification['type']) => void;
}

const STEPS = [
    'Personal Details',
    'Employment & Education',
    'Job Preferences',
    'Skills & Languages',
    'Uploads',
    'Review & Submit'
];

const RegistrationWizard: React.FC<RegistrationWizardProps> = ({ onComplete, addNotification }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: return <StepAPersonalDetails />;
            case 1: return <StepBEmployment />;
            case 2: return <StepCPreferences />;
            case 3: return <StepDSkills />;
            case 4: return <StepEUploads addNotification={addNotification} />;
            case 5: return <StepFFinal onComplete={onComplete} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800">Create Your Profile</h1>
                    <p className="text-center text-gray-500 mt-2">Complete these mandatory steps to be eligible for job invites.</p>
                </div>

                <div className="mb-8 px-4">
                    <div className="flex items-start">
                        {STEPS.map((step, index) => (
                            <React.Fragment key={index}>
                                <div className="flex flex-col items-center text-center w-24">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-300 ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                        {index < currentStep ? '✓' : index + 1}
                                    </div>
                                    <p className={`mt-2 text-xs font-semibold break-words transition-colors duration-300 ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>{step}</p>
                                </div>
                                {index < STEPS.length - 1 && <div className={`flex-auto border-t-2 mt-5 transition-colors duration-500 ease-in-out ${index < currentStep ? 'border-blue-600' : 'border-gray-300'}`}></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {renderStepContent()}
                    <div className="mt-8 flex justify-between">
                        <button 
                            onClick={prevStep} 
                            disabled={currentStep === 0}
                            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            Back
                        </button>
                        {currentStep < STEPS.length - 1 && (
                             <button 
                                onClick={nextStep} 
                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-3">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
);
const FormField: React.FC<{ label: string; children: React.ReactNode; fullWidth?: boolean, required?: boolean }> = ({ label, children, fullWidth = false, required = false }) => (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        {children}
    </div>
);
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />;
const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...props} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />;

const StepAPersonalDetails = () => (
    <FormSection title="Personal Details">
        <FormField label="Full Name (as per passport)" required><Input placeholder="John Doe" required /></FormField>
        <FormField label="Date of Birth" required><Input type="date" required /></FormField>
        <FormField label="Nationality" required><Input placeholder="e.g., Filipino" required /></FormField>
        <FormField label="Gender" required><Select required><option>Male</option><option>Female</option></Select></FormField>
        <FormField label="Current City" required><Input placeholder="e.g., Manila" required /></FormField>
        <FormField label="Current Country" required><Input placeholder="e.g., Philippines" required /></FormField>
        <FormField label="Primary Phone (WhatsApp)" required><Input type="tel" placeholder="+63 917 123 4567" required /></FormField>
        <FormField label="Email Address" required><Input type="email" placeholder="john.doe@email.com" required /></FormField>
        <FormField label="Emergency Contact Name" required><Input placeholder="Jane Doe" required /></FormField>
        <FormField label="Emergency Contact Relation" required><Input placeholder="Spouse" required /></FormField>
        <FormField label="Emergency Contact Phone" fullWidth required><Input type="tel" placeholder="+63 917 987 6543" required /></FormField>
    </FormSection>
);

const StepBEmployment = () => (
    <FormSection title="Employment & Education">
        <FormField label="Current or Last Job Title" required><Input placeholder="e.g., Certified Welder" required /></FormField>
        <FormField label="Years of Experience" required><Input type="number" placeholder="e.g., 5" required /></FormField>
        <FormField label="Highest Qualification" fullWidth required><Input placeholder="e.g., High School Diploma, Bachelor's Degree" required /></FormField>
    </FormSection>
);

const StepCPreferences = () => (
    <FormSection title="Job Preferences">
        <FormField label="Desired Job Categories" fullWidth required>
            <Select required><option value="">Select a category</option>{JOB_CATEGORIES.map(c => <option key={c}>{c}</option>)}</Select>
        </FormField>
        <FormField label="Preferred Locations" required><Input placeholder="e.g., Singapore, Dubai" required /></FormField>
        <FormField label="Expected Salary (per month)" required><Input type="number" placeholder="e.g., 800" required /></FormField>
        <FormField label="Earliest Start Date" required><Input type="date" required /></FormField>
    </FormSection>
);

const StepDSkills = () => (
    <FormSection title="Skills & Languages">
        <FormField label="Languages Spoken (comma separated)" fullWidth required><Input placeholder="e.g., English, Tagalog, Mandarin" required /></FormField>
        <FormField label="Select at least one key skill" fullWidth required>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 border rounded-lg max-h-48 overflow-y-auto">
                {PREDEFINED_SKILLS.map(skill => (
                    <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="form-checkbox rounded text-blue-600" />
                        <span className="text-gray-700 text-sm">{skill}</span>
                    </label>
                ))}
            </div>
        </FormField>
    </FormSection>
);

const FileUploadField: React.FC<{ label: string; description: string; addNotification: (message: string, type: Notification['type']) => void; acceptedTypes: string; isPassport?: boolean; }> = ({ label, description, addNotification, acceptedTypes, isPassport = false }) => {
    const [fileName, setFileName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [expiryError, setExpiryError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            addNotification('File size cannot exceed 5MB.', 'error');
            return;
        }

        setFileName(file.name);
        addNotification(`'${file.name}' selected.`, 'info');
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpiry(e.target.value);
        if(!isPassport) return;
        
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
        if (new Date(e.target.value) < sixMonthsFromNow) {
            setExpiryError('Passport must have at least 6 months validity.');
        } else {
            setExpiryError('');
        }
    };

    return (
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">{label} <span className="text-red-500">*</span></label>
            <div className="flex items-center justify-between border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex-grow">
                    <p className="text-sm text-gray-500">{fileName || description}</p>
                    {isPassport && 
                        <div className="mt-2">
                            <input type="date" value={expiry} onChange={handleExpiryChange} className="text-sm p-1 border rounded" />
                            {expiryError && <p className="text-xs text-red-500 mt-1">{expiryError}</p>}
                        </div>
                    }
                </div>
                <label className="cursor-pointer bg-gray-200 text-gray-800 font-semibold py-1.5 px-4 rounded-lg hover:bg-gray-300 text-sm flex-shrink-0">
                    Browse
                    <input type="file" className="hidden" onChange={handleFileChange} accept={acceptedTypes} />
                </label>
            </div>
        </div>
    );
};

const VideoRecorder: React.FC<{addNotification: (message: string, type: Notification['type']) => void;}> = ({addNotification}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
    const [consent, setConsent] = useState(false);

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
        setRecordedVideoUrl(null);
        setRecordedChunks([]);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play();
            }
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
                    setRecordedVideoUrl(null);
                } else {
                    const url = URL.createObjectURL(videoBlob);
                    setRecordedVideoUrl(url);
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

    const handleSave = () => {
        if (recordedVideoUrl) {
            addNotification("Video saved successfully!", 'success');
        }
    };
    
    return (
        <div className="md:col-span-2">
            <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video mb-4">
                 <video ref={videoRef} className="w-full h-full" muted={isRecording || !recordedVideoUrl} controls={!!recordedVideoUrl} src={recordedVideoUrl || undefined}>
                     Your browser does not support the video tag.
                 </video>
            </div>
             <div className="flex items-center mb-4">
                <input type="checkbox" id="video-consent" checked={consent} onChange={e => setConsent(e.target.checked)} className="form-checkbox rounded text-blue-600" />
                <label htmlFor="video-consent" className="ml-2 text-sm text-gray-600">I consent to my video being recorded and stored for job application purposes.</label>
            </div>
            <div className="flex items-center justify-between">
                <div>
                     {!isRecording && !recordedVideoUrl && <button type="button" onClick={startRecording} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Record Video</button>}
                     {isRecording && <button type="button" onClick={stopRecording} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">Stop Recording</button>}
                     {recordedVideoUrl && !isRecording && <button type="button" onClick={startRecording} className="px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-md hover:bg-yellow-500">Re-record</button>}
                </div>
                {recordedVideoUrl && <button type="button" onClick={handleSave} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">Save Video</button>}
            </div>
        </div>
    );
};

const StepEUploads: React.FC<{ addNotification: (message: string, type: Notification['type']) => void; }> = ({ addNotification }) => (
    <div className="space-y-8">
        <FormSection title="Upload Mandatory Documents">
            <FileUploadField label="Passport Data Page" description="Must have ≥6 months validity." addNotification={addNotification} acceptedTypes=".pdf,.jpg,.jpeg,.png" isPassport={true} />
            <FileUploadField label="Professional Resume / CV" description="PDF, DOC, or DOCX format." addNotification={addNotification} acceptedTypes=".pdf,.doc,.docx" />
            <FileUploadField label="Recent Passport-size Photo" description="JPEG or PNG, face clearly visible." addNotification={addNotification} acceptedTypes=".jpg,.jpeg,.png" />
            <FileUploadField label="National ID" description="e.g., Philippine National ID, UMID." addNotification={addNotification} acceptedTypes=".pdf,.jpg,.jpeg,.png" />
        </FormSection>
        <FormSection title="One-way Video Introduction">
             <p className="md:col-span-2 text-sm text-gray-600 -mt-4">
                A short video helps employers get to know you better. Please record a video of yourself (max 2-4 minutes).
            </p>
            <VideoRecorder addNotification={addNotification} />
        </FormSection>
    </div>
);

const StepFFinal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [agreed, setAgreed] = useState(false);
    return (
    <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Review & Submit</h2>
        <p className="text-gray-600 mb-6">Please review all your information before submitting. By completing your profile, you agree to our Terms of Service and Privacy Policy.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
             <label className="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="form-checkbox h-5 w-5 rounded text-blue-600 mt-1" />
                <span className="text-gray-700">I confirm that all the information I have provided is accurate and true. I understand that any false information may lead to the termination of my application. <span className="text-red-500">*</span></span>
            </label>
        </div>
         <div className="mt-8 flex justify-end">
            <button 
                onClick={onComplete} 
                disabled={!agreed}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">
                Complete Profile
            </button>
        </div>
    </div>
);};

export default RegistrationWizard;