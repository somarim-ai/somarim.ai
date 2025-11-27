
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGeminiConsciousness } from '../hooks/useGeminiConsciousness';
import { MultiDimensionalNetwork } from './MultiDimensionalNetwork';
import { TemporalPredictions } from './TemporalPredictions';
import { QuantumEntanglement } from './QuantumEntanglement';
import { PsychicInterface } from './PsychicInterface';
import { BiologicalNetworkGrowth } from './BiologicalNetworkGrowth';
import { PsychicCommandInterface } from './PsychicCommandInterface';

export function QuantumDashboard() {
  const { networkConsciousness, temporalPredictions, quantumState } = useGeminiConsciousness();

  const fixFutureFailure = (prediction: any) => {
    console.log('Fixing future failure:', prediction);
  };

  const handleQuantumCollapse = (channel: any) => {
    console.log('Quantum channel collapsed:', channel);
  };

  const handleTelepathicCommand = (thought: string) => {
    console.log('Telepathic command received:', thought);
  };

  const handleOperatorEmotion = (emotion: any) => {
    console.log('Operator emotion detected:', emotion);
  };

  const executeTelepathicNetworkChange = (intent: string) => {
    console.log('Executing telepathic network change:', intent);
  };

  return (
    <div className="h-screen w-screen bg-black">
      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.3} />
        
        <MultiDimensionalNetwork 
          dimensions={11}
          consciousness={networkConsciousness}
        />
        
        <TemporalPredictions 
          predictions={temporalPredictions}
          onPreemptFix={fixFutureFailure}
        />
        
        <QuantumEntanglement 
          channels={quantumState.entanglements}
          onCollapse={handleQuantumCollapse}
        />
        
        <PsychicInterface 
          onThoughtReceived={handleTelepathicCommand}
          onEmotionDetected={handleOperatorEmotion}
        />
        
        <BiologicalNetworkGrowth 
          dna={networkConsciousness.networkDNA}
          mutations={quantumState.mutations}
        />
      </Canvas>
      
      <PsychicCommandInterface 
        onIntentDetected={executeTelepathicNetworkChange}
      />
    </div>
  );
}
