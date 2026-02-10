import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { TWEEN } from 'https://unpkg.com/three@0.126.1/examples/jsm/libs/tween.module.min.js';

// --- CONFIG ---
const CONFIG = {
    color: {
        bg: 0x202025,
        floor: 0x2a2a35,
        wall: 0x30303a,
        accent: 0x64ffda,
        desk: 0x111111
    },
    zoom: {
        default: 40,
        focus: 15
    }
};

// --- SCENE SETUP ---
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
scene.background = new THREE.Color(CONFIG.color.bg);

// Isometric Camera (Orthographic)
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 20; // View size
const camera = new THREE.OrthographicCamera(
    frustumSize * aspect / -2,
    frustumSize * aspect / 2,
    frustumSize / 2,
    frustumSize / -2,
    1,
    1000
);
camera.position.set(20, 20, 20); // Isometric Angle
camera.lookAt(0, 0, 0);
camera.zoom = 1;
camera.updateProjectionMatrix();

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// --- CONTROLS ---
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = true;
controls.minZoom = 0.5;
controls.maxZoom = 2;
// Limit angles to keep isometric view consistent
controls.minPolarAngle = Math.PI / 4; 
controls.maxPolarAngle = Math.PI / 2.2; 
controls.minAzimuthAngle = 0; // -Math.PI / 4;
controls.maxAzimuthAngle = Math.PI / 2;

// --- LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(10, 20, 10);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 50;
dirLight.shadow.camera.left = -20;
dirLight.shadow.camera.right = 20;
dirLight.shadow.camera.top = 20;
dirLight.shadow.camera.bottom = -20;
scene.add(dirLight);

