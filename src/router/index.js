import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/index/index.vue'),
      meta: {
        title: ''
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404/404.vue'),
      meta: {
        title: '404'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register/register.vue'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: () => import('@/views/feedback/feedback.vue'),
      meta: {
        title: '反馈'
      }
    },
    {
      path: '/member',
      name: 'Member',
      component: () => import('@/views/member/member.vue'),
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/logout',
      name: 'MemberLogout',
      component: () => import('@/views/member/logout.vue'),
      meta: {
        title: '退出'
      }
    }
  ]
})

export default router
