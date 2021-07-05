<template>
    <div id="prog_container">
        <div :class="label_state == states.correct?'number_true':'number_false'">{{num}}</div>
        <div v-if="label_state == states.wrong" class="false_label_container">
            <div id="lefttop_rightbottom_false"></div>
            <div id="leftbottom_righttop_false"></div>
        </div>
        <div v-else-if="label_state == states.correct" class="true_label_container">
            <div id="lefttop_rightbottom_true"></div>
            <div id="leftbottom_righttop_true"></div>
        </div>
        <div v-else-if="label_state == states.normal" class="normal_label_container">
            <div id="lefttop_rightbottom_true"></div>
            <div id="leftbottom_righttop_true"></div>
            <div id="lefttop_rightbottom_normal"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProblemLabel',
    props: {
        finished: Boolean,
        no: Number,
        state: Number
    },
    watch: {
        finished(val){
            this.is_finished = val
        },
        state(val) {
            this.label_state = val
            // console.log(this.label_state)
        }
    },
    data() {
        return {
            is_finished: this.finished,
            num: this.no,
            label_state: this.state,
            states: {
                no_state: 0,
                correct: 1,
                wrong: 2,
                normal: 3
            }
        }
    }
}
</script>

<style>
    #prog_container{
        position: relative;
        margin-left: 0.3%;
        margin-right: 0.3%;
        width: 3vw;
        height: 3vw;
    }
    @media only screen and (max-width: 1520px){
     #prog_container{
        margin-left: 0.5%;
        margin-right: 0.5%;
    }
    }
    .number_false{
        position: relative;
        z-index: 2;
        border: 0.1vw solid #257CE1;
        color: #257CE1;
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
        position: relative;
        z-index: 2;
        border: 0.1vw solid #FFFFFF;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 1.3vw;
        width: 80%;
        height: 80%;
        background-color: #257CE1;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .false_label_container{
        z-index: 3;
        position: absolute;
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
        position: absolute;
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
    .normal_label_container{
        z-index: 3;
        position: absolute;
        top: 55%;
        left: 55%;
        width: 35%;
        height: 35%;
        background-color: #FF7C06;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #lefttop_rightbottom_normal{
        position: inherit;
        z-index: 2;
        left: 36%;
        /* top: 55%; */
        width: 45%;
        height: 12%;
        background-color:#ffffff;
        border-radius: 20%;
        transform: rotate(45deg);
    }
</style>