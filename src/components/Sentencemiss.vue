<template>
    <div id="page">
        <VoiceSmiss @recordend="recordend" @updatelen="updatelen" @updateidx="updateidx" @showbox="showbox"></VoiceSmiss>
        <Info :len="len" :idx="idx" :record_="record"></Info>
        <!-- <Detailbox :isshow="is_show" @closebox="closebox" :wordsrecord="words_record" :_type="type"></Detailbox> -->
        
    </div>
</template>

<script>
import Info from "./Info"
import VoiceSmiss from './VoiceSmiss'

export default {
    name: "Sentencemiss",
    components: {
        Info,
        VoiceSmiss
    },
    data(){
        return {
            idx: 0,
            record: [],
            len: 65536,
            is_show: false,
            words_record: [],
            type: "sentence"
        }
    },
    methods: {
        recordend(value){
            this.record = value.record
            this.idx = value.idx
            this.words_record = value.words_record
        },
        updatelen(value){
            this.len = value
        },
        updateidx(value) {
            this.idx = value
        },
        showbox(value){
            this.is_show = value
        },
        closebox(value){
            this.is_show = value
        }
    },
}
</script>

<style>
    /* #page{
        position: absolute;
        width: 100%;
        left: 160px;
        top: 100px;
    } */
</style>