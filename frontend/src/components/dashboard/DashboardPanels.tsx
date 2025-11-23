import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import HolisticVibe from './HolisticVibe';

interface PanelProps {
    shape: 'hexagon' | 'rectangle' | 'circle' | 'pentagon' | string;
    color: THREE.Color;
    position: [number, number, number];
    title: string;
    onClick: () => void;
}

const Panel: React.FC<PanelProps> = ({ shape, color, position, title, onClick }) => {
    const [hovered, setHover] = useState(false);

    let geometry;
    switch (shape) {
        case 'hexagon':
            geometry = <cylinderGeometry args={[2, 2, 0.1, 6]} />;
            break;
        case 'rectangle':
            geometry = <boxGeometry args={[4, 2, 0.1]} />;
            break;
        case 'circle':
            geometry = <cylinderGeometry args={[2, 2, 0.1, 32]} />;
            break;
        case 'pentagon':
            geometry = <cylinderGeometry args={[2, 2, 0.1, 5]} />;
            break;
        default:
            geometry = <boxGeometry args={[3, 3, 0.1]} />;
    }

    const handlePointerOver = () => {
        setHover(true);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHover(false);
        document.body.style.cursor = 'auto';
    };

    return (
        <group position={position}>
            <mesh
                onClick={onClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            >
                {geometry}
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 1 : 0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <Text position={[0, 0, 0.2]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
                {title}
            </Text>
        </group>
    );
};

interface PanelData {
    shape: string;
    color: string;
    position: [number, number, number];
    title: string;
}

interface DashboardPanelsProps {
    onPanelClick: (position: [number, number, number]) => void;
}

export default function DashboardPanels({ onPanelClick }: DashboardPanelsProps) {
    const panels: PanelData[] = [
        { shape: 'hexagon', color: 'neon-green', position: [-8, 5, 0], title: 'BioGenesis' },
        { shape: 'rectangle', color: 'neon-orange', position: [8, 5, 0], title: 'SystemsMatrix' },
        { shape: 'hexagon', color: 'neon-purple', position: [-8, -5, 0], title: 'OmniCore' },
        { shape: 'circle', color: 'neon-cyan', position: [8, -5, 0], title: 'Quantum' },
        { shape: 'pentagon', color: 'gold', position: [0, -9, 0], title: 'ValueEngine' },
        { shape: 'hexagon', color: 'red', position: [0, 9, 0], title: 'EthicsGrid' },
        { shape: 'hexagon', color: 'neon-blue', position: [0, 0, 0], title: 'UniversalHealer' },
      ];

      const colorMap: { [key: string]: THREE.Color } = {
        'neon-green': new THREE.Color(0, 1, 0),
        'neon-orange': new THREE.Color(1, 0.5, 0),
        'neon-purple': new THREE.Color(0.5, 0, 1),
        'neon-cyan': new THREE.Color(0, 1, 1),
        'gold': new THREE.Color(1, 0.84, 0),
        'red': new THREE.Color(1, 0, 0),
        'neon-blue': new THREE.Color(0, 0.5, 1),
      };

  return (
    <group>
      {panels.map((panel, index) => (
        <Panel
          key={index}
          shape={panel.shape}
          color={colorMap[panel.color]}
          position={panel.position}
          title={panel.title}
          onClick={() => onPanelClick(panel.position)}
        />
      ))}
      <HolisticVibe />
    </group>
  );
}
