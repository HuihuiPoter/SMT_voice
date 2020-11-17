<template>
    <div id="div_login">
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
}
</script>

<style>
#div_login{
    background: url(../../assets/sky.jpg);
  /* background-position: left top; */
  /* background-size:100%; */
  background-size: cover;
  padding: 25%;
}
</style>