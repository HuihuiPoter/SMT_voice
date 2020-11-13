import Vue from 'vue'
import VueRouter from "vue-router"
import Word from '../components/Word'
import Show from '../components/Show'
import Sentence from '../components/Sentence'
import Sentencemiss from '../components/Sentencemiss'
import Senxunfei from '../components/Senxunfei'

import Spelling from '../components/Spelling/Spelling'

//Vue.use()安装插件
Vue.use(VueRouter)

//创建对象
const routes = [
    {
        path: "",
        component: Show
    },
    {
        path: "/show",
        component: Show
    },
    {
        path: "/word",
        component: Word
    },
    {
        path: "/sentence",
        component: Sentence
    },
    {
        path: "/sentence_miss",
        component: Sentencemiss
    },
    {
        path: "/sen_xunfei",
        component: Senxunfei
    },
    {
        path: "/spelling",
        component: Spelling
    }
]
const router = new VueRouter({
    routes,
    mode: "hash"
})

export default router