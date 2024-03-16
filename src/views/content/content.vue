<template>
  <el-row>
    <el-col :span="4">
      <el-divider v-if="categorys.length > 0">
        <el-icon><Tickets /></el-icon>
      </el-divider>
      <el-tree
        :data="categorys"
        :props="categorysProps"
        :expand-on-click-node="false"
        default-expand-all
        check-on-click-node
        @node-click="setCategoryId"
      >
        <template #default="{ node, data }">
          <el-text truncated :type="categoryId == data.category_id ? 'primary' : ''">
            {{ node.label }}
          </el-text>
        </template>
        <template #empty>
          <el-text />
        </template>
      </el-tree>
      <el-divider v-if="tags.length > 0">
        <el-icon><CollectionTag /></el-icon>
      </el-divider>
      <el-col>
        <el-text truncated v-for="tag in tags" :key="tag.tag_id">
          <el-button
            :type="tagId == tag.tag_id ? 'primary' : ''"
            text
            size="small"
            @click="setTagId(tag)"
          >
            {{ tag.tag_name }}
          </el-button></el-text
        >
      </el-col>
    </el-col>

    <el-col v-loading="loading" :span="14" class="ml mr">
      <el-table :data="contents" :show-header="false">
        <el-table-column prop="image_url" width="120">
          <template #default="scope">
            <el-image
              :src="scope.row.image_url"
              style="height: 70px"
              class="cursor-pointer"
              @click="goDetail(scope.row)"
            >
              <template #placeholder>
                <el-icon :size="70"><Picture /></el-icon>
              </template>
              <template #error>
                <el-icon :size="70"><Picture /></el-icon>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name">
          <template #default="scope">
            <el-row class="cursor-pointer" @click="goDetail(scope.row)">
              <el-col>
                <el-text truncated size="large">
                  {{ scope.row.name }}
                </el-text>
              </el-col>
              <el-col :span="2">
                <el-icon><View /></el-icon>
                {{ scope.row.hits_show }}
              </el-col>
              <el-col :span="7">
                <el-icon><Calendar /></el-icon>
                {{ scope.row.release_time }}
              </el-col>
              <el-col :span="7" v-if="scope.row.category_names">
                <el-text truncated>
                  <el-icon><Tickets /></el-icon>
                  {{ scope.row.category_names }}
                </el-text>
              </el-col>
              <el-col :span="8" v-if="scope.row.tag_names">
                <el-text truncated>
                  <el-icon><CollectionTag /></el-icon>
                  {{ scope.row.tag_names }}
                </el-text>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="无内容" />
        </template>
      </el-table>
      <el-pagination
        class="mt"
        v-show="contentsCount > 0"
        v-model:page-size="contentsLimit"
        v-model:page-count="contentsPages"
        v-model:current-page="contentsPage"
        :total="contentsCount"
        layout="prev, pager, next"
        @change="getList"
      />
    </el-col>

    <el-col :span="5">
      <el-col v-if="contentsTop.length > 0">
        <el-divider content-position="left">
          <el-icon><Top /></el-icon>
        </el-divider>
      </el-col>
      <el-col
        v-for="top in contentsTop"
        :key="top.content_id"
        :underline="false"
        class="cursor-pointer"
        @click="goDetail(top)"
      >
        <el-text truncated>
          {{ top.name }}
        </el-text>
      </el-col>

      <el-col v-if="contentsHot.length > 0" class="mt">
        <el-divider content-position="left">
          <el-icon><Pointer /></el-icon>
        </el-divider>
      </el-col>
      <el-col
        v-for="hot in contentsHot"
        :key="hot.content_id"
        :underline="false"
        class="cursor-pointer"
        @click="goDetail(hot)"
      >
        <el-text truncated>
          {{ hot.name }}
        </el-text>
      </el-col>

      <el-col v-if="contentsRec.length > 0" class="mt">
        <el-divider content-position="left">
          <el-icon><Position /></el-icon>
        </el-divider>
      </el-col>
      <el-col
        v-for="rec in contentsRec"
        :key="rec.content_id"
        :underline="false"
        class="cursor-pointer"
        @click="goDetail(rec)"
      >
        <el-text truncated>
          {{ rec.name }}
        </el-text>
      </el-col>
    </el-col>
  </el-row>

  <el-row v-if="contents.length > 0" class="text-center mt">
    <el-col>
      <el-text size="small">
        免责声明：内容来自网络，不代表本站观点和立场，如侵权请联系删除。
      </el-text>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { list } from '@/api/content'
import {
  Picture,
  View,
  Calendar,
  Tickets,
  CollectionTag,
  Top,
  Pointer,
  Position
} from '@element-plus/icons-vue'

defineOptions({
  name: 'Content'
})

const loading = ref(false)
const router = useRouter()

const categorys = ref([])
const categoryId = ref()
const categorysProps = {
  children: 'children',
  label: 'category_name'
}

const tags = ref([])
const tagId = ref()

const contents = ref([])
const contentsPage = ref(1)
const contentsPages = ref(0)
const contentsLimit = ref(8)
const contentsCount = ref(0)
const contentsTop = ref([])
const contentsHot = ref([])
const contentsRec = ref([])

function setCategoryId(data) {
  if (categoryId.value == data.category_id) {
    categoryId.value = ''
  } else {
    categoryId.value = data.category_id
  }
  getList()
}

function setTagId(data) {
  if (tagId.value == data.tag_id) {
    tagId.value = ''
  } else {
    tagId.value = data.tag_id
  }
  getList()
}

function getList() {
  loading.value = true
  list({
    page: contentsPage.value,
    limit: contentsLimit.value,
    category_id: categoryId.value,
    tag_id: tagId.value
  })
    .then((res) => {
      categorys.value = res.data.category
      tags.value = res.data.tag
      contents.value = res.data.list
      contentsTop.value = res.data.tops
      contentsHot.value = res.data.hots
      contentsRec.value = res.data.recs
      contentsPage.value = res.data.page
      contentsPages.value = res.data.pages
      contentsCount.value = res.data.count
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

function goDetail(row) {
  let id = row.content_id
  let routeUrl = router.resolve({
    path: '/content-detail',
    query: { id: id }
  })
  window.open(routeUrl.href, '_blank')
  // router.push(`/content-detail?id=${id}`)
}

onMounted(() => {
  getList()
})
</script>
