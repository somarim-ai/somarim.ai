import { jsx as _jsx } from "react/jsx-runtime";
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
function UserPath({ color }) {
    const lineRef = useRef();
    const points = useMemo(() => {
        const path = [];
        const numPoints = 100;
        const radius = Math.random() * 8 + 4;
        const startAngle = Math.random() * Math.PI * 2;
        for (let i = 0; i < numPoints; i++) {
            const angle = startAngle + (i / numPoints) * Math.PI * (Math.random() * 4 + 2);
            const x = radius * Math.cos(angle) + (Math.random() - 0.5) * 2;
            const y = (Math.random() - 0.5) * 5;
            const z = radius * Math.sin(angle) + (Math.random() - 0.5) * 2;
            path.push(new THREE.Vector3(x, y, z));
        }
        return new THREE.CatmullRomCurve3(path, true, 'catmullrom', 0.5).getPoints(500);
    }, []);
    useFrame((state, delta) => {
        if (lineRef.current) {
            lineRef.current.material.dashOffset -= (Math.random() * 0.01 + 0.001);
        }
    });
    return (_jsx(Line, { ref: lineRef, points: points, color: color, lineWidth: 3, dashed: true, dashSize: 0.2, gapSize: 0.1, "material-emissive": color, "material-emissiveIntensity": 2 }));
}
export default function MultiUserPaths() {
    const userColors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00', '#0000ff'];
    return (_jsx("group", { children: userColors.map((color, index) => (_jsx(UserPath, { color: color }, index))) }));
}
