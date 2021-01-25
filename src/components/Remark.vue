<template>
    <div id="box_remark">
        <h1>评价</h1>
        <h2>{{remark}}</h2>
        <!-- <h2><span v-for="(item, index) in phoneWithColor" :key="index" :style="{'color': item.color}">{{item.phone}}</span></h2> -->
        <!-- <h3 v-show="ord_inform">稍后请再读一次</h3> -->
        <!-- <div v-if="failed_inform">
        <h3>请仔细听单词录音，并跟读</h3>
        <el-tooltip content="点击下面的互动按钮听标准录音" placement="bottom" effect="dark" :value="true">
            <el-button type="primary" icon="el-icon-phone-outline" circle @click="btnClick"></el-button>
        </el-tooltip>  
        </div>  -->
    </div>
</template>

<script>
import Vue from 'vue'
// import axios from 'axios'
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
            },
            // ord_inform: false,
            // failed_inform: false,
            // r_msg:''
        }
    },
    mounted: function() {
        this.informMain()
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
            if (this.record.score >= 85)
                le = this.level.excellent
            else if (this.record.score >= 75)
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
        }
    },
    methods: {
        //通知主界面
        informMain() {
            this.$emit('remarkClose', {
                level: this.computedLevel,
                color: this.phoneWithColor
            })  
        }
    }
}
</script>

<style>
    /* #box_remark{
        border: 1px solid black;
        border-radius: 10px;
        animation: border_turn 3s;
    }
    @keyframes border_turn
    {
    0% {border: 1px solid black;}
    25% {border: 1px solid rgba(10, 194, 126, 1);}
    50% {border: 1px solid black;}
    75% {border: 1px solid rgba(10, 194, 126, 1);}
    100% {border: 1px solid black;}
    } */
</style>