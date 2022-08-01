import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


let w, h;
let d = [];

const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  //const canvas = document.querySelector('#scene1');
  
  //console.log("canvas", canvas  )

  const fov = 60;
  const aspect = w/h;  // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 50;

  




scene.add(new THREE.GridHelper(6, 3, 0x000040, 0x000040));
// let vec1 = new THREE.Vector3(20, 0, 0);
// let vec2 = new THREE.Vector3(0, 40, 0);

// let size = new THREE.Vector3().subVectors(vec2, vec1);
// let center = new THREE.Vector3().addVectors(vec1, vec2).multiplyScalar(0.5);

// let planeWidth = Math.abs(size.x);
// let planeHeight = Math.abs(size.y);
// let planeGeom = new THREE.PlaneBufferGeometry(planeWidth, planeHeight, planeWidth, planeHeight);
// let planeMat = new THREE.MeshBasicMaterial({color: "aqua", wireframe: true});
// let plane = new THREE.Mesh(planeGeom, planeMat);
// plane.position.copy(center);
// scene.add(plane);

let centerCube = createCube();
centerCube.position.set(0,0,0)
scene.add(centerCube);


var ambientLight = new THREE.AmbientLight(0xfff);
scene.add(ambientLight);

var spotLight = new THREE.SpotLight( 0xffffff );
scene.add( spotLight );

let renderer;

camera.position.set(0, 5, 5);

const animate = () => {
  requestAnimationFrame(animate);
  addCubesFromData(d, scene)
  //plane.rotation.y += 0.01  
  renderer.render(scene, camera);
};

const resize = (w, h) => {
  renderer.setSize(w, h)
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};

export const createScene = (el, w, h, data) => {
  d = data;
  //canvas = el;
  //console.log(data)
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  const controls = new OrbitControls(camera, el);
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.minDistance = 1.2;
  controls.maxDistance = 4;
  controls.autoRotate = true;
  controls.update();
  resize(w, h);
  animate();
}

window.addEventListener('resize', resize);

function calcPosFromLatLonRad(lat,lon,radius){
  
  var phi   = (90-lat)*(Math.PI/180);
  var theta = (lon+180)*(Math.PI/180);

  let x = -(radius * Math.sin(phi)*Math.cos(theta));
  let z = (radius * Math.sin(phi)*Math.sin(theta));
  let y = (radius * Math.cos(phi));

  return [x,y,z];

}

function createCube(){
  var geometry	= new THREE.CylinderGeometry( 0.001, 0.01, 1, 32 );; //new THREE.SphereGeometry(0.025, 20, 20)
	var material	= new THREE.MeshBasicMaterial({
		color: new THREE.Color('red')
	})
	var mesh	= new THREE.Mesh(geometry, material)
  return mesh;
}

function addCubesFromData(data, scene){
  let group = new THREE.Group();
  var geometry	= new THREE.CylinderGeometry( 0.0001, 0.001, 0.1, 32 );; //new THREE.SphereGeometry(0.025, 20, 20)
	var material	= new THREE.MeshBasicMaterial({
		color: new THREE.Color('white')
	})
  let cubes = new THREE.InstancedMesh( geometry, material, data.length );
  /* data.forEach(datum => {
    let c = createCube()
    let latlonpoint = calcPosFromLatLonRad(datum.vehicle.position.latitude, datum.vehicle.position.longitude, 3)
    console.log(latlonpoint)
    
    c.position.copy(new THREE.Vector3(latlonpoint[0],0,latlonpoint[2]));
    group.add(c);
  }) */
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  
  const color = new THREE.Color();
				const blossomPalette = [ 0xF20587, 0xF2D479, 0xF2C879, 0xF2B077, 0xF24405 ];
  for ( let i = 0; i < data.length; i ++ ) {

    let latlonpoint = calcPosFromLatLonRad(data[i].vehicle.position.latitude, data[i].vehicle.position.longitude, 3)
    randomizeMatrix( matrix , latlonpoint[0],latlonpoint[1],latlonpoint[2]);
    console.log(latlonpoint)
    //matrix.compose(new THREE.Vector3(latlonpoint[0],0,latlonpoint[2]))
    color.setHex( blossomPalette[ Math.floor( Math.random() * blossomPalette.length ) ] );
    cubes.setColorAt(i, color)
    cubes.setMatrixAt( i, matrix.makeScale(100,100,100) );

  }
  scene.add(cubes)
}

const randomizeMatrix = function () {

  const position = new THREE.Vector3();
  const rotation = new THREE.Euler();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();

  return function ( matrix, x, y, z ) {

    position.x = x;
    position.y = y;
    position.z = z;

    rotation.x = Math.random() * 2 * Math.PI;
    rotation.y = Math.random() * 2 * Math.PI;
    rotation.z = Math.random() * 2 * Math.PI;

    quaternion.setFromEuler( rotation );

    scale.x = scale.y = scale.z = Math.random() * 1;

    matrix.compose( position, quaternion, scale );

  };

}();