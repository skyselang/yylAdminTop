import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 9528,
    open: true
  },
  plugins: [
    UnoCSS(),
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)、图标组件
      resolvers: [IconsResolver(), ElementPlusResolver()],
      eslintrc: {
        // 是否自动生成 eslint 规则，建议生成之后设置 false
        enabled: true,
        // 指定自动导入函数 eslint 规则的文件
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      // 是否在 vue 模板中自动导入
      vueTemplate: true
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      // 指定自定义组件位置(默认:src/components)
      dirs: ['src/components', 'src/**/components']
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 2000
  },
  // 预加载项目必需的组件
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios',
      'nprogress',
      'element-plus/es/components/tabs/style/css',
      'element-plus/es/components/tab-pane/style/css',
      'element-plus/es/components/loading/style/css',
      'element-plus/es/components/table/style/css',
      'element-plus/es/components/link/style/css',
      'element-plus/es/components/image/style/css',
      'element-plus/es/components/table-column/style/css',
      'element-plus/es/components/button/style/css',
      'element-plus/es/components/pagination/style/css',
      'element-plus/es/components/date-picker/style/css',
      'element-plus/es/components/card/style/css',
      'element-plus/es/components/form/style/css',
      'element-plus/es/components/form-item/style/css',
      'element-plus/es/components/input/style/css',
      'element-plus/es/components/cascader/style/css',
      'element-plus/es/components/upload/style/css',
      'element-plus/es/components/dialog/style/css',
      'element-plus/es/components/scrollbar/style/css',
      'element-plus/es/components/select/style/css',
      'element-plus/es/components/option/style/css',
      'element-plus/es/components/empty/style/css',
      'element-plus/es/components/tree/style/css',
      'element-plus/es/components/divider/style/css',
      'element-plus/es/components/icon/style/css'
    ]
  }
})
