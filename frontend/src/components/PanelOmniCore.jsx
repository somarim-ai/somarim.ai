import React from 'react';

export default function PanelOmniCore(props) {
  return (
    <mesh {...props}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial color="#2f4f4f" />
    </mesh>
  );
}
