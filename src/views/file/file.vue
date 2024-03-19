<template>
  <el-row class="pl">
    <el-col :span="2"><el-text v-if="groups.length > 0">分类：</el-text></el-col>
    <el-col :span="22">
      <el-text v-for="group in groups" :key="group.group_id">
        <el-button
          :type="query.group_id == group.group_id ? 'primary' : ''"
          text
          size="small"
          @click="groupId(group)"
        >
          {{ group.group_name }}
        </el-button>
      </el-text>
    </el-col>
  </el-row>

  <el-row class="pl">
    <el-col :span="2"><el-text v-if="tags.length > 0">标签：</el-text></el-col>
    <el-col :span="22">
      <el-text v-for="tag in tags" :key="tag.tag_id">
        <el-button
          :type="query.tag_id == tag.tag_id ? 'primary' : ''"
          text
          size="small"
          @click="tagId(tag)"
        >
          {{ tag.tag_name }}
        </el-button>
      </el-text>
    </el-col>
  </el-row>

  <el-row v-loading="loading" :gutter="10" class="mt text-center">
    <template v-if="data.length > 0">
      <el-col
        v-for="item in data"
        :key="item.file_id"
        :span="6"
        class="cursor-pointer"
        @click="detail(item)"
      >
        <div v-if="item.file_url">
          <div v-if="item.file_type === 'image'">
            <el-image class="h-[150px]" :src="item.file_url">
              <template #error>
                <span></span>
              </template>
            </el-image>
          </div>
          <video v-else-if="item.file_type === 'video'" controls class="w-[100%] h-[150px]">
            <source :src="item.file_url" type="video/mp4" />
            <object :data="item.file_url" class="w-[100%] h-[150px]">
              <embed :src="item.file_url" />
            </object>
          </video>
          <audio v-else-if="item.file_type === 'audio'" controls class="w-[100%] h-[150px]">
            <source :src="item.file_url" type="audio/mp3" />
            <embed :src="item.file_url" class="w-[100%] h-[150px]" />
          </audio>
          <div v-else-if="item.file_type === 'word'" class="v-middle h-[150px]">
            <el-text>
              <el-icon :size="60"><i-ep-Document /></el-icon>
            </el-text>
          </div>
          <div v-else-if="item.file_type === 'other'" class="v-middle h-[150px]">
            <el-text>
              <el-icon :size="60"><i-ep-Folder /></el-icon>
            </el-text>
          </div>
        </div>
        <p>
          <el-text truncated>{{ item.file_name }}</el-text>
        </p>
      </el-col>
    </template>
    <el-col v-else>
      <el-empty description="无内容" />
    </el-col>
  </el-row>

  <el-row>
    <el-col>
      <el-pagination
        class="mt"
        v-show="count > 0"
        v-model:page-size="query.limit"
        v-model:current-page="query.page"
        layout="prev, pager, next"
        :total="count"
        @change="list"
      />
    </el-col>
  </el-row>

  <el-row v-if="count > 0" class="text-center mt">
    <el-col>
      <el-text size="small">
        免责声明：内容来自网络，不代表本站观点和立场，如侵权请联系删除。
      </el-text>
    </el-col>
  </el-row>
</template>

<script setup>
import { list as listApi } from '@/api/file'

defineOptions({
  name: 'File'
})

const loading = ref(false)
const router = useRouter()

const groups = ref([])
const tags = ref([])

const query = ref({ page: 1, limit: 12 })
const data = ref([])
const count = ref(0)

function groupId(group) {
  if (query.value.group_id == group.group_id) {
    query.value.group_id = ''
  } else {
    query.value.group_id = group.group_id
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

function list() {
  loading.value = true
  listApi(query.value)
    .then((res) => {
      groups.value = res.data.group
      tags.value = res.data.tag
      data.value = res.data.list
      count.value = res.data.count
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

function detail(row) {
  let id = row.file_id
  let url = router.resolve({ path: '/file-detail', query: { id: id } })
  window.open(url.href, '_blank')
}

onMounted(() => {
  list()
})
</script>
