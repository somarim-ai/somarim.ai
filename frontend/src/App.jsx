import React, { useState } from 'react';
import './App.css';

function App() {
  const [responseText, setResponseText] = useState('');

  const handleButtonClick = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResponseText(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('API call failed:', error);
      setResponseText(`Error: ${error.message}`);
      alert('API call failed: ' + error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Somarim Interface</h1>
        <div className="button-container">
          <button className="activate-btn" onClick={() => handleButtonClick('/sysadmin', { action: 'quantum_control', parameters: { state: 'optimized' } })}>ACTIVATE Somarim MODE</button>
          <button className="treatment-nrh" onClick={() => handleButtonClick('/medical', { protocol: 'NRH-9000', action: 'neural_repair' })}>START NRH-9000 Treatment</button>
          <button className="treatment-qhb" onClick={() => handleButtonClick('/medical', { protocol: 'QHB-100', action: 'quantum_healing' })}>START QHB-100 Treatment</button>
          <button className="treatment-stroke" onClick={() => handleButtonClick('/medical', { action: 'reverse_stroke', intensity: 'emergency' })}>START Stroke Reversal</button>
          <button className="medical-control-1" onClick={() => handleButtonClick('/devops', { action: 'deploy_infrastructure', target: 'production' })}>Deploy Infrastructure</button>
          <button className="healing-control-1" onClick={() => handleButtonClick('/devops', { action: 'scale_services', capacity: '1000' })}>Scale Services</button>
          <button className="medical-control-2" onClick={() => handleButtonClick('/devops', { action: 'system_health_check' })}>Monitor Systems</button>
        </div>
        <div className="response-container">
          <h2>API Response:</h2>
          <pre>{responseText}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
