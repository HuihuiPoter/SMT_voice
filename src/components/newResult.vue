<template>
    <div align='center'>
        <!-- 按钮 -->
        <img id="img_tomain" src="../assets/result/backtomain.png" alt="" @click="backToMain">
        <img id="img_again" src="../assets/result/praticeagain.png" alt="" @click="praticeAgain">
        <!-- 标题 -->
        <img id="img_titleblock" src="../assets/result/titleblock.png" alt="">
        <!-- 时间 -->
        <div id="div_timeTips">本次训练消耗时间</div>
        <img id="img_timeprog" src="../assets/result/time_progress.png" alt="">
        <!-- 分隔线 -->
        <div id="div_h1"></div>
        <div id="div_h2"></div>
        <div id="div_v1"></div>
        <div id="div_v2"></div>
        <!-- 优秀单词数 -->
        <img id="img_green" src="../assets/result/greenblock.png" alt="">
        <div id="div_green">优秀单词数</div>
        <!-- 需巩固单词数 -->
        <img id="img_red" src="../assets/result/redblock.png" alt="">
        <div id="div_red">需巩固单词数</div>
        <!-- 优秀单词列表 -->
        <div id="div_greenlist">优秀单词列表</div>
        <img id="img_off" src="../assets/result/off.png" alt="">
        <!-- 需巩固单词列表 -->
        <div id="div_redlist">需巩固单词列表</div>
        <img id="img_on" src="../assets/result/on.png" alt="">
        <!-- 背景板 -->
        <img id="img_bg" src="../assets/result/result_board.png" alt="" height="56%" width="82%">
    </div>
</template>

<script>
export default {
    name: 'newResult',
    methods: {
        backToMain() {
            console.log('回到主界面')
        },
        praticeAgain() {
            console.log('再来一次')
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
        margin-left: 60%;
        width: 12%;
        height: auto;
    }
    #div_timeTips{
        position: absolute;
        z-index: 1;
        margin-top: 10%;
        margin-left: 60%;
        /* width: 20%;
        height: auto; */
        font-size: 1.2vw;
        font-weight: bold;
    }
    #div_h1{
        position: absolute;
        z-index: 1;
        margin-top: 15%;
        margin-left: 48.5%;
        width: 0px;
        height: 20%;
        border: 1px solid grey;
    }
    #div_h2{
        position: absolute;
        z-index: 1;
        margin-top: 30%;
        margin-left: 48.5%;
        width: 0px;
        height: 20%;
        border: 1px solid grey;
    }
    #div_v1{
        position: absolute;
        z-index: 1;
        margin-top: 27%;
        margin-left: 20%;
        width: 20%;
        height: 0px;
        border: 1px solid grey;
    }
    #div_v2{
        position: absolute;
        z-index: 1;
        margin-top: 27%;
        margin-left: 60%;
        width: 20%;
        height: 0px;
        border: 1px solid grey;
    }
    #img_green{
        position: absolute;
        z-index: 1;
        margin-top: 10%;
        margin-left: 10%;
        width: 12%;
        height: auto;
    }
    #div_green{
        position: absolute;
        z-index: 1;
        margin-top: 15%;
        margin-left: 30%;
        width: 15%;
        height: auto;
        font-size: 2vw;
        border:1px solid black;
        border-radius: 1vw 1vw 1vw 1vw;
    }
    #img_red{
        position: absolute;
        z-index: 1;
        margin-top: 26%;
        margin-left: 9%;
        width: 12%;
        height: auto;
    }
    #div_red{
        position: absolute;
        z-index: 1;
        margin-top: 30%;
        margin-left: 30%;
        width: 15%;
        height: auto;
        font-size: 2vw;
        border:1px solid black;
        border-radius: 1vw 1vw 1vw 1vw;
    }
    #div_greenlist{
        position: absolute;
        z-index: 1;
        margin-top: 15%;
        margin-left: 52%;
        width: 15%;
        height: auto;
        font-size: 2vw;
        border:1px solid black;
        border-radius: 1vw 1vw 1vw 1vw;
    }
     #div_redlist{
        position: absolute;
        z-index: 1;
        margin-top: 30%;
        margin-left: 52%;
        width: 15%;
        height: auto;
        font-size: 2vw;
        border:1px solid black;
        border-radius: 1vw 1vw 1vw 1vw;
    }
    #img_off{
        position: absolute;
        z-index: 1;
        margin-top: 12.5%;
        margin-left: 57%;
        width: 10%;
        height: auto;
    }
    #img_on{
        position: absolute;
        z-index: 1;
        margin-top: 27%;
        margin-left: 57%;
        width: 10%;
        height: auto;
    }
</style>

