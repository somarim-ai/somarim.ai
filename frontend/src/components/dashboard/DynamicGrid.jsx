
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DynamicGrid() {
    const gridRef = useRef();

    useFrame(({ clock }) => {
        if (gridRef.current) {
            gridRef.current.material.uniforms.time.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
            <planeGeometry args={[100, 100, 100, 100]} />
            <shaderMaterial
                ref={gridRef}
                uniforms={{
                    time: { value: 0 },
                    color: { value: new THREE.Color('#00ffff') },
                }}
                vertexShader={`
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `}
                fragmentShader={`
                    uniform float time;
                    uniform vec3 color;
                    varying vec2 vUv;

                    void main() {
                        float opacity = 0.1;
                        float lines = 10.0;
                        float frequency = 0.5;

                        if (mod(vUv.x * lines + time * frequency, 1.0) < 0.01 || mod(vUv.y * lines + time * frequency, 1.0) < 0.01) {
                            opacity = 0.5;
                        }

                        gl_FragColor = vec4(color, opacity);
                    }
                `}
                transparent
            />
        </mesh>
    );
}
