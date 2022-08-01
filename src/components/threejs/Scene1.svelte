
<script>
    
    import { onMount } from 'svelte';
    import Pbf from 'pbf';
    import { createScene } from "./scene1";
    //export let data;
    let el, w, h;
    let data;
    onMount(async () => {
        await protobufUpdate();
        createScene(el, w, h, data)
    });

        
        const operator = 'sl';
        const apiKey = 'a937a2cbe88341048c7e4268cc25ad43';

        const protobufUpdate = async () => {
            // This is a reverse proxy to 
            // https://www.metrostlouis.org/RealTimeData/StlRealTimeVehicles.pb
            const url =
                `https://opendata.samtrafiken.se/gtfs-rt/${operator}/VehiclePositions.pb?key=${apiKey}`;
            let response = await fetch(url);

            if (response.ok) {
                // if HTTP-status is 200-299
                // get the response body (the method explained below)
                const bufferRes = await response.arrayBuffer();
                const pbf = new Pbf(new Uint8Array(bufferRes));
                const obj = FeedMessage.read(pbf);
                console.log(obj.entity)
                


                data = obj.entity;
            } else {
                console.error("error:", response.status);
            }
        };

</script>
  <svelte:head>
    <script is:inline src="/gtfs-realtime.browser.proto.js"></script>
  </svelte:head>
  <canvas id="scene1" class="h-full w-full" bind:this={el} bind:clientWidth={w} bind:clientHeight={h}></canvas>