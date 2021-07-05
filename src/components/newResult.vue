<template>
    <div id="result_box" align='center'>
        <!-- 按钮 -->
        <div id="div_main_again">
            <img class="mainagain" src="../assets/result/btn_backToMain.png" alt="" @click="backToMain">
            <img class="mainagain" src="../assets/result/btn_practiseAgain.png" alt="" @click="praticeAgain">
        </div>
        <div id="div_main_back">
            <img class="mainback" src="../assets/result/back.png" alt="" @click="praticeAgain">
            <img class="mainback" src="../assets/test_board/main.png" alt="" @click="backToMain">
        </div>
        
        <!-- 标题 -->
        <img id="img_titleblock" src="../assets/result/titleblock.png" alt="">
        <!-- 时间 -->
        <div class="time_pos">
            <div class="half" id="div_timeTips">本次训练消耗时间</div>
            <div class="half">
                <img id="img_timeprog" src="../assets/result/time_progress.gif" alt="">
                <div id="div_time" align="center">
                <div align="center">答题时长</div>
                <div align="center" style="color:red;">
                    {{getTime[0]}}分{{getTime[1]}}秒
                </div>
            </div>
            </div>
           
        </div>
        
        
        <div class="redgreen">
            <!-- 优秀单词数 -->
            <div class="excellent inline">
                <img class="inline" id="img_green" src="../assets/result/greenblock.png" alt="">
                <div class="inline" id="div_green">优秀单词数</div>
                <div class="inline" id="div_exnum">{{excel_num}}</div>
                <div class="inline" id="div_exTi">题</div>
            </div>
            <!-- 需巩固单词数 -->
            <div class="notgood inline">
                <img class="inline" id="img_red" src="../assets/result/redblock.png" alt="">
                <div class="inline" id="div_red">需巩固单词数</div>
                <div class="inline" id="div_notnum">{{not_excel_num}}</div>
                <div class="inline" id="div_notTi">题</div>
            </div>
        </div>
        <!-- 列表 -->
        <div class="list">
            <div class="list_title">
                <div :class="{'shape_title': true, 'green': is_good}" @click="showGood">
                    优&emsp;秀&emsp;单&emsp;词&emsp;列&emsp;表
                </div>
                <div :class="{'shape_title': true, 'red': !is_good}" @click="showNotGood">
                    需&emsp;巩&emsp;固&emsp;单&emsp;词&emsp;列&emsp;表
                </div>
            </div>
            <div class="table">
                <div class="table_row" v-for="(row, idx) in word_matrix" :key="idx + 'ex_row'">
                    <div class="table_cell" v-for="(item, index) in row" :key="index + 'ex_item'">{{item}}</div>
                </div>
            </div>
        </div>
        <!-- 背景板 -->
        <img id="img_bg" src="../assets/result/result_board.jpg" alt="">
    </div>
</template>

<script>
export default {
    name: 'newResult',
    props: {
        stat: Array,
        time: Number
    },
    data() {
        return {
            stat_data: this.stat,
            columns: [
                {
                    id: 'content',
                    label: '单词',
                },
                {
                    id: 'remark',
                    label: '评价',
                },
                // {
                //     id: 'proficiency',
                //     label: '熟练度',
                // }
            ],
            excel_num: 0,
            not_excel_num: 0,
            all_time: this.time,
            ex_stat_data: [],
            not_stat_data: [],
            word_matrix: [
                ['word', 'word', 'word', 'word'],
                ['word', 'word', 'word', 'word'],
                ['word', 'word'],
            ],
            is_good: true
        }
    },
    computed: {
        getTime(){
            let min_sec = []
            let sec = this.all_time / 1000
            min_sec.push(Math.floor(sec / 60))
            sec = sec % 60
            min_sec.push(Math.ceil(sec))
            return min_sec
        }
    },
    mounted: function() {
        // console.log(this.stat_data)
        for (let item of this.stat_data){
            if (item.remark == '优秀'){
                this.excel_num++
                this.ex_stat_data.push(item.content)
            }
            else {
                this.not_excel_num++
                this.not_stat_data.push(item.content)
            }
        }
        this.ex_stat_data = this.reshape(this.ex_stat_data, 4, 4)
        this.not_stat_data = this.reshape(this.not_stat_data, 4, 4)
        this.word_matrix = this.ex_stat_data
    },
    methods: {
        backToMain() {
            console.log('回到主界面')
            window.location.href = 'https://www.smartreelearners.com/'
        },
        praticeAgain() {
            console.log('再来一次')
            this.$emit('resultClose')
        },
        reshape(original_list, row, col) {
            let mat = []
            let idx = 0
            if (original_list.length == 0)
                return []
            for (let i = 0;i < row;i++){
                let list = []
                for (let j = 0;j < col;j++){
                    // console.log(original_list[idx])
                    list.push(original_list[idx])
                    idx++
                    if (idx >= original_list.length)
                        break
                }
                mat.push(list)
                if (idx >= original_list.length)
                        break
            }
            return mat
        },
        showGood(){
            this.is_good = true
            this.word_matrix = this.ex_stat_data
        },
        showNotGood(){
            this.is_good = false
            this.word_matrix = this.not_stat_data
        }
    }
}
</script>

