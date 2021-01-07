<template>
    <div>
        {{remark}}
        <br>
        <span v-for="(item, index) in phoneWithColor" :key="index" :style="{'color': item.color}">{{item.phone}}</span>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    name: 'Remark',
    props: {
        record: Object
    },
    data() {
        return {
            level: {
                excellent: 0,
                ordinary: 1,
                failed: 2
            }
        }
    },
    mounted: function() {
        setTimeout(() => {
            this.$emit('remarkClose', false)
        }, 4000)
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
        }
    },
    methods: {

    }
}
</script>