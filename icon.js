import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x121212);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/4, window.innerHeight/4);
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


camera.position.z = 4;

// Load the font
const loader = new FontLoader();
const textMesh = new THREE.Object3D;
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
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe:true}); //currently invis        
		textMesh.add(new THREE.Mesh(textGeometry, textMaterial));
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
    textMesh.rotation.y += 0.005;
	renderer.render( scene, camera );
}

renderer.setAnimationLoop(animate);
