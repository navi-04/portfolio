import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import * as CANNON from 'https://unpkg.com/cannon-es@0.19.0/dist/cannon-es.js';

const canvas = document.querySelector('#bg-canvas');

// --- PHYSICS WORLD ---
const world = new CANNON.World();
world.gravity.set(0, -5, 0); // Lighter gravity for "floaty" feel
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 10;

// --- THREE.JS SCENE ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111); // Dark Studio Grey
scene.fog = new THREE.Fog(0x111111, 10, 50);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 10, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// --- LIGHTING (Studio Setup) ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 20, 10);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
scene.add(dirLight);

const spotLight = new THREE.SpotLight(0xffffff, 0.8);
spotLight.position.set(-10, 20, -10);
spotLight.lookAt(0, 0, 0);
spotLight.castShadow = true;
scene.add(spotLight);

// --- MATERIALS ---
// Physics Materials
const plasticMaterial = new CANNON.Material('plastic');
const concreteMaterial = new CANNON.Material('concrete');
const plasticConcreteContactMaterial = new CANNON.ContactMaterial(
    plasticMaterial,
    concreteMaterial,
    { friction: 0.3, restitution: 0.7 } // Bouncy
);
world.addContactMaterial(plasticConcreteContactMaterial);

// Visual Materials
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const sphereGeo = new THREE.SphereGeometry(0.7, 32, 32);

const mats = [
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.1 }), // White Gloss
    new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.1 }), // Dark Matte
    new THREE.MeshStandardMaterial({ color: 0x64ffda, roughness: 0.2, metalness: 0.5 }), // Mint Metal
    new THREE.MeshStandardMaterial({ color: 0x8892b0, roughness: 0.1, metalness: 0.8 })  // Blue Steel
];


// --- OBJECTS ---
const objectsToUpdate = [];

const createBox = (width, height, depth, position) => {
    // Three.js
    const mesh = new THREE.Mesh(boxGeo, mats[Math.floor(Math.random() * mats.length)]);
    mesh.scale.set(width, height, depth);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.copy(position);
    scene.add(mesh);

    // Cannon.js
    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 0, 0),
        shape: shape,
        material: plasticMaterial
    });
    body.position.copy(position);
    
    // Add random rotation
    body.quaternion.setFromAxisAngle(
        new CANNON.Vec3(-1, 0, 0), 
        Math.random() * Math.PI
    );
    
    world.addBody(body);
    objectsToUpdate.push({ mesh, body });
};

const createSphere = (radius, position) => {
    // Three.js
    const mesh = new THREE.Mesh(sphereGeo, mats[Math.floor(Math.random() * mats.length)]);
    mesh.scale.set(radius, radius, radius);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.copy(position);
    scene.add(mesh);

    // Cannon.js
    const shape = new CANNON.Sphere(radius);
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 0, 0),
        shape: shape,
        material: plasticMaterial
    });
    body.position.copy(position);
    world.addBody(body);
    objectsToUpdate.push({ mesh, body });
};

// Create a Floor
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body();
floorBody.mass = 0; // Static
floorBody.addShape(floorShape);
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
world.addBody(floorBody);

// Visual Floor (Invisible shadow catcher)
const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.ShadowMaterial({ opacity: 0.3 })
);
floorMesh.rotation.x = -Math.PI * 0.5;
floorMesh.receiveShadow = true;
scene.add(floorMesh);


// Spawn Objects
for (let i = 0; i < 60; i++) {
    const x = (Math.random() - 0.5) * 20;
    const y = 10 + Math.random() * 20; // Start high
    const z = (Math.random() - 0.5) * 10;
    
    if (Math.random() < 0.5) {
        createBox(Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5, { x, y, z });
    } else {
        createSphere(Math.random() * 0.5 + 0.5, { x, y, z });
    }
}


// --- INTERACTION ---
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // Intersection plane

// Force field on mouse
document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Repulsion Logic in tick
});

// Click to EXPLODE (Anti-Gravity Pulse)
document.addEventListener('click', () => {
    objectsToUpdate.forEach((obj) => {
        // Apply upward force
        obj.body.applyLocalImpulse(
            new CANNON.Vec3(0, 20, 0),
            new CANNON.Vec3(0, 0, 0)
        );
    });
});


// --- SCROLL HERO OBJECT (The "Core") ---
const heroGeo = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
const heroMat = new THREE.MeshStandardMaterial({ 
    color: 0xffffff, 
    wireframe: true,
    transparent: true,
    opacity: 0.1,
    emissive: 0xffffff,
    emissiveIntensity: 0.2
});
const scrollHero = new THREE.Mesh(heroGeo, heroMat);
scrollHero.position.set(0, 0, 0);
scene.add(scrollHero);


// --- ANIMATION ---
const clock = new THREE.Clock();
let oldElapsedTime = 0;

// Scroll Logic
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;

    // Physics Step
    world.step(1 / 60, deltaTime, 3);

    // Sync Three.js with Cannon.js
    for (const object of objectsToUpdate) {
        object.mesh.position.copy(object.body.position);
        object.mesh.quaternion.copy(object.body.quaternion);
        
        // Floor reset (Infinite fall protection)
        if (object.body.position.y < -10) {
            object.body.position.y = 20;
            object.body.velocity.set(0, 0, 0);
        }
    }
    
    // Mouse Interaction (Disturb objects)
    raycaster.setFromCamera(mouse, camera);
    
    // Simple wobble of falling objects based on mouse X (Wind)
    world.gravity.x = mouse.x * 5;
    world.gravity.z = -mouse.y * 5;
    
    // --- SCROLL HERO ANIMATION ---
    // Calculate Scroll Progress (0 to 1)
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    
    // Hero Spin (Always rotating)
    scrollHero.rotation.x += deltaTime * 0.2;
    scrollHero.rotation.y += deltaTime * 0.3;
    
    // Position/Rotation Interpolation based on section
    // We define keyframes basically
    let targetPos = new THREE.Vector3(0, 0, 0);
    let targetRot = new THREE.Vector3(0, 0, 0);
    
    if (scrollProgress < 0.2) {
        // HERO SECTION: Center
        targetPos.set(0, 2, 0);
    } else if (scrollProgress < 0.5) {
        // ABOUT/SKILLS: Move Left
        targetPos.set(-8, 0, -5);
        scrollHero.rotation.z += deltaTime * 0.5;
    } else if (scrollProgress < 0.8) {
        // EXPEREINCE/PROJECTS: Move Right
        targetPos.set(8, 0, -5);
        scrollHero.rotation.z -= deltaTime * 0.5;
    } else {
        // CONTACT: Center Close Up
        targetPos.set(0, 0, 5);
    }
    
    // Smooth Lerp
    scrollHero.position.x += (targetPos.x - scrollHero.position.x) * 0.05;
    scrollHero.position.y += (targetPos.y - scrollHero.position.y) * 0.05;
    scrollHero.position.z += (targetPos.z - scrollHero.position.z) * 0.05;


    renderer.render(scene, camera);
    requestAnimationFrame(tick);
};

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

tick();
