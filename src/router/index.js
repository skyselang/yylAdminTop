import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
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
      path: '/content',
      name: 'Content',
      component: () => import('@/views/content/content.vue'),
      meta: {
        title: '内容'
      }
    },
    {
      path: '/content-detail',
      name: 'ContentDetail',
      component: () => import('@/views/content/detail.vue'),
      meta: {
        title: '内容详情'
      }
    },
    {
      path: '/file',
      name: 'File',
      component: () => import('@/views/file/file.vue'),
      meta: {
        title: '文件'
      }
    },
    {
      path: '/file-detail',
      name: 'FileDetail',
      component: () => import('@/views/file/detail.vue'),
      meta: {
        title: '文件详情'
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
      path: '/member',
      name: 'Member',
      component: () => import('@/views/member/member.vue'),
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404/404.vue'),
      meta: {
        title: '404'
      }
    }
  ]
})

export default router
