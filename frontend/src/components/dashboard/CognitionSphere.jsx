import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CognitionSphere({ position }) {
  const sphereRef = useRef();
  const nodesRef = useRef([]);

  useEffect(() => {
    // Initialize orbiting nodes
    nodesRef.current = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const x = 3 * Math.cos(angle);
      const y = 3 * Math.sin(angle);
      return new THREE.Vector3(x, y, 0);
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Rotate nodes around sphere
    nodesRef.current.forEach((node, i) => {
      const angle = t * 0.5 + (i / 12) * Math.PI * 2;
      node.x = 3 * Math.cos(angle);
      node.y = 3 * Math.sin(angle);
      // This is a bit of a hack, we should be updating the mesh position directly
      // but this will do for now to keep the code simple.
      if(sphereRef.current.children[i+1]) {
        sphereRef.current.children[i+1].position.set(node.x, node.y, node.z);
      }
    });
    // Rotate central sphere slowly
    sphereRef.current.rotation.y += 0.001;
  });

  return (
    <group position={position}>
      {/* Central Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="deepskyblue"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.5}
        />
        {/* Orbiting Nodes */}
        {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x = 3 * Math.cos(angle);
            const y = 3 * Math.sin(angle);
            return (
                <mesh key={i} position={[x,y,0]}>
                    <sphereGeometry args={[0.2, 32, 32]} />
                    <meshStandardMaterial color="cyan" emissive="cyan" />
                </mesh>
            )
        })}
      </mesh>
    </group>
  );
}
