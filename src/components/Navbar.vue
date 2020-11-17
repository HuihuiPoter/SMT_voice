<template>
  <div id="navigation">
    <!-- <ul id="ul_bar">
      <li><router-link to="/show">首页</router-link></li>
      <li><router-link to="/word">单词智慧评测(tencent)</router-link></li>
      <li><router-link to="/sentence">句子智慧评测(tencent)</router-link></li>
      <li><router-link to="/sen_xunfei">句子智慧评测(讯飞)</router-link></li>
      <li><router-link to="/sentence_miss">填句智慧评测(tencent)</router-link></li>
    </ul>
  <router-view></router-view> -->
  <el-row :gutter="0">
    <el-col :span="4" :offset="0">
      <h5>菜单</h5>
      <el-menu mode="vertical" default-active="1" text-color="black" :router="true"
      :active-text-color="$store.state.base_color" background-color="#f1f1f1">
        <el-menu-item index="1" route="/main/show" name="show">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2" route="/main/word">
          <i class="el-icon-notebook-1"></i>
          <span slot="title">单词智慧评测</span>
        </el-menu-item>
        <el-menu-item index="3" route="/main/sen_xunfei">
          <i class="el-icon-notebook-1"></i>
          <span slot="title">句子智慧评测</span>
        </el-menu-item>
        <el-menu-item index="4" route="/main/sentence_miss">
          <i class="el-icon-notebook-1"></i>
          <span slot="title">填句智慧评测</span>
        </el-menu-item>
        <el-menu-item index="5" route="/main/spelling">
          <i class="el-icon-notebook-1"></i>
          <span slot="title">自然拼读</span>
        </el-menu-item>
      </el-menu>
      
    </el-col>
    <el-col :span="20" :offset="0">
      <router-view></router-view>
    </el-col>
  </el-row>
  
  </div>
  
</template>

<script>

export default {
  name: "Navbar",
  components: {
  }
};
</script>

<style>
/* #ul_bar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 130px;
  background-color: #f1f1f1;
  height: 100%; 
  position: fixed;
  overflow: auto; 
}
li a {
  display: block;
  width: 100px;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}
li a:hover {
  background-color: #01dfd7;
  color: white;
} */
</style>