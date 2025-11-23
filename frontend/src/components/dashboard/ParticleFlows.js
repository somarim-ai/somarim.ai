import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
function Particles({ color, count = 1000 }) {
    const mesh = useRef();
    const [positions] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
        }
        return [positions];
    }, [count]);
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (mesh.current) {
            mesh.current.rotation.y += 0.0005;
            mesh.current.position.y = Math.sin(time / 2) * 0.5;
        }
    });
    return (_jsxs("points", { ref: mesh, children: [_jsx("bufferGeometry", { attach: "geometry", children: _jsx("bufferAttribute", { attach: "attributes-position", args: [positions, 3] }) }), _jsx("pointsMaterial", { size: 0.02, color: color })] }));
}
export default function ParticleFlows() {
    return (_jsxs("group", { children: [_jsx(Particles, { color: new THREE.Color('#00ff00') }), _jsx(Particles, { color: new THREE.Color('#ff9900') }), _jsx(Particles, { color: new THREE.Color('#9900ff') }), _jsx(Particles, { color: new THREE.Color('#00ffff') })] }));
}
