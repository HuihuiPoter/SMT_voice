<!--
 * @Author: your name
 * @Date: 2021-04-23 14:29:29
 * @LastEditTime: 2021-09-29 20:07:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SMT_voice\src\components\Course.vue
-->
<template>
    <div id="course_container" :style="{width: bgWidth + 'px', height: bgHeight + 'px'}">
        <div class="div_c_back">
            <img class="img_back" src="../assets/select_lesson/back.png" alt="" @click="back">
        </div>
        
        <div id="div_course" align="center">
            <img class="shape" src="../assets/course/speaking.png" alt="" @click="toSpeaking">
            <img class="shape" src="../assets/course/reading.png" alt="" @click="toReading">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Course',
    data() {
        return {
            course_type: {
                speaking: 0,
                reading: 1,  
            },
            bgWidth: 1080,
            bgHeight: 720
        }
    },
    mounted: function() {
        // 首次加载时,需要调用一次
        this.bgWidth = window.innerWidth;
        this.setSize();
        // 窗口大小发生改变时,调用一次
        window.onresize = () => {
            this.bgWidth = window.innerWidth
            this.setSize();
        }
    },
    methods: {
        setSize(){
            // 通过浏览器宽度(图片宽度)计算高度
            this.bgHeight = 4501 / 8001 * this.bgWidth
        },
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
        background-image: url(../assets/course/background.png);
        background-size: 100%;
    }
    .div_c_back{
        position: relative;
        margin: 6%;
    }
    .img_back{ 
        width: 5%;
        height: auto;
        cursor: pointer;
    }
    #div_course{
        width: 100%;
        position: relative;
        /* top: calc(50% - 400px); */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .shape{
        margin: 0 4%;
        width: 25%;
        cursor: pointer;
    }
</style>