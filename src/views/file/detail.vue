<template>
  <el-row>
    <el-col>
      <el-row class="text-center">
        <el-col class="font-size-6">
          {{ detail.file_name }}
        </el-col>
        <el-col class="font-size-4 mt">
          <el-text v-if="detail.file_id">
            <el-icon class="ml"><Calendar /></el-icon>
            {{ detail.create_time }}
          </el-text>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="text-center font-size-4">
          <el-text v-if="detail.group_name">
            <el-icon class="ml"><Tickets /></el-icon>
            {{ detail.group_name }}
          </el-text>
          <el-text v-if="detail.tag_names">
            <el-icon class="ml"><CollectionTag /></el-icon>
            {{ detail.tag_names }}
          </el-text>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="text-center font-size-4 mt">
          <div v-if="detail.file_url">
            <div v-if="detail.file_type === 'image'">
              <el-image
                style="width: 90%"
                :src="detail.file_url"
                :preview-src-list="[detail.file_url]"
                title="点击看大图"
              >
                <template #error>
                  <span></span>
                </template>
              </el-image>
            </div>
            <video v-else-if="detail.file_type === 'video'" controls>
              <source :src="detail.file_url" type="video/mp4" />
              <object :data="detail.file_url">
                <embed :src="detail.file_url" />
              </object>
            </video>
            <audio v-else-if="detail.file_type === 'audio'" controls>
              <source :src="detail.file_url" type="audio/mp3" />
              <embed :src="detail.file_url" />
            </audio>
            <div v-else-if="detail.file_type === 'word'">
              <el-text>
                <el-icon :size="60"><Document /></el-icon>
              </el-text>
              <br />
              <el-link :href="detail.file_url" target="_blank">
                {{ detail.file_name }}.{{ detail.file_ext }}
              </el-link>
            </div>
            <div v-else-if="detail.file_type === 'other'">
              <el-text>
                <el-icon :size="60"><Folder /></el-icon>
              </el-text>
              <br />
              <el-link :href="detail.file_url" target="_blank">
                {{ detail.file_name }}.{{ detail.file_ext }}
              </el-link>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row class="text-center mt-9 cursor-pointer">
    <el-col v-if="detail.prev_info" :span="12" @click="goDetail(detail.prev_info)">
      <el-text truncated>
        <el-icon><ArrowLeft /></el-icon>{{ detail.prev_info.file_name }}
      </el-text>
    </el-col>
    <el-col v-if="detail.next_info" :span="12" @click="goDetail(detail.next_info)">
      <el-text truncated>
        {{ detail.next_info.file_name }}<el-icon><ArrowRight /></el-icon>
      </el-text>
    </el-col>
  </el-row>
  <el-row v-if="detail.file_id" class="text-center mt-9">
    <el-col>
      <el-text size="small">
        免责声明：内容来自网络，不代表本站观点和立场，如侵权请联系删除。
      </el-text>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { info } from '@/api/file'
import {
  Calendar,
  Tickets,
  CollectionTag,
  Document,
  Folder,
  ArrowLeft,
  ArrowRight
} from '@element-plus/icons-vue'
import getPageTitle from '@/utils/page-title'

defineOptions({
  name: 'FileDetail'
})

const route = useRoute()
const router = useRouter()
const detail = ref({})

function getDetail(id) {
  info({ file_id: id })
    .then((res) => {
      detail.value = res.data
      // 设置页面标题
      document.title = getPageTitle(res.data.file_name)
    })
    .catch(() => {})
}

function goDetail(info) {
  try {
    const id = info.file_id
    if (id) {
      router.push(`/file-detail?id=${id}`)
    }
  } catch (error) {
    /* empty */
  }
}

watch(
  () => route.query.id,
  async (newId) => {
    getDetail(newId)
  }
)

onMounted(() => {
  const id = route.query.id
  if (id) {
    getDetail(id)
  }
})
</script>
