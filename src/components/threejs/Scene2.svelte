<script>
  import {
    CircleBufferGeometry,
    MeshStandardMaterial,
    BoxBufferGeometry,
    DoubleSide,
    Color,
    LineBasicMaterial,
    TextureLoader,
    MeshLambertMaterial,
    Vector3,
    MeshPhongMaterial,
    ExtrudeBufferGeometry,
    Shape,
    GridHelper
  } from "three";
  import * as THREE from 'three';
  import {
  MapControls
} from 'three/examples/jsm/controls/OrbitControls.js'
  import sweden from './swedish_municipalities.json'
  import { DEG2RAD } from "three/src/math/MathUtils";
  import {
    AmbientLight,
    Canvas,
    DirectionalLight,
    Group,
    HemisphereLight,
    Instance,
    InstancedMesh,
    Line,
    Mesh,
    OrbitControls,
    PerspectiveCamera,
    MeshInstance,
    useThrelte,
useFrame,
Object3DInstance
  } from "@threlte/core";
  import { spring } from "svelte/motion";
  import { onMount, onDestroy } from "svelte";
  import Pbf from "pbf";
  import * as geolib from 'geolib';
  
  const scale = spring(1);
  const operator = "sl";
  const apiKey = "a937a2cbe88341048c7e4268cc25ad43";
  let data = [];
  let w, h;
  
  let swedenMesh = new THREE.Group();
  let MAT_BUILDING = new MeshPhongMaterial()
    const center = [ 18.015762154247675, 59.34563479435046] // stockholm- lon lat
    var texture = new TextureLoader().load( '/se-02.png' );
  const getRandomColor = () => {
    return new Color(0xf20587).lerpColors(
      new Color(0xf20587),
      new Color(0xf2d479),
      Math.random()
    );
  };
  //console.log(sweden.geometry.coordinates)
  const geometry = new BoxBufferGeometry(0.01, 0.05, 0.01);
  const material = new MeshStandardMaterial({ color: new Color(0xf20587) });
  
  
  const gridHelper = new GridHelper( 10, 10, new THREE.Color(0x555555), new THREE.Color(0x333333))
  const {camera, scene, renderer } = useThrelte()
  /* let controls = new MapControls($camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.screenSpacePanning = false
  controls.maxDistance = 800 */

  
  scene.add(gridHelper)
  onDestroy(() => {
    scene.remove(gridHelper)
  })


  onMount(async () => {
    //swedenMesh= []
    $camera.updateProjectionMatrix()  
    
    //scene.add(swedenMesh)
    LoadMunicipalities(sweden)
    let r = await protobufUpdate()
    data.push([...r])
    data = data;
    console.log({data})
  });

  

  const protobufUpdate = async () => {
    // This is a reverse proxy to
    // https://www.metrostlouis.org/RealTimeData/StlRealTimeVehicles.pb
    const url = `https://opendata.samtrafiken.se/gtfs-rt/${operator}/VehiclePositions.pb?key=${apiKey}`;
    let response = await fetch(url);

    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      const bufferRes = await response.arrayBuffer();
      const pbf = new Pbf(new Uint8Array(bufferRes));
      const obj = FeedMessage.read(pbf);
      
      let res =   obj.entity.map(e => [ e.vehicle.position.longitude, e.vehicle.position.latitude])
      
      console.log("Relative point", res.map(i => GPSRelativePosition(i, center)));
      return res.map(i => GPSRelativePosition(i, center) )
      return res;
    } else {
      console.error("error:", response.status);
    }
  };

function LoadMunicipalities(data) {

let features = data.features

for (let i = 0; i < features.length; i++) {
    
  let fel = features[i]
  if (!fel['properties']) return

  if (fel.properties['kom_namn'] && fel.geometry.type === 'Polygon') {
    addBuilding(fel.geometry.coordinates,  1)
  }
   if (fel.properties['kom_namn'] && fel.geometry.type === 'MultiPolygon') {
    fel.geometry.coordinates.forEach(coords => addBuilding(coords, 1));
  } 
}
}

  

