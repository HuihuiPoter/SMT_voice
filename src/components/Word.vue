<template>
    <div id="page">
        <Voice @recordend="recordend" @updatelen="updatelen" @updateidx="updateidx" @showbox="showbox"></Voice>
        <Info :len="len" :idx="idx" :record_="record"></Info>
        <Detailbox :isshow="is_show" @closebox="closebox" :phonerecord="phone_record" :_type="type"></Detailbox>
    </div>
</template>

<script>
import Voice from "./Voice"
import Info from "./Info"
import Detailbox from "./Detailbox"

export default {
    name: "Word",
    components: {
        Voice,
        Info,
        Detailbox
    },
    data(){
        return {
            idx: 0,
            record: [],
            is_show: false,
            phone_record: [],
            len: 65536,
            type: "word"
        }
    },
    methods: {
        recordend(value){
            this.record = value.record
            this.idx = value.idx
            this.phone_record = value.phone_record
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
        top: 20px;
    } */
</style>