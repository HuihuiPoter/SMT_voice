<template>
    <div id="div_select" align="center">
        <!-- 按钮 -->
        <img id="img_back" src="../assets/select_lesson/back.png" alt="">
        <!-- 板块 -->
        <img class="lesson" id="img_lesson1" ref="lesson1" src="../assets/select_lesson/lesson1.png" alt="" @click="selectLesson1">
        <img class="lesson" id="img_lesson2" ref="lesson2" src="../assets/select_lesson/lesson2.png" alt="" @click="selectLesson2">
        <img class="lesson" id="img_lesson3" ref="lesson3" src="../assets/select_lesson/lesson3.png" alt="" @click="selectLesson3">
        <img class="lesson" id="img_lesson4" ref="lesson4" src="../assets/select_lesson/lesson4.png" alt="" @click="selectLesson4">
        <img class="lesson" id="img_lesson5" ref="lesson5" src="../assets/select_lesson/lesson5.png" alt="" @click="selectLesson5">
        <img class="lesson" id="img_lesson6" ref="lesson6" src="../assets/select_lesson/lesson6.png" alt="" @click="selectLesson6">
        <!-- 按钮 -->
        <img id="img_enter" src="../assets/select_lesson/enter.png" alt="" @click="enter">
    </div>
</template>

<script>
export default {
    name: 'SelectLesson',
    methods: {
        selectLesson1() {
            this.$refs.lesson1.border = 1
            this.$refs.lesson2.border = 0
            this.$refs.lesson3.border = 0
            this.$refs.lesson4.border = 0
            this.$refs.lesson5.border = 0
            this.$refs.lesson6.border = 0
        },
        selectLesson2() {
            this.$refs.lesson1.border = 0
            this.$refs.lesson2.border = 1
            this.$refs.lesson3.border = 0
            this.$refs.lesson4.border = 0
            this.$refs.lesson5.border = 0
            this.$refs.lesson6.border = 0
        },
        selectLesson3() {
            this.$refs.lesson1.border = 0
            this.$refs.lesson2.border = 0
            this.$refs.lesson3.border = 1
            this.$refs.lesson4.border = 0
            this.$refs.lesson5.border = 0
            this.$refs.lesson6.border = 0
        },
        selectLesson4() {
            this.$refs.lesson1.border = 0
            this.$refs.lesson2.border = 0
            this.$refs.lesson3.border = 0
            this.$refs.lesson4.border = 1
            this.$refs.lesson5.border = 0
            this.$refs.lesson6.border = 0
        },
        selectLesson5() {
            this.$refs.lesson1.border = 0
            this.$refs.lesson2.border = 0
            this.$refs.lesson3.border = 0
            this.$refs.lesson4.border = 0
            this.$refs.lesson5.border = 1
            this.$refs.lesson6.border = 0
        },
        selectLesson6() {
            this.$refs.lesson1.border = 0
            this.$refs.lesson2.border = 0
            this.$refs.lesson3.border = 0
            this.$refs.lesson4.border = 0
            this.$refs.lesson5.border = 0
            this.$refs.lesson6.border = 1
        },
        enter() {
            this.$emit('nextStep', 1)
        }
    }
}
</script>

<style>
    #div_select{
        background-color: #FFFBE8;
        height: 44vw;
        width: 100vw;
    }
    #img_back{
        position: absolute;
        right: 85%;
        top: 6%;
        width: 12%;
        height: auto;
        cursor: pointer;
    }
    .lesson{
        width: 15%;
        height: auto;
        cursor: pointer;
    }
    #img_lesson1{
        position: absolute;
        top: 35%;
        left: 5%;
    }
    #img_lesson2{
        position: absolute;
        top: 35%;
        left: 20%;
    }
    #img_lesson3{
        position: absolute;
        top: 35%;
        left: 35%;
    }
    #img_lesson4{
        position: absolute;
        top: 35%;
        left: 50%;
    }
    #img_lesson5{
        position: absolute;
        top: 35%;
        left: 65%;
    }
    #img_lesson6{
        position: absolute;
        top: 35%;
        left: 80%;
    }
    #img_enter{
        position: absolute;
        z-index: 1;
        top: 70%;
        right: 40%;
        width: 20%;
        height: auto;
        cursor: pointer;
    }
</style>