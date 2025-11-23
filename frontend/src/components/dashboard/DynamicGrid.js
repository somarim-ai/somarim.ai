import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
const DynamicGrid = () => {
    const gridRef = useRef(null);
    useFrame(({ clock }) => {
        if (gridRef.current) {
            gridRef.current.uniforms.time.value = clock.getElapsedTime();
        }
    });
    return (_jsxs("mesh", { rotation: [-Math.PI / 2, 0, 0], position: [0, -10, 0], children: [_jsx("planeGeometry", { args: [100, 100, 100, 100] }), _jsx("shaderMaterial", { ref: gridRef, uniforms: {
                    time: { value: 0 },
                    color: { value: new THREE.Color('#00ffff') },
                }, vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `, fragmentShader: `
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
                `, transparent: true })] }));
};
export default DynamicGrid;
