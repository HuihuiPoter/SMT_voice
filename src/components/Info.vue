<template>
  <div id="info">
    <h2>题目总量：{{ nums }}</h2>
    <br />
    <h2>当前题目序号：{{ current }}</h2>
    <br />
    <h2>
      评测得分记录：
      <ul id="ul_info">
        <li v-for="(item, index) in record" :key="index">
          {{ unpack(item, index) }}
        </li>
      </ul>
    </h2>
  </div>
</template>

<script>
export default {
  name: "Info",
  props: {
    len: Number,
    record_: Array,
    idx: Number
  },
  data() {
    return {
      nums: this.len,
      record: this.record_,
      current: this.idx + 1
    }   
  },
  watch: {
    len(newValue){
      this.nums = newValue
      return newValue
    },
    record_(newValue){
      this.record = newValue
      return newValue
    },
    idx(newValue){
      this.current = newValue + 1
      return newValue
    }
  },
  methods: {
    unpack(item, index) {
      return index + 1 + "." + item.content + " " + item.score;
    },
  },
};
</script>

<style>
#info {
  width: 50%;
  height: 100%;
  float: left;
  text-align: center;
}

#ul_info {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>