import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './axios/index.js';
import './assets/css/global.css'; //引入全局样式
import './assets/fonts/iconfont.css'; // 引入icon图标
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
