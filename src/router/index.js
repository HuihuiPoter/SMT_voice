import Vue from 'vue'
import VueRouter from "vue-router"

const Login = () => import('../components/Login/login')
const Main = () => import('../components/Main')
const RuleInform = () => import('../components/RuleInform')
const Countdown = () => import('../components/Countdown')

// const newResult = () => import('../components/newResult')
const Evaluation = () => import('../components/Evaluation')
const Course = () => import('../components/Course')

const SenTest = () => import('../components/SenTest')
const Result = () => import('../components/Result')
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
        path: "/countdown",
        component: Countdown
    },
    {
        path: "/course",
        component: Course
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
                path: "rule",
                component: RuleInform
            },
            {
                path: "result",
                component: Result
            },
            {
                path: "evaluate",
                name: "evaluate",
                component: Evaluation
            },
            {
                path: "sentest",
                component: SenTest
            }
        ]
    }
]
const router = new VueRouter({
    routes,
    mode: "hash"
})

export default router