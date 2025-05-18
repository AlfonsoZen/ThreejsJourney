# What is WebGL and why use Three.js
Three.js is a 3D JavaScript library under MIT license that enables developers to create 3D experiences for the web. It works right above **WebGL**

## What is WebGL?
WebGL is a JavaScript API that renders triangles in a canvas at a remarkable speed. It's compatible with most modern browsers, and it's fast because it uses the Graphic Processing Unit (GPU) of the visitor.

The instructions to place the points and draw the pixels are written in what we call shaders. We also need to provide data to these shaders. For example: how to place the points according to the model transformations and the camera's properties. These are called matrices.

## First Three.js Project
After installing and importing the required dependecies and libraries:
```sh
npm i three
```

```js
import * as THREE from 'three'
```

We need mainly 4 elements: 
- Scene
- Objects
- Camera
- Renderer

```js
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
```

# Transform Objects
There are 4 properties to transform objects in our scene
- `position` (to move the object)
- `scale` (to resize the object)
- `rotation` (to rotate the object)
- `quaternion` (to also rotate the object; more about that later)

```js
...

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
...
// Get the distance between two 3D objects by their vectors
console.log(mesh.position.distanceTo(camera.position));

// Look at method. It rotates the object so that its '-z' faces the target you provided
camera.lookAt(mesh.position)
...
```

## Snece Graph
We can put objects inside groups and use `position`, `rotation` (or `quaternion`), and scale on those groups. To do that, use the **Group** class.
```js
...
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
...
```

# Animations
Animations, when using Three.js, work like stop motion.

The native JavaScript way of doing so is by using the `window.requestAnimationFrame(...)` method.

`requestAnimationFrame` will execute the function you provide on the next frame. But then, if this function also uses `requestAnimationFrame` to execute that same function on the next frame, you'll end up with your function being executed on each frame forever which is exactly what we want.

## Adaptation to the framerate
### Animating with Date:
```js
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
```

### Animating with Clock
```js
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
```

### Animating with GSAP
```js
// Animate with GSAP
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

const loop_3 = () => {
    // Renderer
    renderer.render(scene, camera)

    // Call to the requestAnimationFrame
    window.requestAnimationFrame(loop_3);
}

loop_3()

```