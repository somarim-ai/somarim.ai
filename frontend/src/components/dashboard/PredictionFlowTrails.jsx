
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PredictionFlowTrails({ count = 50 }) {
    const lines = useRef();

    const [positions, curveIndices, speeds] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const curveIndices = new Float32Array(count);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
            curveIndices[i] = Math.floor(Math.random() * 5); // Assuming 5 curves
            speeds[i] = Math.random() * 0.01 + 0.005;
        }

        return [positions, curveIndices, speeds];
    }, [count]);

    const curves = useMemo(() => {
        const curves = [];
        for (let i = 0; i < 5; i++) {
            const start = new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
            const end = new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
            const control1 = new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
            const control2 = new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
            curves.push(new THREE.CubicBezierCurve3(start, control1, control2, end));
        }
        return curves;
    }, []);

    useFrame(() => {
        if (lines.current) {
            const positions = lines.current.geometry.attributes.position.array;
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                const curve = curves[Math.floor(curveIndices[i])];
                const t = (positions[i3 + 2] + 10) / 20; // Use z position for progress
                const newPos = curve.getPointAt((t + speeds[i]) % 1);
                positions[i3] = newPos.x;
                positions[i3 + 1] = newPos.y;
                positions[i3 + 2] = newPos.z;
            }
            lines.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={lines}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.1} color="#00ffff" transparent opacity={0.8} />
        </points>
    );
}
