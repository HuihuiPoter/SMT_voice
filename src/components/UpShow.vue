<template>
    <div>
        <el-dialog
            title="结果"
            :visible.sync="visible"
            width="30%"
            @close="handleClose">
            <!-- 显示组件 -->
            <slot></slot>
        </el-dialog>      
    </div>
</template>

<script>
export default {
    name: 'UpShow',
    data() {
        return {
            visible: true
        }
    },
    methods: {
        handleClose(){

        }
    }
}
</script>