<template>
    <div id="div_show">
        <h2>Welcome to the SMarTree, you are now at level 1</h2>
        <el-row :gutter="20">
            <el-col :span="10" :offset="0"><Unitprogress :_page="'word'"><span>单词智慧评测</span></Unitprogress></el-col>
            <el-col :span="10" :offset="0"><Unitprogress :_page="'sen_xunfei'"><span>句子智慧评测</span></Unitprogress></el-col>
        </el-row>
        <br>
        <el-row :gutter="20">
            <el-col :span="10" :offset="0"><Unitprogress :_page="'sentence_miss'"><span>填句智慧评测</span></Unitprogress></el-col>
            <el-col :span="10" :offset="0"><Unitprogress :_page="'spelling'"><span>自然拼读</span></Unitprogress></el-col>           
        </el-row>      
    </div>
</template>

<script>
import Unitprogress from './Unitprogress'

export default {
    name: "Show",
    components: {
        Unitprogress
    },
    methods: {
    }
}
</script>

<style>
    #div_show{
        border: grey;
        margin-left:5%;
        margin-top: 5%;
        padding:1px 16px;
        /* height:1000px; */
    }
    .box_card{
        width: 250px;
    }
</style>