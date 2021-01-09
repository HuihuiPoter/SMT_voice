<template>
    <div>
        <slot></slot>
        <el-row :gutter="20" style="margin-top: 8%">
            <el-col :span="4" :offset="2">
                <div>
                    <h2>第{{round}}轮练习</h2>
                    <h4>题目总量：{{len}}</h4>
                    <h4>题目序号：{{idx + 1}}</h4>           
                </div>
            </el-col>
            <el-col :span="4" :offset="2">
                <div>
                    <h2>{{word_list[idx].word_content}}</h2>                 
                    <h3>{{getRemark}}</h3>
                </div>
                
            </el-col>
            <el-col :span="4" :offset="2">
                <Table :_record="record"></Table>
            </el-col>
            
        </el-row>
        <Recorder :recording="recording" @recordEnd="recordEnd"></Recorder>
        <UpShow v-if='wave_visible' title="录音"><Wave v-if="wave_visible"></Wave></UpShow>
        <UpShow v-if='remark_visible' title="结果" >
            <Remark v-if='remark_visible' :record="RecordofRemark" :read_again="read_again"
            @readAgain="readAgain"
             @remarkClose="remarkClose">
             </Remark>
        </UpShow>
        <UpShow v-if="result_visible" title="统计结果">
            <Result v-if="result_visible" :stat="stat_data" :round="round" @resultClose="resultClose"></Result>
        </UpShow>
    </div>
</template>

<script>
import axios from "axios"
import Table from './Table'
import UpShow from './UpShow'
import Wave from './Wave'
import Remark from './Remark'
import Recorder from './Recorder'
import Result from './Result'
import Vue from 'vue'

axios.defaults.withCredentials = true

export default {
    name: 'VoiceMain',
    components: {
        Table,
        UpShow,
        Wave,
        Remark,
        Recorder,
        Result
    },
    data() {
        return {
            word_list: [{word_content: ''}],
            score: 0,
            idx: 0,
            len: 0,
            recording: false,
            blob: null,
            record: [],
            wave_visible: false,
            remark_visible: false,
            result_visible: false,
            phone_record: [],
            stat_data: [],   //统计数据
            thinking_time: 0,
            read_again: false,
            level: -1,//本次评级
            round: 1 //第几轮练习
        }
    },
    computed: {
        words() {         
            return this.word_list.filter(word => word.level != 0)
        },
        RecordofRemark() {
            return {
                content: this.word_list[this.idx].word_content, 
                score: this.score,
                phone_record: this.phone_record
            }
        },
        getRemark() {
            if (this.level == 0)
                return '优秀'
            else if (this.level == 1)
                return '普通'
            else if (this.level == 2)
                return '不合格'
            else return '暂无评价'
        }
    },
    mounted: function() {
        this.requestData()
    },
    watch: {
        recording(newVal) {
            if (newVal === false) {
                this.wave_visible = false//关闭录音界面
                this.submit()              
            }
        },
        remark_visible(val) {
            //评价界面关闭时进入下一题         
            if (val === false && this.read_again === false) {
                this.updateStat()
                setTimeout(() => { //2s后开启下一道题          
                    this.next()
                }, 2000)
            }
        },
        round() {
            this.idx = 0
            this.remark = '暂无评价'
            this.record = []
            this.word_list = this.words
            this.len = this.word_list.length
            this.stat_data = []
            this.prompt()
        }
    },
    methods: {
        //录音结束事件
        recordEnd(obj) {
            this.thinking_time = obj.thinking_time
            this.recording = obj.recording
            this.blob = obj.blob
            this.record.push({
                content: this.word_list[this.idx].word_content,
                thinking_time: this.thinking_time
            })
        },
        //关闭评价页面
        remarkClose(val) {
            this.remark_visible = val.visible
            this.level = val.level//评价等级
            Vue.set(this.word_list[this.idx], 'level', this.level)
        },
        //关闭结果页面
        resultClose(val) {
            this.round = 2
            this.result_visible = val
        },
        //再读一次
        readAgain(val) {
            this.read_again = val
            if (val) {             
                this.prompt()
            }
        },
        //请求初始数据
        requestData() {
            let url = "https://www.worith.cn/api/pro_word/?course_id=1"
            //let url = "http://192.168.137.1:8000/api/pro_word/?course_id=1"
            let self = this
            axios.get(url).then(function (responce) {
                self.word_list = responce.data.data
                self.len = self.word_list.length
                self.prompt()
            }).catch((error) => console.log(error))
        },
        //提交录音数据
        submit() {
            let self = this
            let url = 'https://www.worith.cn/api/ten_recorder/'
            //let url = "http://192.168.137.1:8000/api/ten_recorder/"
            let form_data = new FormData()
            form_data.append("word_audio", new File([this.blob], this.word_list[this.idx], {
                type: this.blob.type
            }))
            form_data.append("word_content", this.word_list[this.idx].word_content)
            form_data.append("word_id", this.word_list[this.idx].id)
            axios.post(url, form_data).then((res) => {
                self.score = res.data.pron_total_score
                self.phone_record = res.data.phone_record         
            }).then(() => {
                self.remark_visible = true
            }).catch((err) => console.log(err))
        },
        //下一题跳转
        next() {
            //this.idx++
            if (this.idx + 1 < this.len) {  
                this.idx++        
                console.log('next one')
                this.prompt()
            }
            else {
                this.$message({
                    message: '测试完成',
                    type: 'success'
                })
                this.result_visible = true
            }
        },
        //答题提示
        prompt() {
            const self = this
            setTimeout(() => {
                this.$message({
                    message: '准备开始录音了，集中精神',
                    type: 'warning'
                })
                setTimeout(() => {
                    self.recording = true//开启录音组件
                    self.wave_visible = true//打开录音界面
                }, 1000)                      
            }, 2000) //2s之后开始录音
        },
        //更新统计数据
        updateStat() {
            if (!this.read_again){
                this.stat_data.push({
                    content: this.word_list[this.idx].word_content,
                    remark: this.getRemark,
                    thinking_time: this.thinking_time
                })
            }
            else{
                this.stat_data.splice({
                    content: this.word_list[this.idx].word_content,
                    remark: this.getRemark,
                    thinking_time: this.thinking_time
                }, this.idx, 1) 
            }
        }
    }
}

</script>

<style>

</style>