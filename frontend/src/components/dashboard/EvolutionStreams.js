import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
const Stream = ({ start, end, color }) => {
    const lineRef = useRef(null);
    useFrame(() => {
        if (lineRef.current) {
            lineRef.current.dashOffset -= 0.01;
        }
    });
    const points = [start, end];
    return (_jsxs("line", { children: [_jsx("bufferGeometry", { attach: "geometry", onUpdate: self => self.setFromPoints(points.map(p => new THREE.Vector3(...p))) }), _jsx("lineDashedMaterial", { attach: "material", color: color, dashSize: 0.5, gapSize: 0.2, ref: lineRef })] }));
};
const EvolutionStreams = () => {
    const streams = [
        { start: [-8, 5, 0], end: [0, 0, 0], color: new THREE.Color('#00ff00') },
        { start: [8, 5, 0], end: [0, 0, 0], color: new THREE.Color('#ff9900') },
        { start: [-8, -5, 0], end: [0, 0, 0], color: new THREE.Color('#9900ff') },
        { start: [8, -5, 0], end: [0, 0, 0], color: new THREE.Color('#00ffff') }
    ];
    return (_jsx("group", { children: streams.map((stream, index) => (_jsx(Stream, { start: stream.start, end: stream.end, color: stream.color }, index))) }));
};
export default EvolutionStreams;
