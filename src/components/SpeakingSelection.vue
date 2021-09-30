<template>
    <div class="div_select" align="center" :style="{width: bg_width + 'px', height: bg_height + 'px'}">
        <!-- 按钮 -->
        <img id="img_back" src="../assets/select_lesson/back.png" alt="" @click="back">
        <div id="div_level">等级/L{{level}}</div>
        <!-- 板块 -->
        <div id="div_title">{{title}}</div>
        <div id="div_lesson">
            <div v-for="(item, idx) in lessons" :key="idx" class="center"> 
                <img class="lesson" :src="item.lesson" :id="'lesson' + item.id" alt="" 
                @click="selectLesson" @mouseover="selectLesson" @mouseleave="selectLesson">
            </div>
            <!-- <img class="lesson" v-for="(item, idx) in lessons" :key="idx" :src="item.lesson" :id="'lesson' + item.id" alt="" 
            @click="selectLesson" @mouseover="selectLesson" @mouseleave="selectLesson"> -->
        </div>
        <div id="more_right" align="center" @click="nextGroup"
        @mouseover="setColor($event,'grey')" @mouseleave="setColor($event,'white')">
            <div id="right_top" ref="right_top"></div>
            <div id="right_bottom" ref="right_bottom"></div>
        </div>
        <div id="more_left" align="center" @click="prevGroup" 
        @mouseover="setColor($event,'grey')" @mouseleave="setColor($event,'white')">
            <div id="left_top" ref="left_top"></div>
            <div id="left_bottom" ref="left_bottom"></div>
        </div>
        <div id="div_theme">{{theme}}</div>
        <!-- 按钮 -->
        <img id="img_enter" src="../assets/select_lesson/enter.png" alt="" @click="enter">
        <!-- <img id="img_bg" src="../assets/select_lesson/select_board.jpg" alt=""> -->
    </div>
</template>

<script>

export default {
    name: 'SpeakingSelection',
    props: {
        bg_width: Number,
        bg_height: Number
    },
    data() {
        return {
            title: 'Speaking',
            lessons: [],
            theme: '',
            selected_theme: '',
            level: 1,
            lesson_type: 1, //speaking
            course_id: 0
        }
    },
    created: function() {
        this.setLessons(1, 11)
    },
    methods: {
        setLessons(start, end){
            this.lessons = []
            for (let i = start;i <= end;i++){
                let lesson = require('../assets/select_lesson/lesson' + i +'.png')
                this.lessons.push({
                    lesson: lesson,
                    id: i
                })
            }
        },
        selectLesson(obj) {
            switch(obj.currentTarget.id){
                case 'lesson1': this.theme = 'Greetings 1-1';break;
                case 'lesson2': this.theme = 'Greetings 1-2';break;
                case 'lesson3': this.theme = 'Body Parts 1-1';break;
                case 'lesson4': this.theme = 'Body Parts 1-2';break;
                case 'lesson5': this.theme = 'My Family Tree 1-1';break;
                case 'lesson6': this.theme = 'My Family Tree 1-2';break;
                case 'lesson7': this.theme = 'Numbers(1-10) 1-1';break;
                case 'lesson8': this.theme = 'Numbers(1-10) 1-2';break;
                case 'lesson9': this.theme = 'Colors 1-1';break;
                case 'lesson10': this.theme = 'Colors 1-2';break;
                case 'lesson11': this.theme = 'Food 1-1';break;
                case 'lesson12': this.theme = 'Food 1-2';break;
                case 'lesson13': this.theme = 'Animals 1-1';break;
                case 'lesson14': this.theme = 'Animals 1-2';break;
                case 'lesson15': this.theme = 'My Classroom 1-1';break;
                case 'lesson16': this.theme = 'My Classroom 1-2';break;
                case 'lesson17': this.theme = 'My House 1-1';break;
                case 'lesson18': this.theme = 'My House 1-2';break;
                case 'lesson19': this.theme = 'Sports 1-1';break;
                case 'lesson20': this.theme = 'Sports 1-2';break;
                case 'lesson21': this.theme = 'My Feelings 1-1';break;
                case 'lesson22': this.theme = 'My Feelings 1-2';break;
            }
            if (obj.type == 'click'){
                this.selected_theme = this.theme
                this.course_id = parseInt(obj.currentTarget.id.replace(/[^0-9]/ig,""))
            }     
            else if (obj.type == 'mouseleave')
                this.theme = this.selected_theme
        },
        setColor(obj, color) {
            // console.log(obj, color)
            if (obj.currentTarget.id === 'more_right'){
                this.$refs.right_top.style.backgroundColor = color
                this.$refs.right_bottom.style.backgroundColor = color
            }
            else {
                this.$refs.left_top.style.backgroundColor = color
                this.$refs.left_bottom.style.backgroundColor = color
            }
        },
        prevGroup(){
            this.setLessons(1, 11)
        },
        nextGroup(){
            this.setLessons(12, 22)
        },
        enter() {
            if (this.theme != ''){
                this.$emit('nextStep', 1)
                this.$emit('setParam', {
                    course_id: this.course_id,
                    lesson_type: this.lesson_type
                })
            }
            else alert('请选择课程')
        },
        back() {
            this.$router.replace('/course')
        }
    }
}
</script>

<style>
    .div_select{
        background-image: url(../assets/select_lesson/select_board.jpg);
        background-size: 100%;
    }
    #img_back{
        position: relative;
        top: 8%;
        right: 40%;
        width: 4%;
        height: auto;
        cursor: pointer;
    }
    #div_level{
        position: relative;
        font-size: 1.5vw;
        width: 10%;
        height: 6%;
        left: 40%;
        border-radius: 10vw;
        color: #1DAA8C;
        font-weight: bold;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #div_title{
        position: relative;
        top: 19%;
        font-size: 2vw;
        width: 10%;
        height: 6%;
        color: #ffffff;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .lesson{
        width: 70%;
        cursor: pointer;
    }
    .center{
        display: flex;
        align-items: center;
        justify-content: center; 
    }
    img.lesson:hover, img.lesson:active{
        width: 90%;
    }
    #div_lesson{
        position: relative;
        width: 85%;
        height: 10%;
        top: 24%;
        display: flex;
        justify-items: center;
        justify-content: center;
    }
    #more_right{
        position: relative;
        top: 14%;
        left: 46.5%;
        width: 6vw;
        height: 6vw;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #right_top{
        position: relative;
        width: 60%;
        height: 12%;
        top: -15%;
        left: 24%;
        background-color:#ffffff;
        border-radius: 100px;
        transform: rotate(45deg);
    }
    #right_bottom{
        position: relative;
        width:60%;
        height:12%;
        top: 15%;
        left: -24%;
        background-color:#ffffff;
        border-radius:100px;
        transform: rotate(-45deg);
    }
    #more_left{
        position: relative;
        width: 6vw;
        height: 6vw;
        top: 3.5%;
        right: 46.7%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #left_top{
        position: relative;
        width: 60%;
        height: 12%;
        top: 15%;
        left: 24%;
        background-color:#ffffff;
        border-radius: 100px;
        transform: rotate(45deg);
    }
    #left_bottom{
        position: relative;
        width:60%;
        height:12%;
        top: -15%;
        left: -24%;
        background-color:#ffffff;
        border-radius:100px;
        transform: rotate(-45deg);
    }
    #div_theme{
        position: relative;
        height: 5%;
        top: 15%;
        font-size: 2vw;
        font-weight: bold;
    }
    #img_enter{
        position: relative;
        top: 26%;
        width: 12%;
        height: auto;
        cursor: pointer;
    }
</style>