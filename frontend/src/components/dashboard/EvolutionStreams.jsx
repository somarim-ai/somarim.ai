
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stream({ start, end, color }) {
  const lineRef = useRef();

  useFrame(() => {
    if (lineRef.current) {
        lineRef.current.material.uniforms.dashOffset.value -= 0.01;
    }
  });

  const points = [start, end];

  return (
    <line>
        <bufferGeometry attach="geometry" setFromPoints={points.map(p => new THREE.Vector3(...p))} />
        <lineDashedMaterial 
            attach="material" 
            color={color} 
            dashSize={0.5} 
            gapSize={0.2} 
            ref={lineRef} 
            />
    </line>
  );
}

export default function EvolutionStreams() {
    const streams = [
        { start: [-8, 5, 0], end: [0, 0, 0], color: new THREE.Color('#00ff00') },
        { start: [8, 5, 0], end: [0, 0, 0], color: new THREE.Color('#ff9900') },
        { start: [-8, -5, 0], end: [0, 0, 0], color: new THREE.Color('#9900ff') },
        { start: [8, -5, 0], end: [0, 0, 0], color: new THREE.Color('#00ffff') }
    ];

  return (
    <group>
      {streams.map((stream, index) => (
        <Stream key={index} start={stream.start} end={stream.end} color={stream.color} />
      ))}
    </group>
  );
}
