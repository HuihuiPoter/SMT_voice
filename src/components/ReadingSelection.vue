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
        <!-- <img id="img_bg" src="../assets/select_lesson/select_board.jpg" alt=""> -->
    </div>
</template>

<script>

export default {
    name: 'ReadingSelection',
    props: {
        bg_ratio: String
    },
    data() {
        return {
            title: 'Reading',
            lessons: [],
            theme: '',
            themes: [],
            selected_theme: '',
            level: 1,
            lesson_type: 2, //reading
            course_id: 0
        }
    },
    created: function() {
        // lv1
        this.themes.push({
            lesson1: 'I Love My Family',
            lesson2: 'Look at My Face',
            lesson3: "Let's Make a Tree",
            lesson4: 'My Dog Pluto',
            lesson5: 'I See a Rainbow',
            lesson6: 'In the Garden',
            lesson7: "I'm Ready for School",
            lesson8: 'How Do I Look?'
        })
        // lv2
        this.themes.push({
            lesson1: 'Colors of Fruits',
            lesson2: 'I Am Happy',
            lesson3: "The Farmer's Truck",
            lesson4: 'Going to the Party',
            lesson5: 'Where Is It?',
            lesson6: 'The Concert in the Woods',
            lesson7: "The Four Seasons",
            lesson8: 'On My Birthday'
        })
        // lv3
        this.themes.push({
            lesson1: 'In Spring',
            lesson2: "Stanley's Drawing",
            lesson3: "On the Way to School",
            lesson4: 'Who Plays with Me?',
            lesson5: 'Always Together',
            lesson6: 'At the Playground',
            lesson7: "My First Bike",
            lesson8: 'Be My Friend!'
        })
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
            // console.log(this.$store.state.level)
            switch(obj.currentTarget.id){
                case 'lesson1': this.theme = this.themes[this.$store.state.level - 1].lesson1;break;
                case 'lesson2': this.theme = this.themes[this.$store.state.level - 1].lesson2;break;
                case 'lesson3': this.theme = this.themes[this.$store.state.level - 1].lesson3;break;
                case 'lesson4': this.theme = this.themes[this.$store.state.level - 1].lesson4;break;
                case 'lesson5': this.theme = this.themes[this.$store.state.level - 1].lesson5;break;
                case 'lesson6': this.theme = this.themes[this.$store.state.level - 1].lesson6;break;
                case 'lesson7': this.theme = this.themes[this.$store.state.level - 1].lesson7;break;
                case 'lesson8': this.theme = this.themes[this.$store.state.level - 1].lesson8;break;
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
    .less {
        padding: 0 1.2% 0 1.2%;
    }
</style>