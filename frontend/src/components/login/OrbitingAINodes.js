import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
const OrbitingAINode = ({ position }) => {
    const meshRef = useRef(null);
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const glowIntensity = (Math.sin(time + position[0]) + 1) / 2;
        if (meshRef.current) {
            const material = meshRef.current.material;
            material.emissiveIntensity = glowIntensity * 2;
        }
    });
    return (_jsxs("mesh", { ref: meshRef, position: position, children: [_jsx("sphereGeometry", { args: [0.3, 32, 32] }), _jsx("meshStandardMaterial", { color: "#00aaff", emissive: "#00aaff", emissiveIntensity: 1, toneMapped: false })] }));
};
const OrbitingAINodes = () => {
    const nodes = [
        { position: [5, 0, 0] },
        { position: [-5, 0, 0] },
        { position: [0, 5, 0] },
        { position: [0, -5, 0] },
    ];
    return (_jsx("group", { children: nodes.map((node, index) => (_jsx(OrbitingAINode, { position: node.position }, index))) }));
};
export default OrbitingAINodes;
