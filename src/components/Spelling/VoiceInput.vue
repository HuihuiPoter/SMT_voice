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
        
    </div>
</template>

<script>
import Recorder from 'js-audio-recorder'
import axios from "axios"

import Table from '../Table'

let recorder = new Recorder({
    sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
    sampleRate: 16000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
    numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
    // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
})

export default {
    name: 'VoiceInput',
    components: {
        Table
    },
    data() {
        return {
            word_list: [{content: '', id: 0}],
            score_list: [0, 0, 0],
            counter: 5,
            idx: 0,
            len: 0,
            recording: false,
            blob: null,
            record: []
        }
    },
    mounted: function() {
        this.requestData()
        recorder.onprogress = function(params) {
            if (params.vol < 1){
                console.log('声音太小了')
            }
            let dataArray = recorder.getRecordAnalyseData()
            console.log(dataArray[0])
        }
        // this.recStart()
        // this.dec()
    },
    methods: {
        recStart() {
            recorder.start().then(() => {
                if (!this.recording){
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
                //console.log(`${error.name} : ${error.message}`)
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
            // if (this.counter < 0){
            //     this.recStop()
                
            //     if (this.idx >= this.len - 1){
            //         console.log('测试完毕')
            //         this.idx = this.len - 1
            //         this.counter = 0
            //         this.recording = false
            //         this.$message({
            //             message: '已完成测试',
            //             type: 'success'
            //         })
            //         return
            //     }
            //     this.next()
            //     this.counter = 5
            // }
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
            let url = "https://www.worith.cn/api/pro_spell/?course_id=1"
            let self = this
            axios.get(url).then(function (responce) {
                console.log(responce)
                self.word_list = responce.data.data
                self.len = self.word_list.length
            }).catch((error) => console.log(error))
        },
        submit() {
            let self = this
            let url = 'https://www.worith.cn/api/spell_eva'
            let form_data = new FormData()
            form_data.append("spell_audio", new File([this.blob], this.word_list[this.idx], {
                type: this.blob.type
            }))
            form_data.append("spell_content", this.word_list[this.idx].content)
            axios.post(url, form_data).then((res) => {
                console.log(res.data.data)
                self.score_list = res.data.data
                self.record.push({
                    words: self.word_list[self.idx].content,
                    scores: self.score_list.join('-')
                })
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