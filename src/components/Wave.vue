<template>
    <div>
        <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>
    </div>
</template>

<script>
export default {
    name: 'Wave',
    data() {
        return {
            r: 20,
            o_r: 20,
            opacity: 1.0
        }
    },
    mounted(){
        this.rander()
    },
    methods: {
        draw(r, color) {
            let canvas=document.getElementById('myCanvas');
            let ctx=canvas.getContext('2d');
            ctx.clearRect(0,0,canvas.width,canvas.height)
            //中心圆
            ctx.fillStyle = 'rgba(10, 194, 126, 1)';
            ctx.beginPath()
            ctx.arc(95,50,15,0,2*Math.PI);
            ctx.stroke()
            ctx.strokeStyle = 'rgba(10, 194, 126, 1)'
            ctx.fill()
            ctx.fillStyle = color;
            ctx.beginPath()
            ctx.arc(95,50,r,0,2*Math.PI);
            ctx.stroke()
            ctx.strokeStyle = color
            ctx.fill()
        },
        rander() {
            console.log('drawing')
            this.draw(this.r, 'rgba(10, 194, 126, ' + this.opacity + ')')
            this.r += 0.4
            if (this.r - this.o_r >= 2){
                this.opacity -= 0.06
                this.o_r = this.r
                }       
            if (this.r > 50){
                this.r = 20
                this.o_r = this.r
                this.opacity = 1
            }
            requestAnimationFrame(this.rander)
        }
    }
}
</script>