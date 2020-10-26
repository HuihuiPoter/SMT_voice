<template>
    <div id="box">
        <div id="light" class="white_content" v-show="is_show">句子评测具体信息显示.
            <a href="javascript:void(0)" @click="closebox">点这里关闭本窗口</a>
            <div v-show="is_show">
                <span v-show="type === 'sentence'" v-for="(item, index) in words_record" :key="'span_s' + index" :class="{redclass: colors[index]}">{{item.word + '   '}}</span>
                <span v-show="type === 'word'" v-for="(item, index) in phone_record" :key="'span_w' + index" :class="{redclass: colors[index]}">{{item.phone + '   '}}</span>
                <br>
                <!-- <span style="color: yellowgreen;">Tips: Too fast, please slow down</span> -->
                <p v-show="type === 'sentence'" v-for="(item, index) in words_record" :key="'p_s' + index">{{item.word}}----------total_score: {{item.score}} 
                    -----{{getCommentWord(item.score)}} </p>
                <p v-show="type === 'word'" v-for="(item, index) in words_record" :key="'p_w' + index">{{item.phone}}----------total_score: {{item.score}} 
                    -----{{getCommentPhone(item.score)}} </p>
            </div>
        </div>
        
        <div id="fade" class="black_overlay" v-show="is_show"></div>
    </div>
</template>

<script>
export default {
    name: "Detailbox",
    props: {
        _type: String,
        isshow: Boolean,
        wordsrecord: Array,
        phonerecord: Array
    },
    data(){
        return {
            type: this._type,
            words_record: [],
            phone_record: [],
            is_show: this.isshow,
            colors: []
        }
    },
    methods: {
        closebox(){
            this.is_show = false
            this.$emit('closebox', false)
        },
        getCommentWord(score){
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
        getCommentPhone(score){
            if (score >= 90)
                return "做得非常好，继续保持"
            else if (score >= 80)
                return "很优秀，争取做到最好"
            else if (score >= 70)
                return "继续加油"
            else if (score >= 60)
                return "还需要继续提升"
            else 
                return "做得不够好，需要多练习"
        },
        getColor(){
            this.colors = []
            if (this.type == "sentence"){
                for (let item of this.words_record){
                    if (item.score < 4)
                        this.colors.push(true)
                    else
                        this.colors.push(false)
                }
            }
            else {
                for (let item of this.phone_record){
                    if (item.score < 80)
                        this.colors.push(true)
                    else
                        this.colors.push(false)
                }
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
        },
        phonerecord(val){
            this.phone_record = val
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