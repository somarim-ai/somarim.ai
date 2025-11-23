import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
function Fatline({ curve, width, color, speed }) {
    const material = useRef();
    useFrame(() => {
        if (material.current) {
            material.current.uniforms.dashOffset.value -= speed;
        }
    });
    return (_jsxs("mesh", { children: [_jsx("meshLineGeometry", { attach: "geometry", points: curve }), _jsx("meshLineMaterial", { ref: material, transparent: true, lineWidth: width, color: color, dashArray: 0.1, dashRatio: 0.95 })] }));
}
export default function NeonDataRibbons() {
    const ribbons = useMemo(() => {
        const ribbonData = [];
        const numRibbons = 6;
        const points = 30;
        for (let i = 0; i < numRibbons; i++) {
            const path = [];
            const radius = Math.random() * 5 + 3;
            const angle = (i / numRibbons) * Math.PI * 2;
            const y = Math.random() * 4 - 2;
            for (let j = 0; j < points; j++) {
                const x = radius * Math.cos(angle + (j / points) * Math.PI * 4);
                const z = radius * Math.sin(angle + (j / points) * Math.PI * 4);
                path.push(new THREE.Vector3(x, y, z));
            }
            ribbonData.push({
                curve: new THREE.CatmullRomCurve3(path).getPoints(500),
                width: Math.random() * 0.1 + 0.05,
                color: new THREE.Color(Math.random() * 0xffffff),
                speed: Math.random() * 0.005 + 0.002,
            });
        }
        return ribbonData;
    }, []);
    return (_jsx("group", { children: ribbons.map((ribbon, index) => (_jsx(Fatline, { ...ribbon }, index))) }));
}
