import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo } from 'react';
import * as THREE from 'three';
export default function VolumetricFog() {
    const fogLayers = useMemo(() => {
        const layers = [];
        const colors = ['#000011', '#000022', '#000033'];
        const densities = [0.1, 0.05, 0.02];
        const scales = [5, 10, 20];
        for (let i = 0; i < 3; i++) {
            layers.push(_jsxs("mesh", { scale: [scales[i], scales[i], scales[i]], children: [_jsx("sphereGeometry", { args: [1, 32, 32] }), _jsx("meshStandardMaterial", { color: colors[i], transparent: true, opacity: densities[i], side: THREE.BackSide })] }, i));
        }
        return layers;
    }, []);
    return (_jsx("group", { children: fogLayers }));
}
