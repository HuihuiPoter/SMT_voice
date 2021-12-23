<template>
    <div id="evaluate_container" align="center">
        <!-- 规则 -->
        <!-- <transition v-if="step === 1" name="fade"> -->
            <RuleInform v-if="step === 1" @nextStep="nextStep" @ruleStart="ruleStart" :dialog_close="dialog_close" :ct="countdown"
            :rule_dialog="dialog" :no="ct_num" :bg_ratio="bgratio"></RuleInform>
        <!-- </transition> -->
        <!-- <transition v-else-if="step === 2" name="fade"> -->
        <div v-else-if="step === 2" class="slide_in" id="evaluate_box"  align="center" :style="{transform: bgratio}">
            <!-- 按钮 -->
        <div class="left_btn">
            <img class="img_btn" src="../assets/test_board/prev.png" alt="" @click="pre">
            <img class="img_btn" src="../assets/test_board/main.png" alt="" @click="main">
        </div>
        <!-- 进度条 -->
        <div id="div_prog" align="center">
            <ProblemLabel v-for="(item, idx) in problem_label" :key="idx + 'prog'" :state="item" :no="idx + 1" :focus_num="content.serial_no + 1"></ProblemLabel>
        </div>
        <!-- helen老师 -->
        <!-- <transition name="fade" > -->
            <div class="eva_teacher">
                <Teacher :url="helen_URL" v-show="teacher_show" :dialog_view="teacher_show" :dialog="dialog"></Teacher>
            </div>
        <!-- </transition> -->
        <div class="div_record" v-if="recording_show">
            <SenTestRecorder :content="content" :recording="recording" :phase="phase" @recordEnd="recordEnd" v-if="recording_show" :recorder_show="recording_show"></SenTestRecorder>
        </div>
        <!-- <transition name="fade"> -->
            <div class="div_remarkEva" v-if="remark_visible">
                <SenTestRemark v-if="remark_visible" v-show="!recording" :record_pro="phone_record" :failed_times="timesOfFailed"
                :btn_show="btn_show" :flash_flag="flash_flag" :phase="phase" @next="next" @listenAgain="listenAgain" @recordAgain="recordAgain"
                @remarkClose="remarkClose"></SenTestRemark>
            </div>
        <!-- </transition> -->
        <!-- 背景板 -->
        <!-- <img id="img_bg" src="../assets/public/background.png" alt="">  -->
        </div>
        <UpShow v-if="done" :bg_ratio="bgratio"></UpShow>
        <audio ref="audioplay" id="au">
            <source :src="audiourl" type="audio/wav">
            <source :src="audiourl" type="audio/mpeg">
            <source :src="audiourl" type="audio/mp3">
        </audio>
    </div>
</template>

<script>
import axios from "axios"
// import Recording from './Recording'
import SenTestRemark from './SenTestRemark'
import Vue from 'vue'
import SenTestRecorder from './SenTestRecorder'
import RuleInform from './RuleInform'

import ProblemLabel from './ProblemLabel'
import Teacher from './Teacher'
import UpShow from './UpShow.vue'

