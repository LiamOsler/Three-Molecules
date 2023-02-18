# Three-Molecules
A demonstration of how to draw molecular diagrams with Three.js

## Getting Started
This is a demonstration of how to draw molecular diagrams with Three.js. It is based on the [Three.js](https://threejs.org/) library, which is a JavaScript library for drawing 3D graphics in a web browser.

### Accessing the Individual Steps
Each major step involved in building this application is in a separate branch of this repository. To access the files at each step, you need to clone this repository to your computer, and then check out the branch for the exercise you want to work on.

By default you will probably start in the main branch. This branch will have the final completed version of the project. To see the result of each steps, you can check out the branch for that step.

To list all of the branches in this repository, use this command:

```bash
git branch -a
```

Each of the steps will be named `step-1`, `step-2`, etc. To check out a branch, use this command:

```bash
git checkout step-1
```

You will then be able to see the code for that step. You can then make changes to the code, and see the result in your web browser once you have a web server running and you have refreshed the page.

### Running a Web Server
Because we may need to load external files, such as images and 3D models, we have to deal with Cross-Origin Resource Sharing (CORS) requests. You can allow access to local files in a particular directory in your browser, but its preferable to run a web server to serve the files.

If you have Node.js installed, you can use the [`http-server`](https://www.npmjs.com/package/http-server) package to quickly run a web server from the project director, using the command:
```
http-server -a localhost -p 8000
``` 
You can then visit [http://localhost:8000](http://localhost:8000) in your browser and will see the contents of the `index.html` file in the root of the directory being served.

If you don't have Node.js installed, you can use the `python -m SimpleHTTPServer` command to run a web server instead.

You can also use something like a [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for Visual Studio Code.

## Step 1: Import Three.js

Start by setting up a basic file structure and importing version `r150` of the Three.js library. Note: you can also install the ES6 module version of Three.js using `npm install three` and this method is recommended for more complex projects. But for this simple example, we will use the minified version of the older version of the library.

First, make a file called `index.html` and add the following code:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Three JS Molecules</title>
</head>
<body>
    
</body>
</html>
```

Then, you need to download the Three.js library. You can download the minified version from the [Three.js Github Repository](https://raw.githubusercontent.com/mrdoob/three.js/dev/build/three.min.js) and save it in a folder called `js` in the root of your project directory,
so we have something like this to get started from:

```bash
.
├── index.html
├── js
│   └── three.min.js
└── README.md
```

Now, we can add the Three.js library to our `index.html` file. We will add it to the `<head>` section of the file, and we will add it as a `<script>` tag.

```diff
<!DOCTYPE html>
<html>
<head>
    <title>Three JS Molecules</title>
+   <script src="js/three.min.js"></script> 
</head>
<body>
    
</body>
</html>
```

and then add a `<script>` tag to the end of the `<body>` section of the file.

```diff
<!DOCTYPE html>
<html>
<head>
    <title>Three JS Molecules</title>
    <script src="js/three.min.js"></script> 
</head>
<body>
+   <script>
+
+   </script>   
</body>
</html>
```

Inside that script tag, we can start to write our JavaScript code that will define what our 3D scene looks like.

Using the code from the [creating a scene](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) page of the official Three.js docs, we can start by with creating a scene, a camera, and a renderer. We can then add the camera to the scene, and add the renderer to the `<body>` section of the page:

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
```

Next, to add a basic cube to the scene, we can use the code from the documentation and add it to the scene, and adjust the camera's `position.x`, `position.y` and `position.z` values so that we can see the multiple faces of the cube, then we can use the `lookAt()` method to make the camera look at the center of the scene (coordinates `0,0,0`):

```js
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;
camera.lookAt(0,0,0);
```

Finally, we can add a `render()` function that will be called every time the screen needs to be updated, and call it once to render the scene:

```js
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
```

You will also want to set a margin of 0 on the `<body>` tag to prevent the margins from creating overflow in the window:

```html
<style>
    body { margin: 0; }
</style>
```

Put everything together, and your code will look like this:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Three JS Molecules</title>
    <script src="js/three.min.js"></script>
    <style>
        body { margin: 0; }
    </style> 
</head>
<body>
    <script>
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.x = 5;
        camera.position.z = 5;
        
        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        animate();
    </script>
</body>
</html>
```
If everything is working correctly, you should see a green cube in the center of the browser window.