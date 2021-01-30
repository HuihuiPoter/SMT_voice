<template>
    <div id="rulebox" align="center">
        <img id="img_helen" src="../assets/Helen.png" alt="Teacher Helen" srcset="">
        <div v-show="btn_show">
            <el-button type="primary" @click="audioPlay">我没听懂</el-button>
            <el-button type="success" @click="hideThis">我明白了</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RuleInform',
    data() {
        return {
            btn_show: false
        }
    },
    mounted: function(){
        this.audioPlay()
    },
    methods: {
        hideThis(){
            this.$router.replace('/main/voice_main')
        },
        audioPlay(){
            this.btn_show = false
            setTimeout(() => {
                let helen_audio = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/audio/welcomeaudio.wav'
                let el_audio = new Audio(helen_audio)
                el_audio.play()
                const self = this
                el_audio.onended = function() {
                    self.btn_show = true
                }
            }, 500)
        }
    }
}
</script>

<style>
    #rulebox{
        margin-top: 10%;
    }
    #img_helen{
        width: auto;
        height: auto;
    }
</style>