// --- BUILDER FUNCTIONS ---
const createBox = (w, h, d, x, y, z, color) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({ color: color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
};

// --- ROOM CONSRUCTION ---
const roomGroup = new THREE.Group();
scene.add(roomGroup);

// Floor
const floor = createBox(20, 1, 20, 0, -0.5, 0, CONFIG.color.floor);
roomGroup.add(floor);

// Walls (Back Left & Back Right)
const wallHeight = 10;
const wall1 = createBox(1, wallHeight, 20, -10.5, wallHeight / 2 - 0.5, 0, CONFIG.color.wall);
const wall2 = createBox(20, wallHeight, 1, 0, wallHeight / 2 - 0.5, -10.5, CONFIG.color.wall);
roomGroup.add(wall1);
roomGroup.add(wall2);

// --- FURNITURE & OBJECTS ---

// Desk Group
const deskGroup = new THREE.Group();
roomGroup.add(deskGroup);

// Table Top
const desk = createBox(8, 0.4, 4, 0, 3, 0, 0x1a1a20);
deskGroup.add(desk);

// Legs
const leg1 = createBox(0.4, 3, 3, -3.5, 1.5, 0, 0x111111);
const leg2 = createBox(0.4, 3, 3, 3.5, 1.5, 0, 0x111111);
deskGroup.add(leg1, leg2);

// Chair
const chairGroup = new THREE.Group();
chairGroup.position.set(0, 0, 3.5);
chairGroup.rotation.y = -Math.PI / 8; // Slight angle
roomGroup.add(chairGroup);

// Chair Seat
const seat = createBox(3, 0.5, 3, 0, 2, 0, 0x333333);
const back = createBox(3, 4, 0.5, 0, 4, -1.25, 0x333333);
const base = createBox(0.5, 2, 0.5, 0, 1, 0, 0x111111);
const feet = createBox(3, 0.5, 3, 0, 0.25, 0, 0x111111);
chairGroup.add(seat, back, base, feet);


// --- TECH SETUP (INTERACTIVE) ---

// Main Monitor (Projects)
const monitorGroup = new THREE.Group();
monitorGroup.position.set(0, 3.2, -1.5);
roomGroup.add(monitorGroup);

// Screen
const screenGeo = new THREE.BoxGeometry(4, 2.5, 0.2);
const screenMat = new THREE.MeshStandardMaterial({ 
    color: 0x111111,
    emissive: CONFIG.color.accent,
    emissiveIntensity: 0.1
});
const screen = new THREE.Mesh(screenGeo, screenMat);
// Add clickable data
screen.userData = { clickable: true, type: 'projects', hoverColor: 0x222222 }; 
monitorGroup.add(screen);

// Monitor Stand
const stand = createBox(0.5, 1, 0.5, 0, -1, 0, 0x111111);
monitorGroup.add(stand);

// Screen Glow (Text/Code representation)
const codeGeo = new THREE.PlaneGeometry(3.6, 2.1);
const codeMat = new THREE.MeshBasicMaterial({ color: CONFIG.color.accent });
const code = new THREE.Mesh(codeGeo, codeMat);
code.position.set(0, 0, 0.11);
code.userData = { clickable: true, type: 'projects' }; // Pass click through
monitorGroup.add(code);


// Vertical Monitor (Resume)
const vertMonitorGroup = new THREE.Group();
vertMonitorGroup.position.set(-3.5, 3.2, -1);
vertMonitorGroup.rotation.y = Math.PI / 6;
roomGroup.add(vertMonitorGroup);

const vScreenGeo = new THREE.BoxGeometry(1.5, 3, 0.2);
const vScreenMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
const vScreen = new THREE.Mesh(vScreenGeo, vScreenMat);
vScreen.userData = { clickable: true, type: 'resume' };
vertMonitorGroup.add(vScreen);

const vCodeGeo = new THREE.PlaneGeometry(1.3, 2.8);
const vCodeMat = new THREE.MeshBasicMaterial({ color: 0xbd00ff }); // Purple
const vCode = new THREE.Mesh(vCodeGeo, vCodeMat);
vCode.position.set(0, 0, 0.11);
vCode.userData = { clickable: true, type: 'resume' };
vertMonitorGroup.add(vCode);


// PC Tower
const tower = createBox(1.5, 2.5, 3, 4, 1.25, 0, 0x111111);
// LED Strip
const led = createBox(0.1, 2, 0.1, 3.25, 1.25, 1, CONFIG.color.accent);
roomGroup.add(tower, led);

// Peripherals
const keyboard = createBox(2, 0.1, 0.8, 0, 3.25, 1, 0x333333);
const mouse = createBox(0.3, 0.1, 0.5, 1.5, 3.25, 1, 0x333333);
roomGroup.add(keyboard, mouse);

// --- DECOR items ---
// Bookshelf (Skills)
const shelfGroup = new THREE.Group();
shelfGroup.position.set(-9, 5, -9);
roomGroup.add(shelfGroup);

const shelfBox = createBox(4, 6, 1, 0, 0, 0, 0x333333);
shelfGroup.add(shelfBox);

// Books (Clickable)
const bookColors = [0xff5f56, 0xffbd2e, 0x27c93f, 0x00f3ff];
for(let i=0; i<4; i++) {
    const book = createBox(0.4, 1.5, 0.8, -1.5 + i*0.5, 1, 0.4, bookColors[i]);
    book.userData = { clickable: true, type: 'skills' };
    shelfGroup.add(book);
}

// Coffee Mug (About)
const mug = createBox(0.4, 0.5, 0.4, 2.5, 3.45, 0.5, 0xffffff);
mug.userData = { clickable: true, type: 'about' };
roomGroup.add(mug);
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    
    // Update controls
    controls.update();

    // Update Tweens
    TWEEN.update();

    // Render
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
};

// Handle Resize
window.addEventListener('resize', () => {
    const aspect = window.innerWidth / window.innerHeight;
    
    camera.left = -frustumSize * aspect / 2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = -frustumSize / 2;
    
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Remove Loader
const loader = document.getElementById('loader');
setTimeout(() => {
    loader.classList.add('hidden');
}, 1000);

tick();
