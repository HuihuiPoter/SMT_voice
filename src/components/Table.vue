<template>
    <div>
        <table border="0">
            <tr>
                <th>单词</th>
                <th>得分</th>
            </tr>
            <tr v-for="(item, index) in record" :key="index">
                <td>{{item.words}}</td>
                <td>{{item.scores}}</td>
            </tr>
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