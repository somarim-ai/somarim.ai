import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
const CentralCognitionSphere = () => {
    const sphereRef = useRef(null);
    const haloRef = useRef(null);
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Pulse intensity mapping (dynamic pulse)
        const pulseIntensity = (Math.sin(time * 1.5) + 1) / 2; // Oscillates between 0 and 1
        if (sphereRef.current) {
            const coreMaterial = sphereRef.current.material;
            coreMaterial.emissiveIntensity = pulseIntensity * 2;
        }
        if (haloRef.current) {
            const haloMaterial = haloRef.current.material;
            haloMaterial.opacity = pulseIntensity * 0.5;
            haloRef.current.scale.set(1, 1, 1).multiplyScalar(1 + pulseIntensity * 0.2);
        }
    });
    return (_jsxs("group", { position: [0, 0, 0], children: [_jsxs("mesh", { ref: sphereRef, scale: [2.5, 2.5, 2.5], children: [_jsx("sphereGeometry", { args: [1, 64, 64] }), _jsx("meshStandardMaterial", { color: '#00aaff', emissive: '#00aaff', emissiveIntensity: 1, toneMapped: false, roughness: 0.1, metalness: 0.5 })] }), _jsxs("mesh", { ref: haloRef, scale: [2.5, 2.5, 2.5], children: [_jsx("sphereGeometry", { args: [1.1, 64, 64] }), _jsx("meshBasicMaterial", { color: '#00aaff', transparent: true, opacity: 0.5, side: THREE.BackSide })] })] }));
};
export default CentralCognitionSphere;
