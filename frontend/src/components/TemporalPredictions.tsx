
import React from 'react';

interface TemporalPredictionsProps {
  predictions: any[];
  onPreemptFix: (prediction: any) => void;
}

export function TemporalPredictions({ predictions, onPreemptFix }: TemporalPredictionsProps) {
  return (
    <group>
      {predictions.map((prediction, i) => (
        <mesh key={i} position={[i * 2 - 5, 0, 0]} onClick={() => onPreemptFix(prediction)}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color={'#FF4500'} />
        </mesh>
      ))}
    </group>
  );
}
