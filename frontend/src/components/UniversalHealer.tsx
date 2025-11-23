import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Zap, Activity } from 'lucide-react';
import { healingService } from '../services/healingService';

const UniversalHealer: React.FC = () => {
  const [activeTreatment, setActiveTreatment] = useState<string | null>(null);
  const [somarimMode, setSomarimMode] = useState(false);
  const [treatmentProgress, setTreatmentProgress] = useState(0);

  const treatmentProtocols = [
    {
      id: 'stroke-reversal',
      name: 'Instant Stroke Reversal',
      description: 'Complete stroke reversal in 10 minutes',
      device: 'NRH-9000 or QHB-100',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'brain-repair', 
      name: 'Neural Tissue Repair',
      description: 'Repair brain damage and regenerate neurons',
      device: 'NRH-9000',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'neural-optimization',
      name: 'Neural Optimization',
      description: 'Enhance brain function beyond normal levels',
      device: 'QHB-100',
      icon: <Activity className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const activateSomarimMode = async () => {
    try {
      await healingService.activateSomarimMode();
      setSomarimMode(true);
    } catch (error) {
      console.error('Somarim mode activation failed:', error);
    }
  };

  const startTreatment = async (protocolId: string) => {
    if (!somarimMode) await activateSomarimMode();
    
    setActiveTreatment(protocolId);
    
    try {
      const patientData = { id: 'current-patient' };
      let result;

      switch (protocolId) {
        case 'stroke-reversal':
          result = await healingService.performStrokeReversal(patientData, 'ischemic');
          break;
        case 'brain-repair':
          result = await healingService.repairBrainDamage(patientData, {});
          break;
      }

      // Simulate treatment progress
      for (let i = 0; i <= 100; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setTreatmentProgress(i);
      }

      console.log('Treatment completed:', result);
      
    } catch (error) {
      console.error('Treatment failed:', error);
    } finally {
      setActiveTreatment(null);
      setTreatmentProgress(0);
    }
  };

  return (
    <div className="universal-healer">
      {/* Somarim Mode Activation */}
      {!somarimMode && (
        <div className="somarim-activation-panel">
          <button onClick={activateSomarimMode} className="activate-button">
            ACTIVATE Somarim MODE - 5000X POWER
          </button>
        </div>
      )}

      {/* Treatment Protocols */}
      <div className="treatment-grid">
        {treatmentProtocols.map((protocol) => (
          <div key={protocol.id} className={`treatment-card ${protocol.color}`}>
            <div className="protocol-header">
              <div className="protocol-icon">
                {protocol.icon}
              </div>
              <h3>{protocol.name}</h3>
              <p>{protocol.description}</p>
              <span className="device-badge">{protocol.device}</span>
            </div>

            <button
              onClick={() => startTreatment(protocol.id)}
              disabled={activeTreatment !== null}
              className="treatment-button"
            >
              {activeTreatment === protocol.id 
                ? `TREATMENT... ${treatmentProgress}%` 
                : 'START TREATMENT'
              }
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversalHealer;
