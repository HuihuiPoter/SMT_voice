<!--
 * @Author: your name
 * @Date: 2021-03-01 16:09:47
 * @LastEditTime: 2021-09-30 15:55:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SMT_voice\src\App.vue
-->
<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    
    <!-- <Waves></Waves> -->
  </div>
</template>

<script>
//import Wavss from './components/waves'

export default {
  name: 'App',
  components: {
    //Wavss
  }
}
</script>

<style>
html{
  font-size: 62.5%;
  font-family: "Century Gothic";
}
  html, body{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    body{
        /* display: flex;  
        align-items: center;
        justify-content: center; */
    }
    #app{
      /* height: 100%;
      width: 100%; */
      display: flex;  
        align-items: center;
        justify-content: center;
    }

    .slide-fade{
  position: fixed;left:0;right: 0;
  width: 100%;
  background-color: white;
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;top: 0;right: 0;
  position: absolute;
  transform:translateX(-500px) translateY(-500px) rotate(-150deg) scale(0.5);
  -webkit-transform: translateX(-500px) translateY(-500px) rotate(-150deg) scale(0.5);
  opacity:1;
}
.slide-fade-enter-active {
  background-color: white;
  transition: all 0.6s ease;
  -webkit-transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.7s ease;
  background-color: white;
  transform:translateX(500px) translateY(500px) rotate(150deg) scale(1);
  -webkit-transform:translateX(500px) translateY(500px) rotate(150deg) scale(1);
  z-index: 100;
}
</style>
