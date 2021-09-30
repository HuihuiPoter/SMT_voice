<template>
    <div id="remark_container" align="center">
        <div class="remark_margin" id="div_remark" align="center">
            评价：{{remark}}
        </div>
        <div class="div_word remark_margin">
            <span v-for="(item, idx) in phoneWithColor" :key="idx" :style="{'color': item.color}">{{item.phone}}</span>
        </div>
        <!-- 单词图片显示 -->
        <div class="remark_margin word_img">
            <img class="img_word" :src="img_URL" alt="">
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
        img_URL(){
            // console.log(this.record.path)
            return this.record.path
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
        width: 100%;
        height: 100%;
    }
    #div_remark{
        color: #000000;
        font-size: 1.8vw;
        font-weight: bold;
    }
    .img_word{
        width: 40%;
        height: auto;
    }
    .btn_remark{
        width: 25%;
        height: auto;
        margin: 0 4%;
        cursor: pointer;
    }
    .remark_margin{
        padding: 2% 0;
    }
</style>