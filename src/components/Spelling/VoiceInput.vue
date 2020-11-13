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
                    <h4>{{word_list.join('-')}}</h4>
                    <h4>{{score_list.join('-')}}</h4>
                </div>
                
            </el-col>
            <el-col :span="4" :offset="0">
                <div>
                    <h3>剩余时间：{{counter}}</h3>
                </div>            
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
// import axios from "axios"

let recorder = new Recorder({
    sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
    sampleRate: 16000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
    numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
    // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
})

export default {
    name: 'VoiceInput',
    data() {
        return {
            word_list: ['b', 'b', 'boy'],
            score_list: [0, 0, 0],
            counter: 5,
            idx: 0,
            len: 3,
            recording: false
        }
    },
    mounted: function() {
        // this.recStart()
        // this.dec()
    },
    methods: {
        recStart() {
            recorder.start().then(() => {

            }, error => {
                console.log(`${error.name} : ${error.message}`)
            })
        },
        recStop() {
            let blob = recorder.getWAVBlob()
            console.log(blob)
        },
        next() {
            console.log("下一题")
        },
        dec() {           
            if (this.counter < 0){
                this.recStop()
                this.idx++
                if (this.idx >= this.len){
                    console.log('测试完毕')
                    this.idx--
                    this.counter = 0
                    return
                }
                this.counter = 5
            }  
            new Promise ((resolve) => {
                setTimeout(() => {
                    this.counter--
                    resolve()
                }, 1000)
            }).then (this.dec)                          
            // setTimeout(() => {
            //     this.counter--            
            //     this.dec()                                     
            // }, 1000)                    
        },
        testStart() {
            this.recording = !this.recording
            if (!this.recording){
                this.recStop()
                return
            }                      
            this.recStart()
            // new Promise((resolve) => {
            //     this.dec()
            //     resolve()
            // }).then(() => {
            //     this.idx++
            //     this.counter = 5
            // })
            this.dec()             
        }
    }
}

</script>