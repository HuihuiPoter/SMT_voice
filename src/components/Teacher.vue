<!--
 * @Author: your name
 * @Date: 2021-03-23 16:46:39
 * @LastEditTime: 2021-10-21 22:50:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SMT_voice\src\components\Teacher.vue
-->
<template>
    <div class="fade_in" id="div_helen">
        <!-- <img v-show="dialog_show" id="img_dialog" :src="dialogURL" alt=""> -->
        <div id="dialog_container" :style="{width: dialog_item.container_width, backgroundImage: font_bgc}">
            <div class="dialog_font" v-html="dialog_item.content" :style="{color: font_color}">
            </div>
        </div>
        <!-- <div v-else id="dialog_space"></div> -->
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
            dialog_item: this.dialog,
            font_color: 'black',
            font_bgc: 'linear-gradient(to bottom, rgb(252, 247, 175), rgb(206, 223, 76))'
        }
    },
    watch: {
        url(val) {
            this.helen_url = val
        },
        dialog_view(val) {
            if (val) {
                this.font_bgc = "linear-gradient(to bottom, rgb(252, 247, 175), rgb(206, 223, 76))"
                this.font_color = 'black'
            }
            else{
                this.font_color = 'transparent'
                this.font_bgc = 'none'
            }
                
        },
        dialog(val){
            this.dialog_item = val
        }
    }
}
</script>

<style>
    .fade_in{
        animation: fadeIn;
        animation-duration: .6s;
    }
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
        width: 180px;
        height: 60px;
        background-color: rgb(201, 202, 202);
        border-radius: 50%;
        bottom: 50px;
    }
    #dialog_space{
        position: relative;
        left: 10%;
        height: 20%;
    }
    #dialog_container{
        background-image: linear-gradient(to bottom, rgb(252, 247, 175), rgb(206, 223, 76));
        border-radius: 20px;
        position: absolute;
        top: 450px;
        left: 260px;
        /* border: solid black 1px; */
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .dialog_font{
        display: inline-block;
        font-size: 20px;
        white-space: pre;
        text-align: left;
        font-weight: bold;
        padding: 4% 5%;
    }
</style>