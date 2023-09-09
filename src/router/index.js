import Vue from 'vue'
import VueRouter from 'vue-router'
import { getApiToken } from "@/utils/userinfo"
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
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
    path: '/feedback',
    name: 'Feedback',
    component: () => import('@/views/feedback/feedback'),
    meta: {
      title: 'yylAdmin - 反馈'
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
    path: '/member',
    name: 'Member',
    component: () => import('@/views/member/member'),
    meta: {
      title: 'yylAdmin - 个人中心'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const loginList = ['Feedback', 'Member']
  const token = getApiToken()
  if (loginList.includes(to.name) && !token) {
    Message.error("请登录")
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
