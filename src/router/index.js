import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/index/index')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register/register'),
      meta: {
        title: 'yylAdmin - 注册'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/login'),
      meta: {
        title: 'yylAdmin - 登录'
      }
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('@/views/user/user'),
      meta: {
        title: 'yylAdmin - 个人中心'
      }
    }
  ]
})
