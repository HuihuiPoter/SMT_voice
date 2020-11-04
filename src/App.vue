<template>
  <div id="app">
    <login v-if="$store.state.loginState"></login>
    <div v-else>
      <Head></Head>
      <Navbar></Navbar>
    </div>   
  </div>
</template>

<script>
import Head from "./components/Head"
import Navbar from "./components/Navbar"
import login from './components/Login/login'

export default {
  name: 'App',
  components: {
    Head,
    Navbar,
    login
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
