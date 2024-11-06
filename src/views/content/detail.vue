<template>
  <el-row>
    <el-col :span="17">
      <el-row class="text-center">
        <el-col class="font-size-6">
          {{ model.name }}
        </el-col>
        <el-col class="font-size-2 mt">
          <el-link :href="model.url" :underline="false" target="_blank">
            <el-icon class="ml" v-if="model.content_id"><i-ep-View /></el-icon>
            {{ model.hits_show }}
            <el-icon class="ml" v-if="model.content_id"><i-ep-Calendar /></el-icon>
            {{ model.release_time }}
            <el-icon class="ml" v-if="model.source"><i-ep-Location /></el-icon>
            {{ model.source }}
            <el-icon class="ml" v-if="model.author"><i-ep-User /></el-icon>
            {{ model.author }}
          </el-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="text-center font-size-4">
          <el-text v-if="model.category_names">
            <el-icon class="ml"><i-ep-Tickets /></el-icon>{{ model.category_names }}
          </el-text>
          <el-text v-if="model.tag_names">
            <el-icon class="ml"><i-ep-CollectionTag /></el-icon>{{ model.tag_names }}
          </el-text>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="text-center font-size-4 mt">
          <div v-html="model.content"></div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6" :offset="1">
      <el-col
        v-for="item in model.list"
        :key="item.content_id"
        :underline="false"
        class="cursor-pointer"
        @click="detail(item)"
      >
        <el-text truncated>
          <el-icon><i-ep-TopRight /></el-icon>{{ item.name }}
        </el-text>
      </el-col>
    </el-col>
  </el-row>
  <el-row class="text-center mt-9 cursor-pointer">
    <el-col v-if="model.prev_info" :span="12" @click="detail(model.prev_info)">
      <el-text truncated>
        <el-icon><i-ep-ArrowLeft /></el-icon>{{ model.prev_info.name }}
      </el-text>
    </el-col>
    <el-col v-if="model.next_info" :span="12" @click="detail(model.next_info)">
      <el-text truncated>
        {{ model.next_info.name }}<el-icon><i-ep-ArrowRight /></el-icon>
      </el-text>
    </el-col>
  </el-row>
  <el-row v-if="model.content_id" class="text-center mt-9">
    <el-col>
      <el-text size="small"> 免责声明：内容来自网络，不代表本站观点和立场，如侵权请联系删除。 </el-text>
    </el-col>
  </el-row>
</template>

<script setup>
import { info as infoApi } from '@/api/content'
import getPageTitle from '@/utils/page-title'

defineOptions({
  name: 'ContentDetail'
})

const route = useRoute()
const router = useRouter()
const model = ref({
  list: [],
  content_id: '',
  image_id: '0',
  name: '',
  release_time: '',
  source: '',
  author: '',
  url: '',
  title: '',
  keywords: '',
  description: '',
  content: '',
  hits: '0',
  hits_initial: '0',
  is_top: '0',
  is_hot: '0',
  is_rec: '0',
  create_time: '',
  hits_show: null,
  image_url: '',
  category_names: '',
  tag_names: '',
  prev_info: {},
  next_info: {}
})

function info(content_id) {
  infoApi({ content_id: content_id })
    .then((res) => {
      model.value = res.data
      document.title = getPageTitle(res.data.name)
    })
    .catch(() => {})
}

function detail(info) {
  try {
    const content_id = info.content_id
    if (content_id) {
      router.push('/content-detail?id=' + content_id)
    }
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => route.query.id,
  async (content_id) => {
    info(content_id)
  }
)

onMounted(() => {
  const content_id = route.query.id
  if (content_id) {
    info(content_id)
  }
})
</script>
