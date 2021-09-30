<template>
    <div id="remark_container" align="center">
        <div class="remark_margin" id="div_remark" align="center">
            <!-- 评价：{{remark}} -->
            <Dialog :dialog="dialog"></Dialog>
        </div>
        <!-- 评测句子 -->
        <div v-if="phase == 0" class="div_sentence record_margin" align="center">
            <div class="SenA">
                <img class="SenAImg" src="../assets/public/A.png" alt="">
                <span v-for="(item, idx) in wordsWithColor" :key="idx" :style="{'color': item.color, 'white-space': 'pre'}">{{item.word}}&nbsp;</span>
            </div>
            <img class="img_sen" :src="img_URL" alt="">
        </div>
        <!-- 评测答句 -->
        <div v-if="phase == 1" class="div_sentence remark_margin" id="div_word_img">
            <div style="width: 60%">
                <div class="SenQ">
                    <img class="SenQImg" src="../assets/public/Q.png" alt="">
                    {{record.question}}
                </div>
                <div class="SenA">
                    <img class="SenAImg" src="../assets/public/A.png" alt="">
                    <span v-for="(item, idx) in wordsWithColor" :key="idx" :style="{'color': item.color, 'white-space': 'pre'}">{{item.word}}&nbsp;</span>
                </div>
            </div>
            <img class="img_sen" :src="img_URL" alt="">
        </div>
        <!-- 评测问句 -->
        <div v-if="phase == 2" class="div_sentence record_margin" align="center">
             <div>
                <div class="SenQ">
                    <img class="SenQImg" src="../assets/public/Q.png" alt="">
                    {{record.question}}
                </div>
                <div class="SenA">
                    <img class="SenAImg" src="../assets/public/A.png" alt="">
                    <span v-for="(item, idx) in wordsWithColor" :key="idx" :style="{'color': item.color, 'white-space': 'pre'}">{{item.word}}&nbsp;</span>
                </div>
            </div>
            <img class="img_sen" :src="img_URL" alt="">
        </div>
        <!-- 按钮显示 -->
        <div class="remark_margin" v-show="computedLevel === 0 && is_show">
            <!-- 优秀 -->
            <img class="btn_remark" src="../assets/test_board/btn_next.png" alt="" @click="next">
        </div>
        <div class="remark_margin" v-show="computedLevel === 1 && is_show">
            <!-- 普通 -->
            <img id="btn_ordin_next" class="btn_remark" src="../assets/test_board/btn_next.png" alt="" @click="next">
            <!-- 再试一次 -->
            <img id="btn_tryagain" class="btn_remark" src="../assets/test_board/btn_tryagain.png" alt="" @click="recordAgain">
        </div>
        <div class="remark_margin" v-show="computedLevel === 2 && is_show">
            <!-- 不合格 -->
            <img id="btn_listenagain" class="btn_remark" src="../assets/test_board/btn_tryagain.png" alt="" @click="listenAgain">
            <img id="btn_recordagain" class="btn_remark" src="../assets/test_board/btn_recordagain.png" alt="" @click="recordAgain">
            <img v-if="timesOfFailed == 1" id="btn_next_failed" class="btn_remark" src="../assets/test_board/btn_next.png" alt="" @click="next">
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Dialog from './Dialog.vue'
// import axios from 'axios'
export default {
    name: 'Remark',
    components: {
        Dialog
    },
    props: {
        record_pro: Object,
        btn_show: Boolean,
        failed_times: Number,
        phase: Number
    },
    data() {
        return {
            level: {
                excellent: 0,
                ordinary: 1,
                failed: 2
            },
            word: 'word',
            record: this.record_pro,
            is_show: false,
            timesOfFailed: this.failed_times,
            dialog: {}
        }
    },
    mounted: function() {
        this.informMain()
    },
    watch: {
        record_pro(val){
            this.record = val
        },
        btn_show(val) {
            this.is_show = val
        },
        failed_times(val) {
            // console.log(val)
            this.timesOfFailed = val
        }
    },
    computed: {
        wordsWithColor() {
            let words_record = this.record.words_record
            for (let item of words_record) {
                let color
                if (item.score >= 4.5)
                    color = 'green'
                else color = 'red'
                Vue.set(item, 'color', color)
            }
            // if (words_record[0].word.length == 1)
            //     Vue.set(words_record[0], 'word', words_record[0].word.toUpperCase())
            // else
            let str = words_record[0].word
            words_record[0].word = str.replace(str[0], str[0].toUpperCase())
            return words_record
        },
        computedLevel() {
            let le
            if (this.record.pron_total_score >= 4.5)
                le = this.level.excellent
            else if (this.record.pron_total_score >= 4.0)
                le = this.level.ordinary
            else le = this.level.failed
            return le
        },
        remark() {
            let re
            switch(this.computedLevel){
                case this.level.excellent:
                    re = '优秀。做得很好!'     
                    break
                case this.level.ordinary: 
                    re = '普通。做的不错，继续加油！'
                    break
                case this.level.failed: 
                    re = '不合格。还需要继续努力！'
                    break
                default: console.log('wrong level')
            }
            return re
        },
        img_URL(){
            // console.log(this.record.path)
            return this.record.path
        }
    },
    methods: {
        //通知主界面
        informMain() {
            if (this.computedLevel == 0) {
                let goodaudios = ['excellent','wonderful','bravo','great','fantastic']
                let audio_idx = Math.floor(Math.random() * 5)
                switch(goodaudios[audio_idx]){
                    case 'excellent': this.dialog = {
                        content: `Excellent!你非常棒哦!`,
                        // container_width: '90%'
                    };
                    break;
                    case 'wonderful': this.dialog = {
                        content: `Wonderful!你非常棒哦!`,
                        // container_width: '90%'
                    };
                    break;
                    case 'bravo': this.dialog = {
                        content: `Bravo!你非常棒哦!`,
                        // container_width: '90%'
                    };
                    break;
                    case 'great': this.dialog = {
                        content: `Great!你非常棒哦!`,
                        // container_width: '90%'
                    };
                    break;
                    case 'fantastic': this.dialog = {
                        content: `Fantastic!你非常棒哦!`,
                        // container_width: '90%'
                    };
                    break;
                }
            }
            else if (this.computedLevel == 1) {
                this.dialog = {
                        content: `It is ok!读得不错，但是要注意红色部分的发音哦。加油!再试一次看看!`,
                        // container_width: '150%'
                }
            }
            else {
                this.dialog = {
                    content: `Oops!仔细听一下老师是怎么读的...加油!再试一次看看吧!`,
                    // container_width: 'auto'
                }                
            }
            this.$emit('remarkClose', {
                level: this.computedLevel,
                color: this.phoneWithColor
            })  
        },
        next() {
            this.$emit('next', true)
        },
        listenAgain() {
            this.$emit('listenAgain', true)
        },
        recordAgain() {
            this.$emit('recordAgain', true)
        }
    }
}
</script>

<style>
    #remark_container{
        width: 100%;
        height: 100%;
    }
    .btn_remark{
        width: 20%;
        height: auto;
        margin: 0 4%;
        cursor: pointer;
    }
    .remark_margin{
        padding: 2% 0;
    }
    .div_sentence{
        color: #5A5657;
        font-size: 2vw;
        font-weight: bold;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .SenQ{
        display: flex;
        margin: 5% 0;
    }
    .SenQImg{
        width: 7%;
        height: auto;
        margin: 0 2%;
    }
    .SenA{
        display: flex;
        /* display: inline-block; */
        margin: 5% 0;
    }
    .SenAImg{
        width: 7%;
        height: auto;
        margin: 0 2%;
    }
</style>