# Three-Molecules
A demonstration of how to draw molecular diagrams with Three.js

## Getting Started
This is a demonstration of how to draw molecular diagrams with Three.js. It is based on the [Three.js](https://threejs.org/) library, which is a JavaScript library for drawing 3D graphics in a web browser. This code takes a `.mol` file and converts it to a JSON object, which is then used to draw the 3D model of the molecule.

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
        camera.position.y = 5;
        camera.position.z = 5;
        camera.lookAt(0,0,0);
        
        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        animate();
    </script>
</body>
</html>
```

You should see a green cube in the center of the browser window.

## Step 2: Create an init() function

Now that we have a basic scene set up, we can start to add some more complex objects to the scene. We will start by creating a function called `init()` that will be called when the page loads, and will contain all of the code that we need to set up the scene.

We need to declare the `scene`, `camera`, and `renderer` variables globally, then define items like geometries within the `init()` function:

and then we can define the `init()` function:

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function init(){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.x = 5;
    camera.position.y = 5;
    camera.position.z = 5;
    camera.lookAt(0,0,0);
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
init();
animate();
```

When we call the `init()` function before the `animate()` function, the geometry is added to the scene and the camera positioned before the animation loop starts.

With the code above working, you will see a green cube in the center of the browser window that looks something like this:
![green cube](/screenshots/step-2.png)

## Step 3: Load a mol file

Now that we have a basic scene set up, we can start to add some more complex objects to the scene. We will start by creating a function that fetches a mol file from the server, and then parses it to create a Three.js mesh.

First, create folder where you will store your mol files, in my case I will create a folder called `molecules` in the root of the project and add some mol files retrieved from ChemSpider and named using their respective ChemSpider IDs:

```bash
.
├── index.html
├── js
│   └── three.min.js
├── molecules
│   └── 2424.mol
└── README.md
```

I've added 2424.mol to the molecules folder, the Chemspider ID for caffeine.

Let's fetch the mol file from the server and parse it to create a Three.js mesh. We will start by fetching the mol file from the server using the `fetch()` function.

```js
function init(){
    fetch('molecules/2424.mol')
    .then(response => response.text())
    .then(data => {
        console.log(data);
    });
}
```

We can refactor the `init()` function to use a parameter which defines the ID of the molfile to load:

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function init(CSID){
    fetch('molecules/' + CSID + '.mol')
    .then(response => response.text())
    .then(data => {
        console.log(data);
    });
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

const defaultCSID = 2424;

init(defaultCSID);
animate();
```

This will log the mol file to the console. In order to understand the mol file format, articles [like this](https://chem.libretexts.org/Courses/University_of_Arkansas_Little_Rock/ChemInformatics_(2017)%3A_Chem_4399_5399/2.2%3A_Chemical_Representations_on_Computer%3A_Part_II/2.2.2%3A_Anatomy_of_a_MOL_file) are very useful as well as the [Wikipedia article on chemical table file formats](https://en.wikipedia.org/wiki/Chemical_table_file#:~:text=An%20MDL%20Molfile%20is%20a,sections%20for%20more%20complex%20information.).


## Step 4: Parsing a mol file

Let's break down the basic contents of the 2424.mol file:

The first three lines of a mol file contain information about the file itself, including a name (first line), information about the program that created the file (second line), and a third line that may contain a comment (and is sometimes used to store dates). The contents of these lines vary depending on the program used for their creation and there is a degree of inconsistency in the way that they are used.

```bash
2519
  Marvin  12300703363D          

```

Next, the fourth line contains information about the number of atoms and bonds in the molecule:

```bash
 24 25  0  0  0  0            999 V2000
```

Here it becomes important to note that mol files are arranged in a fixed-width format, with each line containing a fixed number of characters. The first three characters of each line contain the number of atoms in the molecule, the next three characters contain the number of bonds, and the next six characters contain the number of charges, the number of isotopes, the number of stereo centers, the number of stereo bonds, and the number of unknown properties, respectively. The next six characters are reserved for future use, and the last three characters are used to indicate the version of the mol file format (in the case of the caffeine mol file retrieved from Chemspider, this is V2000).

The first two numbers are what we are particularly interested in, as they are going to help with parsing the rest of the file, as each atom receives its own line after the fourth line, and the bonds are listed after the atoms.

We can start by creating a function that parses the content of the mol file that will return a JSON object containing the information we want about the atoms and bonds in the molecule:

```js
function molFileToJSON(molFile){
    let molObj = {};
    return molObj;
}
```

We can then split the string in to an array of lines:

```js
function molFileToJSON(molFile){
    let molObj = {};

    const split = molFile.split('\n');

    return molObj;
}
```

We can then get the counts by chunking the line of the array:
```js
function molFileToJSON(molFile){
    let molObj = {};

    const split = molFile.split('\n');

    const countChunks = [];
    for (let i = 0; i < split[3].length; i+=3) {
        countChunks.push(split[3].slice(i, i+3));
    }

    return molObj;
}
```

Since mol files don't use padding on their number we then need to trim their the whitespace from the chunks before assigning them in the molObj:

```js
function molFileToJSON(molFile){
    let molObj = {};

    const split = molFile.split('\n');

    const countChunks = [];
    for (let i = 0; i < split[3].length; i+=3) {
        countChunks.push(split[3].slice(i, i+3));
    }

    molObj.counts.molecules = countChunks[0].trim();
    molObj.counts.bonds = countChunks[1].trim();
    molObj.counts.lists = countChunks[2].trim();
    molObj.counts.chiral = countChunks[4].trim() == 1 ? true : false;
    molObj.counts.stext = countChunks[5];

    return molObj;
}
```

Once we have count for `molObj.counts.molecules` and `molObj.counts.bonds` we can then use them to parse the atoms and bonds in the file. In 2425.mol, since there are 24 atoms and 25 bonds, the atoms are listed from line 5 to line 28, and the bonds are listed from line 29 to line 53. A line describing a single atom looks like this:
```text
    0.2334   -2.4028    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
```
The X, Y, and Z columns contain the coordinates of the atom, the next column contains the element symbol. The X, Y, and Z coordinates are in the format #####.####, five digits for the integer part and four digits for the decimal part, so columns 1-10 contain the X coordinate, columns 11-20 contain the Y coordinate, and columns 21-30 contain the Z coordinate. The next column contains the Molecule's symbol (i.e. O for Oxygen, Na for Sodium, etc.).

We can parse each of the atoms by iterating over the lines starting from the fifth line and finishing at line 5 + `molObj.counts.molecules`:

```js
const atomsArray = [];
for (let i = 4; i < 4 + parseInt(molObj.counts.molecules); i++) {
    const atom = {};
    atom.position = {};
    atom.position.x = split[i].slice(0, 10).trim();
    atom.position.y = split[i].slice(10, 20).trim();
    atom.position.z = split[i].slice(20, 30).trim();
    atom.type = split[i].slice(31, 33).trim();
    atomsArray.push(atom);
}
molObj.atoms = atomsArray;
```
I like to use the format `position: {x,y,z}` to store the positions, as it matches the syntax used in the Three.js library. Thus you can access the X coordinate of the first atom in the molecule by using `molObj.atoms[0].position.x` and it's type (element symbol, i.e. O for Oxygen, Na for Sodium) by using `molObj.atoms[0].type`.

Next, we want to retrieve the bonds. A line describing a single bond looks like this:
```text
  1  9  2  0  0  0  0
```
This is a connection table. The first two columns contain the index of the atoms that are connected by the bond (the order in which they appeared in the file). The third column contains the bond type. Thus it is crucial to keep the order of the atoms in the molObj's atom array in the same order as the order in which they appear in the file. One should note that **`.mol` files have a starting index of 1**.

We can retrieve the bonds by iterating over the lines starting from the 5 + `molObj.counts.molecules` line and finishing at line 5 + `molObj.counts.molecules` + `molObj.counts.bonds`, and write them in a 2D array as `molObj.bonds`:

```js
const bondsArray = [];
for (let i = 4+parseInt(molObj.counts.molecules); i < 4 +parseInt(molObj.counts.molecules)+ parseInt(molObj.counts.bonds); i++) {
    const bond = [split[i].slice(0, 3).trim(), split[i].slice(3, 6).trim(), split[i].slice(6, 9).trim()];
    bondsArray.push(bond)
}
molObj.bonds = bondsArray;
```

With the addition of objects to represent the header of the `.mol` file, the code looks like this:

```js
const molFileToJSON = (molFile) => {
    let molObj = {};
    const split = molFile.split('\n');
    
    molObj.header = {};
    molObj.header.title = split[0];
    molObj.header.program = split[1].split('  ')[1];
    molObj.header.timeStamp = split[1].split('  ')[2];
    molObj.header.comment = split[2];

    molObj.counts = {};
    
    const countChunks = [];
    for (let i = 0; i < split[3].length; i += 3) {
        countChunks.push(split[3].slice(i, i + 3));
    }

    molObj.counts.molecules = countChunks[0].trim();
    molObj.counts.bonds = countChunks[1].trim();
    molObj.counts.lists = countChunks[2].trim();
    molObj.counts.chiral = countChunks[4].trim() == 1 ? true : false;
    molObj.counts.stext = countChunks[5];

    const atomsArray = [];
    for (let i = 4; i < 4 + parseInt(molObj.counts.molecules); i++) {
        const atom = {};
        atom.position = {};
        atom.position.x = split[i].slice(0, 10).trim();
        atom.position.y = split[i].slice(10, 20).trim();
        atom.position.z = split[i].slice(20, 30).trim();
        atom.type = split[i].slice(31, 33).trim();
        atomsArray.push(atom);
    }
    molObj.atoms = atomsArray;

    const bondsArray = [];
    for (let i = 4+parseInt(molObj.counts.molecules); i < 4 +parseInt(molObj.counts.molecules)+ parseInt(molObj.counts.bonds); i++) {
        const bond = [split[i].slice(0, 3).trim(), split[i].slice(3, 6).trim()];
        bondsArray.push(bond)
    }
    molObj.bonds = bondsArray;

    return molObj;
}
```

## Step 5: import the conversion function into the project:

We can make a new file and call it `molFileToJSON.js`. We can then import the function into the project by adding the following line to the top of `index.js`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Three JS Molecules</title>
    <script src="js/three.min.js"></script>
    <script src="js/molFileToJSON.js"></script>

    <style>
        body { margin: 0; }
    </style> 
</head>
```

We can then call the function in the `drawMolecule` function:

```html
<body>
    <script>
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        const geometry = new THREE.SphereGeometry( .1, 32, 32 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

        function drawMolecule(molFile){
            const molObject = molFileToJSON(molFile);
            
            for(let item of molObject.atoms){
                const sphere = new THREE.Mesh( geometry, material );
                sphere.position.x = item.position.x;
                sphere.position.y = item.position.y;
                sphere.position.z = item.position.z;
                scene.add( sphere );
            }
        }

        function init(CSID){
            fetch('molecules/' + CSID + '.mol')
                .then(response => response.text())
                .then(molFile => {
                    drawMolecule(molFile);
                });

            camera.position.x = 5;
            camera.position.y = 5;
            camera.position.z = 5;
            camera.lookAt(0,0,0);
        }
        
        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }

        const defaultCSID = 2424;
        
        init(defaultCSID);
        animate();
    </script>
</body>
</html>
```

You will now see a sphere for each atom in the molecule, positioned according to the coordinates specified in the `.mol` file. The spheres are all the same size and color, and due to a lack of shading, appear to be flat.

What you should see so far will look like this:
![Step-5](/screenshots/step-5.png)

## Step 6: Clear the scene when the init function is called:

We can clear the scene when the `init` function is called by adding the following lines to the start of the `init` function:

```js
while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
}
```

This removes the spheres from the scene, so that when the `init` function is called again, the spheres are not drawn again. By changing the `CSID` variable to a different value, a different molecule can be drawn (so long as the  corresponding file is present in the `molecules` folder).

## Step 7: Style the spheres:

The various elements of the molecule can be styled by changing the values of the `geometry` and `material` variables. The `geometry` variable is used to define the shape of the sphere, and the `material` variable is used to define the color and shading of the sphere. The `geometry` variable is defined as follows:

```js
const sphere = new THREE.Mesh( geometry, material );
```

If we want to vary the size of the sphere, we can use an object to hold these values in a map, and then use the `atom.type` value to select the appropriate item.

```js
const moleculeGeometries = {
    "C": new THREE.SphereGeometry( .8, 32, 32 ),
    "H": new THREE.SphereGeometry( .3, 32, 32 ),
    "O": new THREE.SphereGeometry( .5, 32, 32 ),
    "N": new THREE.SphereGeometry( .6, 32, 32 ),
    "S": new THREE.SphereGeometry( .8, 32, 32 ),
    "P": new THREE.SphereGeometry( .9, 32, 32 ),
    "F": new THREE.SphereGeometry( .4, 32, 32 ),
    "Cl": new THREE.SphereGeometry( .5, 32, 32 ),
    "Br": new THREE.SphereGeometry( .6, 32, 32 ),
    "I": new THREE.SphereGeometry( .7, 32, 32 ),
}
const moleculeMaterials = {
    "C": new THREE.MeshStandardMaterial( { color: 0x333333 } ),
    "H": new THREE.MeshStandardMaterial( { color: 0xffffff } ),
    "O": new THREE.MeshStandardMaterial( { color: 0xff0000 } ),
    "N": new THREE.MeshStandardMaterial( { color: 0x0000ff } ),
    "S": new THREE.MeshStandardMaterial( { color: 0xffff00 } ),
    "P": new THREE.MeshStandardMaterial( { color: 0xff00ff } ),
    "F": new THREE.MeshStandardMaterial( { color: 0x00ff00 } ),
    "Cl": new THREE.MeshStandardMaterial( { color: 0x00ff00 } ),
    "Br": new THREE.MeshStandardMaterial( { color: 0x00ff00 } ),
}
```

And we then access these items in the `drawMolecule` function when we define the sphere:

```js
for(let item of molObject.atoms){
    const sphere = new THREE.Mesh( moleculeGeometries[item.type], moleculeMaterials[item.type] );
    ...
}
```
## Step 8: Add lighting:

See: https://threejs.org/docs/#api/en/lights/SpotLight

We can add ambient and spotlighting in our scene by including the following lines in the `init` function:

```js
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );
spotLight.map = new THREE.TextureLoader().load( url );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );
```
The result will be something like this:
![Step-8](/screenshots/step-8.png)

## Step 9: Add an axis helper:

An axis helper is a useful tool built in to Three.js for visualizing orientation. We can add an axis helper to the scene by including the following line in the `init` function:

```js
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
```

With the axis helper in place, you should see something like this:
![Step-9](/screenshots/step-9.png)

This particular mol file of caffeine has been centered to the origin, which is useful if we consider that we will want to be able to rotate the molecule later on in the tutorial.

In contrast, see what happens when we load a different molecule where the origin is not at the center of the molecule (in this case, Sodium Stearate):
![Step-9-2](/screenshots/step-9-2.png)

Therefore, we may want to center the molecule to the origin when we load it.

## Step 10: Center the molecule to the origin:
In order to center the molecule to the origin, we need to calculate the center of the molecule. To do this, we need to determine the minimum and maximum values for the x, y, and z coordinates. We can do this by iterating through the atoms in the molecule, and comparing the current value of the x, y, and z coordinates to the current minimum and maximum values. We can then use the midpoint of these values to center the molecule to the origin.

First, we need to create a variable to hold the minimum and maximum values for the x, y, and z coordinates, and set these to an initial value using the first item in the atoms array.

Doing this 

```js
//Get the first point in the molecule:  
let firstPoint = new THREE.Vector3(
    molObject.atoms[0].position.x, 
    molObject.atoms[0].position.y, 
    molObject.atoms[0].position.z);
//Set the initial limits to the first point:
let limits = {
    x: {
        min: firstPoint.x,
        max: firstPoint.x
    },
    y: {
        min: firstPoint.y,
        max: firstPoint.y
    },
    z: {
        min: firstPoint.z,
        max: firstPoint.z
    }
}
```

Then, we need to iterate through the atoms in the molecule, and compare the current value of the x, y, and z coordinates to the current minimum and maximum values:

```js
for(let item of molObject.atoms){
    let point = new THREE.Vector3(
        item.position.x, 
        item.position.y, 
        item.position.z);

    if(Number(point.x) < Number(limits.x.min)){
        limits.x.min = point.x;
    }
    if(Number(point.x) > Number(limits.x.max)){
        limits.x.max = point.x;
    }
    if(Number(point.y) < Number(limits.y.min)){
        limits.y.min = point.y;
    }
    if(Number(point.y) > Number(limits.y.max)){
        limits.y.max = point.y;
    }
    if(Number(point.z) < Number(limits.z.min)){
        limits.z.min = point.z;
    }
    if(Number(point.z) > Number(limits.z.max)){
        limits.z.max = point.z;
    }
}
```

Then, we can create a new variable to hold the midpoint of the x, y, and z coordinates:

```js
let moleculeCenter = new THREE.Vector3(
    (Number((limits.x.min)) + Number(limits.x.max))/2,
    (Number((limits.y.min)) + Number(limits.y.max))/2,
    (Number((limits.z.min)) + Number(limits.z.max))/2);
```

Then, this can be used to center the molecule to the origin:

```js
sphere.position.x = item.position.x - moleculeCenter.x;
sphere.position.y = item.position.y - moleculeCenter.y;
sphere.position.z = item.position.z - moleculeCenter.z;
```

If we go back and load the Sodium Stearate molecule, we should see something like this:

![Step-10](/screenshots/step-10.png)

## Step 11: Convert to using ES6 modules:

First, download `three.modules.js` file from the Three.js repository or install Three.js using npm:
https://threejs.org/docs/#manual/en/introduction/Installation

Next, remove the script tag for `three.js` from the `index.html` file:

```diff
<head>
    <title>Three JS Molecules</title>
-   <script src="js/three.min.js"></script> -->

    <script src="js/molFileToJSON.js"></script>

    <style>
        body { margin: 0; }
    </style> 
</head>
```
And we then add `type="module"` to the script tag for `molFileToJSON.js`:

```html
<script type= "module" >
</script>
```

Then, import the THREE module:

```diff
<script type= "module" >
+   import * as THREE from './js/three.module.js';
</script>
```

This will allow us to use the ES6 module syntax in our `molFileToJSON.js` file.

## Step 12: Import OrbitControls:

OrbitControls is an addition to Three.js that allows us to rotate the camera around the scene. We can import OrbitControls by adding the following line to the `molFileToJSON.js` file. First, start by saving the `OrbitControls.js` file to the `./js/` folder, the continue by adding an import map to the head of the HTMl file:
```
<script type="importmap">
    {
        "imports": {
            "three": "./js/three.module.js",
            "OrbitControls": "./js/OrbitControls.js"
        }
    }
</script>
```
Then, we can import OrbitControls by adding the following to our main script:

```js
import {OrbitControls} from './js/OrbitControls.js';
```

Then, in the global scope, we can create a new instance of OrbitControls, after the camera and render have been created:

```diff
    import * as THREE from './js/three.module.js';
+   import {OrbitControls} from './js/ OrbitControls.js';
 

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(    75, window.innerWidth / window.innerHeight,   0. 1, 1000 ); 

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.   innerHeight );
    document.body.appendChild( renderer.   domElement ); 

+   const controls = new THREE.OrbitControls( camera, renderer.domElement );
```

Then, in the animation loop, we can call the `update()` method on the controls object:

```js
controls.update();
```

With everything in place, we should be able to rotate the camera around the scene by clicking and dragging the mouse. Dragging the mouse in combination with the shift or control key will allow us to pan the camera, and the scroll wheel will allow us to zoom in and out.

Using OrbitControls should look a bit like this:
![Step-12](/screenshots/step-12.gif)

## Step 13: Add the molecule to a group, rather than the scene:
Since we will be adding multiple molecules to the scene, we can add each molecule to a group, and then add the group to the scene. This will allow us to manipulate the group as a whole, rather than each individual molecule.

Begin by creating a new group in the global scope:

```js
let moleculeGroup = new THREE.Group();

function drawMolecule(molFile){
    ...
}
```

Then, instead of adding the sphere to the scene, we can add it to the group, and then add the group to the scene:

```diff
let moleculeGroup = new THREE.Group();

function drawMolecule(molFile){
    ...
    for(let item of molObject.atoms){
        const sphere = new THREE.Mesh( moleculeGeometries[item.type], moleculeMaterials[item.type] );
        
        sphere.position.x = item.position.x - moleculeCenter.x;
        sphere.position.y = item.position.y - moleculeCenter.y;
        sphere.position.z = item.position.z - moleculeCenter.z;
        
-       scene.add( sphere );
+       moleculeGroup.add( sphere );
    }
+   scene.add( moleculeGroup );
}
```

This will allow us to manipulate the group as a whole, rather than each individual molecule. This will be useful in the next step, when we add the ability to manipulate the molecule.

## Step 14: Adding datgui and manipulating the molecule group:
We can use datgui to add a user interface to our application. This will allow us to manipulate the molecule group, and see the changes in real time.

To use datgui, download or install it using npm. To use it with the project, we can add the following to the head of the HTML file:

```html
<head>
    ...
    <script type="text/javascript" src="js/datgui/dat.gui.min.js"></script>
    ...
</head>
```

We can then add a new GUI in the init function:

```diff
+   const gui = new dat.GUI();
```

Then, we can add a folder to the GUI, and add a slider to the folder:

```js
const moleculePosition = gui.addFolder('Position')
moleculePosition.add(moleculeGroup.position, 'x', -10, 10)
moleculePosition.add(moleculeGroup.position, 'y', -10, 10)
moleculePosition.add(moleculeGroup.position, 'z', -10, 10)

const moleculeRotation = gui.addFolder('Rotation')
moleculeRotation.add(moleculeGroup.rotation, 'x', -Math.PI, Math.PI)
moleculeRotation.add(moleculeGroup.rotation, 'y', -Math.PI, Math.PI)
moleculeRotation.add(moleculeGroup.rotation, 'z', -Math.PI, Math.PI)

const moleculeScale = gui.addFolder('Scale')
const scaleX = moleculeScale.add(moleculeGroup.scale, 'x', .1, 1.5).name("Scaling Factor")
scaleX.onChange(function(value){
moleculeGroup.scale.y = value;
moleculeGroup.scale.z = value;
})
```

This will give you a set of controls that will allow you to manipulate the molecule group. The controls should look something like this:
![Step-14](/screenshots/step-14.png)

## Step 15: Adding auto-rotation:

We can add auto-rotation to the molecule group by adding a few things, firstly, a variable to keep track of whether or not auto-rotation is enabled:

```js
let autoRotate = {
    switch: false
}
```

Then, within the `init()` function, we can add a checkbox to the GUI, and add an event listener to the checkbox:

```js
gui.add(autoRotate, "switch").name("Auto Rotate");
```

Finally, we can add a check to the animation loop, to see if auto-rotation is enabled, and if so, rotate the molecule group:

```js
if(autoRotate.switch){
    moleculeGroup.rotation.x-=.5*deltaTime;
}
```

Then, we'll be able to toggle auto-rotation on and off, and see the molecule rotate in real time, like so:

![Step-15](/screenshots/step-15.gif)
