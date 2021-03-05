<template>
    <div align='center'>
        <!-- 按钮 -->
        <img id="img_tomain" src="../assets/result/backtomain.png" alt="" @click="backToMain">
        <img id="img_again" src="../assets/result/praticeagain.png" alt="" @click="praticeAgain">
        <img id="img_resultback" src="../assets/select_lesson/back.png" alt="" @click="backToMain">
        <!-- 标题 -->
        <img id="img_titleblock" src="../assets/result/titleblock.png" alt="">
        <!-- 时间 -->
        <div id="div_timeTips">本次训练消耗时间</div>
        <img id="img_timeprog" src="../assets/result/time_progress.png" alt="">
        <div id="div_timedes">答题时长</div>
        <div id="div_time" align="center">{{getTime[0]}}分{{getTime[1]}}秒</div>
        <!-- 分隔线 -->
        <div id="div_h1"></div>
        <div id="div_h2"></div>
        <div id="div_v1"></div>
        <div id="div_v2"></div>
        <!-- 优秀单词数 -->
        <img id="img_green" src="../assets/result/greenblock.png" alt="">
        <div id="div_green">优秀单词数</div>
        <div id="div_exnum">{{excel_num}}</div>
        <div id="div_exTi">题</div>
        <!-- 需巩固单词数 -->
        <img id="img_red" src="../assets/result/redblock.png" alt="">
        <div id="div_red">需巩固单词数</div>
        <div id="div_notnum">{{not_excel_num}}</div>
        <div id="div_notTi">题</div>
        <!-- 优秀单词列表 -->
        <div id="div_greenlist">优秀单词列表</div>
        <img id="img_off" src="../assets/result/off.png" alt="">
        <div id="div_exTable">
            <el-table :data="ex_stat_data" border stripe height="100">
            <el-table-column v-for="col in columns"
                :prop="col.id"
                :key="col.id"
                :label="col.label">
            </el-table-column>
            </el-table>
        </div>
        <!-- 需巩固单词列表 -->
        <div id="div_redlist">需巩固单词列表</div>
        <img id="img_on" src="../assets/result/on.png" alt="">
        <div id="div_notTable">
            <el-table :data="not_stat_data" border stripe height="100">
            <el-table-column v-for="col in columns"
                :prop="col.id"
                :key="col.id"
                :label="col.label">
            </el-table-column>
            </el-table>
        </div>
        <!-- 背景板 -->
        <img id="img_bg" src="../assets/result/result_board.png" alt="" height="56%" width="82%">
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
            not_stat_data: []
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
        // let total_num = this.stat_data.length
        for (let item of this.stat_data){
            if (item.remark == '优秀'){
                this.excel_num++
                this.ex_stat_data.push(item)
            }
            else {
                this.not_excel_num++
                this.not_stat_data.push(item)
            }
        }
    },
    methods: {
        backToMain() {
            console.log('回到主界面')
            this.$emit('resultClose', false)
        },
        praticeAgain() {
            console.log('再来一次')
            this.$emit('resultClose', false)
        }
    }
}
</script>

