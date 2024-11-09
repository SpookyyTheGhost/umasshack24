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

const sam = new THREE.Object3D;
const modelLoader = new GLTFLoader();
modelLoader.load( '/models/sam.glb', function ( gltf ) {
    // Traverse the model to access all children and their materials
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
			// Extract the geometry from the mesh
            const geometry = child.geometry;

            // Create a PointsMaterial for rendering the vertices as points
            const pointsMaterial = new THREE.PointsMaterial({
                color: 0xffffff, // Color of the points
                size: 0.02,      // Size of each point
            });

            // Create a Points object from the geometry and the material
            const points = new THREE.Points(geometry, pointsMaterial);

            // Add the Points object to the scene
            scene.add(points);
        }
    });


}, undefined, (error) => {
    console.error('An error occurred while loading the GLTF model:', error);
});

// const geometry = new THREE.BoxGeometry( 1,1,1 ); 
// const material = new THREE.PointsMaterial( { color: 0xffffff});
// material.size = 0.04;
// const cube = new THREE.Points( geometry, material );

// scene.add( cube );

// Instantiates OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Set zoom limits
controls.minDistance = 2; // Minimum zoom distance
controls.maxDistance = 7; // Maximum zoom distance
const controls = new OrbitControls(camera, renderer.domElement);

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
	controls.update();
	renderer.render( scene, camera );
}

renderer.setAnimationLoop(animate);
