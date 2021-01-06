<template>
    <div>
    </div>
</template>

<script>
import Recorder from 'js-audio-recorder'

let recorder = new Recorder({
    sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
    sampleRate: 16000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
    numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
    // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
})
export default {
    name: 'Recorder',
    props: {
        recording: Boolean
    },
    data() {
        return {
            is_recording: this.recording,
            blob: null,
            thinking_time: 0,//思考时间
            result: '',
            begin: 0,
            end: 0,
            after_thinking: false //判断是否为思考时间
        }
    },
    watch: {
        recording(newVal) {
            if (newVal === true) 
                this.recStart()
            this.is_recording = newVal
        }
    },
    methods: {
        //开始录音
        recStart() {
            const self = this
            recorder.onprogress = function(params) {
            if (!self.is_recording) {
                self.after_thinking = false
                self.begin = 0
                self.end = 0
                return
            }
            if (!self.after_thinking) { //正式录音前思考时间           
                // if (params.vol < 1) {
                //     console.log('声音太小了')
                // }
                if (params.vol > 10) { //计算思考时间
                    self.end = new Date()
                    self.thinking_time = self.end - self.begin//ms
                    self.after_thinking = true
                    self.begin = 0
                    self.end = 0
                }
            }
            else {   
                if (params.vol < 2){
                    self.end = new Date()
                    console.log('声音太小了，说完了吗')
                }
                else {
                    self.begin = new Date()
                }
                if (self.end - self.begin >= 2000) { //两秒没有说话则结束录音
                    self.after_thinking = false
                    self.begin = 0
                    self.end = 0
                    self.recStop()
                }
            }
            }
            recorder.start().then(() => {
                self.begin = new Date() // 思考时间开始
                // if (!this.is_recording){
                //     this.wave_visible = false
                //     console.log('测试完毕')
                //     recorder.destroy()
                //     this.$message({
                //         message: '已完成测试',
                //         type: 'success'
                //     })
                //     return
                // }
            }).catch((error) => {
                console.log(error)
            })
        },
        //结束录音
        recStop() {  
            let blob =  recorder.getWAVBlob()  //默认调用stop()
            this.$emit('recordEnd', {
                recording: false,
                blob: blob,
                thinking_time: this.thinking_time
            })
        },
    }
}
</script>