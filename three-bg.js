import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { EffectComposer } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/UnrealBloomPass.js';

const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();

// Fog for depth
scene.fog = new THREE.FogExp2(0x000000, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ReinhardToneMapping;

// --- GEOMETRY: Floating Cyber Shapes ---
const geometry = new THREE.IcosahedronGeometry(1, 0); // Low poly look

// Instanced Mesh for performance (hundreds of objects)
const material = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.1,
    metalness: 0.9,
    emissive: 0x000000,
    wireframe: false
});

const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f3ff, // Cyan Neon
    wireframe: true,
    transparent: true,
    opacity: 0.3
});

const count = 150;
const mesh = new THREE.InstancedMesh(geometry, material, count);
const wireMesh = new THREE.InstancedMesh(geometry, wireframeMaterial, count);

const dummy = new THREE.Object3D();
const positions = [];
const speeds = [];
const rotations = [];

for (let i = 0; i < count; i++) {
    // Random position spread
    const x = (Math.random() - 0.5) * 60;
    const y = (Math.random() - 0.5) * 60;
    const z = (Math.random() - 0.5) * 40 - 10;
    
    dummy.position.set(x, y, z);
    
    // Random rotation
    dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    
    // Random scale
    const scale = Math.random() * 1.5 + 0.5;
    dummy.scale.set(scale, scale, scale);
    
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    wireMesh.setMatrixAt(i, dummy.matrix);

    positions.push({ x, y, z, originalY: y });
    speeds.push(Math.random() * 0.02 + 0.005);
    rotations.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02
    });
}

scene.add(mesh);
scene.add(wireMesh);

// --- LIGHTING ---
const ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);

// Key Light (Blue/Cyan)
const pointLight1 = new THREE.PointLight(0x00f3ff, 2, 50);
pointLight1.position.set(5, 5, 5);
scene.add(pointLight1);

// Fill Light (Purple/Magenta)
const pointLight2 = new THREE.PointLight(0xbd00ff, 2, 50);
pointLight2.position.set(-5, -5, 5);
scene.add(pointLight2);

// --- POST PROCESSING (BLOOM) ---
const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, // Strength
    0.4, // Radius
    0.85 // Threshold
);

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);


// --- INTERACTION ---
const mouse = { x: 0, y: 0 };
const target = { x: 0, y: 0 };
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX - windowHalfX) * 0.001;
    mouse.y = (event.clientY - windowHalfY) * 0.001;
});

// --- ANIMATION LOOP ---
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse follow
    target.x = target.x * 0.95 + mouse.x * 0.05;
    target.y = target.y * 0.95 + mouse.y * 0.05;

    // Rotate entire camera/group slightly based on mouse
    mesh.rotation.x = target.y * 0.5;
    mesh.rotation.y = target.x * 0.5;
    wireMesh.rotation.x = target.y * 0.5;
    wireMesh.rotation.y = target.x * 0.5;

    // Animate individual instances
    for (let i = 0; i < count; i++) {
        // Rise up effect (Antigravity)
        positions[i].y += speeds[i];
        
        // Reset if too high
        if (positions[i].y > 30) {
            positions[i].y = -30;
        }

        dummy.position.set(
            positions[i].x,
            positions[i].y,
            positions[i].z
        );

        // Constant rotation
        const rot = rotations[i];
        // We need to retrieve current rotation to add to it, but Matrix doesn't store Euler easily
        // Instead, we just rotate the dummy based on time + offset
        
        dummy.rotation.set(
            elapsedTime * rot.x + i,
            elapsedTime * rot.y + i,
            0
        );
        
        // Scale pulse? Maybe too expensive to update every frame without shader
        // Keep scale constant from init
        
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        wireMesh.setMatrixAt(i, dummy.matrix);
    }
    
    mesh.instanceMatrix.needsUpdate = true;
    wireMesh.instanceMatrix.needsUpdate = true;

    // Pulse lights
    pointLight1.intensity = 2 + Math.sin(elapsedTime * 2) * 0.5;
    pointLight2.intensity = 2 + Math.cos(elapsedTime * 1.5) * 0.5;

    // Render via Composer (for Bloom)
    composer.render();
    
    requestAnimationFrame(animate);
}

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

animate();
