import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export default function OMARIMLogo({ aiConfidence = 0.8 }) {
  const group = useRef();
  const text = useRef();
  const pulseIntensity = 0.5 + aiConfidence * 0.5;

  useFrame((state, delta) => {
    if (group.current) {
        group.current.rotation.y += 0.05 * delta;
    }
    if (text.current) {
        const pulse = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2;
        text.current.material.emissiveIntensity = pulse * pulseIntensity;
    }
  });

  return (
    <group ref={group} position={[0, 3, 0]} scale={[1.5, 1.5, 1.5]}>
      <Text
        ref={text}
        text="OMARIM"
        fontSize={1}
        color="#ffffff"
        material-emissive="#ffffff"
        material-emissiveIntensity={1}
      >
      </Text>
    </group>
  );
}
