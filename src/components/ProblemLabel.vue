<template>
    <div id="prog_container" :style="marginleft">
        <div :class="is_finished?'number_true':'number_false'">{{num}}</div>
        <div v-if="!is_finished" class="false_label_container">
            <div id="lefttop_rightbottom_false"></div>
            <div id="leftbottom_righttop_false"></div>
        </div>
        <div v-else class="true_label_container">
            <div id="lefttop_rightbottom_true"></div>
            <div id="leftbottom_righttop_true"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProblemLabel',
    props: {
        finished: Boolean,
        ml: Object,
        no: Number
    },
    watch: {
        finished(val){
            this.is_finished = val
        }
    },
    data() {
        return {
            is_finished: this.finished,
            num: this.no,
            marginleft: this.ml
        }
    }
}
</script>

<style>
    #prog_container{
        position: absolute;
        z-index: 1;
        /* margin-left: 26%; */
        margin-top: 7.3%;
        width: 3vw;
        height: 3vw;
    }
    .number_false{
        position: inherit;
        z-index: 2;
        border: 0.1vw solid #2D74BA;
        color: #2D74BA;
        font-weight: bold;
        font-size: 1.3vw;
        width: 80%;
        height: 80%;
        background-color: #FFFFFF;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .number_true{
        position: inherit;
        z-index: 2;
        border: 0.1vw solid #FFFFFF;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 1.3vw;
        width: 80%;
        height: 80%;
        background-color: #2D74BA;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .false_label_container{
        z-index: 3;
        position: inherit;
        top: 55%;
        left: 55%;
        width: 35%;
        height: 35%;
        background-color: #EA5654;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #lefttop_rightbottom_false{
        position: inherit;
        z-index: 2;
        width:70%;
        height:12%;
        background-color:#ffffff;
        border-radius:50%;
        transform: rotate(45deg);
    }
    #leftbottom_righttop_false{
        position: inherit;
        z-index: 3;
        width:70%;
        height:12%;
        background-color:#ffffff;
        border-radius:50%;
        transform: rotate(-45deg);
    }
    .true_label_container{
        z-index: 3;
        position: inherit;
        top: 55%;
        left: 55%;
        width: 35%;
        height: 35%;
        background-color: #46B776;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #lefttop_rightbottom_true{
        position: inherit;
        z-index: 2;
        left: 16%;
        top: 55%;
        width: 30%;
        height: 12%;
        background-color:#ffffff;
        border-radius: 20%;
        transform: rotate(45deg);
    }
    #leftbottom_righttop_true{
        position: inherit;
        z-index: 3;
        left: 32%;
        width:60%;
        height:12%;
        background-color:#ffffff;
        border-radius:20%;
        transform: rotate(-45deg);
    }
</style>