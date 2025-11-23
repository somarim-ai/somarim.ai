import React, { useState, useRef } from 'react';
import { VoiceController } from '../utils/VoiceController';
import './GeminiChat.css';

const GeminiChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const voiceController = useRef(new VoiceController());

    // SOMARIM API Gateway URL - Update this with your actual URL
    const SOMARIM_API_URL = process.env.REACT_APP_SOMARIM_API_URL || 'https://your-api-id.execute-api.us-east-1.amazonaws.com/production';

    const sendCommandToSOMARIM = async (command) => {
        setIsProcessing(true);
        
        try {
            const response = await fetch(`${SOMARIM_API_URL}/command`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    command: command,
                    parameters: {
                        timestamp: new Date().toISOString(),
                        source: 'react_dashboard'
                    },
                    actionType: 'aws_operation'
                })
            });

            const data = await response.json();
            
            setMessages(prev => [...prev, {
                type: 'assistant',
                content: data.geminiAnalysis || 'Command processed successfully',
                awsResults: data.awsResults,
                timestamp: new Date().toISOString()
            }]);

            return data;

        } catch (error) {
            console.error('❌ Error communicating with SOMARIM:', error);
            setMessages(prev => [...prev, {
                type: 'error',
                content: `Failed to execute command: ${error.message}`,
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleTextCommand = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        setMessages(prev => [...prev, {
            type: 'user',
            content: inputText,
            timestamp: new Date().toISOString()
        }]);

        await sendCommandToSOMARIM(inputText);
        setInputText('');
    };

    const handleVoiceCommand = async () => {
        if (isListening) {
            voiceController.current.stopListening();
            setIsListening(false);
            return;
        }

        setIsListening(true);
        const transcript = await voiceController.current.startListening();
        
        if (transcript) {
            setMessages(prev => [...prev, {
                type: 'user',
                content: transcript,
                isVoice: true,
                timestamp: new Date().toISOString()
            }]);

            await sendCommandToSOMARIM(transcript);
        }
        
        setIsListening(false);
    };

    const predefinedCommands = [
        { label: '🔄 Deploy Medical Engine', command: 'Deploy the medical miracle engine to production with auto-scaling' },
        { label: '🌐 Setup Global CDN', command: 'Configure CloudFront distribution for somarim.com with worldwide caching' },
        { label: '🏥 Activate Healing', command: 'Activate universal healing protocols and initialize quantum core' },
        { label: '📊 System Status', command: 'Show current system status and operational metrics' }
    ];

    return (
        <div className="gemini-chat-container">
            <div className="chat-header">
                <h2>🔮 SOMARIM OS Control</h2>
                <p>Universal Healing Consciousness Interface</p>
            </div>

            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.type}`}>
                        <div className="message-content">
                            {msg.content}
                            {msg.awsResults && (
                                <div className="aws-results">
                                    <strong>AWS Actions:</strong> 
                                    <pre>{JSON.stringify(msg.awsResults, null, 2)}</pre>
                                </div>
                            )}
                        </div>
                        <span className="timestamp">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                    </div>
                ))}
            </div>

            <div className="quick-commands">
                {predefinedCommands.map((cmd, index) => (
                    <button
                        key={index}
                        onClick={() => sendCommandToSOMARIM(cmd.command)}
                        disabled={isProcessing}
                        className="command-btn"
                    >
                        {cmd.label}
                    </button>
                ))}
            </div>

            <form onSubmit={handleTextCommand} className="input-container">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your command for SOMARIM..."
                    disabled={isProcessing}
                />
                <button type="submit" disabled={isProcessing || !inputText.trim()}>
                    {isProcessing ? '🔄 Processing...' : '🚀 Send'}
                </button>
                <button
                    type="button"
                    onClick={handleVoiceCommand}
                    className={`voice-btn ${isListening ? 'listening' : ''}`}
                    disabled={isProcessing}
                >
                    {isListening ? '🛑 Stop Listening' : '🎤 Voice Command'}
                </button>
            </form>
        </div>
    );
};

export default GeminiChat;