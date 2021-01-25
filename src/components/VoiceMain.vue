<template>
    <div>
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
                    <div id="remark">[没有音标]</div>  
                    <div id="remark" v-if="btn_again_show">再听一次：
                        <el-button type="primary" icon="el-icon-phone-outline" circle @click="btnAgainClick"></el-button>
                    </div>
                    <audio :src="myaudio" autoplay></audio>          
                </div>
                <div style="margin-top: 5%;text-align: center;">
                    <Countdown v-if="ct_show"></Countdown>
                    <Wave v-if="wave_visible"></Wave>
                </div>
                
                <div v-show="btn_next_show">
                <el-button type="warning" size="default" @click="reRecord" icon="el-icon-refresh" v-show="btn_show">重新录音</el-button>
                    <el-button type="success" size="medium" @click="next">
                        下一个<i class="el-icon-arrow-right el-icon--right"></i>
                    </el-button>
                </div> 
            </el-col>
            <el-col :span="5" :offset="3">
                <div>
                    <img src="../assets/Helen.png" alt="Teacher Helen" srcset="" height="220" width="100">
                </div>
                <Remark v-if='remark_visible' :record="RecordofRemark"
                    @remarkClose="remarkClose">
                </Remark>
            </el-col>
        </el-row>
        

        
        <el-row :gutter="20" style="margin-top: 8%">
            <el-col :span="10" :offset="10">
                 <div v-if="btn_start_show">
                    <el-button type="primary" size="medium" @click="prepare" icon="el-icon-edit">开始</el-button>
                </div>
            </el-col>
        </el-row>
        
        <Recorder :recording="recording" @recordEnd="recordEnd"></Recorder>
        <UpShow v-if="result_visible" title="本次练习成果">
            <Result v-if="result_visible" :stat="stat_data" :time="all_time" @resultClose="resultClose"></Result>
        </UpShow>
    </div>
</template>

<script>
import axios from "axios"
// import Table from './Table'
import UpShow from './UpShow'
import Wave from './Wave'
import Remark from './Remark'
import Recorder from './Recorder'
import Result from './Result'
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
        Result,
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
            btn_show: false,
            btn_start_show: false,
            btn_next_show: false,
            btn_again_show: false,
            myaudio: '', 
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
                end: 3
            }
        }
    },
    computed: {
        getProficiency() {
            if (this.thinking_time < 800)
                return '熟练'
            else if (this.thinking_time < 1600)
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
        // this.audioPlay('welcomeaudio', 10000).then(() => {
        //     this.audioPlay('321audio', 6000).then(() => {
        //         this.btn_start_show = true 
        //     })   
        // })
        this.audio_stack = ['321audio' ,'welcomeaudio']  
        let content = this.audio_stack.pop() 
        this.audio_state_now = this.audio_state.start
        this.audioPlay(content)   
    },
    watch: {
        recording(newVal) {
            if (newVal === false) {
                this.submit()              
            }
        },
        audio_ended(val) {
            //引导录音结束
            if (val == true && this.audio_state_now == this.audio_state.start && !this.audio_stack.length) 
                this.btn_start_show = true
            //评价结束
            if (val == true && this.audio_state_now == this.audio_state.remark && !this.audio_stack.length){
                if (this.level == 1)
                    this.prompt()
                else
                    this.btn_next_show = true
                if (this.level == 2)
                    this.btn_again_show = true
            }
            if (val == true && this.audio_stack.length) {
                let content = this.audio_stack.pop()
                this.audioPlay(content)  
            }
            if (val == true)
                this.audio_ended = false
        },
        level(val) {
            if (val === 1 && this.read_again === false) {
                this.read_again = true
            }
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
            this.btn_show = true
            this.myaudio = window.URL.createObjectURL(this.blob)
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
            this.btn_show = false
            this.btn_start_show = true
            this.btn_next_show = false
            this.btn_again_show = false
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
                this.btn_show = false     
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
                this.audioPlay('endaudio')
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
            const self = this
            this.remark_visible = false  
            // this.$message({
            //     message: '准备开始录音了，集中精神',
            //     type: 'warning'
            // })
            setTimeout(() => {
                self.wave_visible = true
                self.recording = true//开启录音组件    
            }, 1000)                      
            
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
            let helen_audio = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/' + content +'.wav'
            let el_audio = new Audio(helen_audio)
            setTimeout(() => {
                el_audio.play()
            }, 400)
            const self = this  
            el_audio.onended = function() {
                self.audio_ended = true
            }
        },
        //三种结果录音
        audioRemark() {
            this.audio_state_now = this.audio_state.remark
            if (this.level == 0) {
                this.audioPlay('goodaudio')
            }
            else if (this.level == 1) {
                this.audioPlay('normalaudio')
            }
            else {
                this.audioPlay('badaudio')
            }
        },
        //倒计时录音
        audioCountdown() {
            // const self = this
            // new Promise((resolve) => {
            //     self.audioPlay('threeaudio', 1)
            //     setTimeout(resolve, 999)
            // }).then(() => {
            //     return new Promise((resolve) => {
            //         self.audioPlay('twoaudio', 1)
            //         setTimeout(resolve, 999)
            //     })
            // }).then(() => {
            //     return new Promise((resolve) => {
            //         self.audioPlay('oneaudio', 1)
            //         setTimeout(resolve, 999)
            //     })
            // }).then(() => {
            //     return new Promise((resolve) => {
            //         self.audioPlay('readyaudio', 1)
            //         setTimeout(resolve, 999)
            //     })
            // })
            this.audio_state_now = this.audio_state.countdown
            this.audio_stack = ['readyaudio', 'oneaudio', 'twoaudio', 'threeaudio']
            let content = this.audio_stack.pop()
            this.audio_state_now = this.audio_state.countdown
            this.audioPlay(content) 
        },
        //再听三遍录音
        btnAgainClick() {
            console.log(this.word_list[this.idx].word_content)
            let audio = 'https://www.worith.cn/api/pro_audio?code=2&content=' + this.word_list[this.idx].word_content
            let el_audio = new Audio(audio)
            let total = 4.5
            this.dec(el_audio, 1.5, total)
        },
        //三遍录音
        dec(el, time_span, total_time) {
            if (total_time === 0)
                return
            const self = this
            new Promise((resolve) => {
                setTimeout(() => {
                    el.play()
                    resolve()
                }, time_span * 1000)
            }).then(() => {
                self.dec(el, time_span, total_time - time_span)
            })
            
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
</style>