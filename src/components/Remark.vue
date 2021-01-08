<template>
    <div>
        {{remark}}
        <br>
        <span v-for="(item, index) in phoneWithColor" :key="index" :style="{'color': item.color}">{{item.phone}}</span>
        <br>
        <h3 v-show="inform">稍后请再读一次</h3>
    </div>
</template>

<script>
import Vue from 'vue'
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
            inform: false 
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
            if (this.read_again && this.current_level === this.level.ordinary)//第二次读时普通视为不合格
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
            this.inform = val
            new Promise((resolve) => {
                setTimeout(() => {
                    self.readAgain(val) 
                    resolve() 
                }, 4000) 
            }).then(() => {
                    self.closeThis()
                }) 
        }
    }
}
</script>