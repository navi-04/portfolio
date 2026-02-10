// Three.js Particle Network Background
// Implements a "constellation" effect with interactive particles

const initThreeJS = () => {
    // Canvas & Scene Setup
    const canvas = document.querySelector('#bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Configuration
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 50 : 120; // Fewer particles on mobile
    
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3); // Store velocity manually

    // Initialize Particles
    for(let i = 0; i < particlesCount * 3; i++) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 20; // Spread range
        // Velocity (random direction)
        velocityArray[i] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x64ffda, // Mint color to match theme
        transparent: true,
        opacity: 0.8,
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lines (Lines between particles)
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x64ffda,
        transparent: true,
        opacity: 0.15
    });

    // Group to hold lines (recreated every frame or updated)
    // For performance, we'll use a single line segments geometry
    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(linesMesh);

    // Mouse Interaction
    const mouse = { x: 0, y: 0 };
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX - windowHalfX);
        mouse.y = (event.clientY - windowHalfY);
    });

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Clock
    const clock = new THREE.Clock();

    // Animation Loop
    const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update Particle Positions
        const positions = particlesGeometry.attributes.position.array;
        
        // Gentle rotation of the whole cloud
        particlesMesh.rotation.y = elapsedTime * 0.05;
        linesMesh.rotation.y = elapsedTime * 0.05;

        // Interactive movement based on mouse
        targetX = mouse.x * 0.001;
        targetY = mouse.y * 0.001;

        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);

        // Update individual particles (simple drift)
        // We could do complex physics, but simple rotation + parallax is usually enough and cheaper
        
        // Dynamic Line Connections
        // We need to calculate world positions because the mesh is rotating
        
        // NOTE: For performance in JS, we'll do raw calculations on the CPU for small N
        // A shader approach would be faster for N > 500, but N=100 is fine here.
        
        const linePositions = [];
        const connectDistance = 3.5; // Threshold to connect

        // We need to check distances. 
        // Since mesh rotates, the relative distance in local space stays same!
        // So we can just check local positions array.
        
        for (let i = 0; i < particlesCount; i++) {
            const ix = positions[i * 3];
            const iy = positions[i * 3 + 1];
            const iz = positions[i * 3 + 2];

            // Update positions (drift) using saved velocities
            positions[i * 3] += velocityArray[i * 3];
            positions[i * 3 + 1] += velocityArray[i * 3 + 1];
            positions[i * 3 + 2] += velocityArray[i * 3 + 2];

            // Boundary check (respawn if too far)
            if (positions[i * 3] > 10) positions[i * 3] = -10;
            if (positions[i * 3] < -10) positions[i * 3] = 10;
            if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10;
            if (positions[i * 3 + 1] < -10) positions[i * 3 + 1] = 10;
            
            // Connect loop
            for (let j = i + 1; j < particlesCount; j++) {
                const jx = positions[j * 3];
                const jy = positions[j * 3 + 1];
                const jz = positions[j * 3 + 2];

                const dx = ix - jx;
                const dy = iy - jy;
                const dz = iz - jz;
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

                if (dist < connectDistance) {
                    linePositions.push(ix, iy, iz);
                    linePositions.push(jx, jy, jz);
                }
            }
        }
        
        particlesGeometry.attributes.position.needsUpdate = true;

        // Update lines geometry
        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        
        // Render
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    }

    // Set camera Z
    camera.position.z = 5;

    tick();
};

// Wait for Three.js to load then init
const checkThree = setInterval(() => {
    if (window.THREE) {
        clearInterval(checkThree);
        initThreeJS();
    }
}, 100);
