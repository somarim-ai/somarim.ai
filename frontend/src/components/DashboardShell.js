import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Suspense, useState } from 'react';
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
const DashboardShell = () => {
    const [cameraTarget, setCameraTarget] = useState(undefined);
    const [zoom, setZoom] = useState(1);
    const store = useStore();
    const handlePanelClick = (position) => {
        setCameraTarget(position);
        setZoom(2);
    };
    const resetView = () => {
        setCameraTarget(undefined);
        setZoom(1);
    };
    const handleVoiceCommand = (command) => {
        if (command.includes("focus on biogenesis")) {
            setCameraTarget([-8, 5, 0]);
        }
        else if (command.includes("focus on systems")) {
            setCameraTarget([8, 5, 0]);
        }
        else if (command.includes("focus on omnicore")) {
            setCameraTarget([-8, -5, 0]);
        }
        else if (command.includes("focus on quantum")) {
            setCameraTarget([8, -5, 0]);
        }
        else if (command.includes("reset view")) {
            resetView();
        }
    };
    const handleZoom = (zoomValue) => {
        setZoom(zoomValue);
    };
    return (_jsxs(_Fragment, { children: [_jsx(ARButton, {}), store.isVR && _jsx(VRButton, {}), _jsx(Canvas, { children: _jsxs(XR, { store: store, children: [_jsx("fog", { attach: "fog", args: ['#000510', 5, 20] }), _jsxs(Suspense, { fallback: null, children: [_jsx(CognitionSphere, { position: [0, 0, 0] }), _jsx(DashboardPanels, { onPanelClick: handlePanelClick }), _jsx(LogoutButton, { position: [8, -5, 2] }), _jsx(DashboardEffects, {}), _jsx(MultiUserPaths, {}), _jsx(CameraControl, { target: cameraTarget, zoom: zoom })] })] }) }), _jsxs("div", { style: { position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }, children: [_jsx(Link, { to: "/council-review", style: { color: 'white', textDecoration: 'none', padding: '10px', background: 'rgba(0,0,0,0.5)', borderRadius: '5px' }, children: "Council Review" }), _jsx("button", { onClick: resetView, style: { color: 'white', background: 'rgba(0,0,0,0.5)', border: 'none', padding: '10px', borderRadius: '5px', marginLeft: '10px' }, children: "Reset View" })] }), _jsx(VoiceControl, { onCommand: handleVoiceCommand }), _jsx(GestureControl, { onZoom: handleZoom })] }));
};
export default DashboardShell;
