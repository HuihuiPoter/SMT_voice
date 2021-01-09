<template>
    <div>
        <el-card class="box_card" shadow="hover" :body-style="{ padding: '20px' }" @click.native="notice(page)">
            <div slot="header">
                <slot></slot>
            </div>
            <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                    <div class="block" style="margin-top: 20px">完成度</div>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-progress type="circle" :percentage="per" :width="60" :color="$store.state.base_color"></el-progress>
                </el-col>
            </el-row>
            
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'Unitprogress',
    props: {
        _page: String,
        percentage: Number
    },
    data(){
        return {
            per:this.percentage,
            page: this._page
        }
    },
    methods: {
        notice(page) {
            if (this.percentage == 100){
                this.$message({
                    message: "当前任务已完成",
                    type: 'success'
                })
            }
            else {
                this.$message({
                    message: "当前任务未完成",
                    type: 'warning'
                })
            }
            if (this.percentage == 100)
                this.$router.replace('/' + page)
        }
    }
}
</script>

<style>
    .box_card{
        cursor: pointer;
    }
</style>