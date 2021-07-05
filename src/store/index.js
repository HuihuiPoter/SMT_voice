import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: "小平",
        password: "",
        //url_pic: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        loginState: true,
        base_color: "rgba(10, 194, 126, 1)",
        course_type: ''       
    },
    mutations: {
        loginMain(state, payload){
            state.loginState = false
            state.username = payload.username
            state.password = payload.password
        },
        courseType(state, payload) {
            state.course_type = payload.course_type
        }
    },
    plugins: [createPersistedState()]
})

export default store