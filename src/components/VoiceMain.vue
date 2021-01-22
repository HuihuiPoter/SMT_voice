<template>
    <div>
        <slot></slot>
        <el-row :gutter="20" style="margin-top: 5%">
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
                        <div id="content" style="text-align: center;">{{word_list[idx].word_content}}</div>
                    </el-tooltip>
                    <div id="remark">[没有音标]</div>  
                    <audio :src="myaudio" autoplay></audio>          
                </div>
                <div style="margin-top: 5%;text-align: center;">
                    <Countdown v-if="ct_show"></Countdown>
                    <Wave v-if="recording"></Wave>
                </div>
            </el-col>
            <!-- <el-col :span="4" :offset="2">
                <Table :_record="record"></Table>
            </el-col> -->
            <el-col :span="4" :offset="2">
                <Remark v-if='remark_visible' :record="RecordofRemark" :read_again="read_again"
                    @remarkClose="remarkClose">
                </Remark>
            </el-col>
        </el-row>
        

        
        <el-row :gutter="20" style="margin-top: 8%">
            <el-col :span="10" :offset="9">
                <el-tooltip content="点击按钮开始本次训练" placement="left" effect="dark" :value="tipshow">
                    <el-button type="primary" size="medium" @click="prepare" icon="el-icon-edit">开始训练</el-button>
                </el-tooltip>
                <!-- <el-tooltip content="点击按钮重新录音" placement="left" effect="dark" :value="tipshow"> -->
                <el-button type="warning" size="default" @click="reRecord" icon="el-icon-refresh" v-show="btn_show">重新录音</el-button>
                <!-- </el-tooltip> -->
                <el-tooltip content="点击按钮切换单词" placement="right" effect="dark" :value="tipshow">
                    <el-button type="success" size="medium" @click="next" :disabled="btn_disabled">
                        下一个<i class="el-icon-arrow-right el-icon--right"></i>
                    </el-button>
                </el-tooltip>   
            </el-col>
        </el-row>
        
        <Recorder :recording="recording" @recordEnd="recordEnd"></Recorder>
        <UpShow v-if="result_visible" title="本次练习成果">
            <Result v-if="result_visible" :stat="stat_data" @resultClose="resultClose"></Result>
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
            blob: null,
            record: [],
            wave_visible: false,
            remark_visible: false,
            result_visible: false,
            phone_record: [],
            stat_data: [],   //统计数据
            thinking_time: 0,
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
            btn_disabled: true,
            btn_show: false,
            myaudio: ''
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
        percentage() {
            return Math.ceil(this.idx * 100 / this.len)
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
    },
    watch: {
        recording(newVal) {
            if (newVal === false) {
                this.submit()              
            }
        },
        remark_visible(val) {
            //评价界面关闭时进入下一题         
            if (val === false && this.read_again === false) {
                this.updateStat()
            }
        },
        round() {
            this.idx = 0
            this.remark = '暂无评价'
            this.record = []
            this.word_list = this.words
            this.len = this.word_list.length
            this.stat_data = []
            this.prompt()
        },
        level(val) {
            if (val === 1 && this.read_again === false) {
                this.read_again = true
                this.btn_disabled = true           
                this.prompt()
            }
        }
    },
    methods: {
        //录音结束事件
        recordEnd(obj) {
            this.thinking_time = obj.thinking_time
            this.recording = obj.recording
            this.blob = obj.blob
            this.record.push({
                content: this.word_list[this.idx].word_content,
                thinking_time: this.thinking_time
            })
            this.btn_show = true
            this.myaudio = window.URL.createObjectURL(this.blob)
        },
        //关闭评价页面
        remarkClose(val) {
            //this.remark_visible = val.visible
            this.btn_disabled = val.btn_disabled
            this.level = val.level//评价等级
            Vue.set(this.word_list[this.idx], 'level', this.level)
            if (this.level === 2 && this.word_list[this.idx].round === 1){//记录不及格的单词再次训练
                this.word_list.push(this.word_list[this.idx])
                this.len = this.word_list.length
                console.log(this.word_list[this.len - 1])
                Vue.set(this.word_list[this.len - 1], 'round', 2)
            }
        },
        //关闭结果页面
        resultClose(val) {
            this.result_visible = val
            //第二次练习
            this.requestData()
            this.idx = 0
        },
        //请求初始数据
        requestData() {
            let url = "https://www.worith.cn/api/pro_word/?course_id=1"
            //let url = "http://192.168.137.1:8000/api/pro_word/?course_id=1"
            let self = this
            axios.get(url).then(function (responce) {
                self.word_list = responce.data.data
                self.len = self.word_list.length
                for (let item of self.word_list) {
                     Vue.set(item, 'round', 1)
                }
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
                self.score = res.data.pron_total_score
                self.phone_record = res.data.phone_record         
            }).then(() => {
                self.remark_visible = true
            }).catch((err) => console.log(err))
        },
        //下一题跳转
        next() {
            //this.idx++
            if (this.idx + 1 < this.len) {  
                this.idx++ 
                this.btn_show = false     
                this.read_again = false 
                console.log('next one')
                this.prompt()
            }
            else {
                this.$message({
                    message: '测试完成',
                    type: 'success'
                })
                this.result_visible = true
            }
        },
        //答题准备
        prepare() {
            this.ct_show = true
            setTimeout(() => {
                this.tipshow = false
                this.ct_show = false
                this.prompt()
            }, 4000)
        },
        //答题提示
        prompt() {
            const self = this
            this.remark_visible = false 
            setTimeout(() => {
                this.$message({
                    message: '准备开始录音了，集中精神',
                    type: 'warning'
                })
                setTimeout(() => {
                    self.recording = true//开启录音组件
                }, 1000)                      
            }, 2000) //2s之后开始录音
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