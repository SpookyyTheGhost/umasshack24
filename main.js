import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x121212);


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry( 1,1,1 ); 
const material = new THREE.PointsMaterial( { color: 0xffffff});
material.size = 0.04;
const cube = new THREE.Points( geometry, material );

scene.add( cube );

// Instantiates OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Set zoom limits
controls.minDistance = 2; // Minimum zoom distance
controls.maxDistance = 7; // Maximum zoom distance

camera.position.z = 5;

// Load the font
const loader = new FontLoader();
loader.load('/fonts/droid_sans_regular.typeface.json', function (font) {
        console.log('Font loaded successfully');
        const textGeometry = new TextGeometry('VER.TECH', {
            font: font,
            size: 1,
            height: 0.2,
            curveSegments: 0.005,
            bevelEnabled: false,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });
        textGeometry.center();
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe:true, transparent:true,opacity:0}); //currently invis        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(textMesh);
    },
    undefined,
    function (error) {
        console.error('An error occurred loading the font', error);
    }
);


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
