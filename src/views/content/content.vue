<template>
  <el-row>
    <el-col :span="4">
      <el-divider v-if="categorys.length > 0">
        <el-icon><i-ep-Tickets /></el-icon>
      </el-divider>
      <el-tree
        :data="categorys"
        :props="categorysProps"
        :expand-on-click-node="false"
        default-expand-all
        check-on-click-node
        @node-click="categoryId"
      >
        <template #default="{ node, data }">
          <el-text truncated :type="query.category_id == data.category_id ? 'primary' : ''">
            {{ node.label }}
          </el-text>
        </template>
        <template #empty>
          <el-text />
        </template>
      </el-tree>
      <el-divider v-if="tags.length > 0">
        <el-icon><i-ep-CollectionTag /></el-icon>
      </el-divider>
      <el-col>
        <el-text truncated v-for="tag in tags" :key="tag.tag_id">
          <el-button :type="query.tag_id == tag.tag_id ? 'primary' : ''" text size="small" @click="tagId(tag)">
            {{ tag.tag_name }}
          </el-button>
        </el-text>
      </el-col>
    </el-col>

    <el-col v-loading="loading" :span="14" class="ml mr">
      <el-table :data="data" :show-header="false">
        <el-table-column prop="image_url" width="120">
          <template #default="scope">
            <el-image :src="scope.row.image_url" class="h-[70px] cursor-pointer" @click="detail(scope.row)">
              <template #placeholder>
                <el-icon :size="50"><i-ep-Picture /></el-icon>
              </template>
              <template #error>
                <el-icon :size="50"><i-ep-Picture /></el-icon>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name">
          <template #default="scope">
            <el-row class="cursor-pointer" @click="detail(scope.row)">
              <el-col>
                <el-text truncated size="large">{{ scope.row.name }}</el-text>
              </el-col>
              <el-col :span="2">
                <el-icon><i-ep-View /></el-icon>{{ scope.row.hits_show }}
              </el-col>
              <el-col :span="7">
                <el-icon><i-ep-Calendar /></el-icon>{{ scope.row.release_time }}
              </el-col>
              <el-col :span="7" v-if="scope.row.category_names">
                <el-text truncated>
                  <el-icon><i-ep-Tickets /></el-icon>{{ scope.row.category_names }}
                </el-text>
              </el-col>
              <el-col :span="8" v-if="scope.row.tag_names">
                <el-text truncated>
                  <el-icon><i-ep-CollectionTag /></el-icon>{{ scope.row.tag_names }}
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
        v-show="count > 0"
        v-model:page-size="query.limit"
        v-model:current-page="query.page"
        :total="count"
        layout="prev, pager, next"
        @change="list"
      />
    </el-col>

    <el-col :span="5">
      <el-col v-if="tops.length > 0">
        <el-divider content-position="left">
          <el-icon><i-ep-Top /></el-icon>
        </el-divider>
      </el-col>
      <el-col v-for="top in tops" :key="top.content_id" underline="never" class="cursor-pointer" @click="detail(top)">
        <el-text truncated>{{ top.name }}</el-text>
      </el-col>

      <el-col v-if="hots.length > 0" class="mt">
        <el-divider content-position="left">
          <el-icon><i-ep-Pointer /></el-icon>
        </el-divider>
      </el-col>
      <el-col v-for="hot in hots" :key="hot.content_id" underline="never" class="cursor-pointer" @click="detail(hot)">
        <el-text truncated>{{ hot.name }}</el-text>
      </el-col>

      <el-col v-if="recs.length > 0" class="mt">
        <el-divider content-position="left">
          <el-icon><i-ep-Position /></el-icon>
        </el-divider>
      </el-col>
      <el-col v-for="rec in recs" :key="rec.content_id" underline="never" class="cursor-pointer" @click="detail(rec)">
        <el-text truncated>{{ rec.name }}</el-text>
      </el-col>
    </el-col>
  </el-row>

  <el-row v-if="data.length > 0" class="text-center mt">
    <el-col>
      <el-text size="small"> 免责声明：内容来自网络，不代表本站观点和立场，如侵权请联系删除。 </el-text>
    </el-col>
  </el-row>
</template>

<script setup>
import { list as listApi } from '@/api/content'

defineOptions({
  name: 'Content'
})

const loading = ref(false)
const router = useRouter()

const categorys = ref([])
const categorysProps = { children: 'children', label: 'category_name' }
const tags = ref([])

const query = ref({ page: 1, limit: 8 })
const data = ref([])
const count = ref(0)
const tops = ref([])
const hots = ref([])
const recs = ref([])

function list() {
  loading.value = true
  listApi(query.value)
    .then((res) => {
      categorys.value = res.data.category
      tags.value = res.data.tag
      data.value = res.data.list
      tops.value = res.data.tops
      hots.value = res.data.hots
      recs.value = res.data.recs
      count.value = res.data.count
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

function categoryId(category) {
  if (query.value.category_id == category.category_id) {
    query.value.category_id = ''
  } else {
    query.value.category_id = category.category_id
  }
  list()
}

function tagId(tag) {
  if (query.value.tag_id == tag.tag_id) {
    query.value.tag_id = ''
  } else {
    query.value.tag_id = tag.tag_id
  }
  list()
}

function detail(content) {
  let id = content.content_id
  let url = router.resolve({ path: '/content-detail', query: { id: id } })
  window.open(url.href, '_blank')
}

onMounted(() => {
  list()
})
</script>
