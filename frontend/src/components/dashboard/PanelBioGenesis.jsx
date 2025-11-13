import React from 'react';

export default function PanelBioGenesis({ position }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.5, 6]} />
        <meshStandardMaterial color="lime" emissive="green" />
      </mesh>
      {/* TODO: Add particle streams, ribbons, holographic overlays */}
    </group>
  );
}
