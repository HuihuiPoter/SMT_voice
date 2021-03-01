<template>
  <div id="app">
    <router-view></router-view>
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
  html, body{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    body{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
    }
</style>
