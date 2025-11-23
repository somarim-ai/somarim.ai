import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Canvas } from '@react-three/fiber';
import CentralCognitionSphere from './CentralCognitionSphere';
import OrbitingAINodes from './OrbitingAINodes';
const CognitionScene = () => {
    return (_jsx("div", { style: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }, children: _jsxs(Canvas, { camera: { position: [0, 0, 15], fov: 75 }, children: [_jsx("ambientLight", { intensity: 0.6, color: "#ffffff" }), _jsx(CentralCognitionSphere, {}), _jsx(OrbitingAINodes, {})] }) }));
};
export default CognitionScene;
