<!--
 * @Author: your name
 * @Date: 2021-03-01 16:09:47
 * @LastEditTime: 2021-11-09 18:02:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \SMT_voice\src\components\UpShow.vue
-->
<template>
    <div class="done" :style="{width: bgWidth + 'px', height: bgHeight + 'px'}">
            <div class="done_text" align="center">
                <img style="width: 60%" src="../assets/public/well_done.png" alt="" srcset="">
            </div>
            <div class="done_img">
                <img style="width: 20%;transform: rotateY(180deg);float: left;" src="../assets/public/combo.png" alt="" srcset="">
                <img style="width: 20%;float: right;" src="../assets/public/combo.png" alt="" srcset="">
            </div>
        </div>
</template>

<script>

export default {
    name: 'UpShow',
    props: {
        bgWidth: Number,
        bgHeight: Number
    },
    data() {
        return {
        }
    },
    mounted: function() {

    },
    methods: {
    }
}
</script>
<style>
    .done{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        background-color: rgb(52, 50, 49);
        opacity: 0.8;
    }
    .done_text{
        position: relative;
        top: 18%;
        width: 100%;
    }
    .done_img{
        position: relative;
        top: 24%;
        width: 100%;
    }
</style>