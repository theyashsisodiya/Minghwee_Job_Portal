
import React from 'react';
import { CandidateProgress } from '../../../types';

interface PaymentProps {
    navigate: (page: 'progress') => void;
    onPaymentSuccess: () => void;
    candidate: CandidateProgress | null;
}

const VisaIcon = () => <svg className="w-10 h-auto" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#1A1F71"/></svg>;
const StripeIcon = () => <svg className="w-10 h-auto" viewBox="0 0 48 24" xmlns="http://www.w3.org/2000/svg"><path d="M48 20.3c0 .8-.3 1.5-.9 2.1-.6.6-1.3.9-2.1.9H2.9c-.8 0-1.5-.3-2.1-.9-.6-.6-.9-1.3-.9-2.1V3.7c0-.8.3-1.5.9-2.1.6-.6 1.3-.9 2.1-.9H45c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v16.6z" fill="#6772E5"/></svg>;
const PaypalIcon = () => <svg className="w-10 h-auto" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path fill="#003087" d="M34.6 2.4H8.1C7.1 2.4 6.2 3.3 6.2 4.3l-4.1 20.2c-.1.7.4 1.2 1.1 1.2h7.1c.6 0 1.1-.5 1.2-.1L14 14.5c.1-.4.5-.7 1-.7h3.1c6.5 0 11.2-3.3 12.5-9.9.5-2.6-1-5.2-4-5.2z"/><path fill="#009cde" d="M36.1 2.4H14.8c-.6 0-1.1.5-1.2.1L11 22.9c-.1.4-.5.7-1 .7H3.8c-.7 0-1.2-.4-1.1-1.2L6.8 4.3C6.8 3.3 7.7 2.4 8.7 2.4h26.2c2.2 0 4.1 1.6 3.9 4.1-.3 2.9-2.6 5.1-5.5 5.1-1.5 0-2.8-.6-3.8-1.5-.8-.7-1.3-1.6-1.5-2.6-.1-.4-.5-.7-1-.7h-3.1c-.6 0-1.1.5-1.2.1L19.9 6c-.1-.4-.5-.7-1-.7h-3.1c-.6 0-1.1.5-1.2.1L14.2 3c-.1-.4-.5-.7-1-.7h-.1c-.6 0-1.1.5-1.2.1L11.5 0c-.1-.4.2-1.1.7-1.1H35c2.3 0 4.2 1.9 4.2 4.2-.1 2.9-2.2 5.2-5.1 5.2z"/><path fill="#012169" d="M22.9 8.9c-.3-1-1-1.7-1.9-1.9-1-.2-2.1 0-2.9.7-.8.7-1.3 1.6-1.5 2.6-.1.4-.5.7-1 .7h-3.1c-.6 0-1.1.5-1.2 1.1l-1.4 6.8c-.1.4.2 1 .7 1h3.1c.6 0 1.1-.5 1.2-1.1L17.1 13c.1-.4.5-.7 1-.7h.1c.6 0 1.1.5 1.2 1.1l.6 3.2c.1.4.5.7 1 .7h3.1c.5 0 .9-.3 1-.8 1.2-5-1.8-8.5-5.3-8.5z"/></svg>;
const MastercardIcon = () => <svg className="w-10 h-auto" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><circle fill="#EB001B" cx="15" cy="12" r="12"/><circle fill="#F79E1B" cx="23" cy="12" r="12"/><path fill="#FF5F00" d="M23,12c0,6.6-5.4,12-12,12c-0.6,0-1.2-0.1-1.8-0.2c-0.4-0.1-0.8-0.2-1.2-0.3C13.6,22.1,18.8,17.6,18.8,12 c0-5.6-5.2-10.1-10.8-11.5c0.4-0.1,0.8-0.2,1.2-0.3c0.6-0.1,1.2-0.2,1.8-0.2C17.6,0,23,5.4,23,12z"/></svg>;
const GPayIcon = () => <svg className="w-10 h-auto" viewBox="0 0 48 24" xmlns="http://www.w3.org/2000/svg"><path d="M48 20.3c0 .8-.3 1.5-.9 2.1-.6.6-1.3.9-2.1.9H2.9c-.8 0-1.5-.3-2.1-.9C.3 21.8 0 21.1 0 20.3V3.7c0-.8.3-1.5.9-2.1C1.4 1 2.1.7 2.9.7H45c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v16.6z" fill="#FFF"/><path d="M29.5 10.6c0-.4-.1-.8-.3-1.2-.2-.3-.5-.6-.8-.8-.4-.2-.8-.3-1.2-.3-.5 0-1 .1-1.4.3l3.7 3.7zM24.2 12.9l-3.6-3.6c-.2.4-.3.9-.3 1.4 0 .4.1.8.3 1.2.2.3.5.6.8.8.4.2.8.3 1.2.3.5 0 1-.1 1.4-.3.1 0 .2-.1.2-.1z" fill="#34A853"/><path d="M30.6 14.5c.3-.3.6-.6.8-1 .2-.4.3-.8.3-1.2 0-.5-.1-1-.3-1.4l-3.8 3.8c.4-.2.9-.3 1.4-.3.5 0 .9.1 1.3.2h.3z" fill="#FBBC04"/><path d="M17.4 9.1c-.3.3-.6.6-.8 1-.2.4-.3.8-.3 1.2s.1 1 .3 1.4l3.8-3.8c-.4.2-.9.3-1.4.3-.5 0-.9-.1-1.3-.2l-.3-.1z" fill="#EA4335"/><path d="M20.6 12.9c0 .5.1.9.3 1.4.2.4.5.8.8 1.1l3.6-3.6c-.2-.4-.3-.9-.3-1.4s.1-.9.3-1.4c0-.1.1-.1.1-.2l-3.6-3.6c-.3.3-.6.6-.8 1-.2.4-.3.8-.3 1.2z" fill="#4285F4"/></svg>;

const Payment: React.FC<PaymentProps> = ({ navigate, onPaymentSuccess, candidate }) => {
    return (
        <div className="max-w-4xl mx-auto">
             <div className="mb-8">
                <button onClick={() => navigate('progress')} className="text-blue-600 hover:underline font-semibold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Progress Tracker
                </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment</h1>
            {candidate && <p className="text-gray-600 mb-8">Unlocking documents for candidate: <span className="font-semibold text-gray-800">{candidate.name}</span></p>}

            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={(e) => { e.preventDefault(); onPaymentSuccess(); }}>
                    <h2 className="text-xl font-semibold text-gray-700 mb-6">Personal details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">Address line</label>
                            <input type="text" id="address" defaultValue="P.O.Box 1223" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">City</label>
                            <input type="text" id="city" defaultValue="Arusha" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="state">State</label>
                            <input type="text" id="state" defaultValue="Arusha, Tanzania" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="postal">Postal code</label>
                            <input type="text" id="postal" defaultValue="9090" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment methods</h2>
                    <div className="flex space-x-4 mb-8 border-b pb-8">
                        <VisaIcon />
                        <StripeIcon />
                        <PaypalIcon />
                        <MastercardIcon />
                        <GPayIcon />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-6">Card details</h2>
                     <div className="space-y-6">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cardName">Cardholder's name</label>
                            <input type="text" id="cardName" defaultValue="Seen on your card" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cardNumber">Card number</label>
                            <input type="text" id="cardNumber" defaultValue="Seen on your card" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="expiry">Expiry</label>
                                <input type="text" id="expiry" defaultValue="20/23" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cvc">CVC</label>
                                <input type="text" id="cvc" defaultValue="654" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                     </div>
                     <div className="mt-8">
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                            Confirm Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Payment;