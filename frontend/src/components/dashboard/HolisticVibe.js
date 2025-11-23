import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
const HolisticVibe = () => {
    const meshRef = useRef(null);
    // Animate the vibe - subtle pulsation
    useFrame(({ clock }) => {
        if (meshRef.current) {
            // Pulsate scale
            const scale = 1 + 0.05 * Math.sin(clock.getElapsedTime());
            meshRef.current.scale.set(scale, scale, scale);
            // Slowly shift color
            const hue = (clock.getElapsedTime() / 10) % 1;
            meshRef.current.material.emissive.setHSL(hue, 0.5, 0.5);
        }
    });
    return (_jsxs("mesh", { ref: meshRef, position: [0, 0, -10], children: [_jsx("sphereGeometry", { args: [2, 32, 32] }), _jsx("meshStandardMaterial", { color: '#ff88cc', emissive: '#ff88cc', emissiveIntensity: 1.5, transparent: true, opacity: 0.3, wireframe: true })] }));
};
export default HolisticVibe;
