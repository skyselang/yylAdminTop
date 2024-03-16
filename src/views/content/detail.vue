<template>
  <el-row>
    <el-col :span="17">
      <el-row class="text-center">
        <el-col class="font-size-6">
          {{ detail.name }}
        </el-col>
        <el-col class="font-size-2 mt">
          <el-link :href="detail.url" :underline="false" target="_blank">
            <el-icon class="ml" v-if="detail.content_id"><View /></el-icon>
            {{ detail.hits_show }}
            <el-icon class="ml" v-if="detail.content_id"><Calendar /></el-icon>
            {{ detail.release_time }}
            <el-icon class="ml" v-if="detail.source"><Location /></el-icon>
            {{ detail.source }}
            <el-icon class="ml" v-if="detail.author"><User /></el-icon>
            {{ detail.author }}
          </el-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="text-center font-size-4">
          <el-text v-if="detail.category_names">
            <el-icon class="ml"><Tickets /></el-icon>
            {{ detail.category_names }}
          </el-text>
          <el-text v-if="detail.tag_names">
            <el-icon class="ml"><CollectionTag /></el-icon>
            {{ detail.tag_names }}
          </el-text>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="text-center font-size-4 mt">
          <div v-html="detail.content"></div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6" :offset="1">
      <el-col
        v-for="item in detail.list"
        :key="item.content_id"
        :underline="false"
        class="cursor-pointer"
        @click="goDetail(item)"
      >
        <el-text truncated>
          <el-icon><TopRight /></el-icon>
          {{ item.name }}
        </el-text>
      </el-col>
    </el-col>
  </el-row>
  <el-row class="text-center mt-9 cursor-pointer">
    <el-col v-if="detail.prev_info" :span="12" @click="goDetail(detail.prev_info)">
      <el-text truncated>
        <el-icon><ArrowLeft /></el-icon>{{ detail.prev_info.name }}
      </el-text>
    </el-col>
    <el-col v-if="detail.next_info" :span="12" @click="goDetail(detail.next_info)">
      <el-text truncated>
        {{ detail.next_info.name }}<el-icon><ArrowRight /></el-icon>
      </el-text>
    </el-col>
  </el-row>
  <el-row v-if="detail.content_id" class="text-center mt-9">
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
import { info } from '@/api/content'
import {
  View,
  Calendar,
  User,
  Location,
  Tickets,
  CollectionTag,
  TopRight,
  ArrowLeft,
  ArrowRight
} from '@element-plus/icons-vue'
import getPageTitle from '@/utils/page-title'

defineOptions({
  name: 'ContentDetail'
})

const route = useRoute()
const router = useRouter()
const detail = ref({})

function getDetail(id) {
  info({ content_id: id })
    .then((res) => {
      detail.value = res.data
      // 设置页面标题
      document.title = getPageTitle(res.data.name)
    })
    .catch(() => {})
}

function goDetail(info) {
  try {
    const id = info.content_id
    if (id) {
      router.push(`/content-detail?id=${id}`)
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
