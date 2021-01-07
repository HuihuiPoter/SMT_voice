<template>
    <div>
        <!-- <el-dialog
            :title="fun_title"
            :visible.sync="visible"
            width="50%"
            :show-close="false"
            @close="handleClose">
            
            <slot></slot>
        </el-dialog>       -->
        <slot></slot>
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
    mounted: function() {

    },
    methods: {
        handleClose(){

        }
    }
}
</script>