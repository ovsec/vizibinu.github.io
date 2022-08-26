

<div  id="container" bind:clientHeight={h} bind:clientWidth={w} class="h-[600px] w-full  "> </div>
<svelte:head>
  <script src="https://unpkg.com/cube.gl@latest/dist/cubegl.js" defer></script>
</svelte:head>


<script>
    //import roads from './Stocholm_Highway.json'
    import { onMount } from "svelte";
    let u = "/stockholm_highway.json" //Stockholm roads
    let w, h;
    onMount(()=>{
        createScene()
        console.log(w, h)
    })

    async function  createScene(){
    // Get target container
    let nyc_road = await (await fetch(u)).json()
    console.log(nyc_road)
const container = document.getElementById('container')

// Init CUBE instance
const C = new CUBE.Space(container, {
    background: "333333", // Set Background Color
    center: {latitude: 31.230689, longitude: 121.473723}, // Set a geo location center
    scale: 0.002, // Set a map scale
    camera:{
        position: {x: 5, y: 5, z: 5} // Set camera default position
    }
})

const china =
  'https://gistcdn.githack.com/isjeffcom/787220f51465c8365b4ccc7247a919e7/raw/1afd3f92f64d8dd01534b6831d65de395f07b43e/china.geojson';
fetch(china).then(async (res) => {
  //console.log(await res.json());
  let d = await res.json()
  C.Add(
    new CUBE.GeoLayer('china', d).AdministrativeMap({
      border: true,
      height: 0.5,
    })
  );
  C.Add(new CUBE.GeoLayer("roads", d).Roads())
});


//C.Add(new CUBE.Data("second").Sphere({latitude: 18.060125, longitude: 59.2935089}, 1, 1, 0xFAFAFA))
// Animate scene every frame
Update()
function Update(){
    requestAnimationFrame(Update)
    C.Runtime()
}
}
</script>
