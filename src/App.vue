<template>
  <div id="app">
    <Head></Head>
    <Navbar></Navbar>
    <!-- <Show></Show> -->
    <!-- <Word></Word> -->
    
  </div>
</template>

<script>
import Head from "./components/Head"
import Navbar from "./components/Navbar"
// import Show from "./components/Show"
// import Word from './components/Word'


export default {
  name: 'App',
  //template: <Head/>,
  components: {
    Head,
    Navbar,
    // Word
    // Show
  }
}
</script>

<style>
body {
  background: url(./assets/img_flwr.gif), url(./assets/sky.jpg);
  background-position: right bottom, left top;
  background-repeat: no-repeat;
  padding: 10px;
  background-size:200px 150px, 100%;        
  }
</style>
