import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CognitionSphere from './CognitionSphere';
import PanelBioGenesis from './PanelBioGenesis';
import PanelSystemsMatrix from './PanelSystemsMatrix';
import PanelOmniCore from './PanelOmniCore';
import PanelQuantum from './PanelQuantum';
import DashboardEffects from './DashboardEffects';

export default function DashboardShell() {
  return (
    <Canvas>
       <fog attach="fog" args={['#000510', 5, 20]} />
      <Suspense fallback={null}>
        <CognitionSphere position={[0, 0, 0]} />

        <PanelBioGenesis position={[-5, 3, 0]} />
        <PanelSystemsMatrix position={[5, 3, 0]} />
        <PanelOmniCore position={[-5, -3, 0]} />
        <PanelQuantum position={[5, -3, 0]} />

        {/* Full interactive effects */}
        <DashboardEffects />
      </Suspense>
    </Canvas>
  );
}
