<template>
    <div>
        <canvas id="myCanvas" width="600" height="300" style="border:0px solid #000000;"></canvas>
    </div>
</template>

<script>
export default {
    name: 'Wave',
    data() {
        return {
            r: 50,
            o_r: 50,
            opacity: 1.0,
            end: false
        }
    },
    mounted(){
        this.rander()
    },
    beforeDestroy() {
        this.end = true
    },
    methods: {
        draw(r, color) {
            let canvas=document.getElementById('myCanvas');
            let ctx=canvas.getContext('2d');
            ctx.clearRect(0,0,canvas.width,canvas.height)
            //中心圆
            ctx.fillStyle = 'rgba(10, 194, 126, 1)';
            ctx.beginPath()
            ctx.arc(280,150,35,0,2*Math.PI);
            ctx.stroke()
            ctx.strokeStyle = 'rgba(10, 194, 126, 0)'
            ctx.fill()
            ctx.fillStyle = color;
            ctx.beginPath()
            ctx.arc(280,150,r,0,2*Math.PI);
            ctx.stroke()
            ctx.strokeStyle = color
            ctx.fill()
        },
        rander() {
            if (this.end)
                return
            console.log('drawing')
            this.draw(this.r, 'rgba(10, 194, 126, ' + this.opacity + ')')
            this.r += 0.6
            if (this.r - this.o_r >= 2){
                this.opacity -= 0.04
                this.o_r = this.r
                }       
            if (this.r > 100){
                this.r = 50
                this.o_r = this.r
                this.opacity = 1
            }
            requestAnimationFrame(this.rander)
        }
    }
}
</script>