<style>
    #result_box{
        position: absolute;
        /* width: 100%; */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #div_main_again{
        position: absolute;
        z-index: 1;
        top: 91%;
        width: 50%;
    }
    .mainagain{
        width: 28%;
        height: auto;
        cursor: pointer;
        margin: 0 6% 0 6%;
    }
    #div_main_back{
        position: absolute;
        z-index: 1;
        width: 10%;
        top: 4%;
        left: 1%;
    }
    .mainback {
        width: 30%;
        height: auto;
        cursor: pointer;
        margin: 0 5% 0 5%;
    }
    #img_titleblock{
        position: absolute;
        z-index: 1;
        top: 14%;
        left: 14%;
        width: 20%;
        height: auto;
    }
    .time_pos{
        position: absolute;
        z-index: 1;
        width: 30%;
        top: 14%;
        left: 62%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #img_timeprog{  
        width: 80%;
        height: auto;
    }
    .half{
        width: 50%;
    }
    #div_timeTips{
        font-size: 1.1vw;
        font-weight: bold;
        /* width: 60%; */
    }
    #div_time{
        margin-top: -50%;
        font-size: 1.1vw;
        font-weight: bold;
    }
    .inline{
        display: inline;
        margin: 0 2% 0 2%;
    }
    .excellent{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5% 0 5%;
    }
    .notgood{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5% 0 5%;
    }
    .redgreen{
        position: absolute;
        z-index: 1;
        width: 100%;
        top: 32%;
        display: flex;
        justify-content: center;
    }
    #img_green{
        width: 7%;
        height: auto;
    }
    #div_green{
        width: 50%;
        height: 50%;
        font-size: 1.4vw;
        font-weight: bold;
        border:1px solid black;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #div_exnum{
        font-size: 4vw;
        font-weight: bold;
    }
    #div_exTi{
        font-size: 1.6vw;
        font-weight: bold;
        margin-top: 5%;
    }
    #img_red{
        width: 7%;
        height: auto;
    }
    #div_red{
        width: 50%;
        height: 50%;
        font-size: 1.4vw;
        font-weight: bold;
        border:1px solid black;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #div_notnum{
        font-size: 4vw;
        font-weight: bold;
    }
    #div_notTi{
        font-size: 1.6vw;
        font-weight: bold;
        margin-top: 5%;
    }
    .list{
        position: absolute;
        z-index: 1;
        top: 42%;
        width: 70%;
        height: 40%;
    }
    .list_title{
        width: 100%;
        height: 20%;
    }
    .shape_title{
        width: 50%;
        height: 100%;
        border-radius: 0 0 10px 10px;
        background-color: rgb(200, 201, 202);
        /* display: inline; */
        float: left;
        font-size: 2vw;
        color: #ffffff;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .red{
        background-image: linear-gradient(to bottom, rgb(243, 159, 125), rgb(230, 44, 41));
    }
    .green{
        background-image: linear-gradient(to bottom, rgb(165, 209, 142), rgb(70, 182, 142));
    }
    .table{
        width: 100%;
        height: 80%;
    }
    .table_row{
        width: 100%;
        height: 25%;
    }
    .table_cell{
        height: 100%;
        width: 24.7%;
        font-size: 2vw;
        float: left;
        border: 1px solid rgb(241, 241, 242);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

