
import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function Starfield() {
    const stars = useMemo(() => {
        const starPositions = new Float32Array(5000 * 3);

        for (let i = 0; i < 5000; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 200 + 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            starPositions[i3 + 2] = radius * Math.cos(phi);
        }

        return starPositions;
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[stars, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.2} color="#ffffff" transparent opacity={0.5} />
        </points>
    );
}
