<template>
    <div>
        <h2>{{remark}}</h2>
        <br>
        <h2><span v-for="(item, index) in phoneWithColor" :key="index" :style="{'color': item.color}">{{item.phone}}</span></h2>
        <br>
        <h3 v-show="ord_inform">稍后请再读一次</h3>
        <h3 v-show="failed_inform">请仔细听单词录音，并跟读</h3>
        <audio :src="audio" v-if="failed_inform" autoplay></audio>
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
            r_msg:'',
            audio: null
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
                    this.f_process(false)
                    this.imformMain(false)            
                    break
                case this.level.ordinary: 
                    re = '普通。做的不错，继续加油！'
                    this.f_process(false)
                    this.imformMain(true)
                    break
                case this.level.failed: 
                    re = '不合格。还需要继续努力！'
                    this.f_process(true)
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
                visible: false,
                level: this.computedLevel
            })
        },
        //再读一次
        readAgain(val) {
            this.$emit('readAgain', val) 
        },
        //延时调用
        imformMain(val) {
            const self = this
            this.ord_inform = val
            new Promise((resolve) => {
                setTimeout(() => {
                    self.readAgain(val) 
                    resolve() 
                }, 4000) 
            }).then(() => {
                self.closeThis()
            }) 
        },
        //请求音频
        f_process(val) {
            this.failed_inform = val
            setTimeout(() => {
                this.audio = 'https://www.worith.cn/api/pro_audio?code=2&content=' + this.record.content
            }, 1000)
            
        }
    }
}
</script>