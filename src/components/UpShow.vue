<template>
    <div>
        <el-dialog
            :title="fun_title"
            :visible.sync="visible"
            width="50%"
            :show-close="false">
            
            <!-- 内层dialog录音界面，普通模式下开启 -->
            <!-- <el-dialog
                title="录音"
                :visible.sync="readAgain"
                width="50%"
                :show-close="false">
                
            </el-dialog> -->
            
            <slot></slot>
        </el-dialog>      
        <!-- <slot></slot> -->
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
            visible: true,
            readAgain: false
        }
    },
    mounted: function() {

    },
    methods: {
    }
}
</script>