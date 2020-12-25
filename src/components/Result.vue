<template>
    <div>
        <el-table :data="stat" border stripe>
            <el-table-column v-for="col in columns"
                :prop="col.id"
                :key="col.id"
                :label="col.label"
                :width="col.width">
            </el-table-column>
        </el-table>
        
    </div>
</template>

<script>
export default {
    name: 'Result',
    data() {
        return {
            stat: []
        }
    }
}
</script>