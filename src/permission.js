import router from '@/router'
import { useUserStoreHook } from '@/store/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/page-title'
// 进度条
NProgress.configure({ showSpinner: false })

const userStore = useUserStoreHook()

// 白名单路由
const whiteList = ['/', '/file', '/content', '/feedback', '/login', '/register', '/404']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  const hasToken = localStorage.getItem('ApiToken')
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，跳转首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasToken = userStore.token
      if (hasToken) {
        // 未匹配到任何路由，跳转404
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name }) : next('/404')
        } else {
          next()
        }
      } else {
        try {
          await userStore.userInfo()
          next({ ...to, replace: true })
        } catch (error) {
          // 移除 token 并跳转登录页
          await userStore.delToken()
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
