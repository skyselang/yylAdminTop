<template>
  <el-card v-loading="loading">
    <el-form ref="form" :model="model" :rules="rules" label-width="120px">
      <el-form-item label="头像" prop="avatar_url">
        <div class="h-[100px]">
          <el-image
            v-if="model.avatar_url"
            class="w-[100px] h-[100px] rd-[100px]"
            :src="model.avatar_url"
            :preview-src-list="[model.avatar_url]"
            title="点击查看大图"
          />
        </div>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="model.nickname" type="text" disabled />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username" type="text" disabled />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="model.phone" type="text" disabled />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="model.email" type="text" disabled />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="model.name" type="text" disabled />
      </el-form-item>
      <el-form-item label="性别" prop="gender_name">
        <el-input v-model="model.gender_name" type="text" disabled />
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-input v-model="model.birthday" type="text" disabled />
      </el-form-item>
      <el-form-item label="家乡" prop="hometown_id">
        <el-cascader
          v-model="model.hometown_id"
          :options="regionTree"
          :props="regionProps"
          class="w-full"
          placeholder=""
          disabled
        />
      </el-form-item>
      <el-form-item label="所在地" prop="region_id">
        <el-cascader
          v-model="model.region_id"
          :options="regionTree"
          :props="regionProps"
          class="w-full"
          placeholder=""
          disabled
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="info">刷新</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { useMemberStore } from '@/store/modules/member'
import { tree as region } from '@/api/region'
import { info as infoApi } from '@/api/member'
defineOptions({
  name: 'MemberInfo'
})

const memberStore = useMemberStore()

const loading = ref(false)
const model = ref({})
const regionTree = ref([])
const regionProps = ref({
  expandTrigger: 'hover',
  checkStrictly: true,
  value: 'region_id',
  label: 'region_name'
})
const rules = ref({})

function info() {
  loading.value = true
  region()
    .then((res) => {
      regionTree.value = res.data.list
    })
    .catch(() => {})
  infoApi()
    .then((res) => {
      memberStore.setInfo(res.data)
      model.value = res.data
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

onMounted(() => {
  info()
})
</script>
