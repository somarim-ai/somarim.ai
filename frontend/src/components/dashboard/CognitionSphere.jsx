import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CognitionSphere({ position }) {
  const sphereRef = useRef();
  const nodesRef = useRef([]);
  const ribbonsRef = useRef([]);
  const fogRef = useRef();

  useEffect(() => {
    nodesRef.current = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      return new THREE.Vector3(3 * Math.cos(angle), 3 * Math.sin(angle), 0);
    });

    ribbonsRef.current = nodesRef.current.map(() => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ]);
      const material = new THREE.LineBasicMaterial({ color: 'cyan', transparent: true, opacity: 0.6 });
      return new THREE.Line(geometry, material);
    });

    fogRef.current = new THREE.Mesh(
      new THREE.SphereGeometry(7, 32, 32),
      new THREE.MeshStandardMaterial({ color: 'blue', transparent: true, opacity: 0.05, side: THREE.DoubleSide })
    );
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    sphereRef.current.rotation.y += 0.001;

    nodesRef.current.forEach((node, i) => {
      node.x = 3 * Math.cos(t * 0.5 + (i / 12) * Math.PI * 2);
      node.y = 3 * Math.sin(t * 0.5 + (i / 12) * Math.PI * 2);

      const positions = ribbonsRef.current[i].geometry.attributes.position.array;
      positions[0] = 0;
      positions[1] = 0;
      positions[2] = 0;
      positions[3] = node.x;
      positions[4] = node.y;
      positions[5] = node.z;
      ribbonsRef.current[i].geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <group position={position}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial color="deepskyblue" transparent opacity={0.5} roughness={0.1} metalness={0.5} />
      </mesh>

      {nodesRef.current.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="cyan" emissive="cyan" />
        </mesh>
      ))}

      {ribbonsRef.current.map((line, i) => (
        <primitive key={i} object={line} />
      ))}

      <primitive object={fogRef.current} />
    </group>
  );
}
