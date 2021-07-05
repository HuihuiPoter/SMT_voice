<template>
    <div id="main_div">
        <!-- <Head></Head> -->
        <!-- <Navbar></Navbar> -->
        <router-view></router-view>
    </div>
</template>

<script>
// import Navbar from "./Navbar"
//import Head from "./Head"

export default {
    name: 'Main',
    components: {
        // Navbar,
        //Head
    }
}
</script>

<style>
    #main_div{
        height: 100%;
        width: 100%;
    }
</style>