import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: "小平",
        password: "",
        url_pic: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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