<template>
    <div id="div_login" :style="{transform: bgratio}">
        <!-- <loginUI/> -->
        <loginInput/>      
    </div>
</template>

<script>
// import loginUI from './loginUI'
import loginInput from './loginInput'
 
export default {
    name: 'login',
    components: {
        loginInput,
        // loginUI
    },
    data() {
        return {
            bgWidth: 1920,
            bgHeight: 1080,
            bgratio: "scale(1)"
        }
    },
    mounted: function() {
        this.bgratio = "scale(" + window.innerWidth / this.bgWidth + ")"
        window.onresize = () => {
            this.bgratio = "scale(" + window.innerWidth / this.bgWidth + ")"
        }
    },
}
</script>

<style>
#div_login{
    width: 1920px;
    height: 900px;
    transform-origin: left top;
    background-image: url(../../assets/course/background.png);
    background-size: 100%;
}
</style>