import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import userInfo from '@/components/userInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/editor/home',
      name: 'home',
      component: home
    },
    {
      path: '/editor/userinfo',
      name: 'userInfo',
      component: userInfo
    }

  ],
  mode:"history"
})
