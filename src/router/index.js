import Vue from 'vue'
import Router from 'vue-router'

import editor from '@/components/editor'
import home from '@/components/home'
import userInfo from '@/components/userInfo'
import success from '@/components/success'
import fail from '@/components/fail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/editor',
      name: 'editor',
      component: editor
    },
    {
      path: '/editor/home',
      name: 'home',
      component: home
    },
    {
      path: '/editor/userinfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/editor/userinfo/success',
      name: 'success',
      component: success
    },
    {
      path: '/editor/userinfo/fail',
      name: 'fail',
      component: fail
    }

  ],
  //mode:"history"
})
