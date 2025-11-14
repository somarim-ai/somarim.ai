
import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function VolumetricFog() {
    const fogLayers = useMemo(() => {
        const layers = [];
        const colors = ['#000011', '#000022', '#000033'];
        const densities = [0.1, 0.05, 0.02];
        const scales = [5, 10, 20];

        for (let i = 0; i < 3; i++) {
            layers.push(
                <mesh key={i} scale={[scales[i], scales[i], scales[i]]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                        color={colors[i]}
                        transparent
                        opacity={densities[i]}
                        side={THREE.BackSide}
                    />
                </mesh>
            );
        }

        return layers;
    }, []);

    return (
        <group>
            {fogLayers}
        </group>
    );
}
