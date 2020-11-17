import Vue from 'vue'
import VueRouter from "vue-router"

const Login = () => import('../components/Login/login')
const Show = () => import('../components/Show')
const Word = () => import('../components/Word')
const Sentence = () => import('../components/Sentence')
const Sentencemiss = () => import('../components/Sentencemiss')
const Senxunfei = () => import('../components/Senxunfei')
const Spelling = () => import('../components/Spelling/Spelling')
const Main = () => import('../components/Main')

//Vue.use()安装插件
Vue.use(VueRouter)

//创建对象
const routes = [
    {
        path: "/",
        //component: () => import('../components/Login/login')
        redirect: '/login'
    },
    {
        path: "/login",
        component: Login
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
    },
    {
        path: "/main",
        component: Main,
        children: [
            {
                path:'',
                redirect: 'show'
            },
            {
                path: 'show',
                component: Show 
            },
            {
                path: 'word',
                component: Word
            },
            {
                path: 'sen_xunfei',
                component: Senxunfei 
            },
            {
                path: 'sentence_miss',
                component: Sentencemiss 
            },
            {
                path: 'spelling',
                component: Spelling 
            },
        ]
    }
]
const router = new VueRouter({
    routes,
    mode: "hash"
})

export default router