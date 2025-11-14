
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import CentralCognitionSphere from './CentralCognitionSphere';
import OMARIMLogo from './OMARIMLogo';
import OrbitingAINodes from './OrbitingAINodes';
import DashboardPanels from './DashboardPanels';
import EvolutionStreams from './EvolutionStreams';
import ParticleFlows from './ParticleFlows';
import CognitiveSparks from './CognitiveSparks';
import PredictionFlowTrails from './PredictionFlowTrails';
import NeonDataRibbons from './NeonDataRibbons';
import VolumetricFog from './VolumetricFog';
import DynamicGrid from './DynamicGrid';
import Starfield from './Starfield';

export default function BackgroundScene() {
  const aiConfidence = 0.8; // Simulated AI confidence

  return (
    <Canvas camera={{ position: [0, 0, 25], fov: 60, near: 1, far: 1000 }}>
      {/* Lighting */}
      <ambientLight intensity={0.6} color="white" />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color="blue" />

      {/* Environment */}
      <color attach="background" args={['#000011']} />

      <Suspense fallback={null}>
        <CentralCognitionSphere aiConfidence={aiConfidence} />
        <OMARIMLogo aiConfidence={aiConfidence} />
        <OrbitingAINodes />
        <DashboardPanels />
        <EvolutionStreams />
        <ParticleFlows />
        <CognitiveSparks />
        <PredictionFlowTrails />
        <NeonDataRibbons />
        <VolumetricFog />
        <DynamicGrid />
        <Starfield />
      </Suspense>

      {/* Camera Controls */}
      <OrbitControls enableZoom={true} minDistance={1} maxDistance={50} autoRotate={true} autoRotateSpeed={0.2} />
    </Canvas>
  );
}
