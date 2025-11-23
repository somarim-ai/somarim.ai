import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useDrag } from '@use-gesture/react';
const CognitionSphere = (props) => {
    const meshRef = useRef(null);
    const [{ rotation }, api] = useSpring(() => ({
        rotation: [0, 0, 0],
        config: { mass: 1, tension: 200, friction: 50 },
    }));
    const bind = useDrag(({ movement: [mx, my] }) => {
        const yRotation = (mx / 100);
        const xRotation = (my / 100);
        api.start({ rotation: [xRotation, yRotation, 0] });
    }, {
        from: () => [0, 0]
    });
    useFrame(() => {
        // This is for any other animations you might want to add later
    });
    return (_jsxs(a.mesh, { ...props, ...bind(), ref: meshRef, rotation: rotation, children: [_jsx("sphereGeometry", { args: [1.5, 64, 64] }), _jsx("meshStandardMaterial", { color: "#20559A", emissive: "#00ffff", emissiveIntensity: 0.3, metalness: 0.9, roughness: 0.1 })] }));
};
export default CognitionSphere;
