// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {store} from './store/store'
import App from './App'
import { Message } from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import qs from 'qs'
import lrz from 'lrz'
import router from './router'
import { Loading } from 'element-ui'
import { Actionsheet } from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { WechatPlugin } from 'vux'

Vue.component(Actionsheet.name, Actionsheet)

Vue.use(Loading.directive)
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(WechatPlugin)

Vue.prototype.$Message = Message
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$lrz = lrz
Vue.prototype.$loading = Loading.service

// 全局配置
axios.defaults.headers.token = "ZVZwUGs0Q2duTGs9"
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.timeout = 10000

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
