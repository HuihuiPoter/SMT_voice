<template>
    <div id="box">
        <div id="light" class="white_content" v-show="is_show">
            <span v-show="type === 'word'">单词评测具体信息。</span>
            <span v-show="type === 'sentence' || type === 'senxunfei'">句子评测具体信息。</span>
            <a href="javascript:void(0)" @click="closebox">点这里关闭本窗口</a>
            <div v-show="is_show">
                <span v-show="type === 'sentence' || type === 'senxunfei'" v-for="(item, index) in words_record" :key="'span_s' + index" :class="{redclass: colors[index]}">{{item.word + '   '}}</span>
                <span v-show="type === 'word'" v-for="(item, index) in phone_record" :key="'span_w' + index" :class="{redclass: colors[index]}">{{item.phone + '   '}}</span>
                <br>
                <p v-show="type === 'sentence'">
                    <span>完整度：{{sen_info.completion}} / 1------{{getCom()}}</span>
                    <br>
                    <span>准确度：{{sen_info.accuracy}} / 100------{{getAcc()}}</span>
                    <br>
                    <span>流畅度：{{sen_info.fluency}} / 1------{{getFlu()}}</span>
                </p>
                <p v-show="type === 'senxunfei'">
                    <span>完整度：{{sen_info.integrity}} / 5------{{getComX()}}</span>
                    <br>
                    <span>准确度：{{sen_info.accuracy}} / 5------{{getAccX()}}</span>
                    <br>
                    <span>标准度：{{sen_info.standard}} / 5------{{getStdX()}}</span>
                </p>
                <p v-show="type === 'sentence' || type === 'senxunfei'" v-for="(item, index) in words_record" :key="'p_s' + index">{{item.word}}----------total_score: {{item.score}} 
                    -----{{getCommentWord(item.score)}} </p>
                <p v-show="type === 'word'" v-for="(item, index) in phone_record" :key="'p_w' + index">{{item.phone}}----------total_score: {{item.score}} 
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
        phonerecord: Array,
        seninfo: Object
    },
    data(){
        return {
            type: this._type,
            words_record: [],
            phone_record: [],
            is_show: this.isshow,
            colors: [],
            sen_info: {}
        }
    },
    methods: {
        closebox(){
            this.is_show = false
            this.$emit('closebox', false)
        },
        getCommentWord(score){
            if (score <= 5 && this.type == "senxunfei")
                score = score * 20
            if (score >= 90)
                return "Perfect, keep up!"
            else if (score >= 80)
                return "Excellent, keep up!"
            else if (score >= 70)
                return "Good, you can go to further step!"
            else if (score >= 60)
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
        getAcc(){
            if (this.sen_info.accuracy >= 80)
                return "发音准确"
            else
                return "发音不够准确，继续加油"
        },
        getCom(){
            if (this.sen_info.completion >= 0.9)
                return "句子基本能完整读完"
            else 
                return "句子未能完整读完"
        },
        getFlu(){
            if (this.sen_info.fluency >= 0.9)
                return "发音流畅"
            else 
                return "发音不够流畅，继续加油"
        },
        getAccX(){
            if (this.sen_info.accuracy >= 4)
                return "发音准确"
            else
                return "发音不够准确，继续加油"
        },
        getComX(){
            if (this.sen_info.completion >= 4)
                return "句子基本能完整读完"
            else 
                return "句子未能完整读完"
        },
        getStdX(){
            if (this.sen_info.fluency >= 4)
                return "发音标准，与原音相近"
            else 
                return "发音不够标准，继续加油"
        },
        getColor(record){
            this.colors = []  
            for (let item of record){
                if ((item.score < 80 && this.type == "sentence") || (item.score <= 4 && this.type == "senxunfei"))
                    this.colors.push(true)
                else
                    this.colors.push(false)
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
            this.getColor(this.words_record)
            return val
        },
        phonerecord(val){
            this.phone_record = val
            this.getColor(this.phone_record)
            return val
        },
        seninfo(val){
            //console.log(val)
            this.sen_info = val
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