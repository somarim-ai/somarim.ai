
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function CosmicDust(props) {
  const ref = useRef();
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
      p.setFromSpherical(sphere.radius * (1 + Math.random()), Math.acos(1 - 2 * Math.random()), 2 * Math.PI * Math.random());
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

  // The buffer that will be animated and rendered
  const animatedPositions = useMemo(() => new Float32Array(initialPositions), [initialPositions]);

  useEffect(() => {
    // Animate from initial to final positions over 3 seconds
    gsap.to(animatedPositions, {
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: function() {
        for (let i = 0; i < count * 3; i++) {
          const t = this.progress();
          animatedPositions[i] = THREE.MathUtils.lerp(initialPositions[i], finalPositions[i], t);
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
      },
      // Optional: Add a delay or repeat as needed
      delay: 1, // Start animation after 1 second
    });
  }, [animatedPositions, initialPositions, finalPositions, count]);

  useFrame((state, delta) => {
    // You can add continuous rotation here if desired, even during/after the animation
    ref.current.rotation.x += delta / 20;
    ref.current.rotation.y += delta / 30;
  });

  return (
    <Points ref={ref} positions={animatedPositions} stride={3} frustumCulled={false} {...props}>
      <PointMaterial
        transparent
        color="#ffd700" // mystic-gold
        size={0.008}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}
