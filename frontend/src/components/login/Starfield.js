import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
const Starfield = () => {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });
    return (_jsx("group", { rotation: [0, 0, Math.PI / 4], children: _jsx(Points, { ref: ref, positions: sphere, stride: 3, frustumCulled: false, children: _jsx(PointMaterial, { transparent: true, color: "#ffa0e0", size: 0.005, sizeAttenuation: true, depthWrite: false }) }) }));
};
const StarsCanvas = () => (_jsx("div", { style: { width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }, children: _jsx(Canvas, { camera: { position: [0, 0, 1] }, children: _jsx(Starfield, {}) }) }));
export default StarsCanvas;
