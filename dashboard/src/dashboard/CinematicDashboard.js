import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

export function createCinematicDashboard(canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.set(0, 0, 0.1);

    // Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, sizeAttenuation: true });
    const starVertices = [];
    for (let i = 0; i < 15000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starfield = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starfield);

    // Nebula/Galaxy effect
    const nebulaTexture = new THREE.TextureLoader().load('https://threejsfundamentals.org/threejs/resources/images/galaxy.png');
    const nebulaMaterial = new THREE.SpriteMaterial({ map: nebulaTexture, color: 0x00aaff, transparent: true, opacity: 0.2 });
    const nebulaSprite = new THREE.Sprite(nebulaMaterial);
    nebulaSprite.scale.set(500, 500, 1);
    nebulaSprite.position.set(100, 50, -500);
    scene.add(nebulaSprite);

    // Floating Quantum Particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleMaterial = new THREE.PointsMaterial({ color: 0x00aaff, size: 0.05 });
    const particleVertices = [];
    for (let i = 0; i < 500; i++) {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;
        particleVertices.push(x, y, z);
    }
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particleVertices, 3));
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Gemini AI Assistant (Holographic)
    const geminiGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const geminiMaterial = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0.0 } },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            varying vec2 vUv;
            void main() {
                vec2 p = -1.0 + 2.0 * vUv;
                float a = atan(p.y, p.x);
                float r = length(p);
                float color = 0.5 + 0.5 * sin(a * 10.0 + time * 2.0) * r;
                gl_FragColor = vec4(0.0, color, color * 1.5, 0.7);
            }
        `,
        transparent: true
    });
    const geminiSphere = new THREE.Mesh(geminiGeometry, geminiMaterial);
    geminiSphere.position.set(0, 0, -3);
    scene.add(geminiSphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00aaff, 1, 100);
    pointLight.position.set(0, 0, -1);
    scene.add(pointLight);

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();

        starfield.rotation.z += delta * 0.01;
        particles.rotation.y += delta * 0.1;
        geminiSphere.rotation.y += delta * 0.2;
        geminiMaterial.uniforms.time.value += delta;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
