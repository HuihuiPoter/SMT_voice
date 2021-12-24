<template>
    <div class="right_in" id="div_recording">   
        <!-- 显示单个答句 -->
        <div v-if="phase == 0" class="div_sentence record_margin" align="center">
            <div class="SenA">
                <img class="SenAImg" src="../assets/public/A.png" alt="">
                {{showing_content.sentence_content}}
            </div>
            <div class="img_sen_div">
                <img class="img_sen" :src="showing_content.picture_path" alt="">
            </div>     
        </div>
        <!-- 看问题回答 -->
        <div class="div_sentence record_margin" v-if="phase == 1">
            <div>
                <div class="SenQ">
                    <img class="SenQImg" src="../assets/public/Q.png" alt="">
                    {{showing_content.question}}
                </div>
                <div class="SenA">
                    <img class="SenAImg" src="../assets/public/A.png" alt="">
                    _______________
                </div>
            </div>
            <div class="img_sen_div">
                <img class="img_sen" :src="showing_content.picture_path" alt="">
            </div>
        </div>
        <!-- 看答句问问题 -->
        <div v-if="phase == 2" class="div_sentence record_margin" align="center">
             <div>
                <div class="SenQ">
                    <img class="SenQImg" src="../assets/public/Q.png" alt="">
                    _______________
                </div>
                <div class="SenA">
                    <img class="SenAImg" src="../assets/public/A.png" alt="">
                    {{showing_content.sentence_content}}
                </div>
            </div>
            <div class="img_sen_div">
                <img class="img_sen" :src="showing_content.picture_path" alt="">
            </div>
        </div>
        <!-- <div v-else class="div_word record_margin">
            <span v-for="(item, idx) in showing_content.miss_idx" :key="idx + 'phone'">{{showPhone(item)}}</span>
        </div> -->
        <!-- 录音按钮 -->
        <div class="record_margin">
            <img id="img_voice" src="../assets/test_board/voice.gif" alt="">
        </div>
        <div class="progress_bg">
            <div class="progress" :style="{'width': res_time * 100 / 4000 + '%'}"></div>
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
        content: Object,
        phase: Number
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
            begin: 0,
            end: 0,
            think_done: false, //判断是否为思考时间
            res_time: 4000,
            showing_content: this.content,
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
        //    console.log(val)
           this.showing_content = val
       }
    },
    computed: {
        showPhone() {
            // console.log(item.phone)
            return function(item) {
                if (item.is_miss == 0)
                    return item.phone
                else return '_'.repeat(item.phone.length)
            }   
        },
        showSentence(){
            return function(sentence, miss_idx){
                if (miss_idx < 0)
                    return sentence
                else {
                    let sen_list = sentence.split(' ')
                    sen_list[miss_idx] = '_____'
                    return sen_list.join(' ')
                }
            }
        }
    },
    methods: {
        //开始录音
        recStart() {
            const self = this
            let vol_200 = [0, 0, 0] // 300ms内的3次取样音量大小
            let vol_i = 0
            recorder.onprogress = function(params) {
                self.res_time = self.res_time - 86
                if (self.res_time < 86){
                    self.res_time = 0
                    self.recStop()
                }            
                vol_200[vol_i] = params.vol * 100
                vol_i = (vol_i + 1) % 3
                // 达到一定音量时开始正式判断录音
                if (!self.think_done) {  
                    self.end = new Date()  
                    self.thinking_time = self.end - self.begin //ms        
                    if (Math.max(...vol_200) > 100) { 
                        self.think_done = true
                        self.begin = self.end
                    }                    
                }
                // 正式录音处理，begin - end用来计算没有说话的时间是否超过1s
                else { 
                    if (Math.max(...vol_200) > 100) {
                        self.begin = new Date()
                    }
                    else {
                        self.end = new Date()
                    }
                    if (self.end - self.begin >= 1600 && Math.max(...vol_200) <= 100) { //1秒没有说话则结束录音              
                        self.recStop()
                    }
                }
            }
            setTimeout(() => {
                self.begin = new Date() // 思考时间开始
                recorder.start()
            }, 100)  //延迟开启录音          
        },
        //结束录音
        recStop() {  
            this.think_done = false
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
    .img_sen_div{
        background-color: white;
        border: solid#FED001 5px;
        border-radius: 20px;
        width: 300px;
        height: 200px;
        overflow: hidden;
    }
    .img_sen{
        max-width: 100%;
        max-height: 100%;
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
        border-radius: 100px;
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