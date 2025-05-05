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
