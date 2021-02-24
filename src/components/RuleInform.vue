<template>
    <div id="rulebox" align="center">
        <!-- <el-button type="primary" @click="audioPlay">我没听懂</el-button> -->
        <div id="div_bi">
            <button id="btn_go" type="success" @click="audioPlay" v-if="btn_hi_show">Hello</button>
            <button id="btn_go" type="success" @click="hideThis" v-if="btn_show">GO</button>
            <img id="img_helen" src="../assets/Helen.png" alt="Teacher Helen" srcset="">  
            <audio ref="myaudio">
                <source :src="helen_audio" type="audio/wav">
                <source :src="helen_audio" type="audio/mpeg">
            </audio> 
        </div>   
    </div>
</template>

<script>
export default {
    name: 'RuleInform',
    data() {
        return {
            btn_show: false,
            btn_hi_show: true,
            helen_audio: ''
        }
    },
    mounted: function(){
        //this.audioPlay()
    },
    methods: {
        hideThis(){
            this.$router.replace('/main/voice_main')
        },
        audioPlay(){
            this.btn_hi_show = false
            setTimeout(() => {
                this.helen_audio = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/welcomeaudio.wav'
                this.$refs.myaudio.load()
                const self = this
                this.$refs.myaudio.oncanplay = function() {
                    self.$refs.myaudio.play()
                }
                
                this.$refs.myaudio.onended = function() {
                    self.btn_show = true
                }
            }, 500)
        }
    }
}
</script>

<style>
    #rulebox{
        margin-top: 5%;
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