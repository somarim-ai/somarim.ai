
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ color, count = 1000 }) {
    const mesh = useRef();

    const [positions] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
          positions[i] = (Math.random() - 0.5) * 20;
        }
        return [positions];
      }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if(mesh.current) {
            mesh.current.rotation.y += 0.0005;
            mesh.current.position.y = Math.sin(time / 2) * 0.5;
        }
    });

  return (
    <points ref={mesh}>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color={color} />
    </points>
  );
}

export default function ParticleFlows() {
    return (
        <group>
            <Particles color={new THREE.Color('#00ff00')} />
            <Particles color={new THREE.Color('#ff9900')} />
            <Particles color={new THREE.Color('#9900ff')} />
            <Particles color={new THREE.Color('#00ffff')} />
        </group>
    )
}
