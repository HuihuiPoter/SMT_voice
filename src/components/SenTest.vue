<template>
    <div id="evaluate_container" align="center">
        <!-- 规则 -->
        <transition v-if="step === 1" name="fade">
            <RuleInform  @nextStep="nextStep" @ruleStart="ruleStart" :dialog_close="dialog_close" :ct="countdown"
            :rule_dialog="dialog" :no="ct_num" :bg_width="bgWidth" :bg_height="bgHeight"></RuleInform>
        </transition>
        <transition v-else-if="step === 2" name="fade">
        <div id="evaluate_box"  align="center" :style="{width: bgWidth + 'px', height: bgHeight + 'px'}">
            <!-- 按钮 -->
        <div class="left_btn">
            <img class="img_btn" src="../assets/test_board/prev.png" alt="" @click="pre">
            <img class="img_btn" src="../assets/test_board/main.png" alt="" @click="main">
        </div>
        <!-- 进度条 -->
        <div id="div_prog" align="center" v-if="prog_show">
            <ProblemLabel v-for="(item, idx) in problem_label" :key="idx + 'prog'" :state="item" :no="idx + 1"></ProblemLabel>
        </div>
        <!-- helen老师 -->
        <transition name="fade" >
            <div class="div_teacher" id="eva_teacher">
                <Teacher :url="helen_URL" v-show="shadow_show" :dialog_view="shadow_show" :dialog="dialog"></Teacher>
            </div>
        </transition>
        <div class="div_record" v-if="recording_show">
            <SenTestRecorder :content="content" :recording="recording" :phase="phase" @recordEnd="recordEnd" v-if="recording_show" :recorder_show="recording_show"></SenTestRecorder>
        </div>
        <transition name="fade">
            <div class="div_remarkEva" v-if="remark_visible">
                <SenTestRemark v-if="remark_visible" v-show="!recording" :record_pro="phone_record" :failed_times="timesOfFailed"
                :btn_show="btn_show" :phase="phase" @next="next" @listenAgain="listenAgain" @recordAgain="recordAgain"
                @remarkClose="remarkClose"></SenTestRemark>
            </div>
        </transition>
        <!-- 背景板 -->
        <!-- <img id="img_bg" src="../assets/public/background.png" alt="">  -->
        </div>
        </transition>
        <!-- <transition v-else name="fade">
            <Result :time="all_time" @resultClose="resultClose"></Result>
        </transition> -->
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
// import SpeakingSelection from './SpeakingSelection'
// import ReadingSelection from './ReadingSelection'
// import Result from './Result'
import ProblemLabel from './ProblemLabel'
import Teacher from './Teacher'

