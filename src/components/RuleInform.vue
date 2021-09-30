<template>
    <div id="rulebox" align="center" :style="{width: bg_width + 'px', height: bg_height + 'px'}">
        <div class="left_btn">
            <img class="img_btn" src="../assets/test_board/prev.png" alt="" @click="pre">
            <img class="img_btn" src="../assets/test_board/main.png" alt="" @click="main">
        </div>
        <!-- 中央图标 -->
        <transition name="fade">          
            <!-- <Countdown v-else :num="num"></Countdown> -->
            <div class="div_count" >
                <img v-if="!show_ct" v-show="show_center" class="img_countdown" src="../assets/rule/start.png" alt="" @click="ctBegin">
                <Countdown v-else :num="num"></Countdown>
            </div>
            
        </transition>
        
        <!-- helen老师 -->
        <div class="div_teacher">
            <Teacher url="https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/intro.gif"
            :dialog_view="!dialog_show" :dialog="dialog_item"></Teacher>
        </div>
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
        no: Number,
        bg_width: Number,
        bg_height: Number
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
            bgWidth: 1080,
            bgHeight: 720
        }
    },
    mounted: function(){
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
        background-image: url(../assets/public/background.png);
        background-size: 100%;
    }
    .img_countdown{
        position: absolute;
        transform: translate(-50%, 50%);
        width: 56%;
        height: auto;
        cursor: pointer;
    }
    .left_btn{
        position: relative; 
        top: 8%;
        right: 40%;       
    }
    .img_btn{
        width: 4%;
        margin: 0 1%;
        height: auto;
        cursor: pointer;
    }
    .div_teacher{
        position: relative;
        width: 16%;
        height: 56%;
        right: 36%;
        bottom: 25%;
    }
    .div_count{
        position: relative;
        /* transform: translate(-50%, 50%); */
        width: 34vw;
        height: 34vw;
        top: 16%;
        /* left: 49%; */
    }
    /* @media only screen and (max-width: 1600px){
        #div_teacher{
            position: absolute;
            z-index: 1;
            width: 18%;
            height: 70%;
            left: 1%;
            top: 38%;
        }
        #img_prev{
            left:3%;
        }
        #img_main{
            left: 7%;
        }
    } */
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