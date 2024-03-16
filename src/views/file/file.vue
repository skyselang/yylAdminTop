<template>
  <el-row class="pl">
    <el-col :span="2"><el-text v-if="groups.length > 0">分类：</el-text></el-col>
    <el-col :span="22">
      <el-text v-for="group in groups" :key="group.group_id">
        <el-button
          :type="groupId == group.group_id ? 'primary' : ''"
          text
          size="small"
          @click="setGroupId(group)"
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
          :type="tagId == tag.tag_id ? 'primary' : ''"
          text
          size="small"
          @click="setTagId(tag)"
        >
          {{ tag.tag_name }}
        </el-button>
      </el-text>
    </el-col>
  </el-row>

  <el-row v-loading="loading" :gutter="10" class="mt text-center">
    <template v-if="lists.length > 0">
      <el-col
        v-for="item in lists"
        :key="item.file_id"
        :span="6"
        class="cursor-pointer"
        @click="goDetail(item)"
      >
        <div v-if="item.file_url">
          <div v-if="item.file_type === 'image'">
            <el-image style="height: 150px" :src="item.file_url">
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
              <el-icon :size="60"><Document /></el-icon>
            </el-text>
          </div>
          <div v-else-if="item.file_type === 'other'" class="v-middle h-[150px]">
            <el-text>
              <el-icon :size="60"><Folder /></el-icon>
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
        v-show="listsCount > 0"
        v-model:page-size="listsLimit"
        v-model:page-count="listsPages"
        v-model:current-page="listsPage"
        layout="prev, pager, next"
        :total="listsCount"
        @change="getList"
      />
    </el-col>
  </el-row>

  <el-row v-if="listsCount > 0" class="text-center mt">
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
import { Document, Folder } from '@element-plus/icons-vue'
import { list } from '@/api/file'

defineOptions({
  name: 'File'
})

const loading = ref(false)
const router = useRouter()

const groups = ref([])
const groupId = ref()

const tags = ref([])
const tagId = ref()

const lists = ref([])
const listsPage = ref(1)
const listsPages = ref(0)
const listsLimit = ref(12)
const listsCount = ref(0)

function setGroupId(data) {
  if (groupId.value == data.group_id) {
    groupId.value = ''
  } else {
    groupId.value = data.group_id
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
    page: listsPage.value,
    limit: listsLimit.value,
    group_id: groupId.value,
    tag_id: tagId.value
  })
    .then((res) => {
      groups.value = res.data.group
      tags.value = res.data.tag
      lists.value = res.data.list
      listsPage.value = res.data.page
      listsPages.value = res.data.pages
      listsCount.value = res.data.count
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

function goDetail(row) {
  let id = row.file_id
  let routeUrl = router.resolve({
    path: '/file-detail',
    query: { id: id }
  })
  window.open(routeUrl.href, '_blank')
}

onMounted(() => {
  getList()
})
</script>
