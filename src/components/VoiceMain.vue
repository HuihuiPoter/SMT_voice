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
                    <h4>{{word_list[idx].word_content}}</h4>                 
                    <h4>{{score}}</h4>
                </div>
                
            </el-col>
            <el-col :span="4" :offset="0">
                <div>
                    <h3>剩余时间：10</h3>
                </div>            
            </el-col>
            <el-col :span="4" :offset="2">
                <Table :_record="record"></Table>
            </el-col>
            
        </el-row>
        <el-row :gutter="20" style="margin-top: 8%">
            <el-col :span="4" :offset="8">
                <!-- <el-button type="primary" size="default" @click="testStart">{{recording?'结束测试':'开始测试'}}</el-button> -->
            </el-col>
        </el-row>
        <Recorder :recording="recording" @recordEnd="recordEnd"></Recorder>
        <!-- <UpShow v-if='wave_visible' title="录音"><Wave v-if="wave_visible"></Wave></UpShow>
        <UpShow v-if='remark_visible' title="结果" ><Remark v-if='remark_visible' :record="RecordofRemark" @remarkClose="remarkClose"></Remark></UpShow> -->
        <UpShow v-if='wave_visible' title="录音"><Wave v-if="wave_visible"></Wave></UpShow>
    </div>
</template>

<script>
import axios from "axios"

import Table from './Table'

import UpShow from './UpShow'
import Wave from './Wave'
//import Remark from './Remark'
import Recorder from './Recorder'

export default {
    name: 'VoiceMain',
    components: {
        Table,
        UpShow,
        Wave,
        //Remark,
        Recorder
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
            phone_record: [],
            stat_data: [],   //统计数据
            thinking_time: 0,
        }
    },
    computed: {
        words() {
            return this.word_list
        },
        RecordofRemark() {
            return {
                content: this.word_list[this.idx].word_content, 
                score: this.score,
                phone_record: this.phone_record
            }
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
            self.remark_visible = false
            if (val === false) {
                setTimeout(() => { //2s后开启下一道题          
                    this.next()
                }, 2000)
            }
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
            this.remark_visible = val
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
            let form_data = new FormData()
            form_data.append("word_audio", new File([this.blob], this.word_list[this.idx], {
                type: this.blob.type
            }))
            form_data.append("word_content", this.word_list[this.idx].word_content)
            axios.post(url, form_data).then((res) => {
                self.score = res.data.pron_total_score
                self.phone_record = res.data.phone_record         
            }).then(() => {
                self.remark_visible = true
            }).catch((err) => console.log(err))
        },
        //下一题跳转
        next() {
            this.idx++
            if (this.idx < this.len) {          
                console.log('next one')
                this.prompt()
            }
            else {
                console.log('the last')
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
        }
    }
}

</script>

<style>

</style>