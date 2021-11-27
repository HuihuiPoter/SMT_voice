<template>
    <div>
        <div v-show="showRule" align='center' style="margin-top: 6%"> 
            <div id="div_bi">
            <button id="btn_go" type="success" @click="audioRule" v-if="btn_hi_show">Hello</button>
            <button id="btn_go" type="success" @click="hideThis" v-if="btn_show">GO</button>
            <!-- <img id="img_helen" src="../assets/Helen.png" alt="Teacher Helen" srcset="">   -->
            <audio ref="audioplay">
                <source :src="audiourl" type="audio/wav">
                <source :src="audiourl" type="audio/mpeg">
            </audio> 
            </div>
        </div>
        <div v-show="!showRule">
        <slot></slot>
        <el-row :gutter="20" style="margin-top: 5%" justify="center">
            <el-col :span="4" :offset="2">
                <div>
                    <el-progress type="dashboard" :percentage="percentage" :color="pro_color" :stroke-width="12"></el-progress>
                    <div class="font-title">本次练习进度</div>
                    <div class="font-title">题目总量：{{len}}</div>  
                </div>
            </el-col>
            <el-col :span="6" :offset="3">
                <div>
                    <el-tooltip class="item" effect="dark" :content="tip" placement="top-start" :value="tipshow">
                        <div id="content" style="text-align: center;font-size: 1">
                            <!-- {{word_list[idx].word_content}} -->
                            <span v-for="(item, index) in content_colors" :key="index" :style="{'color': item.color}">{{content_flow[index].phone}}</span>
                        </div>
                    </el-tooltip>
                    <!-- <div id="remark">[没有音标]</div>   -->
                    <div v-show="img_show">
                        <!-- <img :src="word_image_url" alt="Word Image" srcset="" height="200" width="200"> -->
                    </div>
                    <div id="remark" v-if="btn_again_show">再听一次：
                        <el-button type="primary" icon="el-icon-phone-outline" circle @click="btnAgainClick"></el-button>
                    </div>     
                </div>
                <div style="margin-top: 5%;text-align: center;">
                    <Countdown v-if="ct_show"></Countdown>
                    <Wave v-if="wave_visible"></Wave>
                </div>
                
                <div v-show="btn_next_show" style="margin-top: 5%;">
                <el-button type="warning" size="default" @click="reRecord" icon="el-icon-refresh">重新录音</el-button>
                    <el-button type="success" size="medium" @click="next">
                        下一个<i class="el-icon-arrow-right el-icon--right"></i>
                    </el-button>
                </div> 
            </el-col>
            <el-col :span="5" :offset="3">
                <div>
                    <!-- <img src="../assets/Helen.png" alt="Teacher Helen" srcset="" height="220" width="100"> -->
                </div>
                <Remark v-if='remark_visible' :record="RecordofRemark"
                    @remarkClose="remarkClose">
                </Remark>
            </el-col>
        </el-row>
        

        
        <el-row :gutter="20" style="margin-top: 8%">
            <el-col :span="10" :offset="10">
                 <div v-if="btn_start_show">
                    <el-button type="primary" @click="prepare" icon="el-icon-edit">开始</el-button>
                </div>
            </el-col>
        </el-row>
        <audio ref="audioplay">
            <source :src="audiourl" type="audio/wav">
            <source :src="audiourl" type="audio/mpeg">
        </audio>
        <Recorder :recording="recording" @recordEnd="recordEnd"></Recorder>
        <UpShow v-if="result_visible" title="本次练习成果">
            <!-- <Result v-if="result_visible" :stat="stat_data" :time="all_time" @resultClose="resultClose"></Result> -->
        </UpShow>
        </div>
    </div>
</template>

<script>
import axios from "axios"
// import Table from './Table'
import UpShow from './UpShow'
import Wave from './Wave'
import Remark from './Remark'
import Recorder from './Recorder'
// import Result from './Result'
import Vue from 'vue'
import Countdown from './Countdown'

axios.defaults.withCredentials = true

