<template>
    <div>
        <Head></Head>
        <Navbar></Navbar>
    </div>
</template>

<script>
import Navbar from "./Navbar"
import Head from "./Head"

export default {
    name: 'Main',
    components: {
        Navbar,
        Head
    }
}
</script>