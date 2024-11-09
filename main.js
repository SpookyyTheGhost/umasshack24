import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x121212);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry( 1,1,1 ); 
const material = new THREE.PointsMaterial( { color: 0xffffff, wireframe:true});
material.size = 0.04;
const cube = new THREE.Points( geometry, material );

scene.add( cube );

// Instantiates OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Set zoom limits
controls.minDistance = 2; // Minimum zoom distance
controls.maxDistance = 7; // Maximum zoom distance

camera.position.z = 5;

// Handles scene resizing
window.addEventListener('resize', () => {
	const width = window.innerWidth;
	const height = window.innerHeight;

	renderer.setSize(width, height);

	camera.aspect = width / height;

	camera.updateProjectionMatrix();
});

function animate() {
	controls.update();
	renderer.render( scene, camera );
}

renderer.setAnimationLoop(animate);