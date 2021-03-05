<template>
    <div align="center">
        <!-- 选择课程 -->
        <SelectLesson v-if="step === 0" @nextStep="nextStep"></SelectLesson>
        <!-- 规则 -->
        <RuleInform v-else-if="step === 1" @nextStep="nextStep" @ruleStart="ruleStart" :dialog_close="dialog_close" :ct="countdown"></RuleInform>
        <div v-else-if="step === 2">
        <!-- helen老师 -->
        <img v-show="shadow_show" id="img_helen" :src="helen_URL" alt="">
        <img v-show="shadow_show" id="img_shadow" src="../assets/teacher_helen/shadow.png" alt="">
        <!-- 对话框 -->
        <img v-show="shadow_show" id="img_dialog" :src="dialogURL" alt="">
        <!-- 按钮 -->
        <img id="img_prev" src="../assets/test_board/prev.png" alt="">
        <img id="img_main" src="../assets/test_board/main.png" alt="">
        <!-- <img  v-show="shadow_show" id="img_close" src="../assets/test_board/close.png" alt="" @click="closeDialog"> -->
        <!-- 进度条 -->
        <div id="div_prog" class="prog_box">
            <el-progress :percentage="percentage" :stroke-width="18" :text-inside="true" :format="showText"></el-progress>
        </div>
        <!-- 录音/评价显示 -->
        <Recording v-if="recording_show" :words="word_list" :idx="idx" v-show="recording"></Recording>
        <Remark v-if="remark_visible" v-show="!recording" :record_pro="phone_record"
        :btn_show="btn_show" @next="next" @listenAgain="listenAgain" @recordAgain="recordAgain"
        @remarkClose="remarkClose"></Remark>
        
        <!-- 背景板 -->
        <img id="img_bg" src="../assets/test_board/board.jpg" alt="" height="46.125%" width="82%"> 
        <!-- 录音 -->
        <Recorder :recording="recording" @recordEnd="recordEnd"></Recorder>
        </div>
        <!-- <div> -->
        <newResult v-else :stat="stat_data" :time="all_time" @resultClose="resultClose"></newResult>
        <!-- </div> -->
        <audio ref="audioplay" id="au">
            <source :src="audiourl" type="audio/wav">
            <source :src="audiourl" type="audio/mpeg">
        </audio>
    </div>
</template>

<script>
import axios from "axios"
import Recording from './Recording'
import Remark from './Remark'
import Vue from 'vue'
import Recorder from './Recorder'
import RuleInform from './RuleInform'
import SelectLesson from './SelectLesson'
import newResult from './newResult'