<style>
    #img_tomain{
        position: absolute;
        z-index: 1;
        margin-top: 43%;
        margin-left: 26%;
        width: 10%;
        height: auto;
        cursor: pointer;
    }
    #img_again{
        position: absolute;
        z-index: 1;
        margin-top: 43%;
        margin-left: 44%;
        width: 10%;
        height: auto;
        cursor: pointer;
    }
    #img_resultback{
        position: absolute;
        z-index: 1;
        /* margin-top: 2%;
        margin-left: 2%; */
        width: 10%;
        height: auto;
        cursor: pointer;
    }
    #img_titleblock{
        position: absolute;
        z-index: 1;
        margin-top: 5%;
        margin-left: 8%;
        width: 20%;
        height: auto;
    }
    #img_timeprog{
        position: absolute;
        z-index: 1;
        margin-top: 6%;
        margin-left: 65%;
        width: 12%;
        height: auto;
    }
    #div_timeTips{
        position: absolute;
        z-index: 1;
        margin-top: 10%;
        margin-left: 63%;
        font-size: 1.2vw;
        font-weight: bold;
    }
    #div_timedes{
        position: absolute;
        z-index: 1;
        margin-top: 9.6%;
        margin-left: 78%;
        font-size: 0.8vw;
    }
    #div_time{
        position: absolute;
        z-index: 1;
        margin-top: 10.8%;
        margin-left: 77%;
        font-size: 1.2vw;
        font-weight: bold;
        color: red;
        width: 5vw;
        /* border: 1px solid black; */
    }
    #div_h1{
        position: absolute;
        z-index: 1;
        margin-top: 15%;
        margin-left: 48.5%;
        /* width: 0px; */
        height: 10vw;
        border: 0.05vw solid grey;
        background: grey;
    }
    #div_h2{
        position: absolute;
        z-index: 1;
        margin-top: 30%;
        margin-left: 48.5%;
        /* width: 0px; */
        height: 10vw;
        border: 0.05vw solid grey;
        background: grey;
    }
    #div_v1{
        position: absolute;
        z-index: 1;
        margin-top: 27%;
        margin-left: 22%;
        width: 22vw;
        /* height: 0px; */
        border: 0.05vw solid grey;
        background: grey;
    }
    #div_v2{
        position: absolute;
        z-index: 1;
        margin-top: 27%;
        margin-left: 53%;
        width: 22vw;
        /* height: 0px; */
        border: 0.05vw solid grey;
        background: grey;
    }
    #img_green{
        position: absolute;
        z-index: 1;
        margin-top: 10%;
        margin-left: 10%;
        width: 10%;
        height: auto;
    }
    #div_green{
        position: absolute;
        z-index: 1;
        margin-top: 14%;
        margin-left: 28%;
        width: 15%;
        height: auto;
        font-size: 2vw;
        font-weight: bold;
        border:1px solid black;
        border-radius: 1vw 1vw 1vw 1vw;
    }
    #img_red{
        position: absolute;
        z-index: 1;
        margin-top: 26%;
        margin-left: 9%;
        width: 10%;
        height: auto;
    }
    #div_red{
        position: absolute;
        z-index: 1;
        margin-top: 29%;
        margin-left: 28%;
        width: 15%;
        height: auto;
        font-size: 2vw;
        font-weight: bold;
        border:1px solid black;
        border-radius: 1vw 1vw 1vw 1vw;
    }
    #div_greenlist{
        position: absolute;
        z-index: 1;
        margin-top: 14%;
        margin-left: 52%;
        width: 15%;
        height: auto;
        font-size: 2vw;
        font-weight: bold;
        border:1px solid black;
        border-radius: 1vw 1vw 1vw 1vw;
    }
     #div_redlist{
        position: absolute;
        z-index: 1;
        margin-top: 29%;
        margin-left: 52%;
        width: 15%;
        height: auto;
        font-size: 2vw;
        font-weight: bold;
        border:1px solid black;
        border-radius: 1vw 1vw 1vw 1vw;
    }
    #img_off{
        position: absolute;
        z-index: 1;
        margin-top: 11.5%;
        margin-left: 57%;
        width: 9%;
        height: auto;
    }
    #img_on{
        position: absolute;
        z-index: 1;
        margin-top: 26.5%;
        margin-left: 57%;
        width: 9%;
        height: auto;
    }
    #div_exnum{
        position: absolute;
        z-index: 1;
        margin-top: 19%;
        margin-left: 36%;
        font-size: 5vw;
        font-weight: bold;
    }
    #div_exTi{
        position: absolute;
        z-index: 1;
        margin-top: 21.5%;
        margin-left: 43%;
        font-size: 2vw;
        font-weight: bold;
    }
    #div_notnum{
        position: absolute;
        z-index: 1;
        margin-top: 34%;
        margin-left: 36%;
        font-size: 5vw;
        font-weight: bold;
    }
    #div_notTi{
        position: absolute;
        z-index: 1;
        margin-top: 36.5%;
        margin-left: 43%;
        font-size: 2vw;
        font-weight: bold;
    }
    #div_exTable{
        position: absolute;
        z-index: 1;
        margin-top: 18%;
        margin-left: 52%;
        width: 20%;
    }
    #div_notTable{
        position: absolute;
        z-index: 1;
        margin-top: 33%;
        margin-left: 52%;
        width: 20%;
    }
    .el-table{
        /* max-height: 8vw !important; */
        font-size: 1vw;
    }
</style>

