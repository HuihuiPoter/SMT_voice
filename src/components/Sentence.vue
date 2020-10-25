<template>
    <div id="page">
        <VoiceS @recordend="recordend" @updatelen="updatelen" @updateidx="updateidx" @showbox="showbox"></VoiceS>
        <Info :len="len" :idx="idx" :record_="record"></Info>
        <Detailbox :isshow="is_show" @closebox="closebox" :wordsrecord="words_record"></Detailbox>
    </div>
</template>

<script>
import VoiceS from "./VoiceS"
import Info from './Info'
import Detailbox from './Detailbox'
export default {
    name: "Sentence",
    components: {
        VoiceS,
        Info,
        Detailbox
    },
    data(){
        return {
            idx: 0,
            record: [],
            len: 65536,
            is_show: false,
            words_record: []
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
        updaterecord(value) {
            this.record = value
        },
        showbox(value){
            this.is_show = value
        },
        closebox(value){
            this.is_show = value
        }
    }
}
</script>

<style>
    #page{
        position: absolute;
        width: 100%;
        left: 160px;
        top: 100px;
    }
</style>