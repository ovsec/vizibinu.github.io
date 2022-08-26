
<script>
    import { onMount } from 'svelte';
    console.log("Hellp Particles")

    

	let canvas;
    let ctx ;
    let particles = []
    let hue = 0;
    let frame;
    class Particle {
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = 'hsl('+Math.random()*360 +', 20%, 20%)'
        }
        update(){
            
            this.x += this.speedX;
            this.y += this.speedY;
            if(this.size > 0.2 )
             this.size -=  0.01
        }
        draw () {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI *2)
            ctx.fill();
        }
    }
    function init(){
        for(let i = 0; i< 100; i++){
            particles.push(new Particle())
        }
    }
    function handleParticles (){
        
        particles.forEach(p => {
            p.update();
            p.draw()
        });
        if(particles.length < 10)
            init()
    }
     function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        handleParticles()
        hue += 2;
        frame = requestAnimationFrame(animate)
     }
	onMount(() => {
		ctx = canvas.getContext('2d');
        
        init()
        animate()
        
        //let frame = requestAnimationFrame(handleParticles);

        return () => {
			if(frame)
                cancelAnimationFrame(frame);
		};
    })

    function loop(){
        console.log("Hi")
    }

</script>

<canvas bind:this={canvas} id="my-p" class="fixed -z-50 w-full h-full top-0 bottom-0 left-0 right-0"></canvas>