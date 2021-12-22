<!--
 * @Author: your name
 * @Date: 2021-04-23 14:29:29
 * @LastEditTime: 2021-11-08 17:57:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SMT_voice\src\components\Course.vue
-->
<template>
    <div class="slide_in" id="course_container" :style="{transform: bgratio}">
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
            bgWidth: 1920,
            bgHeight: 1080,
            bgratio: "scale(1)"
        }
    },
    mounted: function() {
        // 首次加载时,需要调用一次
        // 1920 * 927
        this.bgratio = "scale(" + window.innerWidth / this.bgWidth + ")"
        // this.setSize();
        // 窗口大小发生改变时,调用一次
        window.onresize = () => {
            // this.bgWidth = window.innerWidth
            // this.setSize();
            this.bgratio = "scale(" + window.innerWidth / this.bgWidth + ")"
        }
    },
    methods: {
        setSize(){
            // 通过浏览器宽度(图片宽度)计算高度
            this.bgHeight = 4501 / 8001 * this.bgWidth
            // let minus = this.bgHeight - window.innerHeight
            // if (minus > 0)
            //     this.bgHeight = this.bgHeight * (this.bgHeight - minus) / this.bgHeight
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
    .slide_in{
        animation: pulse;
        animation-duration: 1s;
    }
    #course_container{
        background-image: url(../assets/course/background.png);
        background-size: 100%;
        width: 1920px;
        height: 1080px;
        transform-origin: left top;
    }
    .div_c_back{
        position: relative;
        padding: 6%;
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
        width: 22%;
        cursor: pointer;
    }
</style>