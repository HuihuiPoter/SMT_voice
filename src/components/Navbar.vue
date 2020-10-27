<template>
  <div id="navigation">
    <ul id="ul_bar">
      <!-- <li><a href="#" @click="wordClick">单词智慧评测</a></li> -->
      <li><router-link to="/word">单词智慧评测(tecent)</router-link></li>
      <li><router-link to="/sentence">句子智慧评测(tecent)</router-link></li>
      <li><router-link to="#">句子智慧评测(讯飞)</router-link></li>
      <li><router-link to="/sentence_miss">填句智慧评测(tecent)</router-link></li>
    </ul>
  <router-view></router-view>
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
#ul_bar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 130px;
  /* background-color: #f1f1f1; */
  height: 100%; /* 全屏高度 */
  position: fixed;
  overflow: auto; /*如果导航栏选项多，允许滚动 */
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
}
</style>