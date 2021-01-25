<template>
    <div>
        <div>优秀单词数/今天训练的总单词数：{{excel_num}}/{{total_num}}</div>
        <div>需要巩固的单词数/今天训练的总单词数：{{total_num - excel_num}}/{{total_num}}</div>
        <el-table :data="stat_data" border stripe>
            <el-table-column v-for="col in columns"
                :prop="col.id"
                :key="col.id"
                :label="col.label">
            </el-table-column>
        </el-table>
        本次训练消耗用时：{{getTime[0]}}分钟{{getTime[1]}}秒
        <h3>本次练习已完成，点击下方的按钮回到主界面或者再次学习</h3>
        <el-button type="primary" @click="btnEnd">回到主界面</el-button>
        <el-button type="success" @click="btnAgain">再次练习</el-button>
    </div>
</template>

<script>
export default {
    name: 'Result',
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
                {
                    id: 'proficiency',
                    label: '熟练度',
                }
            ],
            all_time: this.time,
            total_num: 0,
            excel_num: 0
        }
    },
    mounted: function(){
        this.total_num = this.stat_data.length
        for (let item of this.stat_data){
            if (item.remark == '优秀')
                this.excel_num++
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
    methods: {
        btnAgain() {
            console.log('再来一次')
            this.$emit('resultClose', false)
        },
        btnEnd() {
            console.log('测试结束')
            this.$router.replace('/main')
        }
    }
}
</script>