export default {
    name: 'VoiceMain',
    components: {
        // Table,
        UpShow,
        Wave,
        Remark,
        Recorder,
        // Result,
        Countdown
    },
    data() {
        return {
            word_list: [{word_content: ''}],
            score: 0,
            idx: 0,
            len: 0,
            recording: false,
            duration: 0,
            blob: null,
            record: [],
            wave_visible: false,
            remark_visible: false,
            result_visible: false,
            phone_record: [],
            stat_data: [],   //统计数据
            thinking_time: 0,
            all_time: 0,
            read_again: false,
            level: -1,//本次评级
            round: 1, //第几轮练习
            pro_color: [
                {color: '#f56c6c', percentage: 20},
                {color: '#e6a23c', percentage: 40},
                {color: '#5cb87a', percentage: 60},
                {color: '#1989fa', percentage: 80},
                {color: '#6f7ad3', percentage: 100}
            ],//进度条颜色
            tip: '请认读屏幕中看到的单词',
            tipshow: true, //提示显示
            ct_show: false ,//倒计时显示
            // btn_disabled: true,
            btn_start_show: false,
            btn_next_show: false,
            btn_again_show: false,
            percentage: 0,
            //单词显示
            content_flow: [],
            content_colors: [],
            audio_stack: [],
            audio_ended: false,
            audio_state_now: -1,
            audio_state: {
                start: 0,
                countdown: 1,
                remark: 2,
                end: 3,
                tick: 4
            },
            audio_times: 0,
            img_show: false,
            word_image_url: '',
            audiourl: '',
            showRule: true,
            btn_show: false,
            btn_hi_show: true,
        }
    },
    computed: {
        getProficiency() {
            if (this.thinking_time < 1200)
                return '熟练'
            else if (this.thinking_time < 1800)
                return '一般'
            else return '不熟练'
        },
        words() {         
            return this.word_list.filter(word => word.level != 0)
        },
        RecordofRemark() {
            return {
                content: this.word_list[this.idx].word_content, 
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
    mounted: function() {
        this.requestData()
        // this.audioPlay_1('321audio.wav', () => { //引导录音结束出现开始按钮
        //     this.btn_start_show = true
        // })   
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
        btn_next_show(val) {
            if (val)
                this.audioPlay('ringaudio.mp3')
        }
    },
    methods: {
        //录音结束事件
        recordEnd(obj) {
            this.wave_visible = false
            this.thinking_time = obj.thinking_time
            this.recording = obj.recording
            this.blob = obj.blob
            this.duration = obj.duration
            this.record.push({
                content: this.word_list[this.idx].word_content,
                thinking_time: this.thinking_time
            })
            // let el_audio = new Audio(window.URL.createObjectURL(this.blob))
            // setTimeout(() => {
            //     this.word_image_url = "https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/wordphoto/" + this.word_list[this.idx].word_content + ".png"
            //     this.img_show = true 
            //     el_audio.play()
            // }, 500)
            const self = this
            this.audiourl = window.URL.createObjectURL(this.blob)
            this.$refs.audioplay.load()
            this.$refs.audioplay.oncanplay = function() {
                self.word_image_url = "https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/wordphoto/" + self.word_list[self.idx].word_content + ".png"
                self.img_show = true 
                self.$refs.audioplay.play()
            }
            this.$refs.audioplay.onended = function() {
                self.img_show = false 
            }      
        },
        //关闭评价页面
        remarkClose(val) {
            this.level = val.level//评价等级
            if (this.level == 1 && this.read_again == true)
                this.level = 2
            this.content_colors = val.color
            this.content_flow = this.phone_record
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
        //关闭结果页面
        resultClose(val) {
            this.result_visible = val
            //第二次练习
            this.requestData()
            this.idx = 0
            this.btn_start_show = true
            this.btn_next_show = false
            this.btn_again_show = false
            this.content_flow = []
            this.content_colors = []
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
                self.content_flow.push({phone: self.word_list[self.idx].word_content})
                self.content_colors.push('black')
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
                //console.log(res)
                self.score = res.data.pron_total_score
                self.phone_record = res.data.phone_record         
            }).then(() => {
                self.remark_visible = true
            }).catch((err) => console.log(err))
        },
        //下一题跳转
        next() {
            //this.idx++
            this.btn_next_show = false
            if (this.idx + 1 < this.len) {  
                this.idx++ 
                this.percentage = Math.ceil(this.idx * 100 / this.len)
                this.content_flow = []
                this.content_colors = []
                this.content_flow.push({phone: this.word_list[this.idx].word_content})
                this.content_colors.push('black')    
                this.read_again = false 
                this.btn_again_show = false
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
            }
        },
        //答题准备
        prepare() {
            this.all_time = new Date()
            this.btn_start_show = false
            this.ct_show = true
            this.audioCountdown()
            setTimeout(() => {
                this.tipshow = false
                this.ct_show = false
                this.prompt()
            }, 5000)
        },
        //答题提示
        prompt() {
            //const self = this
            this.remark_visible = false  
            this.audio_state_now = this.audio_state.tick
            //this.audioPlay('starttips.mp3')  
            this.audioPlay_1('starttips.mp3', () => {//提示音后打开录音组件
                this.wave_visible = true
                this.recording = true 
            })                
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
        //重新录音
        reRecord() {
            console.log('重新录音')
            this.prompt()
        }, 
        //播放语音
        audioPlay(content) {           
            // let helen_audio = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/' + content
            // let el_audio = new Audio(helen_audio)
            this.audiourl = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/' + content
            // setTimeout(() => {
            //     el_audio.play()
            // }, 400)
            this.$refs.audioplay.load()
            const self = this  
            this.$refs.audioplay.oncanplay = function() {
                setTimeout(() => {
                    self.$refs.audioplay.play()
                }, 400)    
            }
            this.$refs.audioplay.onended = function() {
                let content = self.audio_stack.pop()
                if (content)
                    self.audioPlay(content)
            }
        },
        audioPlay_1(content, callback) {           
            // let helen_audio = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/' + content
            // let el_audio = new Audio(helen_audio)
            // setTimeout(() => {
            //     el_audio.play()
            // }, 500) 
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
            this.audio_state_now = this.audio_state.remark
            if (this.level == 0) {
                let goodaudios = ['goodaudio0.wav','goodaudio1.wav','goodaudio2.wav','goodaudio3.wav','goodaudio4.wav']
                this.audioPlay_1(goodaudios[Math.floor(Math.random() * 5)], () => {
                    this.btn_next_show = true
                })
            }
            else if (this.level == 1) {
                let normalaudios = ['normalaudio0.wav', 'normalaudio1.wav', 'normalaudio2.wav', 'normalaudio3.wav', 'normalaudio4.wav']
                this.audioPlay_1(normalaudios[Math.floor(Math.random() * 5)], () => {
                    this.prompt()
                })
            }
            else {
                let badaudios = ['badaudio0.wav', 'badaudio1.wav', 'badaudio2.wav', 'badaudio3.wav', 'badaudio4.wav']
                this.audioPlay_1(badaudios[Math.floor(Math.random() * 5)], () => {
                    this.btn_again_show = true
                })
            }
        },
        //倒计时录音
        audioCountdown() {
            this.audio_state_now = this.audio_state.countdown
            this.audio_stack = ['readyaudio.wav', 'oneaudio.wav', 'twoaudio.wav', 'threeaudio.wav']
            let content = this.audio_stack.pop()
            this.audio_state_now = this.audio_state.countdown
            this.audioPlay(content) 
        },
        //再听三遍录音
        btnAgainClick() {
            //console.log(this.word_list[this.idx].word_content)
            this.img_show = true
            this.audio_times = 0
            // let audio = 'https://www.worith.cn/api/pro_audio?code=2&content=' + this.word_list[this.idx].word_content
            // let el_audio = new Audio(audio)
            this.audiourl = 'https://www.worith.cn/api/pro_audio?code=2&content=' + this.word_list[this.idx].word_content
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
        hideThis(){
            this.showRule = false
            this.audioPlay_1('321audio.wav', () => { //引导录音结束出现开始按钮
            this.btn_start_show = true
        })
        },
        audioRule(){
            this.btn_hi_show = false
            setTimeout(() => {
                this.audiourl = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/welcomeaudio.wav'
                this.$refs.audioplay.load()
                const self = this
                this.$refs.audioplay.oncanplay = function() {
                    self.$refs.audioplay.play()
                }
                
                this.$refs.audioplay.onended = function() {
                    self.btn_show = true
                }
            }, 500)
        }
    }
}

</script>

<style>
    .font-title{
        font-size: 1.5em;
        font-weight: bold;
    }
    #content{
        font-size: 3.75em;
        font-weight: bold;
        color:black;
        animation:turn 3s;
    }
    #remark{
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        margin-top: 8%;
    }
    @keyframes turn
    {
        0% {color: black;}
        25% {color: rgba(10, 194, 126, 1);}
        50% {color: black;}
        75% {color: rgba(10, 194, 126, 1);}
        100% {color: black;}
    }
    #img_helen{
        width: auto;
        height: auto;
    }
    #btn_go{
        float: left;
        cursor: pointer;
        width: 150px;
        height: 150px;
        font-size: 50px;
        border-radius:50%;
        background-color: rgba(10, 194, 126, 1);
        border: 1px solid #d5d5d5;
    }
    #div_bi{
        width: 60%;
        float: right;
    }
</style>