<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
// import DevicePixelRatio from './devicePixelRatio'
export default {
  name: 'App',
  components: {
  },
  created() {
    // new DevicePixelRatio().init()
  },
  mounted() {
    // window.onresize = () => {
    //   return (() => {
    //     this.detectZoom()
    //   })()
    // };
  },
  methods: {
    detectZoom (){ 
      var ratio = 0,
      screen = window.screen,
      ua = navigator.userAgent.toLowerCase();
      if (window.devicePixelRatio !== undefined) {
          ratio = window.devicePixelRatio;
      }
      else if (~ua.indexOf('msie')) {  
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
      }
      else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
      }
      
      if (ratio){
        ratio = Math.round(ratio * 100);
      }
      //ratio就是获取到的百分比
      // console.log(ratio)
      this.onresize_height = ratio
      // return ratio;
    },
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
</style>
