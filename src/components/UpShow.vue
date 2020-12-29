<template>
    <div>
        <el-dialog
            :title="uiName"
            :visible.sync="visible"
            width="50%"
            :show-close="false"
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
            uiName: '录音',
            visible: true
        }
    },
    methods: {
        handleClose(){

        }
    }
}
</script>