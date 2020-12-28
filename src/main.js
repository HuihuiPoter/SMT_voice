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
  Dialog
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

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
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')
