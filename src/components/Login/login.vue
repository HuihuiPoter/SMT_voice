<template>
    <div>
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