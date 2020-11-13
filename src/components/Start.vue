<template>
    <div>
        <slot name="image"></slot>
        <slot name="name"></slot>
        <el-button type="primary" size="default" @click="goto">开始 <i class="el-icon-d-arrow-right"></i></el-button>
    </div>
</template>

<script>
export default {
    name: 'Start',
    methods: {
        goto(){
            console.log('aaa')
        }
    }
}
</script>