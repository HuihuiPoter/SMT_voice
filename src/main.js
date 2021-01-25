import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from './store'
import {
  Button,
  Input,
  Form,
  FormItem,
  Row,
  Col,
  Card,
  Progress,
  Message,
  Notification,
  ColorPicker,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  Table,
  TableColumn,
  Tooltip
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

//axios设置
axios.defaults.withCredentials = true
//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
    
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // Increase the retry count
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});


Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Progress)
Vue.use(ColorPicker)
Vue.use(Avatar)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')
