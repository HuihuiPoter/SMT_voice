import VueRouter from "vue-router"
import Word from '../components/Word'
import Show from '../components/Show'
import Sentence from '../components/Sentence'
import Vue from 'vue'

//Vue.use()安装插件
Vue.use(VueRouter)

//创建对象
const routes = [
    {
        path: "",
        component: Show
    },
    {
        path: "/word",
        component: Word
    },
    {
        path: "/sentence",
        component: Sentence
    }  
]
const router = new VueRouter({
    routes,
    mode: "history"
})

export default router