import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animations
*/
// Animating with Date
let time = Date.now()
const loop_1 = () => {
    // Animating with Date
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;
    mesh.rotation.y += .002 * deltaTime

    // Renderer
    renderer.render(scene, camera)

    // Call the loop again on the next frame
    window.requestAnimationFrame(loop_1);
}
// loop_1(camera)


// Animating with Clock
const clock = new THREE.Clock()
const loop_2 = () => {
    // Animating with Clock
    const elapsedTime = clock.getElapsedTime()
    
    // Update objects;
    mesh.rotation.y = elapsedTime * (Math.PI/4)
    mesh.position.x = Math.sin(elapsedTime)
    mesh.position.y = Math.cos(elapsedTime)
    camera.lookAt(mesh.position)
    
    // Renderer
    renderer.render(scene, camera)
    
    // Call the loop again on the next frame
    window.requestAnimationFrame(loop_2);
}
// loop_2(camera)

// Animate with GSAP
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

const loop_3 = () => {
    // Renderer
    renderer.render(scene, camera)

    // Call to the requestAnimationFrame
    window.requestAnimationFrame(loop_3);
}

loop_3()
