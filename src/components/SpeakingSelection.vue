<template>
    <div class="div_select" align="center" :style="{transform: bg_ratio}">
        <!-- 按钮 -->
        <img id="img_back" src="../assets/select_lesson/back.png" alt="" @click="back">
        <div id="div_level">等级/L{{$store.state.level}}</div>
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
        bg_ratio: String
    },
    data() {
        return {
            title: 'Speaking',
            lessons: [],
            selected_theme: '',
            level: 1,
            lesson_type: 1, //speaking
            course_id: 0,
            themes: [],
            theme: ''
        }
    },
    created: function() {
        // lv1 
        this.themes.push({
            lesson1: 'Greetings 1-1',
            lesson2: 'Greetings 1-2',
            lesson3: 'Body Parts 1-1',
            lesson4: 'Body Parts 1-2',
            lesson5: 'My Family Tree 1-1',
            lesson6: 'My Family Tree 1-2',
            lesson7: 'Numbers(1-10) 1-1',
            lesson8: 'Numbers(1-10) 1-2',
            lesson9: 'Colors 1-1',
            lesson10: 'Colors 1-2',
            lesson11: 'Food 1-1',
            lesson12: 'Food 1-2',
            lesson13: 'Animals 1-1',
            lesson14: 'Animals 1-2',
            lesson15: 'My Classroom 1-1',
            lesson16: 'My Classroom 1-2',
            lesson17: 'My House 1-1',
            lesson18: 'My House 1-2',
            lesson19: 'Sports 1-1',
            lesson20: 'Sports 1-2',
            lesson21: 'My Feelings 1-1',
            lesson22: 'My Feelings 1-2',
        })

        // lv2
        this.themes.push({
            lesson1: 'What shape is it? 1-1',
            lesson2: 'What shape is it? 1-2',
            lesson3: 'What is he? 1-1',
            lesson4: 'What is he? 1-2',
            lesson5: 'What are you wearing? 1-1',
            lesson6: 'What are you wearing? 1-2',
            lesson7: 'How many cupcakes are there? 1-1',
            lesson8: 'How many cupcakes are there? 1-2',
            lesson9: 'Do you have a teddy bear? 1-1',
            lesson10: 'Do you have a teddy bear? 1-2',
            lesson11: 'Where is Johnny? 1-1',
            lesson12: 'Where is Johnny? 1-2',
            lesson13: "What's he like? 1-1",
            lesson14: "What's he like? 1-2",
            lesson15: 'What time is it? 1-1',
            lesson16: 'What time is it? 1-2',
            lesson17: "How's the weather? 1-1",
            lesson18: "How's the weather? 1-2",
            lesson19: 'What day is it? 1-1',
            lesson20: 'What day is it? 1-2',
            lesson21: 'What month is it? 1-1',
            lesson22: 'What month is it? 1-2',
        })
        // lv3
        this.themes.push({
            lesson1: "What's Your Name?",
            lesson2: 'How Many Children Are There?',
            lesson3: "That's His Ball",
            lesson4: 'My Bedroom',
            lesson5: 'The Body',
            lesson6: 'Faces',
            lesson7: 'What Color is the Ruler?',
            lesson8: 'My Clothes',
            lesson9: 'Farm Animals',
            lesson10: 'Where Are the Toys?',
            lesson11: 'Days of the Week',
            lesson12: 'Where Do You Live?',
            lesson13: "In the Family",
            lesson14: "What Time Do You Get Up?",
            lesson15: 'Friends',
            lesson16: 'Months of the Year',
            lesson17: "What's the Weather Like?",
            lesson18: "What Do You Study?",
            lesson19: 'About Your Town',
            lesson20: 'What Are They Doing?',
            lesson21: 'Where Is Your Home?',
            lesson22: 'Work',
        })
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
                case 'lesson1': this.theme = this.themes[this.$store.state.level - 1].lesson1;break;
                case 'lesson2': this.theme = this.themes[this.$store.state.level - 1].lesson2;break;
                case 'lesson3': this.theme = this.themes[this.$store.state.level - 1].lesson3;break;
                case 'lesson4': this.theme = this.themes[this.$store.state.level - 1].lesson4;break;
                case 'lesson5': this.theme = this.themes[this.$store.state.level - 1].lesson5;break;
                case 'lesson6': this.theme = this.themes[this.$store.state.level - 1].lesson6;break;
                case 'lesson7': this.theme = this.themes[this.$store.state.level - 1].lesson7;break;
                case 'lesson8': this.theme = this.themes[this.$store.state.level - 1].lesson8;break;
                case 'lesson9': this.theme = this.themes[this.$store.state.level - 1].lesson9;break;
                case 'lesson10': this.theme = this.themes[this.$store.state.level - 1].lesson10;break;
                case 'lesson11': this.theme = this.themes[this.$store.state.level - 1].lesson11;break;
                case 'lesson12': this.theme = this.themes[this.$store.state.level - 1].lesson12;break;
                case 'lesson13': this.theme = this.themes[this.$store.state.level - 1].lesson13;break;
                case 'lesson14': this.theme = this.themes[this.$store.state.level - 1].lesson14;break;
                case 'lesson15': this.theme = this.themes[this.$store.state.level - 1].lesson15;break;
                case 'lesson16': this.theme = this.themes[this.$store.state.level - 1].lesson16;break;
                case 'lesson17': this.theme = this.themes[this.$store.state.level - 1].lesson17;break;
                case 'lesson18': this.theme = this.themes[this.$store.state.level - 1].lesson18;break;
                case 'lesson19': this.theme = this.themes[this.$store.state.level - 1].lesson19;break;
                case 'lesson20': this.theme = this.themes[this.$store.state.level - 1].lesson20;break;
                case 'lesson21': this.theme = this.themes[this.$store.state.level - 1].lesson21;break;
                case 'lesson22': this.theme = this.themes[this.$store.state.level - 1].lesson22;break;
            }
            if (obj.type == 'click'){
                this.selected_theme = this.theme
                this.course_id = parseInt(obj.currentTarget.id.replace(/[^0-9]/ig,""))
                this.$store.commit('Lesson', {
                        lesson: this.course_id
                    })
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
        width: 1920px;
        height: 1080px;
        transform-origin: left top;
    }
    #img_back{
        position: relative;
        top: 90px;
        right: 40%;
        width: 4%;
        height: auto;
        cursor: pointer;
    }
    #div_level{
        position: relative;
        font-size: 25px;
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
        top: 20%;
        font-size: 35px;
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
        top: 14.8%;
        left: 46.6%;
        width: 100px;
        height: 100px;
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
        width: 100px;
        height: 100px;
        top: 5.5%;
        right: 46.8%;
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
        top: 18%;
        font-size: 30px;
        font-weight: bold;
    }
    #img_enter{
        position: relative;
        top: 300px;
        width: 12%;
        height: auto;
        cursor: pointer;
    }
</style>