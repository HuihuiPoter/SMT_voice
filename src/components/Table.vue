<template>
    <div>
        <table border="0">
            <tr>
                <th>单词</th>
                <th>时间</th>
            </tr>
            <transition-group name="flip-list" tag="tr">
                <tr v-for="(item, index) in record" :key="'tr' + index">
                    <td>{{item.content}}</td>
                    <td>{{item.thinking_time}}</td>               
                </tr>
            </transition-group>          
        </table>
    </div>
</template>

<script>
export default {
    name: 'Table',
    props: {
        _record: Array
    },
    data() {
        return {
            record: this._record
        }
    },
    watch: {
        _record(val) {
            this.record = val
        }
    }
}
</script>

<style>
    .flip-list-enter, .flip-list-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>