import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x121212);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

var fullObjectScreen = false;

// const geometry = new THREE.TorusGeometry(1, 0.1, 8, 100);
// const material = new THREE.MeshStandardMaterial({color:0xffffff});
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);
// const pointLight = new THREE.PointLight(0xffffff, 5);
// pointLight.position.set(2,2,2);
// scene.add(pointLight);
// const ambLight = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(ambLight);

//Start of lists with models
//Each index has these values String: fileNameOfObject, String[] correctGuesses, String: hint
var objects = [
    ["sam.glb", ["sam the minuteman", "sam", "minuteman", "minuteman sam"], "Go! Go U! Go UMass!"], 
    ["donut.glb", ["donut", "doughnut"],  "We got some from Dunk's!"], 
    ["churro.glb", ["churro", "long star thing"], "Comes with a lot of sugar, cinnamon, and melted chocolate"],
    ["apple.glb", ["apple", "ringo", "manzana"], "Keeps the doctor away"],
    ["energydrink.glb", ["energy drink", "red bull", "redbull", "monster energy", "monster", "monster can", "can", "soda", "kan", "soda can", "coke", "pop"], "Gives you wings"],
    ["monkey.glb", ["monkey", "chimp", "monke", "suzanne"], "Don't go bananas!"],
    ["cube.glb", ["cube", "prism"], "Guess what shape the connected vertices would create."],
    ["teapot.glb", ["teapot", "tea pot", "kettle", "tea kettle", "teakettle", "pot"], "Tea"],
    ["boat.glb", ["boat", "steamboat", "steam boat", "benchy", "ship", "3dbenchy", "3d benchy"], "Full steam ahead!"],
    ["gem.glb", ["gem", "gemstone", "gem stone", "diamond", "ruby"], "Shiny!"],
    ["pear.glb", ["pear"], "This fruit pairs well with cheese!"],
    ["pumpkin.glb", ["pumpkin"], "Cinderella story"]
]

var funcReturn = newObject(objects, -1);
objects = funcReturn[0];
var currentObjIndex = funcReturn[1];
var timesWrong = 0;

// Listener for the user input
document.addEventListener('DOMContentLoaded', () => {
    const text = document.getElementById('guess');
    const subBut = document.getElementById('submit');
    const form = document.getElementById('form');

    function getGuess(event) {
        if(fullObjectScreen){
            fullObjectScreen = false;
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            funcReturn = newObject(objects, currentObjIndex);
            objects = funcReturn[0];
            currentObjIndex = funcReturn[1];
            timesWrong = 0;
        }
      event.preventDefault();
      var guess = text.value;
      form.reset();
      guess = guess.toLowerCase();
      var correct = false;
      for(var i = 0; i<objects[currentObjIndex][1].length; i++){
        if(objects[currentObjIndex][1][i]==guess){
            document.getElementById("hint").textContent = "";
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            fullObjectScreen = true;
            funcReturn = newObject(objects, currentObjIndex);
            

            timesWrong = 0;
            correct = true;
            break;
        }
      }
      if(!correct){
        timesWrong++;
        
        if(timesWrong == 3){
            document.getElementById("hint").textContent = "Hint: "+objects[currentObjIndex][2];
        }

        
      }
      
      console.log(timesWrong);
    }

    subBut.addEventListener('click', getGuess);
  });


function newObject(objects, indexToRemove){
    if(!fullObjectScreen && indexToRemove!=-1){
        objects.splice(indexToRemove, 1);
    }
    var currentObjIndex = fullObjectScreen ? indexToRemove : Math.floor(Math.random() * objects.length); //random num from [0, objects.length)
    const modelLoader = new GLTFLoader();
    modelLoader.load( './models/'+objects[currentObjIndex][0], function ( gltf ) {
        // Traverse the model to access all children and their materials
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                // Extract the geometry from the mesh
                const geometry = child.geometry;

                // Create a PointsMaterial for rendering the vertices as points
                if(fullObjectScreen){
                    const standardMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
                

                    // Create a Points object from the geometry and the material
                    const stan = new THREE.Mesh(geometry, standardMaterial);

                    // Add the Points object to the scene
                    scene.add(stan);


                    const pointLight = new THREE.PointLight(0xffffff, 5);
                    pointLight.position.set(2,2,2);
                    scene.add(pointLight);
                    const ambLight = new THREE.AmbientLight(0xffffff, 0.4);
                    scene.add(ambLight);
                }
                else{
                    const pointsMaterial = new THREE.PointsMaterial({
                        color: 0xffffff, // Color of the points
                        size: 0.02,      // Size of each point
                    });
                

                    // Create a Points object from the geometry and the material
                    const points = new THREE.Points(geometry, pointsMaterial);

                    // Add the Points object to the scene
                    scene.add(points);
                }
            }
        });


    }, undefined, (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
    });
    return [objects, currentObjIndex];
}


// Instantiates OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.maxPolarAngle = Infinity;
controls.minPolarAngle = -Infinity;
// Set zoom limits
controls.minDistance = 2; // Minimum zoom distance
controls.maxDistance = 7; // Maximum zoom distance

camera.position.z = 5;

// Handles scene resizing
// Load the font
window.addEventListener('resize', () => {
	const width = window.innerWidth;
	const height = window.innerHeight;

	renderer.setSize(width, height);

	camera.aspect = width	 / height;

	camera.updateProjectionMatrix();
});

function animate() {
	controls.update();
	renderer.render( scene, camera );
}

renderer.setAnimationLoop(animate);
