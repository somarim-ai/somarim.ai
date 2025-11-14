
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import CentralCognitionSphere from '../dashboard/CentralCognitionSphere';
import OMARIMLogo from '../dashboard/OMARIMLogo';
import ParticleFlows from '../dashboard/ParticleFlows';

export default function LoginBackground() {
  const aiConfidence = 0.5; // Lower confidence for login screen

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 25], fov: 60, near: 1, far: 1000 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} color="white" />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, 5]} intensity={0.3} color="blue" />

        {/* Environment */}
        <color attach="background" args={['#000011']} />
        <fog attach="fog" args={['#000011', 15, 40]} />

        <Suspense fallback={null}>
          <CentralCognitionSphere aiConfidence={aiConfidence} position={[0, 0, -5]}/>
          <OMARIMLogo aiConfidence={aiConfidence} />
          <ParticleFlows />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.1} />
      </Canvas>
    </div>
  );
}