function addBuilding(data, height = 1) {

height = height ? height : 1

for (let i = 0; i < data.length; i++) {
  let el = data[i]

  let shape = genShape(el, center)
  let geometry = genGeometry(shape, {
    curveSegments: 1,
    depth: 0.05 * height,
    bevelEnabled: false
  })

   
  let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial( {
        color: getRandomColor()
    } ))
  swedenMesh.add(mesh)
}


}
  function genShape(points, center) {
  let shape = new Shape()

  for (let i = 0; i < points.length; i++) {
    let elp = points[i]
    elp = GPSRelativePosition(elp, center)

    if (i == 0) {
      shape.moveTo(elp[0], elp[1])
    } else {
      shape.lineTo(elp[0], elp[1])
    }
  }

  return shape
}
  function genGeometry(shape, settings) {
  let geometry = new ExtrudeBufferGeometry(shape, settings)
  geometry.computeBoundingBox()

  return geometry
}

  function GPSRelativePosition(objPosi, centerPosi) {

// Get GPS distance
let dis = geolib.getDistance(objPosi, centerPosi)

// Get bearing angle
let bearing = geolib.getRhumbLineBearing(objPosi, centerPosi)

// Calculate X by centerPosi.x + distance * cos(rad)
let x = centerPosi[0] + (dis * Math.cos(bearing * Math.PI / 180))

// Calculate Y by centerPosi.y + distance * sin(rad)
let y = centerPosi[1] + (dis * Math.sin(bearing * Math.PI / 180))

// Reverse X (it work) 
//console.log(-x / 100000, y / 100000)
return [-x / 100000, y / 100000]
}
/**
         * Webmercator projection.
         * Since D === MAP_SIZE this function already returns pixel coordinates in the canvas.
         */
         function project([lon, lat]) {
            
            const MAP_SIZE = Math.min(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
        // Set the projection Radius, force the diameter to be equal to map size.
        const R = MAP_SIZE / (2 * Math.PI);
        // Diameter of the globe
        const D = R * 2 * Math.PI;
            const sinlat = Math.sin(lat * Math.PI / 180.0);

            const x = D * lon / 360.0;
            const y = R / 2 * Math.log((1 + sinlat) / (1 - sinlat));
            console.log([(D / 2 + x), (D - (D / 2 + y)) ])
            return [(D / 2 + x)/10, (D - (D / 2 + y))/10 ]
            //return { x: (D / 2 + x), y: (D - (D / 2 + y)) }
        }
</script>

<svelte:head>
  <script is:inline src="/gtfs-realtime.browser.proto.js"></script>
  
</svelte:head>
<div bind:clientWidth={w} bind:clientHeight={h}>

    <PerspectiveCamera
      position={{ x: 0, y: 2, z: 5 }}
      near={1}
      far={10000}
      fov={24}
      lookAt={{ x: 0, y: 0, z: 0 }}
    >
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.25}
        screenSpacePanning={false}
        maxDistance={800}
        touches={{ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_ROTATE}}
        mouseButtons={{LEFT: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE}}
      />
      
    </PerspectiveCamera>

    <DirectionalLight shadow position={{ x: 200, y: 90, z: 40 }} />
    <DirectionalLight position={{ x: 200, y: 90, z: -40}} intensity={0.2} />
    <AmbientLight intensity={0.2} />

    <!-- Cube -->
    
    
    {#if swedenMesh}
    <MeshInstance castShadow={true} receiveShadow={true}  mesh={swedenMesh} rotation={{x: -Math.PI/2, z : Math.PI/2}}  />
    {/if}
    
     <InstancedMesh id="vehicle" {geometry} {material} rotation={{y: Math.PI/2}} >
      {#if data?.length > 0}
        {#each data[0] as d}
          <Instance
            id="vehicle"
            position={{x: d[0],
            y: 0.05,
            z: d[1]}}
            
            color={getRandomColor()}
            
          />
        {/each}
      {/if}
    </InstancedMesh> 
    
    <!-- Floor -->
    <!-- <Mesh
      receiveShadow
      rotation={{ x: -90 * (Math.PI / 180) }}
      geometry={new CircleBufferGeometry(10, 72)}
      material={new MeshLambertMaterial({ color: "white",  opacity: 0.9})}
      
    />  -->
  
</div>

<style>
  div {
    height: 100%;
    width: 100%;
    background-color: aqua;
  }
</style>