export default {
    name: 'Evaluation',
    components: {
        // Recording,
        SenTestRemark,
        SenTestRecorder,
        RuleInform,
        // Result,
        ProblemLabel,
        Teacher
    },
    data() {
        return {
            step: 1,
            helen_URL: '',
            dialog: {},
            word_list: [],
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
            shadow_show: false,
            audio_stack: [],
            dialog_close: false,
            countdown: false,
            all_time: 0,
            result_visible: false,
            stat_data: [],
            timesOfFailed: 0,
            prog_show: false,
            problem_label: [],
            ct_num: 5,
            phase: 0,
            bgWidth: 1080,
            bgHeight: 720
        }
    },
    mounted: function(){
        // console.log(this.$route.params.type)
        this.requestData(1, 1)
        this.all_time = new Date()
        this.bgWidth = window.innerWidth;
        this.setSize();
        window.onresize = () => {
            this.bgWidth = window.innerWidth
            this.setSize();
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
            this.step = 0
            this.recording_show = false
            this.idx = 0
        },
        setSize(){
            this.bgHeight = 2251 / 4001 * this.bgWidth
        },
        //请求初始数据
        requestData(course_id, lesson_type) {
            console.log(lesson_type)
            // let url = "https://www.smartreelearners.com:9000/api/pro_sen?course_id=" + course_id + "&lesson_type=" + lesson_type
            let url = "https://www.smartreelearners.com:9000/api/pro_sen?course_id=" + course_id
            let self = this
            axios.get(url).then(function (responce) {
                console.log('responce', responce)
                if (responce.status == 200) {
                    
                    self.word_list = responce.data.data
                    self.len = self.word_list.length
                    let i = 0
                    for (let item of self.word_list) {
                        Vue.set(item, 'round', 1)
                        Vue.set(item, 'serial_no', i++)
                    }
                    self.recording_show = true
                    self.content = self.word_list[self.idx]
                    self.problem_label = new Array(self.len).fill(0)
                    self.prog_show = true
                    // console.log(self.word_list)
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
                console.log('res', res)
                if (res.status == 200) {
                    self.score = res.data.pron_total_score
                    self.phone_record = res.data  
                    Vue.set(self.phone_record, 'path', self.content.picture_path)
                    Vue.set(self.phone_record, 'question', self.content.CN_content)
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
            // this.wave_visible = false
            this.thinking_time = obj.thinking_time
            this.recording = obj.recording
            this.blob = obj.blob
            this.duration = obj.duration
            // this.record.push({
            //     content: this.word_list[this.idx].word_content,
            //     thinking_time: this.thinking_time
            // })
            // const self = this
            // this.audiourl = window.URL.createObjectURL(this.blob)
            // this.$refs.audioplay.load()
            // this.$refs.audioplay.oncanplay = function() { 
            //     self.$refs.audioplay.play()
            // }
            // this.$refs.audioplay.onended = function() {
            // }      
        },
        listenAgain() {
            this.btnAgainClick()
        },
        recordAgain() {
            // console.log(this.timesOfFailed)
            if(this.timesOfFailed < 1){
                this.timesOfFailed++
            }  
            this.prompt()  
        },
        //下一题跳转
        next() {
            //this.idx++
            // this.btn_next_show = false
            if (this.idx + 1 < this.len) {  
                this.idx++ 
                this.content = this.word_list[this.idx]
                this.percentage = Math.ceil(this.idx * 100 / this.len)   
                this.read_again = false 
                this.timesOfFailed = 0
                // this.btn_again_show = false
                console.log('next one')
                this.prompt()
            }
            else {
                this.$message({
                    message: '测试完成',
                    type: 'success'
                })
                // this.audioPlay('endaudio.wav')
                this.all_time = new Date() - this.all_time
                // this.result_visible = true
                this.$store.commit('senStat', {
                    sen_stat: this.stat_data,
                    time: this.all_time
                })
                // this.step = 3
                this.$router.replace('/main/result')
            }
        },
         //答题提示
        prompt() {
            //const self = this
            this.remark_visible = false  
            this.btn_show = false
            this.shadow_show = false
            this.recording_show = true
            this.audioPlay_1('starttips.mp3', () => {//提示音后打开录音组件
                this.recording = true
            })                
        },
        //关闭评价页面
        remarkClose(val) {
            this.level = val.level//评价等级
            if (this.level == 1 && this.read_again == true)
                this.level = 2
            //只记录第一轮的成绩
            if (this.content.round === 1)
                this.updateStat()
            // console.log(this.stat_data)
            const self = this
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, self.duration * 1000)
            }).then(() => {
                self.audioRemark()
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
            // console.log(this.word_list)
            if (this.level === 2 && this.content.round === 1 && this.content.word_content != this.word_list[this.len - 1].word_content){//记录不及格的单词再次训练
                this.word_list.push(this.word_list[this.idx])
                this.word_list.splice(this.idx, 1)
                this.idx--
                this.len = this.word_list.length
                //console.log(this.word_list[this.len - 1])
                Vue.set(this.word_list[this.len - 1], 'round', 2)
            }
            // console.log(this.word_list)
        },
        audioPlay_1(content, callback) {           
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
                let goodaudios = ['excellent','wonderful','bravo','great','fantastic']
                let audio_idx = Math.floor(Math.random() * 5)
                // switch(goodaudios[audio_idx]){
                //     case 'excellent': this.dialog = {
                //         content: `Excellent!<br><br>你非常棒哦!`,
                //         container_width: '90%'
                //     };
                //     break;
                //     case 'wonderful': this.dialog = {
                //         content: `Wonderful!<br><br>你非常棒哦!`,
                //         container_width: '90%'
                //     };
                //     break;
                //     case 'bravo': this.dialog = {
                //         content: `Bravo!<br><br>你非常棒哦!`,
                //         container_width: '90%'
                //     };
                //     break;
                //     case 'great': this.dialog = {
                //         content: `Great!<br><br>你非常棒哦!`,
                //         container_width: '90%'
                //     };
                //     break;
                //     case 'fantastic': this.dialog = {
                //         content: `Fantastic!<br><br>你非常棒哦!`,
                //         container_width: '90%'
                //     };
                //     break;
                // }
                this.dialog = {}
                this.helen_URL = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/happy.gif'
                this.shadow_show = true
                this.audioPlay_1(goodaudios[audio_idx] + '.wav', () => {
                    //this.btn_next_show = true
                    self.btn_show = true
                    // self.dialogURL = ''
                })
            }
            else if (this.level == 1) {
                let normalaudios = ['ok']
                let audio_idx = Math.floor(Math.random() * 1)
                // this.dialog = {
                //         content: `It is ok!读得不错，<br><br>但是要注意红色部分的发音哦。加油!再试一次看看!`,
                //         container_width: '150%'
                // }
                this.dialog = {}
                this.helen_URL = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/encourage.gif'
                this.shadow_show = true
                this.audioPlay_1(normalaudios[audio_idx] + '.wav', () => {
                    //this.prompt()
                    self.btn_show = true
                    // self.dialogURL = ''
                })
            }
            else {
                let badaudios = ['oops']
                let audio_idx = Math.floor(Math.random() * 1)
                // this.dialog = {
                //     content: `Oops!仔细听一下老师是怎么读的...<br><br>加油!再试一次看看吧!`,
                //     container_width: '110%'
                // }    
                this.dialog = {}       
                this.helen_URL = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/sad.gif'
                this.shadow_show = true
                this.audioPlay_1(badaudios[audio_idx] + '.wav', () => {
                    //this.btn_again_show = true
                    self.btn_show = true
                    // self.dialogURL = ''
                })
            }
        },
        //规则录音
        audioRule(){
            // this.rule_dialog = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/hello.png'
            this.dialog =  {
                    content: `Hello, I am Helen.我是Helen老师,<br><br>接下来我们要复习所学的单词。请用英语说出看到的单词或图片。`,
                    container_width: '200%'
                }
            this.audioPlay_1('welcomeaudio.wav', () => {
                // this.rule_dialog = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/ready.png'
                this.dialog = {
                    content: `Are you Ready?<br><br>准备好了吗？准备好了就点击开始按钮吧。`,
                    container_width: '130%'
                }
                this.audioPlay_1('readywav.wav', () => {
                    this.dialog_close = true
                    setTimeout(() => {
                        this.countdown = true
                        // this.audioCountdown()
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
                self.ct_num = self.audio_stack.length - 1
                let content = self.audio_stack.pop()
                if (content)
                    self.audioPlay(content)
            }
        },
        //再听三遍录音
        btnAgainClick() {
            //console.log(this.word_list[this.idx].word_content)
            this.img_show = true
            this.audio_times = 0
            // let audio = 'https://www.worith.cn/api/pro_audio?code=2&content=' + this.word_list[this.idx].word_content
            // let el_audio = new Audio(audio)
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
                if (self.audio_times == 3)
                    self.img_show = false
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
                    content: this.content.sentence_content,
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
            this.step = 0
        },
        main() {
            window.location.href = 'https://www.smartreelearners.com/'
        },
    }
}
</script>

<style>
    #evaluate_container{
    }
    #evaluate_box{
        background-image: url(../assets/public/background.png);
        background-size: 100%;
    }
    #div_prog{
        position: relative;
        width: 80%;
        height: 3vw;
        top: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #eva_teacher{
        top: 30%;
    }
    .div_record{
        position: relative;
        width: 50%;
        height: 50%;
        bottom: 30%;
    }
    .div_remarkEva{
        position: relative;
        width: 50%;
        bottom: 30%;
    }
    .fade-enter{
			opacity: 0;
		}
		.fade-enter-active{
			transition: opacity 0.6s;
            -webkit-transition: opacity 0.6s;
		}
		.fade-leave-to{
			opacity: 0;
		}
		.fade-leave-active{
			transition: opacity 0.6s;
            -webkit-transition: opacity 0.6s;
		}
</style>