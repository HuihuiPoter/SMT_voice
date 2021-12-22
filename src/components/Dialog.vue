<template>
    <div class="dialog_container" v-html="dialog_item.content">
        <!-- <div class="" v-html="dialog_item.content"></div> -->
    </div>
</template>

<script>
export default {
    name: 'Dialog',
    props: {
        dialog: Object
    },
    data() {
        return {
            dialog_item: this.dialog,
        }
    },
    watch: {
        dialog(val){
            this.dialog_item = val
        }
    }
}
</script>

<style>
    .dialog_container{
        /* background-image: linear-gradient(to bottom, rgb(252, 247, 175), rgb(206, 223, 76)); */
        background-color: white;
        border-radius: 50px;
        font-size: 25px;
        padding: 2%;
        display: inline-block;
    }
</style>