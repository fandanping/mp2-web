import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/user/Login'
import Register from 'components/user/Register'
import Ipc from 'components/ipc/Ipc'
import Result from 'components/ipc/Result'
import Index from 'components/Index'
import Address from 'components/address/Address'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '标引平台首页',
        requireAuth: true
      }
    },
    {
      path: '/ipc',
      name: 'Ipc',
      component: Ipc,
      meta: {
        title: 'IPC标引',
        requireAuth: true
      }
    },
    {
      path: '/ipc/search/:ipc',
      name: 'Result',
      component: Result,
      meta: {
        title: 'IPC标引',
        requireAuth: true
      }
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
      meta: {
        title: '地址标引',
        requireAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  let token = window.localStorage.getItem('token')
  if (to.meta.requireAuth && !token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
  router.afterEach(() => {
    window.scrollTo(0, 0)
  })
  next()
})
export default router
