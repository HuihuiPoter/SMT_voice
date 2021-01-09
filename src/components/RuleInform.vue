<template>
    <div id="rulebox">
        <el-row :gutter="20">
            <el-col :span="10" :offset="8">
                <h1>欢迎来到单词听说模块</h1>
            </el-col>  
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10" :offset="8">
                <h2>在这个模块中，你可以看到一些单词</h2>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10" :offset="8">
                <h2>当你看到单词提示时，做好准备，出现录音界面时，念出你看到的单词</h2>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10" :offset="8">
                <h2>完成训练后，你可以看到这轮训练的结果</h2>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4" :offset="14">
                <el-button type="primary" size="large" @click="hideThis">开始训练</el-button> 
            </el-col>
        </el-row> 
    </div>
</template>

<script>
export default {
    name: 'RuleInform',
    methods: {
        hideThis(){
            this.$router.replace('/countdown')
        }
    }
}
</script>