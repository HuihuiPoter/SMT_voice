<template>
    <div class="right_in" id="div_recording">
        <!-- 显示单词 -->
        <div v-if="showing_content.picture_show == 0" class="div_word record_margin" align="center">
            {{showing_content.word_content}}
        </div>
        <div class="record_margin" v-else-if="showing_content.picture_show == 1">
            <img class="img_word" :src="showing_content.picture_path" alt="">
        </div>
        <div v-else class="div_word record_margin">
            <span v-for="(item, idx) in showing_content.miss_idx" :key="idx + 'phone'">{{showPhone(item)}}</span>
        </div>
        <!-- 录音按钮 -->
        <div class="record_margin">
            <img id="img_voice" src="../assets/test_board/voice.gif" alt="">
        </div>
        <div class="progress_bg record_margin">
            <div class="progress" :style="{'width': res_time * 100/ all_time + '%'}"></div>
        </div>
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
        recording: Boolean,
        recorder_show: Boolean,
        content: Object
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
            all_time: 4000,
            res_time: 4000,
            showing_content: this.content
        }
    },
    watch: {
        recording(newVal) {
            if (newVal) {
                this.recStart()    
            }    
        },
        recorder_show(){
            this.res_time = 4000
        },
        content(val) {
           this.showing_content = val
       }
    },
    computed: {
        showPhone() {
            return function(item) {
                if (item.is_miss == 0)
                    return item.phone
                else return '_'.repeat(item.phone.length)
            }   
        }
    },
    methods: {
        //开始录音
        recStart() {
            const self = this
            // console.log(this.res_time)
            recorder.onprogress = function(params) {
                self.res_time = self.res_time - 86
                console.log(params.vol * 100)
                if (self.res_time < 86)
                    self.res_time = 0
                if (!self.recording) {
                    self.after_thinking = false
                    self.begin = 0
                    self.end = 0
                    return
                }
                if (!self.after_thinking) { //正式录音前思考时间           
                    if (params.vol * 100 > 100) { //计算思考时间
                        self.end = new Date()
                        self.thinking_time = self.end - self.begin//ms
                        self.after_thinking = true
                        self.begin = 0
                        self.end = 0
                    }
                }
                else {   
                    if (params.vol * 100 < 100){
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
            setTimeout(() => {
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
            }, 200)  //延迟开启录音          
        },
        //结束录音
        recStop() {  
            let blob =  recorder.getWAVBlob()  //默认调用stop()
            recorder.play()
            this.$emit('recordEnd', {
                recording: false,
                blob: blob,
                thinking_time: this.thinking_time,
                duration: recorder.duration > 4?recorder.duration - 2:recorder.duration - 1
            })
            recorder.destroy()
        },
    }
}
</script>

<style>
    .right_in{
        animation: bounceInRight;
        animation-duration: 1s;
    }
    #div_recording{
        width: 100%;
        height: 100%;
    }
    .div_word{
        color: #5A5657;
        font-size: 4vw;
        font-weight: bold;
    }
    #img_voice{
        width: 20%;
        height: auto;
        cursor: pointer;
    }
    .record_margin{
        margin: 2% 0 0 0;
    }
    .progress_bg{
        background-color: #EFEFEF;
        border-radius: 10vw;
        width: 20%;
        height: 3%;
    }
    .progress{
        /* float: left; */
        border-radius: 100px;
        /* width: 100%; */
        height: 100%;
        transition: width .2s ease;
        background-color: #20BC3E;
    }
</style>