<template>
    <div id="div_show">
        <h2>Welcome to the SMarTree, you are now at level 1</h2>
        <!-- <p>语音评测系统现有四个部分</p>
        <p>包括基于腾讯智聆的单词评测模块和句子评测模块</p>
        <p>以及基于科大讯飞的句子评测模块</p>
        <p>以上三个功能是语音系统的基础性功能</p>
        <p>基于腾讯智聆的填句评测模块属于探索性功能</p>
        <p>基于此功能进行更多功能的探索及开发</p> -->
        <el-row :gutter="20">
            <el-col :span="10" :offset="0"><Unitprogress :_page="'word'"><span>单词智慧评测</span></Unitprogress></el-col>
            <el-col :span="10" :offset="0"><Unitprogress :_page="'sen_xunfei'"><span>句子智慧评测</span></Unitprogress></el-col>
        </el-row>
        <br>
        <el-row :gutter="20">
            <el-col :span="10" :offset="0"><Unitprogress><span>自然拼读</span></Unitprogress></el-col>
            <el-col :span="10" :offset="0"><Unitprogress><span>模板对话</span></Unitprogress></el-col>
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