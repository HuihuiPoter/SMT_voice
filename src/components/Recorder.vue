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
                    <transition name="component-fade" mode="out-in">
                        <h4>{{word_list[idx].content}}</h4>
                    </transition>                   
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
        <UpShow v-if='visible'><Wave></Wave></UpShow>\
        <UpShow v-if='visible'><Wave></Wave></UpShow>
    </div>
</template>

<script>
import Recorder from 'js-audio-recorder'
import axios from "axios"

import Table from './Table'

import UpShow from './UpShow'
import Wave from './Wave'
import Remark from './Remark'

let recorder = new Recorder({
    sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
    sampleRate: 16000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
    numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
    // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
})

export default {
    name: 'Recorder',
    components: {
        Table,
        UpShow,
        Wave
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

            visible: false,
            word_set: [],
            score: -1,
            phone_record: [],
            stat_data: [],   
            //content: '',
            thinking_time: 0,
            result: '',
            begin: 0,
            end: 0,
            after_thinking: false
        }
    },
    computed: {

    },
    mounted: function() {
        this.requestData()
        recorder.onprogress = function(params) {
            if (!this.after_thinking) { //正式录音前思考时间           
                // if (params.vol < 1) {
                //     console.log('声音太小了')
                // }
                if (params.vol > 20) { //计算思考时间
                    this.end = new Date()
                    this.thinking_time = this.end - this.begin
                    this.after_thinking = true
                    this.begin = 0
                    this.end = 0
                }
            }
            else {   
                if (params.vol < 1){
                    this.end = new Date()
                    console.log('声音太小了，说完了吗')
                }
                else {
                    this.begin = new Date()
                }
                if (this.end - this.begin >= 2) //两秒没有说话则结束录音
                    this.recording = false
            }
            //let dataArray = recorder.getRecordAnalyseData()  这是录音数据
        }
        // this.recStart()
        // this.dec()
    },
    watch: {

    },
    methods: {
        recStart() {
            recorder.start().then(() => {
                this.begin = new Date() // 思考时间开始

                if (!this.recording){
                    this.visible = false
                    console.log('测试完毕')
                    recorder.destroy()
                    this.$message({
                        message: '已完成测试',
                        type: 'success'
                    })
                    return
                }
                this.dec()
            }).catch((error) => {
                console.log(error)
            })
        },
        recStop() {
            this.blob = recorder.getWAVBlob()
            console.log(this.blob)
        },
        next() {
            console.log("下一题")
            this.idx++
        },
        dec() {           
            if (this.counter <= 0){
                this.recStop()
                this.submit().then(() => {
                    this.recStart()
                })
                return
            }  
            new Promise ((resolve) => {
                setTimeout(() => {
                    this.counter--
                    resolve()
                }, 1000)
            }).then(this.dec)                                              
        },
        testStart() {
            this.visible = true
            let msg = this.recording?'结束测试':'开始测试'
            if (!this.recording){
                this.$notify({
                    title: '提示',
                    message: '你每道题有5秒钟的时间来思考并回答问题'
                })
            }
            this.recording = !this.recording
            this.$message({
                message: msg,
                type: 'warning'
            })
            if (!this.recording){
                this.recStop()
                return
            }                      
            this.recStart()          
        },
        requestData() {
            let url = "https://www.worith.cn/api/pro_word/?course_id=1"
            let self = this
            axios.get(url).then(function (responce) {
                console.log(responce)
                self.word_list = responce.data.data
                self.len = self.word_list.length
            }).catch((error) => console.log(error))
        },
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
        }
    }
}

</script>

<style>
    .component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>