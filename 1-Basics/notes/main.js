// Import three library
import * as THREE from 'three';

// Select the Canvas
const canvas = document.querySelector(".webGl")

// Scene
const scene = new THREE.Scene();

// Mesh (Geometry and Material)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, /* wireframe: true */ });
const mesh = new THREE.Mesh(geometry, material);

// Add Mesh to the Scene
scene.add(mesh);

// Camera (Perspective Camera). Field of view - Aspect Ratio 
const sizes = {
    width: 800,
    height: 600
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;


// Add Camera to the Scene
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize( sizes.width, sizes.height ); 

// Render the Scene
renderer.render(scene, camera)