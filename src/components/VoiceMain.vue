<template>
    <div>
        <slot></slot>
        <el-row :gutter="20" style="margin-top: 8%">
            <el-col :span="4" :offset="2">
                <div>
                    <h4>题目总量：{{len}}</h4>
                    <h4>题目序号：{{idx + 1}}</h4>           
                </div>
            </el-col>
            <el-col :span="4" :offset="2">
                <div>
                    <h4>{{word_list[idx].content}}</h4>                 
                    <h4>{{score_list.join('-')}}</h4>
                </div>
                
            </el-col>
            <el-col :span="4" :offset="0">
                <div>
                    <h3>剩余时间：{{counter}}</h3>
                </div>            
            </el-col>
            <el-col :span="4" :offset="2">
                <Table :_record="record"></Table>
            </el-col>
            
        </el-row>
        <el-row :gutter="20" style="margin-top: 8%">
            <el-col :span="4" :offset="8">
                <el-button type="primary" size="default" @click="testStart">{{recording?'结束测试':'开始测试'}}</el-button>
            </el-col>
        </el-row>
        <Recorder :recording="recording" @recordEnd="recordEnd"></Recorder>
        <UpShow v-show='wave_visible'><Wave></Wave></UpShow>
        <UpShow v-show='remark_visible'><Remark></Remark></UpShow>
    </div>
</template>

<script>
import axios from "axios"

import Table from './Table'

import UpShow from './UpShow'
import Wave from './Wave'
import Remark from './Remark'
import Recorder from './Recorder'

export default {
    name: 'VoiceMain',
    components: {
        Table,
        UpShow,
        Wave,
        Remark,
        Recorder
    },
    data() {
        return {
            word_list: [ ],
            score_list: [0, 0, 0],
            counter: 5,
            idx: 0,
            len: 0,
            recording: false,
            blob: null,
            record: [],

            wave_visible: false,
            remark_visible: false,
            word_set: [],
            score: -1,
            phone_record: [],
            stat_data: [],   //统计数据
            thinking_time
        }
    },
    computed: {
        words() {
            return this.word_list
        }
    },
    mounted: function() {
        this.requestData()
        this.next()
    },
    watch: {
        recording(newVal) {
            if (newVal === false) {
                this.wave_visible = false//关闭录音界面
                this.submit()
                this.next()
            }
        }
    },
    methods: {
        //录音结束事件
        recordEnd(obj) {
            this.thinking_time = obj.thinking_time
            this.recording = obj.recording
            this.blob = obj.blob
        },
        //请求初始数据
        requestData() {
            let url = "https://www.worith.cn/api/pro_word/?course_id=1"
            let self = this
            axios.get(url).then(function (responce) {
                console.log(responce)
                self.word_list = responce.data.data
                self.len = self.word_list.length
            }).catch((error) => console.log(error))
        },
        //提交录音数据
        submit() {
            let self = this
            let url = 'https://www.worith.cn/api/ten_recorder/'
            let form_data = new FormData()
            form_data.append("word_audio", new File([this.blob], this.word_list[this.idx], {
                type: this.blob.type
            }))
            form_data.append("word_content", this.word_list[this.idx])
            axios.post(url, form_data).then((res) => {
                console.log(res.data.data)
                self.score = res.data.pron_total_score
                self.phone_record = res.data.phone_record
                // self.record.push({
                //     words: self.word_list[self.idx].content,
                //     scores: self.score_list.join('-')
                // })
            }).catch((err) => console.log(err))
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (this.idx < this.len - 1){
                        this.next()
                        this.counter = 5                
                    }
                    else this.recording = false
                    resolve()
                }, 3000)     
            })
        },
        //下一题跳转
        next() {
            if (this.idx < this.len) {
                this.idx++
                console.log('next one')
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
                }, 1000) //2s之后开始录音
            }
            else {
                console.log('the last')
            }
        }
    }
}

</script>

<style>

</style>