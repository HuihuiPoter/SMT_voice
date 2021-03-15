<template>
    <div id="div_recording" align="center">
        <!-- 显示单词 -->
        <div id="div_word" align="center">
            {{showing_content.word_content}}
        </div>
        <!-- 显示音标 -->
        <!-- 显示图片 -->
        <!-- 录音按钮 -->
        <img id="img_voice" src="../assets/test_board/voice.png" alt="" @click="mention">
    </div>
</template>

<script>
export default {
    name: 'Recording',
    props: {
        content: Object
    },
    data() {
        return {
            showing_content: this.content
        }
    },
    watch: {
       content(val) {
           this.showing_content = val
       }
    },
    computed: {
        // getWord() {
        //     return this.words[this.show_idx].word_content
        // }
    },
    mounted: function() {
        
    },
    methods: {
        mention() {
            alert('已经在录音了哦')
        }
    }
}
</script>

<style>
    #div_recording{
        position: absolute;
        z-index: 1;
        margin-top: 15%;
        margin-left: 20%;
        width: 60%;
    }
    #div_word{
        color: #5A5657;
        font-size: 5vw;
        font-weight: bold;
    }
    #img_voice{
        width: 25%;
        height: auto;
        cursor: pointer;
    }
</style>