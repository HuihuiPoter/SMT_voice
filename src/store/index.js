import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: "小平",
        password: "",
        loginState: false,
        base_color: "rgba(10, 194, 126, 1)"       
    },
    mutations: {
        loginMain(state){
            state.loginState = false
        }
    }
})

export default store