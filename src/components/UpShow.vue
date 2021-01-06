<template>
    <div>
        <el-dialog
            :title="fun_title"
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
    props: {
        title: String
    },
    data() {
        return {
            fun_title: this.title,
            visible: true
        }
    },
    methods: {
        handleClose(){

        }
    }
}
</script>