export default {
    name: 'Evaluation',
    components: {
        Recording,
        Remark,
        Recorder,
        RuleInform,
        SelectLesson,
        newResult
    },
    data() {
        return {
            step: 2,
            helen_URL: '',
            dialogURL: '',
            word_list: [],
            len: 0,
            recording_show: false,//展示单词
            recording: false,//是否在录音
            idx: 0,
            score: 0,
            phone_record: [],
            blob: null,
            remark_visible: false,
            audiourl: '',
            thinking_time: 0,
            duration: 0,
            record:[],
            btn_show: false,
            percentage: 0,
            level: 0,
            read_again: false,
            shadow_show: false,
            audio_stack: [],
            dialog_close: false,
            countdown: false,
            all_time: 0,
            result_visible: false,
            stat_data: []
        }
    },
    mounted: function(){
        //this.prompt()
        this.requestData()
        this.all_time = new Date()
    },
    watch: {
        recording(newVal) {
            if (newVal === false) {
                this.submit()              
            }
        },
        level(val) {
            if (val === 1 && this.read_again === false) {
                this.read_again = true
            }
        },
    },
    methods: {
        //数据初始化
        _init_() {
            this.step = 0
            this.recording_show = false
            this.idx = 0
        },
        //请求初始数据
        requestData() {
            let url = "https://www.worith.cn/api/pro_word/?course_id=1"
            //let url = "http://192.168.137.1:8000/api/pro_word/?course_id=1"
            let self = this
            axios.get(url).then(function (responce) {
                // console.log('responce', responce)
                self.word_list = responce.data.data
                self.len = self.word_list.length
                for (let item of self.word_list) {
                     Vue.set(item, 'round', 1)
                }
                self.recording_show = true
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
                // console.log('res', res)
                self.score = res.data.pron_total_score
                self.phone_record = res.data  
                Vue.set(self.phone_record, 'content', self.word_list[self.idx].word_content)
                // console.log(this.record)       
            }).then(() => {
                // self.recording = false
                self.remark_visible = true
            }).catch((err) => console.log(err))
        },
        //下一步
        nextStep(val) {
            this.step = val
            if (this.step === 2)
                this.prompt()
        },
        //录音结束事件
        recordEnd(obj) {
            // this.wave_visible = false
            this.thinking_time = obj.thinking_time
            this.recording = obj.recording
            this.blob = obj.blob
            this.duration = obj.duration
            this.record.push({
                content: this.word_list[this.idx].word_content,
                thinking_time: this.thinking_time
            })
            const self = this
            this.audiourl = window.URL.createObjectURL(this.blob)
            this.$refs.audioplay.load()
            this.$refs.audioplay.oncanplay = function() { 
                self.$refs.audioplay.play()
            }
            this.$refs.audioplay.onended = function() {
                // self.btn_show = true 
            }      
        },
        listenAgain() {
            const self = this
            this.audiourl = window.URL.createObjectURL(this.blob)
            this.$refs.audioplay.load()
            this.$refs.audioplay.oncanplay = function() { 
                self.$refs.audioplay.play()
            }
            this.$refs.audioplay.onended = function() {
                self.btn_show = true 
            }
        },
        recordAgain() {
            this.prompt()
        },
        //下一题跳转
        next() {
            //this.idx++
            // this.btn_next_show = false
            if (this.idx + 1 < this.len) {  
                this.idx++ 
                this.percentage = Math.ceil(this.idx * 100 / this.len)   
                this.read_again = false 
                // this.btn_again_show = false
                console.log('next one')
                this.prompt()
            }
            else {
                this.$message({
                    message: '测试完成',
                    type: 'success'
                })
                this.audioPlay('endaudio.wav')
                this.all_time = new Date() - this.all_time
                this.result_visible = true
                this.step = 3
            }
        },
         //答题提示
        prompt() {
            //const self = this
            this.remark_visible = false  
            this.btn_show = false
            this.shadow_show = false
            //this.audioPlay('starttips.mp3')  
            this.audioPlay_1('starttips.mp3', () => {//提示音后打开录音组件
                // this.wave_visible = true
                this.recording = true 
                this.img_record = true
            })                
        },
        //关闭评价页面
        remarkClose(val) {
            this.level = val.level//评价等级
            if (this.level === 0){
                this.helen_URL = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/happy.gif'
                this.dialogURL = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/good1.png'
                this.shadow_show = true
            }
            else if (this.level === 1){
                this.helen_URL = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/encourage.gif'
                this.dialogURL = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/ordinary.png'
                this.shadow_show = true
            }
            else {
                this.helen_URL = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/sad.gif'
                this.dialogURL = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/failed.png'
                this.shadow_show = true
            }
            if (this.level == 1 && this.read_again == true)
                this.level = 2
            this.updateStat()
            const self = this
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, self.duration * 1000)
            }).then(() => {
                self.audioRemark()
            })
            Vue.set(this.word_list[this.idx], 'level', this.level)
            if (this.level === 2 && this.word_list[this.idx].round === 1){//记录不及格的单词再次训练
                this.word_list.push(this.word_list[this.idx])
                this.len = this.word_list.length
                //console.log(this.word_list[this.len - 1])
                Vue.set(this.word_list[this.len - 1], 'round', 2)
            }
        },
        audioPlay_1(content, callback) {           
            this.audiourl = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/' + content
             this.$refs.audioplay.load()
            const self = this  
            this.$refs.audioplay.oncanplay = function() {
                self.$refs.audioplay.play()
            }
            this.$refs.audioplay.onended = callback
        },
        //三种结果录音
        audioRemark() {
            const self = this
            if (this.level == 0) {
                let goodaudios = ['goodaudio0.wav','goodaudio1.wav','goodaudio2.wav','goodaudio3.wav','goodaudio4.wav']
                this.audioPlay_1(goodaudios[Math.floor(Math.random() * 5)], () => {
                    //this.btn_next_show = true
                    self.btn_show = true
                })
            }
            else if (this.level == 1) {
                let normalaudios = ['normalaudio0.wav', 'normalaudio1.wav', 'normalaudio2.wav', 'normalaudio3.wav', 'normalaudio4.wav']
                this.audioPlay_1(normalaudios[Math.floor(Math.random() * 5)], () => {
                    //this.prompt()
                    self.btn_show = true
                })
            }
            else {
                let badaudios = ['badaudio0.wav', 'badaudio1.wav', 'badaudio2.wav', 'badaudio3.wav', 'badaudio4.wav']
                this.audioPlay_1(badaudios[Math.floor(Math.random() * 5)], () => {
                    //this.btn_again_show = true
                    self.btn_show = true
                })
            }
        },
        //规则录音
        audioRule(){
            setTimeout(() => {
                this.audiourl = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/welcomeaudio.wav'
                this.$refs.audioplay.load()
                const self = this
                this.$refs.audioplay.oncanplay = function() {
                    self.$refs.audioplay.play()
                }
                // let x = document.getElementById('au')
                // x.playbackRate = 0.8
                this.$refs.audioplay.onended = function() {
                    // self.btn_show = true
                    self.dialog_close = true
                    setTimeout(() => {
                        self.countdown = true
                        self.audioCountdown()
                    }, 1000)
                }
            }, 500)
        },
        //倒计时录音
        audioCountdown() {
            this.audio_stack = ['readyaudio.wav', 'oneaudio.wav', 'twoaudio.wav', 'threeaudio.wav']
            let content = this.audio_stack.pop()
            this.audioPlay(content) 
        },
        //播放语音
        audioPlay(content) {           
            this.audiourl = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/' + content
            this.$refs.audioplay.load()
            const self = this  
            this.$refs.audioplay.oncanplay = function() {
                setTimeout(() => {
                    self.$refs.audioplay.play()
                }, 500)    
            }
            this.$refs.audioplay.onended = function() {
                let content = self.audio_stack.pop()
                if (content)
                    self.audioPlay(content)
            }
        },
        //更新统计数据
        updateStat() {
            if (!this.read_again){
                this.stat_data.push({
                    content: this.word_list[this.idx].word_content,
                    remark: this.getRemark,
                    proficiency: this.getProficiency
                })
            }
            else{
                this.stat_data.splice({
                    content: this.word_list[this.idx].word_content,
                    remark: this.getRemark,
                    proficiency: this.getProficiency
                }, this.idx, 1) 
            }
        },
        showText(percentage){
            return '本次学习进度' + percentage + '%'
        },
        closeDialog(){
            console.log('结束对话')
        },
        ruleStart(){
            this.audioRule()
        },
        //关闭结果页面
        resultClose() {
            this._init_()            
        },
    }
}
</script>

