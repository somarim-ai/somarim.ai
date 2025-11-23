import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
function getHaloColor(confidence) {
    if (confidence > 0.8)
        return new THREE.Color('#00ff00'); // green
    if (confidence > 0.5)
        return new THREE.Color('#ffff00'); // yellow
    return new THREE.Color('#ff0000'); // red
}
const CentralCognitionSphere = ({ aiConfidence = 0.8 }) => {
    const group = useRef(null);
    const core = useRef(null);
    const halo = useRef(null);
    const haloColor = useMemo(() => getHaloColor(aiConfidence), [aiConfidence]);
    useFrame((state) => {
        const pulse = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2;
        const pulseIntensity = 0.5 + aiConfidence * 0.5;
        if (group.current) {
            group.current.rotation.y += 0.001;
        }
        if (core.current) {
            core.current.scale.set(1, 1, 1).multiplyScalar(0.9 + pulse * 0.2 * pulseIntensity);
        }
        if (halo.current) {
            halo.current.material.opacity = 0.3 + pulse * 0.3 * pulseIntensity;
        }
    });
    return (_jsxs("group", { ref: group, position: [0, 0, 0], scale: [2.5, 2.5, 2.5], children: [_jsxs("mesh", { ref: core, children: [_jsx("sphereGeometry", { args: [1, 32, 32] }), _jsx("meshBasicMaterial", { color: "#ffffff", toneMapped: false })] }), _jsxs("mesh", { ref: halo, children: [_jsx("sphereGeometry", { args: [1.2, 32, 32] }), _jsx("meshBasicMaterial", { color: haloColor, transparent: true, opacity: 0.5 })] }), _jsx("pointLight", { color: haloColor, intensity: 2 * aiConfidence, distance: 10 })] }));
};
export default CentralCognitionSphere;
