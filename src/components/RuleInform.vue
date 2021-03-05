<template>
    <div id="rulebox" align="center">
        <!-- 中央图标 -->
        <img id="img_countdown" :src="countdownURL" alt="">
        <!-- helen老师 -->
        <img id="img_intro" src="../assets/teacher_helen/intro.gif" alt="">
        <img id="img_shadow" src="../assets/teacher_helen/shadow.png" alt="">
        <!-- 对话框 -->
        <img v-show="!dialog_show" id="img_dialog" :src="dialogURL" alt="">
        <!-- 按钮 -->
        <!-- <img v-show="!dialog_show" id="img_follow" src="../assets/rule/following.png" alt="" @click="follow"> -->
        <img id="img_prev" src="../assets/test_board/prev.png" alt="" @click="pre">
        <img id="img_main" src="../assets/test_board/main.png" alt="">
        <!-- 背景板 -->
        <img id="img_bg" src="../assets/rule/background.jpg" alt="" height="46.125%" width="82%"> 
    </div>
</template>

<script>
import img_three from '../assets/rule/three.png'
import img_two from '../assets/rule/two.png'
import img_one from '../assets/rule/one.png'
import img_ready from '../assets/rule/ready.png'
import img_go from '../assets/rule/go.png'
import img_dialog_intro from '../assets/rule/intro.png'
export default {
    name: 'RuleInform',
    props: {
        dialog_close: Boolean,
        ct: Boolean
    },
    watch: {
        dialog_close(val){
            this.dialog_show = val
        },
        ct(val) {
            if (val){
                this.dec()
            }
        }
    },
    data() {
        return {
            countdownURL: '',
            countdownURLs: [img_go, img_ready, img_one, img_two, img_three],
            dialogURL: img_dialog_intro,
            dialog_show: this.dialog_close,
            num: 4
        }
    },
    mounted: function(){
        this.$emit('ruleStart', true)
    },
    methods: {
        pre() {
            console.log('返回上一页')
        },
        follow() {
            console.log('下一个对话')
        },
        dec() {
            this.countdownURL = this.countdownURLs[this.num]
            setTimeout(() => {
                this.num--
                if (this.num < 0){
                    this.$emit('nextStep', 2)
                    return
                }    
                this.dec()
            }, 1000)   
        }
    }
}
</script>

<style>
    #img_countdown{
        position: absolute;
        z-index: 1;
        /* flex-shrink: 0; */
        margin-top: 12%;
        margin-left: 28%;
        width: 25%;
        height: auto;
    }
    #img_intro{
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

   
    #img_follow{
        position: absolute;
        z-index: 3;
        /* flex-shrink: 0; */
        margin-top: 23%;
        margin-left: 55%;
        width: 8%;
        height: auto;
        cursor: pointer;
    }
    #img_prev{
        position: absolute;
        z-index: 1;
        margin-top: 4%;
        margin-left: 0.1%;
        width: 8%;
        height: auto;
        cursor: pointer;
    }
</style>