<style>
    #img_helen{
        position: absolute;
        z-index: 2;
        margin-top: 18%;
        margin-left: 3%;
        width: 15%;
        height: auto;
        transform: rotateY(180deg);
    }
    #img_shadow{
        position: absolute;
        z-index: 1;
        margin-top: 41%;
        margin-left: 4.3%;
        width: 12%;
        height: auto;
    }

    #img_dialog{
        position: absolute;
        z-index: 3;
        margin-top: 25%;
        margin-left: 15%;
        width: 20%;
        height: auto;
    }
    #img_prev{
        position: absolute;
        z-index: 1;
        margin-top: 6%;
        margin-left: 0.5%;
        width: 3%;
        height: auto;
        cursor: pointer;
    }
    #img_main{
        position: absolute;
        z-index: 1;
        margin-top: 6%;
        margin-left: 4%;
        width: 3%;
        height: auto;
        cursor: pointer;
    }
    #img_close{
        position: absolute;
        z-index: 3;
        margin-top: 21%;
        margin-left: 58%;
        width: 5%;
        height: auto;
        /* cursor: pointer; */
    }
    #div_prog{
        position: absolute;
        z-index: 1;
        margin-top: 8.75%;
        margin-left: 20%;
        width: 60%;
    }
    .el-progress-bar__inner{
        background-image: linear-gradient(to right, #FEF79F , #B8D302);
    }
    .el-progress-bar__outer{
        height: 1.2rem !important;
    }
    .el-progress-bar__innerText {
        color: #000000;
        font-size: 1rem;
    }
    
</style>