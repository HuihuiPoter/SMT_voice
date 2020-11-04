import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user_name: "",
        password: "",
        loginState: true        
    },
    mutations: {
        loginMain(state){
            state.loginState = false
        }
    }
})

export default store