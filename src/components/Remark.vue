<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name: 'Remark',
    props: {
        level: Number,
        record: {
            type: Array,
            default: []
        }

    },
    data() {
        return {
            words_list: [],
            words_color: []
        }
    },
    computed: {
        remark() {

        }
    },
    methods: {

    }
}
</script>