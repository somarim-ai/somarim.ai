import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import HolisticVibe from './HolisticVibe';
const Panel = ({ shape, color, position, title, onClick }) => {
    const [hovered, setHover] = useState(false);
    let geometry;
    switch (shape) {
        case 'hexagon':
            geometry = _jsx("cylinderGeometry", { args: [2, 2, 0.1, 6] });
            break;
        case 'rectangle':
            geometry = _jsx("boxGeometry", { args: [4, 2, 0.1] });
            break;
        case 'circle':
            geometry = _jsx("cylinderGeometry", { args: [2, 2, 0.1, 32] });
            break;
        case 'pentagon':
            geometry = _jsx("cylinderGeometry", { args: [2, 2, 0.1, 5] });
            break;
        default:
            geometry = _jsx("boxGeometry", { args: [3, 3, 0.1] });
    }
    const handlePointerOver = () => {
        setHover(true);
        document.body.style.cursor = 'pointer';
    };
    const handlePointerOut = () => {
        setHover(false);
        document.body.style.cursor = 'auto';
    };
    return (_jsxs("group", { position: position, children: [_jsxs("mesh", { onClick: onClick, onPointerOver: handlePointerOver, onPointerOut: handlePointerOut, children: [geometry, _jsx("meshStandardMaterial", { color: color, emissive: color, emissiveIntensity: hovered ? 1 : 0.5, side: THREE.DoubleSide })] }), _jsx(Text, { position: [0, 0, 0.2], fontSize: 0.3, color: "white", anchorX: "center", anchorY: "middle", children: title })] }));
};
export default function DashboardPanels({ onPanelClick }) {
    const panels = [
        { shape: 'hexagon', color: 'neon-green', position: [-8, 5, 0], title: 'BioGenesis' },
        { shape: 'rectangle', color: 'neon-orange', position: [8, 5, 0], title: 'SystemsMatrix' },
        { shape: 'hexagon', color: 'neon-purple', position: [-8, -5, 0], title: 'OmniCore' },
        { shape: 'circle', color: 'neon-cyan', position: [8, -5, 0], title: 'Quantum' },
        { shape: 'pentagon', color: 'gold', position: [0, -9, 0], title: 'ValueEngine' },
        { shape: 'hexagon', color: 'red', position: [0, 9, 0], title: 'EthicsGrid' },
        { shape: 'hexagon', color: 'neon-blue', position: [0, 0, 0], title: 'UniversalHealer' },
    ];
    const colorMap = {
        'neon-green': new THREE.Color(0, 1, 0),
        'neon-orange': new THREE.Color(1, 0.5, 0),
        'neon-purple': new THREE.Color(0.5, 0, 1),
        'neon-cyan': new THREE.Color(0, 1, 1),
        'gold': new THREE.Color(1, 0.84, 0),
        'red': new THREE.Color(1, 0, 0),
        'neon-blue': new THREE.Color(0, 0.5, 1),
    };
    return (_jsxs("group", { children: [panels.map((panel, index) => (_jsx(Panel, { shape: panel.shape, color: colorMap[panel.color], position: panel.position, title: panel.title, onClick: () => onPanelClick(panel.position) }, index))), _jsx(HolisticVibe, {})] }));
}
