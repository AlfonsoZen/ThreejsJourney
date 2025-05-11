import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Transform the position of a 3D object by accesing to its 'x', 'y', and 'z' properties
mesh.position.x = 1.5
mesh.position.y = 1
mesh.position.z = 1

/// Transform the position of a 3D object by the 'set' method
mesh.position.set(2, 2, -1);

// Get the distance between the center and an 3D object by its vector
console.log(mesh.position.length());

// Normalize the vector of a 3D object making its length to zero
// mesh.position.normalize()

/** AXES HELPER */
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper);

// Scale the objects by accesing their own properties:
mesh.scale.x = 2;
mesh.scale.y = .5;
mesh.scale.z = 5;

// Scale the objects by the 'set' method
mesh.scale.set(3,1,1);

// Rotate with 'rotation' 
mesh.rotation.reorder('XYZ')
mesh.rotation.x = Math.PI / 8
mesh.rotation.y = Math.PI / 4

// Rotate with 'quaternion' comming up...

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(1, 1, 4)
scene.add(camera)

// Get the distance between two 3D objects by their vectors
console.log(mesh.position.distanceTo(camera.position));

// Look at method. It rotates the object so that its '-z' faces the target you provided
camera.lookAt(mesh.position)

/**
 * Groups
 */
const group = new THREE.Group()
group.position.set(1,0,0)
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(.2,.2,.2),
    new THREE.MeshBasicMaterial({ color: 'cyan' })
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(.2,.2,.2),
    new THREE.MeshBasicMaterial({ color: 'cyan' })
)
cube2.position.set(1,0,0)


const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(.2,.2,.2),
    new THREE.MeshBasicMaterial({ color: 'cyan' })
)
cube3.position.set(2,0,0)

group.add(cube1)
group.add(cube2)
group.add(cube3)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)