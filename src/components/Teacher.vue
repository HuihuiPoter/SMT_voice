<template>
    <div id="div_helen">
        <transition name="fade">
            <!-- <img v-show="dialog_show" id="img_dialog" :src="dialogURL" alt=""> -->
            <div v-if="dialog_show" id="dialog_container" :style="{width: dialog_item.container_width}">
                <div class="dialog_font" v-html="dialog_item.content">
                </div>
            </div>
            <div v-else id="dialog_space"></div>
        </transition>
        <img id="img_helen" :src="helen_url" alt="">
        <div id="div_shadow"></div>
    </div>
</template>

<script>
export default {
    name: 'Teacher',
    props: {
        url: String,
        dialog_view: Boolean,
        dialog: Object
    },
    data() {
        return {
            helen_url: this.url,
            dialog_show: this.dialog_view,
            // dialogURL: this.dialogurl,
            dialog_item: this.dialog
        }
    },
    watch: {
        url(val) {
            this.helen_url = val
        },
        dialog_view(val) {
            this.dialog_show = val
        },
        dialog(val){
            this.dialog_item = val
        }
    }
}
</script>

<style>
    #div_helen{
        width: 100%;
        height: 100%;
    }
    #img_helen{
        position: relative;
        z-index: 1;
        width: 100%;
        height: auto;
        transform: rotateY(180deg);
    }
    #div_shadow{
        position: relative;
        width: 70%;
        height: 10%;
        background-color: rgb(201, 202, 202);
        border-radius: 50%;
        bottom: 9%;
    }
    #dialog_space{
        position: relative;
        left: 10%;
        height: 20%;
    }
    #dialog_container{
        background-image: linear-gradient(to bottom, rgb(252, 247, 175), rgb(206, 223, 76));
        border-radius: 30px;
        position: relative;
        left: 10%;
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .dialog_font{
        font-size: 1vw;
        white-space: pre;
        text-align: left;
        font-weight: bold;
    }
    @media only screen and (max-width: 1050px){
        .dialog_font{
            transform: scale(0.9);
        }
    }
    @media only screen and (max-width: 800px){
        .dialog_font{
            transform: scale(0.7);
        }
    }
</style>