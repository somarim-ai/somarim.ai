import { jsx as _jsx } from "react/jsx-runtime";
import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ShaderPass } from 'three-stdlib';
const RealityRippleShader = {
    uniforms: {
        tDiffuse: { value: null },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_time: { value: 0.0 },
        u_intensity: { value: 0.0 },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_intensity;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      vec2 mouse = u_mouse * 0.5 + 0.5; // Remap mouse from [-1, 1] to [0, 1]
      float distance = length(uv - mouse);
      
      float ripple = max(0.0, 1.0 - distance * 10.0);
      ripple = pow(ripple, 3.0);

      float wave = sin(ripple * 20.0 - u_time * 10.0);

      // Add a small epsilon to avoid normalizing a zero vector
      vec2 direction = normalize(uv - mouse + 0.00001);
      vec2 distortedUv = uv + (direction * wave * 0.01 * u_intensity);

      vec4 color = texture2D(tDiffuse, distortedUv);

      gl_FragColor = color;
    }
  `,
};
export const RealityRipple = () => {
    const pass = useMemo(() => new ShaderPass(RealityRippleShader), []);
    useFrame(({ mouse }) => {
        pass.uniforms.u_mouse.value.x = mouse.x;
        pass.uniforms.u_mouse.value.y = mouse.y;
        const centerDistance = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
        // Inverse relationship: closer to center = higher intensity
        const intensity = 1.0 - Math.min(centerDistance, 1.0);
        pass.uniforms.u_intensity.value = intensity * 2.0; // Amplify
        pass.uniforms.u_time.value += 0.01;
    });
    return _jsx("primitive", { object: pass, dispose: null });
};
