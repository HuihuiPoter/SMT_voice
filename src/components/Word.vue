<template>
    <div id="page">
        <Voice @recordend="recordend" @updatelen="updatelen" @updateidx="updateidx"></Voice>
        <Info :len="len" :idx="idx" :record_="record"></Info>
    </div>
</template>

<script>
import Voice from "./Voice"
import Info from "./Info"

export default {
    name: "Word",
    components: {
        Voice,
        Info
    },
    data(){
        return {
            idx: 0,
            record: [],
            len: 65536
        }
    },
    methods: {
        recordend(value){
            this.record = value.record
            this.idx = value.idx
        },
        updatelen(value){
            this.len = value
        },
        updateidx(value) {
            this.idx = value
        }
    }
}
</script>

<style>
    #page{
        position: relative;
        left: 160px;
        top: 20px;
    }
</style>