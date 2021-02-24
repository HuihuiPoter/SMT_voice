<template>
    <div id="div_show">
        <h2>Welcome to the SMarTree, you are now at level 1</h2>
        <el-row :gutter="20">
            <el-col :span="10" :offset="0"><Unitprogress :_page="'main/voice_main'" :percentage="100"><span>单词智慧评测</span></Unitprogress></el-col>
            <el-col :span="10" :offset="0"><Unitprogress :_page="'main/sen_xunfei'" :percentage="0"><span>句子智慧评测</span></Unitprogress></el-col>
        </el-row>
        <br>
        <el-row :gutter="20">
            <el-col :span="10" :offset="0"><Unitprogress :_page="'sentence_miss'" :percentage="0"><span>填句智慧评测</span></Unitprogress></el-col>
            <el-col :span="10" :offset="0"><Unitprogress :_page="'spelling'" :percentage="0"><span>自然拼读</span></Unitprogress></el-col>           
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
        margin-left:25%;
        margin-top: 5%;
        padding:1px 16px;
        /* height:1000px; */
    }
    .box_card{
        width: 250px;
    }
</style>