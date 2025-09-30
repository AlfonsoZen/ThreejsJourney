import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * Cursor
 */
let cursor = {
    clientX: 0,
    clientY: 0
    }

window.addEventListener( 'mousemove', ({clientX, clientY}) => {
    cursor = {
        clientX: (clientX / sizes.width) - 0.5,
        clientY: (clientY / sizes.height) - 0.5
    }

    console.log(cursor)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(
        75, // FOV (deg): Vertical vision angle
        sizes.width / sizes.height, // Aspect Ratio: The width of the render divided by the height of the render
        0.1, // Near: How close the camera can see
        100 // Far: How far the camera can see

        // Any object or part of the object closer than near or further than far will not show up
    )
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Perspective Camera
const aspectRatio = sizes.width / sizes.height;
const orthographicCamera = new THREE.OrthographicCamera(
        -aspectRatio, // Left
        aspectRatio, // Right
        1, // Top
        -1, // Bottom
        1, // Near
        100 // Far
    )

orthographicCamera.position.set(2,2,2)
orthographicCamera.lookAt(mesh.position)
scene.add(orthographicCamera)

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 1

// Damping
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = cursor.clientX;
    // mesh.rotation.x = cursor.clientY;

    // Custom Orbit Controls 
    // camera.position.x = Math.sin(-cursor.clientX * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.clientX * Math.PI * 2) * 3;
    // camera.position.y = cursor.clientY * 5;
    // camera.lookAt(mesh.position)

    // Render
    renderer.render(scene, camera)
    // renderer.render(scene, orthographicCamera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    // Update Controls
    controls.update();
}

tick()