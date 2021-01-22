<template>
    <div>
        <h1>评价</h1>
        <h2>{{remark}}</h2>
        <h2><span v-for="(item, index) in phoneWithColor" :key="index" :style="{'color': item.color}">{{item.phone}}</span></h2>
        <h3 v-show="ord_inform">稍后请再读一次</h3>
        <div v-if="failed_inform">
        <h3>请仔细听单词录音，并跟读</h3>
        <el-tooltip content="点击下面的互动按钮听标准录音" placement="bottom" effect="dark" :value="true">
            <!-- <audio id="myaudio" :src="audio" v-if="failed_inform"></audio> -->
            <el-button type="primary" icon="el-icon-phone-outline" circle @click="btnClick"></el-button>
        </el-tooltip>  
        </div> 
    </div>
</template>

<script>
import Vue from 'vue'
// import axios from 'axios'
export default {
    name: 'Remark',
    props: {
        record: Object,
        read_again: Boolean
    },
    data() {
        return {
            level: {
                excellent: 0,
                ordinary: 1,
                failed: 2
            },
            ord_inform: false,
            failed_inform: false,
            r_msg:''
        }
    },
    mounted: function() {

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
            if (this.record.score >= 85)
                return this.level.excellent
            else if (this.record.score >= 75)
                return this.level.ordinary
            else return this.level.failed
        },
        remark() {
            let re
            let current_level = this.computedLevel
            if (this.read_again && current_level === this.level.ordinary)//第二次读时普通视为不合格
                current_level = this.level.failed
            // current_level = this.level.ordinary
            switch(current_level){
                case this.level.excellent:
                    re = '优秀。做得很好!'
                    this.imformMain(false)            
                    break
                case this.level.ordinary: 
                    re = '普通。做的不错，继续加油！'
                    this.imformMain(true)
                    break
                case this.level.failed: 
                    re = '不合格。还需要继续努力！'
                    this.imformMain(false)
                    break
                default: console.log('wrong level')
            }
            return re
        }
    },
    methods: {
        //关闭评价页面
        closeThis() {
            this.$emit('remarkClose', {
                btn_disabled: false,
                level: this.computedLevel
            })
        },
        //延时调用
        imformMain(val) {
            const self = this
            this.ord_inform = val
            if (this.computedLevel === this.level.failed)
                this.failed_inform = true
            setTimeout(() => {
                self.closeThis()
            }, 5000) 
        },
        //点击互动按钮
        btnClick() {
            let audio = 'https://www.worith.cn/api/pro_audio?code=2&content=' + this.record.content
            let el_audio = new Audio(audio)
            console.log(el_audio)
            let total = 4.5
            this.dec(el_audio, 1.5, total)
        },
        dec(el, time_span, total_time) {
            if (total_time === 0)
                return
            const self = this
            console.log(total_time)
            new Promise((resolve) => {
                setTimeout(() => {
                    el.play()
                    resolve()
                }, time_span * 1000)
            }).then(() => {
                self.dec(el, time_span, total_time - time_span)
            })
            
        }
    }
}
</script>