export default {
    name: 'Evaluation',
    components: {
        // Recording,
        SenTestRemark,
        SenTestRecorder,
        RuleInform,
        // Result,
        ProblemLabel,
        Teacher,
        UpShow
    },
    data() {
        return {
            step: 1,
            helen_URL: '',
            dialog: {},
            sen_list: [],
            all_sen_list: [],
            content: '',
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
            teacher_show: false,
            audio_stack: [],
            dialog_close: false,
            countdown: false,
            all_time: 0,
            result_visible: false,
            stat_data: [],
            timesOfFailed: 0,
            problem_label: [],
            ct_num: 5,
            phase: 0,
            bgWidth: 1920,
            bgHeight: 1080,
            bgratio: "scale(1)",
            audio_name: '', //几个录音文件的名字
            flash_flag: true, //标志按钮是否闪烁
            done: false //标志是否显示combo
        }
    },
    mounted: function(){
        // console.log(this.$route.params.type)
        this.requestData(1, 1)
        this.all_time = new Date()
        // this.bgWidth = window.innerWidth;
        // this.setSize();
        this.bgratio = "scale(" + window.innerWidth / this.bgWidth + ")"
        window.onresize = () => {
            // this.bgWidth = window.innerWidth
            // this.setSize();
            this.bgratio = "scale(" + window.innerWidth / this.bgWidth + ")"
        }
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
    computed: {
        getProficiency() {
            if (this.thinking_time < 1200)
                return '熟练'
            else if (this.thinking_time < 1800)
                return '一般'
            else return '不熟练'
        },
        RecordofRemark() {
            return {
                content: this.content.word_content, 
                score: this.score,
                phone_record: this.phone_record
            }
        },
        getRemark() {
            if (this.level == 0)
                return '优秀'
            else if (this.level == 1)
                return '普通'
            else if (this.level == 2)
                return '不合格'
            else return '暂无评价'
        }
    },
    methods: {
        //数据初始化
        _init_() {
            this.step = 1
            this.done = false
            this.idx = 0
            this.sen_list = this.all_sen_list.couple_sen_data
            this.len = this.sen_list.length
            this.countdown = false
            let i = 0
            for (let item of this.sen_list) {
                Vue.set(item, 'round', 1)
                Vue.set(item, 'serial_no', i++)
            }
            this.problem_label = new Array(this.len).fill(0)
            this.recording_show = true
            this.content = this.sen_list[this.idx]
        },
        setSize(){
            this.bgHeight = 2251 / 4001 * this.bgWidth
        },
        //请求初始数据
        requestData(course_id, lesson_type) {
            console.log(lesson_type)
            let url = "https://www.smartreelearners.com:9000/api/pro_sen?course_id=" + course_id + "&level=1"
            let self = this
            axios.get(url).then(function (responce) {
                console.log('responce', responce)
                if (responce.status == 200) {         
                    self.all_sen_list = responce.data
                    self.sen_list = self.all_sen_list.single_sen_data
                    self.len = self.sen_list.length
                    let i = 0
                    for (let item of self.sen_list) {
                        Vue.set(item, 'round', 1)
                        Vue.set(item, 'serial_no', i++)
                    }
                    self.recording_show = true
                    self.content = self.sen_list[self.idx]
                    self.problem_label = new Array(self.len).fill(0)
                }
                else {
                    alert('网络有问题哦，请重试')
                }
                
            }).catch((error) => console.log(error))
        },
        //提交录音数据
        submit() {
            let self = this
            let url = 'https://www.smartreelearners.com:9000/api/sen_recorder'
            // console.log(this.content.sentence_content)
            let form_data = new FormData()
            form_data.append("sentence_audio", new File([this.blob], this.content.sentence_content, {
                type: this.blob.type
            }))
            form_data.append("sentence_content", this.content.sentence_content)
            form_data.append("sentence_id", this.content.id)
            form_data.append("round", this.content.round)
            axios.post(url, form_data).then((res) => {
                // console.log('res', res)
                if (res.status == 200) {
                    self.score = res.data.pron_total_score
                    self.phone_record = res.data  
                    Vue.set(self.phone_record, 'path', self.content.picture_path)
                    Vue.set(self.phone_record, 'question', self.content.question)
                }
                // console.log(this.record)       
            }).then(() => {
                // self.recording = false
                self.recording_show = false
                self.remark_visible = true
            }).catch((err) => console.log(err))
        },
        //下一步
        nextStep(val) {
            this.step = val
            if (this.step === 2)
                this.prompt()
        },
        //设置请求参数
        setParam(obj) {
            this.requestData(obj.course_id, obj.lesson_type)
        },
        //录音结束事件
        recordEnd(obj) {
            this.thinking_time = obj.thinking_time
            this.recording = obj.recording
            this.blob = obj.blob
            this.duration = obj.duration 
        },
        listenAgain() {
            this.btnAgainClick()
        },
        recordAgain() {
            // console.log(this.timesOfFailed)
            if(this.timesOfFailed < 1){
                this.timesOfFailed++
            } 
            this.flash_flag = true 
            this.prompt()  
        },
        //下一题跳转
        next() {
            //this.idx++
            // this.btn_next_show = false
            if (this.idx + 1 < this.len) {  
                this.idx++ 
                this.content = this.sen_list[this.idx]
                this.percentage = Math.ceil(this.idx * 100 / this.len)   
                this.read_again = false 
                this.timesOfFailed = 0
                // this.btn_again_show = false
                console.log('next one')
                this.prompt()
            }
            else if (this.phase == 0){
                this.$store.commit('senStat', {
                    sen_stat: this.stat_data,
                    time: this.all_time
                })
                this.done = true
                this.audioPlay_1('gooddi.mp3', () => {
                    this.phase++
                    this._init_()
                    this.read_again = false 
                    this.timesOfFailed = 0
                    this.prompt()
                }) 
                
            }
            else {
                this.all_time = new Date() - this.all_time
                this.$store.commit('senQAStat', {
                    sen_stat: this.stat_data,
                    time: this.all_time
                })
                this.done = true
                this.audioPlay_1('endaudio.wav', () => {
                    this.$router.replace('/main/result')
                })    
            }
        },
         //答题提示
        prompt() {
            //const self = this
            this.remark_visible = false  
            this.btn_show = false
            this.teacher_show = false
            this.recording_show = true
            this.audioPlay_1('starttips.mp3', () => {//提示音后打开录音组件
                this.recording = true
            })                
        },
        //关闭评价页面
        remarkClose(val) {
            this.level = val.level//评价等级
            this.audio_name = val.audio_name
            if (this.level == 1 && this.read_again == true)
                this.level = 2
            //只记录第一轮的成绩
            if (this.content.round === 1)
                this.updateStat()
            const self = this
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, self.duration * 1000) //播放自己的录音
            }).then(() => {
                self.audioRemark() //播放评价录音
            })
            Vue.set(this.content, 'level', this.level)
            // if (this.content.round === 1){
                if (this.level === 0)
                    this.problem_label.splice(this.content.serial_no, 1, 1)
                else if (this.level === 1)
                    this.problem_label.splice(this.content.serial_no, 1, 3)
                else this.problem_label.splice(this.content.serial_no, 1, 2)
            // }
            // console.log(this.problem_label)
            if (this.level === 2 && this.content.round === 1 && this.content.word_content != this.sen_list[this.len - 1].word_content){//记录不及格的单词再次训练
                this.sen_list.push(this.sen_list[this.idx])
                this.sen_list.splice(this.idx, 1)
                this.idx--
                this.len = this.sen_list.length
                Vue.set(this.sen_list[this.len - 1], 'round', 2)
            }
        },
        audioPlay_1(content, callback, ispath = false) { 
            if (ispath)
                this.audiourl = content
            else          
                this.audiourl = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/' + content
            this.$refs.audioplay.load()
            const self = this  
            this.$refs.audioplay.oncanplay = function() {
                setTimeout(() => {
                    self.$refs.audioplay.play()
                    // console.log(self.$refs.audioplay.duration)
                }, 200)  
            }
            this.$refs.audioplay.onended = callback
        },
        //三种结果录音
        audioRemark() {
            const self = this
            if (this.level == 0) {
                // let goodaudios = this.audio_name
                this.dialog = {}
                this.helen_URL = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/happy.gif'
                this.teacher_show = true
                this.audioPlay_1("https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/gooddi.mp3", ()=> {
                    // this.audioPlay_1(goodaudios + '.wav', () => {
                    self.btn_show = true
                    // })
                }, true) 
            }
            else if (this.level == 1) {
                // let normalaudios = this.audio_name
                this.dialog = {}
                this.helen_URL = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/encourage.gif'
                this.teacher_show = true
                this.audioPlay_1("https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/normaldi.mp3", ()=> {
                    // this.audioPlay_1(normalaudios + '.wav', () => {
                    self.btn_show = true
                    // })
                }, true)  
            }
            else {
                // let badaudios = this.audio_name 
                this.dialog = {}       
                this.helen_URL = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/sad.gif'
                this.teacher_show = true
                this.audioPlay_1("https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/baddi.mp3", ()=> {
                    // this.audioPlay_1(badaudios + '.wav', () => {
                    self.btn_show = true
                    // })
                }, true)
            }
        },
        //规则录音
        audioRule(){
            // this.rule_dialog = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/hello.png'
            this.dialog =  {
                    content: `Hello, I am Helen.我是Helen老师,<br><br>接下来我们要复习所学的句子。请用英语说出看到的句子或图片。`,
                    container_width: '200%'
                }
            this.audioPlay_1('welcomeaudio.wav', () => {
                // this.rule_dialog = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/ready.png'
                this.dialog = {
                    content: `Are you ready?<br><br>准备好了吗？准备好了就点击开始按钮吧。`,
                    container_width: '130%'
                }
                this.audioPlay_1('readywav.wav', () => {
                    this.dialog_close = true
                    setTimeout(() => {
                        this.countdown = true
                    }, 1000)
                })
            })

        },
        //倒计时录音
        audioCountdown() {
            this.audio_stack = ['go.wav', 'ready.wav', 'oneaudio.wav', 'twoaudio.wav', 'threeaudio.wav']
            this.ct_num = this.audio_stack.length - 1
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
                }, 400)    
            }
            this.$refs.audioplay.onended = function() {
                self.ct_num = self.audio_stack.length - 1 //倒计时
                let content = self.audio_stack.pop()
                if (content)
                    self.audioPlay(content)
            }
        },
        //再听三遍录音
        btnAgainClick() {
            this.img_show = true
            this.audio_times = 0
            try{
                this.audiourl = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/wordaudio/' + this.content.sentence_content + '.mp3'
            }
            catch{
                alert('暂无录音，请等待更新')
            }
            this.$refs.audioplay.load()
            const self = this
            this.$refs.audioplay.onended = function() {
                self.audio_times++
                if (self.audio_times < 3){
                    setTimeout(() => {
                        self.$refs.audioplay.play()
                    }, 500)
                }
                else self.btn_next_show = true
                if (self.audio_times == 3){
                    self.img_show = false
                    self.flash_flag = false
                }
                    
            }
            this.$refs.audioplay.oncanplay = function() {
                setTimeout(() => {
                    self.$refs.audioplay.play()
                }, 500)
            }  
        },
        //更新统计数据
        updateStat() {
            this.stat_data.splice(this.content.serial_no, 1, {
                    Q: this.content.question,
                    A: this.content.sentence_content,
                    remark: this.getRemark,
                    proficiency: this.getProficiency
                })
        },
        showText(percentage){
            return '本次学习进度' + percentage + '%'
        },
        closeDialog(){
            console.log('结束对话')
        },
        ruleStart(val){
            if (val)
                this.audioRule()
            else
                this.audioCountdown()
        },
        //关闭结果页面
        resultClose() {
            // this.step = 0
            this._init_()            
        },
        pre() {
            // console.log('返回上一页')
            this.$router.replace('/course')
        },
        main() {
            window.location.href = 'https://www.smartreelearners.com/'
        },
    }
}
</script>

<style>
    #evaluate_box{
        background-image: url(../assets/public/background.jpg);
        background-size: 100%;
        width: 1920px;
        height: 1080px;
        transform-origin: left top;
    }
    #div_prog{
        position: relative;
        width: 80%;
        height: 60px;
        top: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .eva_teacher{
        position: relative;
        width: 16%;
        height: 56%;
        right: 36%;
        top: 30%;
    }
    .div_record{
        position: absolute;
        width: 50%;
        /* border: 1px black solid; */
        height: 400px;
        top: 400px;
        left: 25%;
    }
    .div_remarkEva{
        position: absolute;
        top: 380px;
        left: 25%;
        width: 50%;
    }
</style>