import './style.css'
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

const controls = new OrbitControls(camera, renderer.domElement);




camera.position.z = 5;

function animate() {



	controls.update();

	renderer.render( scene, camera );

}

animate()
