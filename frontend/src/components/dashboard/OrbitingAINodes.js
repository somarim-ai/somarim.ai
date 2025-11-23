import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
function AINode({ position, glowColor }) {
    const mesh = useRef();
    useFrame((state, delta) => {
        if (mesh.current) {
            const pulse = (1 + Math.sin(state.clock.elapsedTime * 3)) / 2;
            mesh.current.material.emissiveIntensity = pulse * 2;
        }
    });
    return (_jsxs("mesh", { ref: mesh, position: position, children: [_jsx("sphereGeometry", { args: [0.3, 16, 16] }), _jsx("meshBasicMaterial", { color: glowColor, toneMapped: false, emissive: glowColor, emissiveIntensity: 1 })] }));
}
export default function OrbitingAINodes() {
    const group = useRef();
    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += 0.1 * delta;
        }
    });
    const nodes = [
        { position: [5, 0, 0], glowColor: new THREE.Color('#ff00ff') },
        { position: [-5, 0, 0], glowColor: new THREE.Color('#00ffff') },
        { position: [0, 5, 0], glowColor: new THREE.Color('#ffff00') },
        { position: [0, -5, 0], glowColor: new THREE.Color('#0000ff') },
    ];
    return (_jsx("group", { ref: group, children: nodes.map((node, index) => (_jsx(AINode, { position: node.position, glowColor: node.glowColor }, index))) }));
}
