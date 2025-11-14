import React from 'react';

export default function CognitionSphere(props) {
  return (
    <mesh {...props}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}
