---
title: Peridot Visualization
---

# Peridot Gem Visualization

<div id="peridot-container" style="width: 100%; height: 400px; border: 1px solid #ccc; border-radius: 8px;"></div>

<script type="module">
  // Import Three.js from CDN
  import * as THREE from 'https://cdn.skypack.dev/three@0.137.0';
  import { OrbitControls } from 'https://cdn.skypack.dev/three@0.137.0/examples/jsm/controls/OrbitControls.js';

  // Initialize when the page is loaded
  window.addEventListener('load', () => {
    const container = document.getElementById('peridot-container');
    if (!container) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Add a simple cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    camera.position.z = 5;
    
    // Animate
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  });
</script>
