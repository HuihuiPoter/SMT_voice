<template>
    <div id="remark_container" align="center">
        <div id="div_remark">
            评价：{{remark}}
        </div>
        <div id="div_word">
            <span v-for="(item, idx) in phoneWithColor" :key="idx" :style="{'color': item.color}">{{item.phone}}</span>
        </div>
        <!-- 单词图片显示 -->
        <div>
            <img id="img_word" :src="img_URL" alt="">
        </div>
        <!-- 按钮显示 -->
        <div v-show="computedLevel === 0 && is_show">
            <!-- 优秀 -->
            <img class="btn_remark" src="../assets/test_board/btn_next.png" alt="" @click="next">
        </div>
        <div v-show="computedLevel === 1 && is_show">
            <!-- 普通 -->
            <img id="btn_ordin_next" class="btn_remark" src="../assets/test_board/btn_next.png" alt="" @click="next">
            <!-- 再试一次 -->
            <img id="btn_tryagain" class="btn_remark" src="../assets/test_board/btn_tryagain.png" alt="" @click="recordAgain">
        </div>
        <div v-show="computedLevel === 2 && is_show">
            <!-- 不合格 -->
            <img id="btn_listenagain" class="btn_remark" src="../assets/test_board/btn_listenagain.png" alt="" @click="listenAgain">
            <img id="btn_recordagain" class="btn_remark" src="../assets/test_board/btn_recordagain.png" alt="" @click="recordAgain">
            <img v-if="timesOfFailed == 1" id="btn_next_failed" class="btn_remark" src="../assets/test_board/btn_next.png" alt="" @click="next">
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
// import axios from 'axios'
export default {
    name: 'Remark',
    props: {
        record_pro: Object,
        btn_show: Boolean,
        failed_times: Number
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
            timesOfFailed: this.failed_times
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
        phoneWithColor() {
            let phone_record = this.record.phone_record
            for (let item of phone_record) {
                let color
                if (item.score >= 85)
                    color = 'green'
                else color = 'red'
                Vue.set(item, 'color', color)
            }
            return phone_record
        },
        computedLevel() {
            let le
            if (this.record.pron_total_score >= 85)
                le = this.level.excellent
            else if (this.record.pron_total_score >= 75)
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
        img_URL() {
            return self.word_image_url = "https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/wordphoto/" + this.record.content + ".png"
        }
    },
    methods: {
        //通知主界面
        informMain() {
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
        position: absolute;
        z-index: 1;
        margin-top: 15%;
        margin-left: 20%;
        width: 60%;
    }
    #div_remark{
        color: #000000;
        font-size: 1.6vw;
        font-weight: bold;
    }
    #img_word{
        width: 15%;
        height: auto;
    }
    .btn_remark{
        position: absolute;
        /* margin-top: 3%; */
        left: 43%;
        width: 12%;
        height: auto;
        cursor: pointer;
    }
    #btn_listenagain{
        left: 36%;
    }
    #btn_recordagain{
        left: 52%;
    }
    #btn_ordin_next{
        left: 36%
    }
    #btn_tryagain{
        left: 52%;
    }
    #btn_next_failed{
        margin-top: 5%;
    }
</style>