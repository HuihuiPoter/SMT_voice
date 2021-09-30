<!--
 * @Author: your name
 * @Date: 2021-03-01 16:09:47
 * @LastEditTime: 2021-09-29 22:05:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SMT_voice\src\components\Main.vue
-->
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
    }
</style>