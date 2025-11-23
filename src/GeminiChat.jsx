import React, { useState } from 'react';

const API_URL = 'YOUR_API_GATEWAY_URL'; // <-- IMPORTANT: Replace with your actual API Gateway URL

const GeminiChat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = async (text) => {
    if (!text.trim()) return;

    setError(null);
    setResponse(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'An unknown error occurred.');
      }

      setResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVoiceCommand = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
    };

    recognition.onresult = (event) => {
      const voiceCommand = event.results[0][0].transcript;
      setPrompt(voiceCommand);
      handleSubmit(voiceCommand);
    };

    recognition.start();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>SOMARIM Autonomous Control</h1>
      <p>Enter a command for SOMARIM to execute in your AWS environment.</p>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., Create an S3 bucket named 'somarim-test-bucket-001'"
        rows={4}
        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
      />

      <button onClick={() => handleSubmit(prompt)} style={{ padding: '10px 20px', marginRight: '10px' }}>
        Execute Command
      </button>

      <button onClick={handleVoiceCommand} style={{ padding: '10px 20px' }}>
        {isListening ? 'Stop Listening' : 'Use Voice Command'}
      </button>

      {response && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#e0ffe0' }}>
          <h3>Success!</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#ffe0e0' }}>
          <h3>Error</h3>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;
