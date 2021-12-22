<template>
    <div class="slide_in" id="rulebox" align="center" :style="{transform: bg_ratio}">
        <div class="left_btn">
            <img class="img_btn" src="../assets/test_board/prev.png" alt="" @click="pre">
            <img class="img_btn" src="../assets/test_board/main.png" alt="" @click="main">
        </div>
        <!-- 中央图标 -->        
            <!-- <Countdown v-else :num="num"></Countdown> -->
        <div class="div_count">
            <img v-if="!show_ct" v-show="ct" class="img_countdown" src="../assets/rule/start.png" alt="" @click="ctBegin">
            <Countdown v-else :num="num"></Countdown>
            <!-- <Countdown :num="num"></Countdown> -->
        </div>
        <!-- helen老师 -->
        <div class="div_teacher">
            <Teacher url="https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/photo/intro.gif"
            :dialog_view="!dialog_show" :dialog="dialog_item"></Teacher>
        </div>
    </div>
</template>

<script>
// import img_three from '../assets/rule/three.png'
// import img_two from '../assets/rule/two.png'
// import img_one from '../assets/rule/one.png'
// import img_ready from '../assets/rule/ready.png'
// import img_go from '../assets/rule/go.png'
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
        bg_ratio: String
    },
    watch: {
        dialog_close(val){
            this.dialog_show = val
        },
        rule_dialog(val) {
            this.dialog_item = val
        },
        no(val) {
            // console.log(val)
            this.num = val
            // this.countdownURL = this.countdownURLs[val]
            if (val < 0){
                this.$emit('nextStep', 2)
                return
            } 
        }
    },
    data() {
        return {
            // countdownURL: '',
            // countdownURLs: [img_go, img_ready, img_one, img_two, img_three],
            dialog_item: this.rule_dialog,
            dialog_show: this.dialog_close,
            num: this.no,
            show_ct: false,
        }
    },
    mounted: function(){
        this.$emit('ruleStart', true)
    },
    methods: {
        pre() {
            // console.log('返回上一页')
            // this.$emit('nextStep', 0)
            this.$router.replace('/course')
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
    .slide_in{
        animation: pulse;
        animation-duration: 1s;
    }
    #rulebox{
        background-image: url(../assets/public/background.jpg);
        background-size: 100%;
        width: 1920px;
        height: 1080px;
        transform-origin: left top;
    }
    .img_countdown{
        position: absolute;
        /* transform: translate(-50%, 50%); */
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
        cursor: pointer;
    }
    .left_btn{
        position: relative; 
        top: 5%;
        right: 42%;       
    }
    .img_btn{
        width: 4%;
        margin: 0 1%;
        height: auto;
        cursor: pointer;
    }
    .div_teacher{
        position: absolute;
        width: 16%;
        /* height: 56vw; */
        /* right: 36%; */
        top: 470px;
        left: 5%;
    }
    .div_count{
        position: absolute;
        width: 500px;
        height: 500px;
        top: 325px;
        left: 37%;
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