import React from 'react';

export default function PanelOmniCore({ position }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.5, 6]} />
        <meshStandardMaterial color="purple" emissive="violet" />
      </mesh>
      {/* TODO: Add synaptic memory ribbons, evolution overlays, risk holograms */}
    </group>
  );
}
