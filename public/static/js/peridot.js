// public/static/js/peridot.js

// First, we need to import Three.js libraries
document.addEventListener('DOMContentLoaded', function() {
    // Only proceed if we find the container
    if (document.getElementById('peridot-container')) {
        // Dynamically load Three.js scripts
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        // Load required scripts in sequence
        Promise.all([
            loadScript('https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.min.js'),
            loadScript('https://cdn.jsdelivr.net/npm/three@0.157.0/examples/js/controls/OrbitControls.js')
        ]).then(() => {
            // Now we can initialize our scene
            initPeridotScene('peridot-container');
        }).catch(error => {
            console.error('Failed to load Three.js libraries:', error);
        });
    }
});

function initPeridotScene(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container not found!');
        return;
    }

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Camera Position
    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 50;

    // Central Peridot Gem
    const gemGeometry = new THREE.OctahedronGeometry(5, 1);
    const gemMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x9FE2BF,
        roughness: 0.1,
        metalness: 0.2,
        reflectivity: 1.0,
        clearcoat: 0.5,
    });
    const gem = new THREE.Mesh(gemGeometry, gemMaterial);
    scene.add(gem);

    // Orbiting Light
    const pointLight = new THREE.PointLight(0xD4F4DD, 2, 50);
    scene.add(pointLight);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0x5A8F6F, 0.3);
    scene.add(ambientLight);

    // Particle Background (Stars)
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
        const radius = 100;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xCCFFDD, size: 0.1 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Orbiting Shards
    const shardGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const shardMaterial = new THREE.MeshBasicMaterial({ color: 0x9FE2BF, emissive: 0x9FE2BF, emissiveIntensity: 0.5 });
    const shards = [];
    for (let i = 0; i < 5; i++) {
        const shard = new THREE.Mesh(shardGeometry, shardMaterial);
        shard.position.set(Math.cos(i) * 10, 0, Math.sin(i) * 10);
        scene.add(shard);
        shards.push(shard);
    }

    // Animation Loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);

        gem.rotation.y += 0.01;
        gem.scale.setScalar(4.8 + Math.sin(Date.now() * 0.001) * 0.4);

        time += 0.02;
        pointLight.position.set(Math.cos(time) * 15, 5, Math.sin(time) * 15);

        shards.forEach((shard, i) => {
            const angle = time + i * (Math.PI / 2.5);
            shard.position.x = Math.cos(angle) * 10;
            shard.position.z = Math.sin(angle) * 10;
            shard.rotation.x += 0.02;
            shard.rotation.y += 0.02;
        });

        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}