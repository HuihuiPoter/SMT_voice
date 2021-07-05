<template>
    <div id="div_recording">
        <!-- 显示单词 -->
        <div v-if="showing_content.picture_show == 0" class="div_word record_margin" align="center">
            {{showing_content.word_content}}
        </div>
        <div class="record_margin" v-else-if="showing_content.picture_show == 1">
            <img class="img_word" :src="showing_content.picture_path" alt="">
        </div>
        <div v-else class="div_word record_margin">
            <span v-for="(item, idx) in showing_content.miss_idx" :key="idx + 'phone'">{{showPhone(item)}}</span>
        </div>
        <!-- 录音按钮 -->
        <div class="record_margin">
            <img id="img_voice" src="../assets/test_board/voice.gif" alt="" @click="mention">
        </div>
        
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
        //    console.log(val)
           this.showing_content = val
       }
    },
    computed: {
        showPhone() {
            // console.log(item.phone)
            return function(item) {
                if (item.is_miss == 0)
                    return item.phone
                else return '_'.repeat(item.phone.length)
            }   
        }
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
        margin-top: 4%;
        margin-left: 1%;
        width: 36%;
    }
    .div_word{
        color: #5A5657;
        font-size: 5vw;
        font-weight: bold;
    }
    #img_voice{
        width: 30%;
        height: auto;
        cursor: pointer;
    }
    .record_margin{
        margin: 4% 0 0 0;
    }
</style>