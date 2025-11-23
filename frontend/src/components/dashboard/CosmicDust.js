import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
const CosmicDust = () => {
    const ref = useRef(null);
    const count = 5000;
    const torusRadius = 1;
    const torusTubeRadius = 0.3;
    // Create initial (sphere) and final (torus) positions
    const [initialPositions, finalPositions] = useMemo(() => {
        const initial = new Float32Array(count * 3);
        const final = new Float32Array(count * 3);
        const sphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1.5);
        for (let i = 0; i < count; i++) {
            // Initial spherical position
            const p = new THREE.Vector3();
            const spherical = new THREE.Spherical(sphere.radius * (1 + Math.random()), Math.acos(1 - 2 * Math.random()), 2 * Math.PI * Math.random());
            p.setFromSpherical(spherical);
            initial.set([p.x, p.y, p.z], i * 3);
            // Final torus position
            const u = Math.random() * 2 * Math.PI;
            const v = Math.random() * 2 * Math.PI;
            const x = (torusRadius + torusTubeRadius * Math.cos(v)) * Math.cos(u);
            const y = (torusRadius + torusTubeRadius * Math.cos(v)) * Math.sin(u);
            const z = torusTubeRadius * Math.sin(v);
            final.set([x, y, z], i * 3);
        }
        return [initial, final];
    }, [count, torusRadius, torusTubeRadius]);
    const animation = useMemo(() => ({ progress: 0 }), []);
    useEffect(() => {
        // Animate from initial to final positions over 3 seconds
        gsap.to(animation, {
            duration: 3,
            progress: 1,
            ease: 'power2.inOut',
            delay: 1, // Start animation after 1 second
        });
    }, [animation]);
    useFrame((state, delta) => {
        if (ref.current) {
            const positions = ref.current.geometry.attributes.position.array;
            for (let i = 0; i < count * 3; i++) {
                positions[i] = THREE.MathUtils.lerp(initialPositions[i], finalPositions[i], animation.progress);
            }
            ref.current.geometry.attributes.position.needsUpdate = true;
            ref.current.rotation.x += delta / 20;
            ref.current.rotation.y += delta / 30;
        }
    });
    return (_jsx(Points, { ref: ref, positions: initialPositions, stride: 3, frustumCulled: false, children: _jsx(PointMaterial, { transparent: true, color: "#ffd700" // mystic-gold
            , size: 0.008, sizeAttenuation: true, depthWrite: false }) }));
};
export default CosmicDust;
