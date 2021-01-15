<template>
    <div>
        <canvas id="myCanvas"></canvas>     
    </div>
</template>

<script>

export default {
    name: 'Countdown',
    data() {
        return {
            c: null,
            ctx: null,
            mW: 0,
            mH: 0,
            lineWidth: 0,
            r: 0,
            cR: 0,
            startAngle: 0,
            endAngle: 0,
            xAngle: 0,
            fontSize: 0,
            tmpAngle: 0,
            counter: 3
        }
    },
    mounted() {
        this.dec()
        this.set()
        this.drawCircle()
    },
    methods: {
        set() {
        this.c = document.getElementById('myCanvas');
        this.ctx = this.c.getContext('2d');

        this.mW = this.c.width = 200;
        this.mH = this.c.height =200;
        this.lineWidth = 5;
        this.r = this.mW / 2; //中间位置
        this.cR = this.r - 4 * this.lineWidth; //圆半径
        this.startAngle = -(1 / 2 * Math.PI); //开始角度
        this.endAngle = this.startAngle + 2 * Math.PI; //结束角度
        this.xAngle = 2 * Math.PI / 180; //偏移角度量
        this.fontSize = 40; //字号大小
        this.tmpAngle = this.startAngle; //临时角度变量
        },
        dec() {
            if (this.counter == 0){
                setTimeout(() => {
                    console.log('倒计时结束')                 
                }, 1000)
                return 
            }      
            setTimeout (() => {
                this.counter--
                this.dec()
            }, 1000)
        },
        drawCircle() {
            
            if(this.tmpAngle >= this.endAngle){
                return;
            }else if(this.tmpAngle + this.xAngle > this.endAngle){
                this.tmpAngle = this.endAngle;
            }else{
                this.tmpAngle += this.xAngle;
            }
            this.ctx.clearRect(0, 0, this.mW, this.mH);

            //画圈
            this.ctx.beginPath();
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.strokeStyle = this.$store.state.base_color;
            this.ctx.arc(this.r, this.r, this.cR, this.startAngle, this.tmpAngle);
            this.ctx.stroke();
            this.ctx.closePath();
            //写字
            this.ctx.fillStyle = this.$store.state.base_color;
            this.ctx.font= this.fontSize + 'px Microsoft Yahei';
            this.ctx.textAlign='center';
            let text = this.counter
            if (this.tmpAngle >= this.endAngle) //及时绘制数字
                text = 'ready'
            this.ctx.fillText(text, this.r, this.r + this.fontSize / 2);
            requestAnimationFrame(this.drawCircle);
        }
    }
}
</script>

<style>
</style>