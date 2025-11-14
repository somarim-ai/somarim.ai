import React from 'react';

export default function PanelSystemsMatrix({ position }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[2, 1, 0.5]} />
        <meshStandardMaterial color="orange" emissive="darkorange" />
      </mesh>
      {/* TODO: Infra health bars, auto-heal flows, particle animations */}
    </group>
  );
}
