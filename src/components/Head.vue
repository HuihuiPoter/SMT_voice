<template>
    <div id="head" :style="{backgroundColor: $store.state.base_color}">
        <el-row :gutter="20" type="flex">
            <el-col :span="12" :offset="1">
                <h1 class="color_white">SMarTree英语听说训练</h1>
            </el-col>
            <el-col :span="1" :offset="4">
                <div class="" style="margin-top: 40%">
                    <el-color-picker v-model="$store.state.base_color" size="normal" :show-alpha="true" ></el-color-picker>
                </div>
                
            </el-col>
            <el-col :span="2" :offset="2">
                <div style="margin-top: 25%">
                    <h4 class="color_white">{{$store.state.username}}，你好</h4>
                </div>          
            </el-col>
            <el-col :span="2" :offset="0">
                <div class="" style="margin-top: 14%">
                    <el-avatar :size="50" :src="$store.state.url_pic"></el-avatar>
                </div>          
            </el-col>
        </el-row>             
    </div>
</template>

<script>
export default {
    name: "Head",
    components: {

    }
}
</script>

<style>
    #head{
        /* background-color:#01dfd7; */
        /* position: relative; */
        border-radius: 10px;
    }
    .color_white{
        color: #ffffff;
    }
</style>>
