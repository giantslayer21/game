
import * as THREE from './three/three.module.js';
import { OrbitControls } from './three/OrbitControls.js';

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
    camera.position.x = 1200;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8eddf);
    scene.fog = new THREE.FogExp2( 0xe8eddf, 0.002 );
    
    controls = new OrbitControls( camera, renderer.domElement );  
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed =-0.5;
    // controls.screenSpacePanning = false;
    controls.enableZoom=false;
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;
    // controls.minPolarAngle = Math.PI / 2;

    //....LIGHTS....
    
    let light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(-1, 2, 4);
    scene.add(light);
    
    //....THE WORLD/OJECTS
    
    var geometry = new THREE.CylinderBufferGeometry( 0, 10, 30, 4, 1 );
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
  
    for ( var i = 0; i < 100; i ++ ) {
  
      var mesh = new THREE.Mesh( geometry, material );
      mesh.position.x = Math.random() * 1600 - 800;
      mesh.position.y = 0;
      mesh.position.z = Math.random() * 1600 - 800;
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      scene.add( mesh );
    }
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
