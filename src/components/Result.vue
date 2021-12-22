<template>
    <div id="result_box" align="center" :style="{transform: bgratio}">
        <!-- 按钮 -->
        <div id="div_main_back">
            <img class="mainback" src="../assets/result/back.png" alt="" @click="turnToCourse">
            <img class="mainback" src="../assets/test_board/main.png" alt="" @click="backToMain">
        </div>
        <!-- 信息栏 -->
        <div class="info">
            <!-- <div class="largeDiv_info"> -->
                <div class="div_info">
                    <img class="icon_info" src="../assets/result/ID.png" alt="">
                    <span class="font_info">ID: Jack</span>
                </div>
                <div class="div_info">
                    <img class="icon_info" src="../assets/result/time.png" alt="">
                    <span class="font_info">训练总时长: 1h</span>
                </div>
            <!-- </div>
            <div class="largeDiv_info"> -->
                <div class="div_info">
                    <img class="icon_info" src="../assets/result/level.png" alt="">
                    <span class="font_info">级别: LV {{$store.state.level}}</span>
                </div>
                <div class="div_info">
                    <img class="icon_info" src="../assets/result/lesson.png" alt="">
                    <span class="font_info">课次: lesson1 week1</span>
                </div>
            <!-- </div> -->
        </div>
        <!-- 单词结果 -->
        <div class="word_result">
            <!-- 标题 -->
        <img id="img_titleblock" src="../assets/result/word_title.png" alt="">
        <!-- 时间 -->
        <div class="time_pos" align="right">
            <div class="half_word">
                {{getWTime[0]}}分{{getWTime[1]}}秒
            </div>
        </div>        
        <div class="redgreen">
            <div class="large_div_block inline">
                <img class="inline img_block" id="img_green" src="../assets/result/pupleblock.png" alt="">
                <div class="inline div_block" id="div_green">优秀单词</div>
                <div class="inline" id="div_exnum">{{w_excel_num}}</div>
                <div class="inline" id="div_exTi">题</div>
            </div>
            <div class="large_div_block inline">
                <img class="inline img_block" id="img_red" src="../assets/result/yellowblock.png" alt="">
                <div class="inline div_block" id="div_red">需巩固单词</div>
                <div class="inline" id="div_notnum">{{w_not_excel_num}}</div>
                <div class="inline" id="div_notTi">题</div>
            </div>
        </div>
        <!-- 列表 -->
        <div class="list">
            <div class="div_flag" id="word_excel">
                <img class="flag" src="../assets/result/excel_flag.png" alt="">
            </div>      
            <div class="table">
                <div class="table_row" align="center" v-for="(row, idx) in w_ex_stat_data" :key="idx + 'w_ex_row'">
                    <div class="table_cell" v-for="(item, index) in row" :key="index + 'w_ex_item'">{{item}}</div>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="div_flag" id="word_fail">
                <img class="flag" src="../assets/result/fail_flag.png" alt="">
            </div>
            <div class="table">
                <div class="table_row" align="center" v-for="(row, idx) in w_not_stat_data" :key="idx + 'w_ex_row'">
                    <div class="table_cell" v-for="(item, index) in row" :key="index + 'w_ex_item'">{{item}}</div>
                </div>
            </div>
        </div>
        </div>
        <!-- 句子结果 -->
        <div class="sen_result">
            <!-- 标题 -->
        <img id="img_titleblock" src="../assets/result/sen_title.png" alt="">
        <!-- 时间 -->
        <div class="time_pos" align="right">
            <div class="half_sen">
                {{getWTime[0]}}分{{getWTime[1]}}秒
            </div>
        </div>        
        <div class="redgreen">
            <div class="large_div_block inline">
                <img class="inline img_block" id="img_green" src="../assets/result/pupleblock.png" alt="">
                <div class="inline div_block" id="div_green">优秀句型</div>
                <div class="inline" id="div_exnum">{{s_excel_num}}</div>
                <div class="inline" id="div_exTi">题</div>
            </div>
            <div class="large_div_block inline">
                <img class="inline img_block" id="img_red" src="../assets/result/yellowblock.png" alt="">
                <div class="inline div_block" id="div_red">需巩固句型</div>
                <div class="inline" id="div_notnum">{{s_not_excel_num}}</div>
                <div class="inline" id="div_notTi">题</div>
            </div>
        </div>
        <!-- 列表 -->
        <div class="list">
            <div class="div_flag" id="sen_excel">
                <img class="flag" src="../assets/result/excel_flag.png" alt="">
            </div>
            <div class="table">
                <div class="table_row table_row_sen" align="center" v-for="(row, idx) in s_ex_stat_data" :key="idx + 'w_ex_row'">
                    <div class="table_cell table_cell_sen" v-for="(item, index) in row" :key="index + 'w_ex_item'">
                        <div>
                            {{item.Q}}
                        </div>
                        <div>
                            {{item.A}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="div_flag" id="sen_fail">
                <img class="flag" src="../assets/result/fail_flag.png" alt="">
            </div>
            <div class="table">
                <div class="table_row table_row_sen" align="center" v-for="(row, idx) in s_not_stat_data" :key="idx + 'w_ex_row'">
                    <div class="table_cell table_cell_sen" v-for="(item, index) in row" :key="index + 'w_ex_item'">
                        <div>
                            {{item.Q}}
                        </div>
                        <div>
                            {{item.A}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <img id="result_done" src="../assets/result/finish.png" alt="" srcset="" @click="turnToCourse">
    </div>
</template>

<script>
export default {
    name: 'newResult',
    data() {
        return {
            word_stat: [],
            word_time: 0,
            sen_stat: [],
            sen_time: 0,
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
            w_excel_num: 0,
            w_not_excel_num: 0,
            w_ex_stat_data: [],
            w_not_stat_data: [],
            s_excel_num: 0,
            s_not_excel_num: 0,
            s_ex_stat_data: [],
            s_not_stat_data: [],
            word_matrix: [
                ['word', 'word', 'word', 'word'],
                ['word', 'word', 'word', 'word'],
                ['word', 'word'],
            ],
            sen_matrix: [
                [{Q: 'question', A: 'answer'}, {Q: 'question', A: 'answer'}],
                [{Q: 'question', A: 'answer'}, {Q: 'question', A: 'answer'}],
            ],
            is_good: true,
            bgWidth: 1920,
            bgHeight: 2720,
            bgratio: "scale(1)"
        }
    },
    computed: {
        getWTime(){
            let min_sec = []
            let sec = this.word_time / 1000
            min_sec.push(Math.floor(sec / 60))
            sec = sec % 60
            min_sec.push(Math.ceil(sec))
            return min_sec
        },
        getSTime(){
            let min_sec = []
            let sec = this.sen_time / 1000
            min_sec.push(Math.floor(sec / 60))
            sec = sec % 60
            min_sec.push(Math.ceil(sec))
            return min_sec
        }
    },
    mounted: function() {
        // this.bgWidth = window.innerWidth;
        // this.setSize();
        this.bgratio = "scale(" + window.innerWidth / this.bgWidth + ")"
        window.onresize = () => {
            // this.bgWidth = window.innerWidth
            // this.setSize();
            this.bgratio = "scale(" + window.innerWidth / this.bgWidth + ")"
        }
        // console.log(this.stat_data)
        this.word_stat = this.$store.state.word_stat
        this.sen_stat = this.$store.state.sen_stat
        this.word_time = this.$store.state.word_time
        this.sen_time = this.$store.state.sen_time
        for (let item of this.word_stat){
            if (item.remark == '优秀'){
                this.w_excel_num++
                this.w_ex_stat_data.push(item.content)
            }
            else {
                this.w_not_excel_num++
                this.w_not_stat_data.push(item.content)
            }
        }
        for (let item of this.sen_stat){
            if (item.remark == '优秀'){
                this.s_excel_num++
                this.s_ex_stat_data.push({
                    Q: item.Q,
                    A: item.A
                })
            }
            else {
                this.s_not_excel_num++
                this.s_not_stat_data.push({
                    Q: item.Q,
                    A: item.A
                })
            }
        }
        this.w_ex_stat_data = this.reshape(this.w_ex_stat_data, 3, 4)
        this.w_not_stat_data = this.reshape(this.w_not_stat_data, 3, 4)
        this.s_ex_stat_data = this.reshape(this.s_ex_stat_data, 2, 2)
        this.s_not_stat_data = this.reshape(this.s_not_stat_data, 2, 2)
        // this.s_not_stat_data = this.sen_matrix
        // this.word_matrix = this.w_ex_stat_data
        // this.sen_matrix = this.s_ex_stat_data
    },
    methods: {
        setSize(){
            this.bgHeight = 5664 / 4001 * this.bgWidth
        },
        backToMain() {
            console.log('回到主界面')
            window.location.href = 'https://www.smartreelearners.com/'
        },
        turnToCourse() {
            console.log('再来一次')
            // this.$emit('resultClose')
            this.$router.replace('/course')
        },
        reshape(original_list, row, col) {
            let mat = []
            let idx = 0
            // if (original_list.length == 0)
            //     return []
            for (let i = 0;i < row;i++){
                let list = []
                for (let j = 0;j < col;j++){
                    // console.log(original_list[idx])
                    if (idx < original_list.length)
                        list.push(original_list[idx])
                    else list.push(' ')
                    idx++
                }
                mat.push(list)
                // if (idx >= original_list.length)
                //         break
            }
            return mat
        },
        showGood(){
            this.is_good = true
            this.word_matrix = this.w_ex_stat_data
            this.sen_matrix = this.s_ex_stat_data
        },
        showNotGood(){
            this.is_good = false
            this.word_matrix = this.w_not_stat_data
            this.sen_matrix = this.s_not_stat_data
        }
    }
}
</script>

<style>
    #result_box{
        background-image: url(../assets/result/result_bg.png);
        background-size: 100%;
        width: 1920px;
        height: 2720px;
        transform-origin: left top;
    }
    #div_main_back{
        position: relative;
        width: 10%;
        top: 2%;
        right: 43%;
    }
    .mainback {
        width: 30%;
        height: auto;
        cursor: pointer;
        margin: 0 5% 0 5%;
    }
    .info{
        position: relative;
        width: 88%;
        display: flex;
        top: 8%;
    }
    .div_info{
        /* width: 25%; */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon_info{
        margin: 0 6%;
        width: 14%;
    }
    .font_info{
        font-size: 40px;
    }
    .word_result{
        position: relative;
        width: 88%;
        top: 12%;
        height: 38%;
        /* border: 1px solid black; */
    }
    .sen_result{
        position: relative;
        width: 88%;
        top: 15%;
        height: 38%;
        /* border: 1px solid black; */
    }
    #img_titleblock{
        position: relative;
        top: 5%;
        right: 32%;
        width: 25%;
        height: auto;
    }
    .time_pos{
        width: 30%;
        position: relative;
        left: 30%;
        bottom: 6%;
    }
    .half_word{
        background-image: url(../assets/result/time_progress.gif?);
        background-size: 100%;
        width: 180px;
        height: 180px;
        font-size: 22px;
        font-weight: bold;
        color: red;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .half_word::before{
        content: "本次单词训练消耗时间";
        position: absolute;
        display: inline-block;
        color: black;
        right: 42%;
    }
    .half_sen{
        background-image: url(../assets/result/time_progress.gif?);
        background-size: 100%;
        width: 180px;
        height: 180px;
        font-size: 22px;
        font-weight: bold;
        color: red;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .half_sen::before{
        content: "本次句子训练消耗时间";
        position: absolute;
        display: inline-block;
        color: black;
        right: 42%;
    }
    .inline{
        display: inline;
        margin: 0 2% 0 2%;
    }
    .large_div_block{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5% 0 5%;
        width: 50%;
    }
    .redgreen{
        position: relative;
        width: 100%;
        bottom: 6%;
        display: flex;
        justify-content: center;
    }
    .img_block{
        width:8%;
        height: auto;
    }
    .div_block{
        letter-spacing: 5px;
        padding: 2% 4%;
        font-size: 24px;
        font-weight: bold;
        border:2px solid black;
        border-radius: 50px;
        display: inline-block;
    }
    #div_exnum{
        font-size: 60px;
        font-weight: bold;
    }
    #div_exTi{
        font-size: 25px;
        font-weight: bold;
        margin-top: 5%;
    }

    #div_notnum{
        font-size: 60px;
        font-weight: bold;
    }
    #div_notTi{
        font-size: 25px;
        font-weight: bold;
        margin-top: 5%;
    }
    .list{
        position: relative;
        bottom: 6%;
        width: 100%;
        height: 34%;
    }
    .list_title{
        width: 100%;
    }
    .div_flag{
        position: relative;
        /* float: left; */
        right: 43%;
        height: 20%;
        width: 16%;
    }
    #word_excel::after{
        content: '优秀单词';
        font-size: 36px;
        color: white;
        position: relative;
        bottom: 96%;
        right: 6%;
    }
    #word_fail::after{
        content: '需巩固单词';
        font-size: 36px;
        color: white;
        position: relative;
        bottom: 96%;
        right: 6%;
    }
    #sen_excel::after{
        content: '优秀句子';
        font-size: 36px;
        color: white;
        position: relative;
        bottom: 96%;
        right: 6%;
    }
    #sen_fail::after{
        content: '需巩固句子';
        font-size: 36px;
        color: white;
        position: relative;
        bottom: 96%;
        right: 6%;
    }
    .flag{
        width: 100%;
    }
    /* .shape_title{
        width: 50%;
        height: 100%;
        border-radius: 0 0 10px 10px;
        background-color: rgb(200, 201, 202);
        float: left;
        font-size: 2vw;
        color: #ffffff;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    } */
    .red{
        background-color: rgb(255, 183, 28);
    }
    .green{
        background-color: rgb(141, 104, 243);
    }
    .table{
        width: 100%;
        height: 80%;
    }
    .table_row{
        width: 100%;
        height: 25%;
        margin: 1% 0;
        display: flex;
        justify-content: center;
    }
    .table_row_sen{
        height: 35%;
        margin: 1% 0 2% 0;
    }
    .table_cell{
        margin: 0 2%;
        height: 100%;
        width: 14%;
        font-size: 32px;
        font-weight: 500;
        background-color: white;
        float: left;
        border: 2px solid rgb(255, 246, 209);
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .table_cell_sen{
        width: 38%;
        display: block;
    }
    #result_done{
        position: relative;
        top: 15.5%;
        width: 13%;
        cursor: pointer;
    }
</style>

