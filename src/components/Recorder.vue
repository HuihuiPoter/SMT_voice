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
})

export default {
    name: 'Recorder',
    props: {
        recording: Boolean
    },
    mounted: function() {
        Recorder.getPermission().then(() => {
            console.log('已打开权限')
        }, (error) => {
            console.log(`${error.name} : ${error.message}`)
            this.$notify({
                title: '提示',
                message: '未打开录音权限'
            })
        })
    },
    data() {
        return {
            blob: null,
            thinking_time: 0,//思考时间
            result: '',
            begin: 0,
            end: 0,
            after_thinking: false, //判断是否为思考时间
        }
    },
    watch: {
        recording(newVal) {
            if (newVal) {
                setTimeout(() => {
                    this.recStart()
                }, 300)    
            }
                
        }
    },
    methods: {
        //开始录音
        recStart() {
            const self = this
            recorder.onprogress = function(params) {
            if (!self.recording) {
                self.after_thinking = false
                self.begin = 0
                self.end = 0
                return
            }
            if (!self.after_thinking) { //正式录音前思考时间           
                if (params.vol > 15) { //计算思考时间
                    self.end = new Date()
                    self.thinking_time = self.end - self.begin//ms
                    self.after_thinking = true
                    self.begin = 0
                    self.end = 0
                }
            }
            else {   
                if (params.vol < 10){
                    self.end = new Date()
                    console.log('声音太小了，说完了吗')
                }
                else {
                    self.begin = new Date()
                }
                if (self.end - self.begin >= 1200) { //1秒没有说话则结束录音
                    self.after_thinking = false
                    self.begin = 0
                    self.end = 0
                    self.recStop()
                }
            }
            }
            recorder.start().then(() => {
                // console.log('recording......', new Date())
                self.begin = new Date() // 思考时间开始
                setTimeout(() => {
                    if (self.recording){
                        if (self.thinking_time === 0)
                            self.thinking_time = 4000
                        self.recStop()         
                    }         
                }, 4000) //4秒未录完则直接结束
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
                thinking_time: this.thinking_time,
                duration: recorder.duration > 4?recorder.duration - 2:recorder.duration - 1
            })
        },
    }
}
</script>