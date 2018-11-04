// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Message } from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.timeout = 5000
import qs from 'qs'
import lrz from 'lrz'
import router from './router'
import { Loading } from 'element-ui';
import { Actionsheet } from 'mint-ui';
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { WechatPlugin } from 'vux'

Vue.component(Actionsheet.name, Actionsheet);

Vue.use(Loading.directive);
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(WechatPlugin)

Vue.prototype.$Message = Message
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$lrz = lrz
Vue.prototype.$loading = Loading.service;




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
