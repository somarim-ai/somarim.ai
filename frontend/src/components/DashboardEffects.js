import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid, Tube } from '@react-three/drei';
import * as THREE from 'three';
// 1. Gradient Energy Field
function GradientEnergyField() {
    const materialRef = useRef(null);
    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
        }
    });
    return (_jsxs("mesh", { position: [0, 0, -10], children: [_jsx("planeGeometry", { args: [50, 50] }), _jsx("shaderMaterial", { ref: materialRef, uniforms: {
                    u_time: { value: 0 },
                    u_colorA: { value: new THREE.Color('#ff00ff') },
                    u_colorB: { value: new THREE.Color('#00ffff') },
                }, vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `, fragmentShader: `
          uniform float u_time;
          uniform vec3 u_colorA;
          uniform vec3 u_colorB;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            float time = u_time * 0.1;
            vec3 color = mix(u_colorA, u_colorB, (sin(uv.x * 10.0 + time) + 1.0) / 2.0);
            gl_FragColor = vec4(color, 0.2);
          }
        ` })] }));
}
// 2. Particle Field
function ParticleField() {
    const pointsRef = useRef(null);
    const particles = useMemo(() => {
        const p = new THREE.BufferGeometry();
        const count = 5000;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
        }
        p.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return p;
    }, []);
    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
    });
    return (_jsxs("points", { ref: pointsRef, children: [_jsx("primitive", { object: particles }), _jsx("pointsMaterial", { size: 0.02, color: "#00ffff", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })] }));
}
// 4. Neon Data Ribbons
function NeonDataRibbons() {
    const curves = useMemo(() => {
        return Array.from({ length: 5 }, () => {
            const start = new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
            const end = new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
            const control1 = new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
            const control2 = new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
            return new THREE.CubicBezierCurve3(start, control1, control2, end);
        });
    }, []);
    return (_jsx("group", { children: curves.map((curve, i) => (_jsx(Tube, { args: [curve, 64, 0.01, 8, false], children: _jsx("meshStandardMaterial", { color: "#00ffff", emissive: "#00ffff", emissiveIntensity: 2, toneMapped: false }) }, i))) }));
}
export default function DashboardEffects() {
    return (_jsxs("group", { children: [_jsx(GradientEnergyField, {}), _jsx(ParticleField, {}), _jsx(NeonDataRibbons, {}), _jsx(Grid, { args: [20, 20], position: [0, -5, 0], cellSize: 0.5, cellThickness: 1, cellColor: "#6f6f6f", sectionSize: 5, sectionThickness: 1.5, sectionColor: "#00ffff", fadeDistance: 25 }), _jsxs("mesh", { rotation: [-Math.PI / 2, 0, 0], position: [0, -5, 0], children: [_jsx("planeGeometry", { args: [20, 20] }), _jsx("meshStandardMaterial", { color: "#000000", metalness: 0.8, roughness: 0.4 })] })] }));
}
