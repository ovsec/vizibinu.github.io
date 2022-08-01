<script>
  import P5 from "p5-svelte";
  export let population;

  let width = 55;
  let height = 55;
  let x, y;
  let max, min;
  let wait;
  function sleep(millisecondsDuration) {
    return new Promise((resolve) => {
      setTimeout(resolve, millisecondsDuration);
    });
  }
  async function doAsyncAwaitThings(p5) {
    p5.background(0, 0, 0);
    p5.describe("canvas with yellow background");
    p5.stroke(0);
    p5.fill(0, 255, 0);
    for (let y = 2000; y < 2022; y++) {
      let d = population[y].countries;
      //console.log(population[y].countries);
      let px = p5.map(y, 2000, 2022, 0, p5.width);
      

      p5.text(y, px, p5.height);
      let entries = Object.keys(d).filter(i => i !== 'SE')
      for (let i = 0; i < entries.length - 1; i++) {
        let c = entries[i]

        let py = p5.map(d[c], 0, population[y].totalForeign, 0, p5.height - 10);
        
        //console.log(country_data)  
        p5.stroke(0, 255, 0);
        
        p5.fill((p5.random(0,1))*255, 0, (p5.random(0,1))*255);
        
        let r = Math.min(p5.height, p5.width) - 50
        let angle = p5.map(d[c], 0, population[y].totalForeign, 0, 2*p5.PI) 
        if(c === 'FI' )
          console.log(c, angle, angle/(p5.PI * 2) * 100+ '%')
        p5.noStroke()
        p5.arc(0, 0, r, r, 0, angle , p5.PIE);
        p5.textSize(24);
        
        p5.rotate(-p5.PI /2 + angle/2)
        p5.fill(0, 0, 0)
        p5.text(c, 0, r/3)
        p5.rotate(p5.PI /2 - angle/2)

        p5.fill(0, 0, 0)
        p5.ellipse(0, 0, r/2, r/2)
        p5.fill(0, 256, 0)
        p5.text(y, 0, 0)
        p5.rotate(angle)
        await sleep(20);
        //p5.background(0, 0, 0);
      }
      
      if(y !== 2021)
        p5.background(0, 0, 0);
      //await sleep(500);
    }
  }
  
  async function vizi(p5) {
    p5.background(0, 0, 0);
    p5.describe("canvas with yellow background");
    p5.stroke(0);
    p5.fill(0, 255, 0);
    for (let y = 2000; y < 2022; y++) {
      let d = population[y].countries;
      //console.log(population[y].countries);
      let px = p5.map(y, 2000, 2022, 0, p5.width);
      

      p5.text(y, px, p5.height);
      let entries = Object.keys(d).filter(i => i !== 'SE')
      
      //p5.translate(0, p5.height/2)
      p5.stroke("#000") 
      p5.fill('#CE48');
      
      let fy = p5.map(population[y].totalForeign, 0, population[y].total, 0, p5.height)
      p5.rect(2 * p5.width/3, p5.height/2-fy/2, 20, fy)
      p5.text("YEAR " + y, 2 * p5.width/3 + 100, p5.height/2)
      //p5.translate(0, -p5.height/2)
      let y_start = 0;
      for (let i = 0; i < entries.length - 1; i++) {
        let c = entries[i]

        let py = p5.map(d[c], 0, population[y].totalForeign, 0, p5.height);
        
        //console.log(country_data) 
        p5.stroke("#000") 
        let c1 = p5.random(0,255);
        let c2 = p5.random(0,255);
        let c3 = p5.random(0,255);
        p5.fill(c1, c2, c3);
        p5.rect(p5.width/5, y_start, 100, py)
        p5.text(c, p5.width/6, y_start + py/2)
        p5.stroke(c1, c2, c3);
        
        //p5.stroke('#CE1348') 
        
        joinLines(p5.width/3 + 20, y_start, py, 2*p5.width/3, p5.height/2 , fy,p5)
        y_start = y_start + py
        await sleep(20);
        //p5.background(0, 0, 0);
      }
      //p5.translate(0, -p5.height+10)
      if(y !== 2021)
        p5.background(0, 0, 0);
      //await sleep(500);
    }
  }
  const joinLines = async (x1, y1, h1, x2, y2, h2, p5) =>{
    let pts = []
    
    p5.noFill()
    
    for(let i = 0; i< h1; i++){
      p5.beginShape();
      p5.vertex(x1, p5.lerp(y1,y1+h1, i/h1));
      //let last_y = p5.map(p5.lerp(y1,y1+h1, i/h1), 0, h1, 0, h2) - h2/2;// 
      let last_y = p5.lerp(y2,y2+h2, i/h1) - h2/2
      p5.bezierVertex(p5.lerp(x1,x2, 0.3), p5.height/2, p5.lerp(x1,x2, 0.7), p5.height/2, x2, last_y);
      p5.endShape();
    }
  
      
    
    

  }
  const sketch = (p5) => {
    p5.setup = () => {
      p5.smooth()
      p5.createCanvas(width, height, p5.WEBGL);
      //p5.createCanvas(p5.width, p5.height);
      x = p5.width / 2;
      y = p5.height;
      //p5.translate(p5.width/2, p5.height/2);
      //doAsyncAwaitThings(p5);
      //p5.background(10,10)
      p5.translate(-p5.width/2,-p5.height/2,0);
      vizi(p5)
      let f = p5.frameRate()
    };

    
    p5.windowResized = () => {
      console.log({ width, height });
      p5.resizeCanvas(width, height);
    };
  };
</script>

<div bind:clientWidth={width} bind:clientHeight={height} class="h-full w-full">
  {#if !!population}
    <P5 {sketch} />
  {:else}
    <span>Loading...</span>
  {/if}
</div>
