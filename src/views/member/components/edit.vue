<template>
  <el-card v-loading="loading">
    <el-form ref="form" :model="model" :rules="rules" label-width="120px">
      <el-form-item label="头像" prop="avatar_url">
        <el-col :span="10" class="h-[100px]">
          <el-image
            v-if="model.avatar_url"
            class="w-[100px] h-[100px] rd-[100px]"
            :src="model.avatar_url"
            :preview-src-list="[model.avatar_url]"
            title="点击查看大图"
          />
        </el-col>
        <el-col :span="14">
          <el-row>
            <el-col>
              <el-upload
                name="file"
                :show-file-list="false"
                :action="uploadAction"
                :headers="uploadHeaders"
                :on-success="uploadSuccess"
                :on-error="uploadError"
              >
                <el-button>上传</el-button>
              </el-upload>
              <el-button @click="avatarDel">删除</el-button>
            </el-col>
            <el-col>
              <el-text>jpg、png图片，小于50kb，宽高1:1</el-text>
            </el-col>
          </el-row>
        </el-col>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="model.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="model.phone" type="text" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="model.email" type="text" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="model.name" type="text" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="model.gender">
          <el-radio :value="0">未知</el-radio>
          <el-radio :value="1">男</el-radio>
          <el-radio :value="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所在地" prop="region_id">
        <el-cascader
          v-model="model.region_id"
          :options="regionTree"
          :props="regionProps"
          class="w-full"
          placeholder="请选择所在地区"
          @change="regionChange"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { useSettingsStore } from '@/store/modules/settings'
import { useMemberStore } from '@/store/modules/member'
import { tree as region } from '@/api/region'
import { info, edit, avatar } from '@/api/member'
defineOptions({
  name: 'MemberEdit'
})

const settingsStore = useSettingsStore()
const memberStore = useMemberStore()

const loading = ref(false)
const form = ref()
const model = ref({
  member_id: '',
  avatar_id: 0,
  avatar_url: '',
  nickname: '',
  username: '',
  phone: '',
  email: '',
  name: '',
  gender: 0,
  region_id: ''
})
const rules = ref({
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
})
const uploadAction = avatar()
const uploadHeaders = ref({})
const regionTree = ref([])
const regionProps = ref({
  expandTrigger: 'click',
  checkStrictly: true,
  value: 'region_id',
  label: 'region_name'
})

function detail() {
  loading.value = true
  region()
    .then((res) => {
      regionTree.value = res.data.list
    })
    .catch(() => {})
  info()
    .then((res) => {
      model.value = res.data
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}
function submit() {
  form.value.validate((valid) => {
    if (valid) {
      loading.value = true
      edit(model.value)
        .then((res) => {
          detail()
          loading.value = false
          memberStore.setInfo(model.value)
          ElMessage.success(res.msg)
        })
        .catch(() => {
          loading.value = false
        })
    }
  })
}
function reset() {
  detail()
  form.value.resetFields()
}
function regionChange(value) {
  if (value) {
    model.value.region_id = value[value.length - 1]
  }
}
// 上传头像
function uploadToken() {
  const tokenName = settingsStore.tokenName
  const tokenValue = memberStore.getToken()
  uploadHeaders.value[tokenName] = tokenValue
}
function uploadSuccess(res) {
  if (res.code === 200) {
    model.value.avatar_id = res.data.file_id
    model.value.avatar_url = res.data.file_url
    ElMessage.success(res.msg)
  } else {
    ElMessage.error(res.msg)
  }
}
function uploadError(res) {
  ElMessage.error(res.msg || '上传出错')
}
function avatarDel() {
  model.value.avatar_id = 0
  model.value.avatar_url = ''
}

onMounted(() => {
  detail()
  uploadToken()
})
</script>
