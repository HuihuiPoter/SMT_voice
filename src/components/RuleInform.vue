<template>
    <div id="rulebox" align="center">
        <!-- 中央图标 -->
        <transition name="fade">
            <img v-if="!show_ct" v-show="show_center" class="img_countdown" src="../assets/rule/start.png" alt="" @click="ctBegin">
            <!-- <img v-else class="img_countdown" :src="countdownURL" alt=""> -->
            <Countdown v-else :num="num"></Countdown>
        </transition>
        
        <!-- helen老师 -->
        <transition name="fade">
            <div id="div_teacher">
                <Teacher url="https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/intro.gif"
                :dialog_view="!dialog_show" :dialog="dialog_item"></Teacher>
            </div>
            
        </transition>
        
        <!-- 按钮 -->
        <!-- <img v-show="!dialog_show" id="img_follow" src="../assets/rule/following.png" alt="" @click="follow"> -->
        <img id="img_prev" src="../assets/test_board/prev.png" alt="" @click="pre">
        <img id="img_main" src="../assets/test_board/main.png" alt="" @click="main">
        <!-- 背景板 -->
        <img id="img_bg" src="../assets/rule/background.jpg" alt=""> 
    </div>
</template>

<script>
import img_three from '../assets/rule/three.png'
import img_two from '../assets/rule/two.png'
import img_one from '../assets/rule/one.png'
import img_ready from '../assets/rule/ready.png'
import img_go from '../assets/rule/go.png'
//import img_dialog_intro from '../assets/rule/intro.png'
import Teacher from './Teacher'
import Countdown from './Countdown'
export default {
    name: 'RuleInform',
    components: {
        Teacher,
        Countdown
    },
    props: {
        dialog_close: Boolean,
        ct: Boolean,
        rule_dialog: Object,
        no: Number
    },
    watch: {
        dialog_close(val){
            this.dialog_show = val
        },
        ct(val) {
            if (val){
                this.show_center = true
            }
        },
        rule_dialog(val) {
            this.dialog_item = val
        },
        no(val) {
            // console.log(val)
            this.num = val
            this.countdownURL = this.countdownURLs[val]
            if (val < 0){
                this.$emit('nextStep', 2)
                return
            } 
        }
    },
    data() {
        return {
            countdownURL: '',
            countdownURLs: [img_go, img_ready, img_one, img_two, img_three],
            dialog_item: this.rule_dialog,
            dialog_show: this.dialog_close,
            num: this.no,
            show_ct: false,
            show_center: false,
        }
    },
    mounted: function(){
        // console.log(window.innerWidth)
        this.$emit('ruleStart', true)
    },
    methods: {
        pre() {
            // console.log('返回上一页')
            this.$emit('nextStep', 0)
        },
        main() {
            window.location.href = 'https://www.smartreelearners.com/'
        },
        ctBegin() {
            this.show_ct = true
            this.$emit('ruleStart', false)
        }
    }
}
</script>

<style>
    #rulebox{
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #img_bg{
        max-width: 100%;
    }
    .img_countdown{
        position: inherit;
        z-index: 1;
        width: 23%;
        height: auto;
        cursor: pointer;
    }
    #img_prev{
        position: absolute;
        z-index: 1;
        top: 14%;
        left: 8%;
        width: 3%;
        height: auto;
        cursor: pointer;
    }
    #img_main{
        position: absolute;
        z-index: 1;
        top: 14%;
        left: 12%;
        width: 3%;
        height: auto;
        cursor: pointer;
    }
    #div_teacher{
        position: absolute;
        z-index: 1;
        width: 16%;
        height: 70%;
        left: 8%;
        top: 22%;
    }
    @media only screen and (max-width: 1600px){
        #div_teacher{
            position: absolute;
            z-index: 1;
            width: 18%;
            height: 70%;
            left: 1%;
            top: 26%;
        }
        #img_prev{
            left:3%;
        }
        #img_main{
            left: 7%;
        }
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