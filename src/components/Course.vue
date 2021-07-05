<template>
    <div id="course_container" align="center">
        <img id="img_back" src="../assets/select_lesson/back.png" alt="" @click="back">
        <div id="div_img">
            <img class="shape" src="../assets/course/speaking.png" alt="" @click="toSpeaking">
            <img class="shape" src="../assets/course/reading.png" alt="" @click="toReading">
        </div>
        
        <img id="img_bg" src="../assets/course/background.png" alt="">
    </div>
</template>

<script>
export default {
    name: 'Course',
    data() {
        return {
            course_type: {
                speaking: 0,
                reading: 1
            }
        }
    },
    methods: {
        back() {
            window.location.href = 'https://www.smartreelearners.com/'
        },
        toSpeaking() {
            this.$store.commit('courseType', {
                course_type: this.course_type.speaking,
            })
            this.$router.replace({
                path: '/main/evaluate',
                })
        },
        toReading() {
            this.$store.commit('courseType', {
                course_type: this.course_type.reading,
            })
            this.$router.replace({
                path: '/main/evaluate'
                })
        }
    }
}
</script>

<style>
    #course_container{
        position: absolute;
        width: 100%;
        /* height: 100%; */
        display: flex;  
        align-items: center;
        justify-content: center;
    }
    #img_bg{
        max-width: 100%;
    }
    #img_back{
        position: inherit;
        z-index: 1;
        width: 4%;
        top: 10%;
        left: 5%;
        height: auto;
        cursor: pointer;
    }
    #div_img{
        position: inherit;
        z-index: 1;
    }
    .shape{
        margin: 0 4% 0 4%;
        width: 30%;
        cursor: pointer;
    }
</style>