import React, { useEffect, useState } from 'react';
export default function VoiceControl({ onCommand }) {
    const [isListening, setIsListening] = useState(false);
    useEffect(() => {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        if (!SpeechRecognition) {
            console.log("Voice recognition not supported by this browser.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    const command = event.results[i][0].transcript.trim().toLowerCase();
                    console.log("Final Voice Command Received:", command);
                    onCommand(command);
                }
            }
        };
        // Automatically start listening
        recognition.start();
        return () => {
            recognition.stop();
        };
    }, [onCommand]);
    return null;
}
