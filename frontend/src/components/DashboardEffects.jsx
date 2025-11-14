
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid, Tube } from '@react-three/drei';
import * as THREE from 'three';

// 1. Gradient Energy Field
function GradientEnergyField() {
  const materialRef = useRef();
  useFrame(({ clock }) => {
    materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          u_time: { value: 0 },
          u_colorA: { value: new THREE.Color('#ff00ff') },
          u_colorB: { value: new THREE.Color('#00ffff') },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
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
        `}
      />
    </mesh>
  );
}

// 2. Particle Field
function ParticleField() {
  const pointsRef = useRef();
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
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <primitive object={particles} />
      <pointsMaterial size={0.02} color="#00ffff" transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
// 3. Volumetric Fog Layer is handled by the fog attach in the main component

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

    return (
        <group>
            {curves.map((curve, i) => (
                <Tube key={i} args={[curve, 64, 0.01, 8, false]}>
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} toneMapped={false} />
                </Tube>
            ))}
        </group>
    );
}

export default function DashboardEffects() {
  return (
    <group>
        <GradientEnergyField />
        <ParticleField />
        <NeonDataRibbons />
        {/* 5. Holographic Grid */}
        <Grid args={[20, 20]} position={[0, -5, 0]} cellSize={0.5} cellThickness={1} cellColor="#6f6f6f" sectionSize={5} sectionThickness={1.5} sectionColor="#00ffff" fadeDistance={25} />

        {/* 6. Reflection Surface (A simple plane to act as a reflective floor) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.4} />
        </mesh>
    </group>
  );
}
