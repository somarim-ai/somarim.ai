import React from 'react';

export default function PanelQuantum({ position }) {
  return (
    <group position={position}>
      <mesh>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="cyan" emissive="cyan" />
      </mesh>
      {/* TODO: Multi-domain ribbons, probability holograms, critical overlays */}
    </group>
  );
}
