
import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CognitiveSparks({ count = 200, color = new THREE.Color('#ffab00') }) {
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i3] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    return [positions, velocities];
  }, [count]);

  const points = React.useRef();

  useFrame(() => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        if (
          positions[i3] > 5 || positions[i3] < -5 ||
          positions[i3 + 1] > 5 || positions[i3 + 1] < -5 ||
          positions[i3 + 2] > 5 || positions[i3 + 2] < -5
        ) {
          positions[i3] = 0;
          positions[i3 + 1] = 0;
          positions[i3 + 2] = 0;
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} transparent opacity={0.7} />
    </points>
  );
}
