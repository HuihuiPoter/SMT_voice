<template>
    <div>
        <el-table :data="stat_data" border stripe>
            <el-table-column v-for="col in columns"
                :prop="col.id"
                :key="col.id"
                :label="col.label">
            </el-table-column>
        </el-table>
        <h3>第一轮练习完成，接下来需要练习薄弱的部分，点击下面的按钮进行第二轮练习吧！</h3>
        <el-button type="primary" @click="btnClick">{{btn_msg}}</el-button>
        
    </div>
</template>

<script>
export default {
    name: 'Result',
    props: {
        stat: Array,
        round: Number
    },
    computed: {
        btn_msg() {
            if (this.round === 1)
                return '开始第二轮练习'
            else return '结束本次练习'
        }
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
                    id: 'thinking_time',
                    label: '思考时间（ms）',
                }
            ]
        }
    },
    methods: {
        btnClick() {
            if (this.round === 1) {
                console.log('再来一轮')
                this.$emit('resultClose', false)
            }
            else {
                console.log('测试结束')
                this.$router.replace('/main')
            }
        }
    }
}
</script>