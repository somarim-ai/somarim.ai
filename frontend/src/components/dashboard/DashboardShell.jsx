import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import CognitionSphere from './CognitionSphere';
import PanelBioGenesis from './PanelBioGenesis';
import PanelSystemsMatrix from './PanelSystemsMatrix';
import PanelOmniCore from './PanelOmniCore';
import PanelQuantum from './PanelQuantum';

export default function DashboardShell() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          {/* Central Cognition Sphere */}
          <CognitionSphere position={[0, 0, 0]} />

          {/* Panels */}
          <PanelBioGenesis position={[-5, 3, 0]} />
          <PanelSystemsMatrix position={[5, 3, 0]} />
          <PanelOmniCore position={[-5, -3, 0]} />
          <PanelQuantum position={[5, -3, 0]} />
        </Suspense>

        {/* Camera controls */}
        <OrbitControls enablePan enableRotate enableZoom />
        <Stats />
      </Canvas>
    </div>
  );
}
