<template>
    <div id="div_select" align="center">
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
            <!-- <img class="lesson less" v-for="(item, idx) in lessons" :key="idx" :src="item.lesson" :id="'lesson' + item.id" alt="" 
            @click="selectLesson" @mouseover="selectLesson" @mouseleave="selectLesson"> -->
        </div>
        <div id="more_right" align="center"
        @mouseover="setColor($event,'grey')" @mouseleave="setColor($event,'white')">
            <div id="right_top" ref="right_top"></div>
            <div id="right_bottom" ref="right_bottom"></div>
        </div>
        <div id="more_left" align="center"
        @mouseover="setColor($event,'grey')" @mouseleave="setColor($event,'white')">
            <div id="left_top" ref="left_top"></div>
            <div id="left_bottom" ref="left_bottom"></div>
        </div>
        <div id="div_theme">{{theme}}</div>
        <!-- 按钮 -->
        <img id="img_enter" src="../assets/select_lesson/enter.png" alt="" @click="enter">
        <img id="img_bg" src="../assets/select_lesson/select_board.jpg" alt="">
    </div>
</template>

<script>

export default {
    name: 'ReadingSelection',
    data() {
        return {
            title: 'Reading',
            lessons: [],
            theme: '',
            selected_theme: '',
            level: 1,
            lesson_type: 2, //reading
            course_id: 0
        }
    },
    created: function() {
        this.setLessons(1, 8)
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
                case 'lesson1': this.theme = 'I Love My Family';break;
                case 'lesson2': this.theme = 'Look at My Face';break;
                case 'lesson3': this.theme = "Let's Make a Tree";break;
                case 'lesson4': this.theme = 'My Dog Pluto';break;
                case 'lesson5': this.theme = 'I See a Rainbow';break;
                case 'lesson6': this.theme = 'In the Garden';break;
                case 'lesson7': this.theme = "I'm Ready for School";break;
                case 'lesson8': this.theme = 'How Do I Look?';break;
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
    #div_select{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /* #img_back{
        position: inherit;
        z-index: 1;
        width: 4%;
        margin-left: -90%;
        margin-top: -40%;
        height: auto;
        cursor: pointer;
    }
    #div_level{
        position: inherit;
        z-index: 1;
        font-size: 1.5vw;
        width: 10%;
        height: 6%;
        margin-left: 86%;
        margin-top: -40%;
        border-radius: 100px;
        color: #1DAA8C;
        font-weight: bold;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    } */
    /* #div_title{
        position: inherit;
        z-index: 1;
        font-size: 2vw;
        width: 10%;
        height: 6%;
        margin-top: -16%;
        color: #ffffff;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
    } */
    /* .lesson {
        width: 8%;
        height: auto;
        height: auto;
        cursor: pointer;
    } */
    .less {
        padding: 0 1.2% 0 1.2%;
    }
    /* img.lesson:hover, img.lesson:active{
        width: 10%;
    } */
    /* #div_lesson{
        position: inherit;
        width: 88%;
    } */
    /* #more_right{
        position: inherit;
        z-index: 1;
        width: 6%;
        height: 10%;
        margin-top: -1.3%;
        margin-left: 92.8%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #right_top{
        position: inherit;
        z-index: 2;
        width: 60%;
        height: 12%;
        top: 25%;
        background-color:#ffffff;
        border-radius: 100px;
        transform: rotate(45deg);
    }
    #right_bottom{
        position: inherit;
        z-index: 3;
        width:60%;
        height:12%;
        bottom: 25%;
        background-color:#ffffff;
        border-radius:100px;
        transform: rotate(-45deg);
    }
    #more_left{
        position: inherit;
        z-index: 1;
        width: 6%;
        height: 10%;
        margin-top: -1.3%;
        margin-left: -92.8%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #left_top{
        position: inherit;
        z-index: 2;
        width: 60%;
        height: 12%;
        bottom: 25%;
        background-color:#ffffff;
        border-radius: 100px;
        transform: rotate(45deg);
    }
    #left_bottom{
        position: inherit;
        z-index: 3;
        width:60%;
        height:12%;
        top: 25%;
        background-color:#ffffff;
        border-radius:100px;
        transform: rotate(-45deg);
    } */
    /* #div_theme{
        position: inherit;
        z-index: 1;
        margin-top: 20%;
        font-size: 2vw;
        font-weight: bold;
    } */
    /* #img_enter{
        position: absolute;
        z-index: 1;
        margin-top: 36%;
        width: 12%;
        height: auto;
        cursor: pointer;
    } */
</style>