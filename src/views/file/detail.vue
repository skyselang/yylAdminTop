<template>
  <el-row class="text-center">
    <el-col class="font-size-6">
      {{ model.file_name }}
    </el-col>
    <el-col class="font-size-4 mt">
      <el-text v-if="model.file_id">
        <el-icon class="ml"><i-ep-Calendar /></el-icon>{{ model.create_time }}
      </el-text>
    </el-col>
  </el-row>
  <el-row>
    <el-col class="text-center font-size-4">
      <el-text v-if="model.group_name">
        <el-icon class="ml"><i-ep-Tickets /></el-icon>{{ model.group_name }}
      </el-text>
      <el-text v-if="model.tag_names">
        <el-icon class="ml"><i-ep-CollectionTag /></el-icon>{{ model.tag_names }}
      </el-text>
    </el-col>
  </el-row>
  <el-row>
    <el-col class="text-center font-size-4 mt">
      <div v-if="model.file_url">
        <div v-if="model.file_type === 'image'">
          <el-image class="w-[90%]" :src="model.file_url" :preview-src-list="[model.file_url]" title="点击看大图">
            <template #error>
              <span></span>
            </template>
          </el-image>
        </div>
        <video v-else-if="model.file_type === 'video'" controls>
          <source :src="model.file_url" type="video/mp4" />
          <object :data="model.file_url">
            <embed :src="model.file_url" />
          </object>
        </video>
        <audio v-else-if="model.file_type === 'audio'" controls>
          <source :src="model.file_url" type="audio/mp3" />
          <embed :src="model.file_url" />
        </audio>
        <div v-else-if="model.file_type === 'word'">
          <el-text>
            <el-icon :size="60"><i-ep-Document /></el-icon>
          </el-text>
          <br />
          <el-link :href="model.file_url" target="_blank"> {{ model.file_name }}.{{ model.file_ext }} </el-link>
        </div>
        <div v-else-if="model.file_type === 'other'">
          <el-text>
            <el-icon :size="60"><i-ep-Folder /></el-icon>
          </el-text>
          <br />
          <el-link :href="model.file_url" target="_blank"> {{ model.file_name }}.{{ model.file_ext }} </el-link>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row class="text-center mt-9 cursor-pointer">
    <el-col v-if="model.prev_info" :span="12" @click="detail(model.prev_info)">
      <el-text truncated>
        <el-icon><i-ep-ArrowLeft /></el-icon>{{ model.prev_info.file_name }}
      </el-text>
    </el-col>
    <el-col v-if="model.next_info" :span="12" @click="detail(model.next_info)">
      <el-text truncated>
        {{ model.next_info.file_name }}<el-icon><i-ep-ArrowRight /></el-icon>
      </el-text>
    </el-col>
  </el-row>
  <el-row v-if="model.file_id" class="text-center mt-9">
    <el-col>
      <el-text size="small"> 免责声明：内容来自网络，不代表本站观点和立场，如侵权请联系删除。 </el-text>
    </el-col>
  </el-row>
</template>

<script setup>
import { info as infoApi } from '@/api/file'
import getPageTitle from '@/utils/page-title'

defineOptions({
  name: 'FileDetail'
})

const route = useRoute()
const router = useRouter()
const model = ref({
  file_id: '',
  file_type: 'image',
  file_md5: '',
  file_hash: '',
  file_name: '',
  file_path: '',
  file_ext: '',
  create_time: '',
  file_url: '',
  group_name: '',
  tag_names: '',
  prev_info: {},
  next_info: {}
})

function info(file_id) {
  infoApi({ file_id: file_id })
    .then((res) => {
      model.value = res.data
      document.title = getPageTitle(res.data.file_name)
    })
    .catch(() => {})
}

function detail(info) {
  try {
    const file_id = info.file_id
    if (file_id) {
      router.push('/file-detail?id=' + file_id)
    }
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => route.query.id,
  async (file_id) => {
    info(file_id)
  }
)

onMounted(() => {
  const file_id = route.query.id
  if (file_id) {
    info(file_id)
  }
})
</script>
