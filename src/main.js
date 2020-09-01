import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import './assets/css/global.css'; //引入全局样式
import '@/assets/fonts/iconfont.css'; // 引入icon图标
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Form,FormItem, Input, Message} from 'element-ui';

import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://192.168.0.134:8888/api/private/v1/'
Vue.prototype.$http = axios


Vue.use(ElementUI);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
