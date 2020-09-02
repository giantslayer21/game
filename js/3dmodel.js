
import * as THREE from './three/three.module.js';
import { OrbitControls } from './three/OrbitControls.js';
import {GLTFLoader} from './three/GLTFLoader.js';

function main() {
  let canvas,renderer,camera,scene,controls;
  init();
  animate();
  
  function init() {
    
    canvas = document.querySelector('#c');
    canvas.addEventListener("scroll", function(event){
      event.preventDefault()
    });
    renderer = new THREE.WebGLRenderer({canvas,antialias:true});
    // document.body.appendChild( renderer.domElement );
    camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 1, 1000);    
    camera.position.z = 140;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xEDEDED);
    // scene.fog = new THREE.FogExp2( 0xe8eddf, 0.002 );
    // var axesHelper = new THREE.AxesHelper( 100 ); scene.add( axesHelper );

    controls = new OrbitControls( camera, renderer.domElement );  
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed =-2;
    controls.screenSpacePanning = true;
    controls.enableZoom=false;
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2.5;
    // controls.minPolarAngle = Math.PI / 2;

    //....LIGHTS....
    let amblight = new THREE.AmbientLight(0xAAD3E9,0.1);
    scene.add(amblight);
    let light = new THREE.DirectionalLight(0xffffff,1.8);
    light.position.set(100, 0, 250);
    camera.add( light )
    scene.add( camera )
    // scene.add(light);
    
    //....THE WORLD/OJECTS
    
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/models/low_poly_mountain/scene.gltf', (gltf) => {
      const module = gltf.scene;
      module.position.x=250;
      module.position.y=-140;
      module.position.z=287;
      scene.add(module);
    });
    gltfLoader.load('./assets/models/low_poly_cloud/scene.gltf', (gltf) => {
      const module = gltf.scene;
      module.rotation.y= Math.PI/2;
      module.scale.set(0.4,0.4,0.4);
      module.position.x=70;
      module.position.y=20;
      module.position.z=20;
      scene.add(module);
    });gltfLoader.load('./assets/models/procedural_low_poly_cloud/scene.gltf', (gltf) => {
      const module = gltf.scene;
      module.rotation.y= -Math.PI/6;
      module.scale.set(3,3,3);
      module.position.x=-20;
      module.position.y=40;
      module.position.z=40;
      scene.add(module);
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render();
  }

}
main();
