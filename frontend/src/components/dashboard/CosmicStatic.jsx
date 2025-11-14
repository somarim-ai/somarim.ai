
import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ShaderPass } from 'three-stdlib';

const CosmicStaticShader = {
  uniforms: {
    tDiffuse: { value: null },
    u_time: { value: 0.0 },
    u_amount: { value: 0.05 }, // Controls the intensity of the static
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
    uniform float u_time;
    uniform float u_amount;
    varying vec2 vUv;

    // Simple pseudo-random number generator
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float noise = (rand(vUv + u_time) - 0.5) * u_amount;
      color.rgb += noise;
      gl_FragColor = color;
    }
  `,
};

export const CosmicStatic = () => {
  const pass = useMemo(() => new ShaderPass(CosmicStaticShader), []);

  useFrame((state) => {
    pass.uniforms.u_time.value = state.clock.getElapsedTime();
  });

  return <primitive object={pass} dispose={null} />;
};
