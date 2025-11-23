import React, { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ARButton, VRButton, XR } from '@react-three/xr';

import CognitionSphere from './CognitionSphere';
import DashboardPanels from './dashboard/DashboardPanels';
import DashboardEffects from './DashboardEffects';
import MultiUserPaths from './dashboard/MultiUserPaths';
import VoiceControl from './dashboard/VoiceControl';
import GestureControl from './dashboard/GestureControl';
import CameraControl from './dashboard/CameraControl';
import LogoutButton from './LogoutButton';
import useStore from '../store';

const DashboardShell: React.FC = () => {
  const [cameraTarget, setCameraTarget] = useState<[number, number, number] | undefined>(undefined);
  const [zoom, setZoom] = useState<number>(1);
  const store = useStore();

  const handlePanelClick = (position: [number, number, number]) => {
    setCameraTarget(position);
    setZoom(2);
  };

  const resetView = () => {
    setCameraTarget(undefined);
    setZoom(1);
  };

  const handleVoiceCommand = (command: string) => {
    if (command.includes("focus on biogenesis")) {
      setCameraTarget([-8, 5, 0]);
    } else if (command.includes("focus on systems")) {
      setCameraTarget([8, 5, 0]);
    } else if (command.includes("focus on omnicore")) {
      setCameraTarget([-8, -5, 0]);
    } else if (command.includes("focus on quantum")) {
      setCameraTarget([8, -5, 0]);
    } else if (command.includes("reset view")) {
      resetView();
    }
  };

  const handleZoom = (zoomValue: number) => {
    setZoom(zoomValue);
  };

  return (
    <>
      <ARButton store={store} />
      {store.isVR && <VRButton store={store} />}
      <Canvas>
        <XR store={store}>
          <fog attach="fog" args={['#000510', 5, 20]} />
          <Suspense fallback={null}>
            <CognitionSphere position={[0, 0, 0]} />

            <DashboardPanels onPanelClick={handlePanelClick} />

            <LogoutButton position={[8, -5, 2]} />


            <DashboardEffects />
            <MultiUserPaths />
            <CameraControl target={cameraTarget} zoom={zoom} />
          </Suspense>
        </XR>
      </Canvas>
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
        <Link to="/council-review" style={{ color: 'white', textDecoration: 'none', padding: '10px', background: 'rgba(0,0,0,0.5)', borderRadius: '5px' }}>
            Council Review
        </Link>
        <button onClick={resetView} style={{ color: 'white', background: 'rgba(0,0,0,0.5)', border: 'none', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
          Reset View
        </button>
      </div>
      <VoiceControl onCommand={handleVoiceCommand} />
      <GestureControl onZoom={handleZoom} />
    </>
  );
}

export default DashboardShell;
