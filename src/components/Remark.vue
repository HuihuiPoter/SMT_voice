<template>
    <div>
        {{remark}}
        {{}}
    </div>
</template>

<script>
export default {
    name: 'Remark',
    props: {
        show_level: Number,
        record: Object
    },
    data() {
        return {
            level: {
                excellent: 0,
                ordinary: 1,
                failed: 2
            }
        }
    },
    computed: {
        setStyle() {
            let phone_record = this.record.phone_record
            for (item of phone_record) {
                let color
                if (item.score)
                Vue.set(item, 'color', color)
            }
        },
        remark() {
            let re
            switch(this.show_level){
                case this.level.excellent:
                    re = '优秀，做得很好'
                    break
                case this.level.ordinary: 
                    re = '做的不错，继续加油'
                    break
                case this.level.failed: 
                    re = '还需要继续努力'
                    break
                default: console.log('wrong level')
            }
            return re
        }
    },
    methods: {

    }
}
</script>