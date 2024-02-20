import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/styles/index.css'
import 'virtual:uno.css'

import '@/permission'

const app = createApp(App)
setupStore(app)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
