
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function getHaloColor(confidence) {
  if (confidence > 0.8) return new THREE.Color('#00ff00'); // green
  if (confidence > 0.5) return new THREE.Color('#ffff00'); // yellow
  return new THREE.Color('#ff0000'); // red
}

export default function CentralCognitionSphere({ aiConfidence = 0.8 }) {
  const group = useRef();
  const core = useRef();
  const halo = useRef();

  const haloColor = useMemo(() => getHaloColor(aiConfidence), [aiConfidence]);

  useFrame((state, delta) => {
    const pulse = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2;
    const pulseIntensity = 0.5 + aiConfidence * 0.5;

    if (group.current) {
      group.current.rotation.y += 0.001;
    }

    if (core.current) {
        core.current.scale.set(1,1,1).multiplyScalar(0.9 + pulse * 0.2 * pulseIntensity);
    }

    if (halo.current) {
        halo.current.material.opacity = 0.3 + pulse * 0.3 * pulseIntensity;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]} scale={[2.5, 2.5, 2.5]}>
      {/* Neon Core */}
      <mesh ref={core}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>

      {/* Halo */}
      <mesh ref={halo}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color={haloColor} transparent opacity={0.5} />
      </mesh>

      {/* Point Light for Glow */}
      <pointLight color={haloColor} intensity={2 * aiConfidence} distance={10} />
    </group>
  );
}
