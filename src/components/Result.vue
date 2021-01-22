<template>
    <div>
        <el-table :data="stat_data" border stripe>
            <el-table-column v-for="col in columns"
                :prop="col.id"
                :key="col.id"
                :label="col.label">
            </el-table-column>
        </el-table>
        <h3>本次练习已完成，点击下方的按钮回到主界面或者再次学习</h3>
        <el-button type="primary" @click="btnEnd">回到主界面</el-button>
        <el-button type="success" @click="btnAgain">再次练习</el-button>
    </div>
</template>

<script>
export default {
    name: 'Result',
    props: {
        stat: Array
    },
    computed: {
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
            ]
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