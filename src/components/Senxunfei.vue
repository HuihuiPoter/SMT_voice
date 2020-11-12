<template>
    <div id="page">
        <!-- <h4>句子智慧评测（讯飞）</h4> -->
        <VoiceSxunfei @recordend="recordend" @updatelen="updatelen" @updateidx="updateidx" @showbox="showbox"></VoiceSxunfei>
        <Info :len="len" :idx="idx" :record_="record"></Info>
        <Detailbox :isshow="is_show" @closebox="closebox" :wordsrecord="words_record" 
        :_type="type" :seninfo="sen_info"></Detailbox>
    </div>
</template>

<script>
import VoiceSxunfei from "./VoiceSxunfei"
import Info from './Info'
import Detailbox from './Detailbox'

export default {
    name: "Senxunfei",
    components: {
        VoiceSxunfei,
        Info,
        Detailbox
    },
    data(){
        return {
            idx: 0,
            record: [],
            len: 65536,
            is_show: false,
            words_record: [],
            sen_info:{},
            type: "senxunfei"
        }
    },
    methods: {
        recordend(value){
            this.record = value.record
            this.idx = value.idx
            this.words_record = value.words_record
            this.sen_info = value.sen_info
            //console.log(this.words_record)
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
    }
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