<template>
    <div id="box">
        <div id="light" class="white_content" v-show="is_show">句子评测具体信息显示.
            <a href="javascript:void(0)" @click="closebox">点这里关闭本窗口</a>
            <div v-show="is_show">
                <span v-for="(item, index) in words_record" :key="index" :class="{redclass: words_color[index]}">{{item.word + '   '}}</span>
                <span>I </span>
                <span>love  </span>
                <span>my    </span>
                <span style="color: red;">family</span>
                <br>
                <span style="color: yellowgreen;">Tips: Too fast, please slow down</span>
                <p v-for="(item, index) in words_record" :key="index">{{item.word}}----------total_score: {{item.score}} {{getComment(item.score)}}
                    <a href="#">Click here to hear the voice of (item.word)</a>
                </p>
                <p>I----------------total_score: 4  --- {{getComment(4)}} <a href="#">Click here to hear the voice of (I)</a></p>
                <p>love-------------total_score: 3  --- {{getComment(3)}} <a href="#">Click here to hear the voice of (love)</a></p>
                <p>my---------------total_score: 2  --- {{getComment(2)}} <a href="#">Click here to hear the voice of (my)</a></p>
                <p>family-----------total_score: 1  --- {{getComment(1)}} <a href="#">Click here to hear the voice of (family)</a></p>
            </div>
        </div>
        
        <div id="fade" class="black_overlay" v-show="is_show"></div>
    </div>
</template>

<script>
export default {
    name: "Detailbox",
    props: {
        isshow: Boolean,
        wordsrecord: Array
    },
    data(){
        return {
            words_record: [],
            is_show: this.isshow,
            sentence: "I love my family",
            words_color: []
        }
    },
    methods: {
        toWords(){
            this.words = this.sentence.split(' ')
        },
        closebox(){
            this.is_show = false
            this.$emit('closebox', false)
        },
        getComment(score){
            if (score >= 4.5)
                return "Perfect, keep up!"
            else if (score >= 4)
                return "Excellent, keep up!"
            else if (score >= 3)
                return "Good, you can go to further step!"
            else if (score >= 2)
                return "Continue to exert yourself!"
            else    
                return "Not an expected result, continue to exert yourself!"
        },
        getColor(){
            for (let item of this.words_record){
                if (item.score < 4)
                    this.words_color.push(true)
                else
                    this.words_color.push(false)
            }
        }
    },
    watch: {
        isshow(val){
            this.is_show = val
            return val
        },
        wordsrecord(val){
            this.words_record = val
            this.getColor()
            return val
        }
    }
}
</script>

<style>
    .black_overlay {
            /* display: none; */
            position: absolute;
            top: 0%;
            left: 0%;
            width: 100%;
            height: 100%;
            background-color: black;
            z-index: 1001;
            -moz-opacity: 0.8;
            opacity: .80;
            filter: alpha(opacity=88);
        }

        .white_content {
            /* display: none; */
            position: absolute;
            top: 25%;
            left: 25%;
            width: 55%;
            height: 70%;
            padding: 20px;
            border: 2px solid rgb(0, 255, 85);
            background-color: white;
            z-index: 1002;
            overflow: auto;
            border-radius: 25px;
        }
        .redclass{
            color: red;
        }
</style>