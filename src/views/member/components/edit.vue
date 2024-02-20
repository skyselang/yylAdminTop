<template>
  <el-card v-loading="loading">
    <el-form ref="form" :model="model" :rules="rules" label-width="120px">
      <el-form-item label="头像" prop="avatar_url">
        <el-col :span="10" class="h-[100px]">
          <el-image
            v-if="model.avatar_url"
            style="width: 100px; height: 100px; border-radius: 100px"
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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username" type="text" placeholder="" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="model.nickname" type="text" placeholder="" />
      </el-form-item>
      <el-form-item label="所在地" prop="region_id">
        <el-cascader
          v-model="model.region_id"
          :options="regionTree"
          :props="regionProps"
          style="width: 100%"
          placeholder="请选择所在地区"
          @change="regionChange"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('form')">重置</el-button>
        <el-button type="primary" @click="submit('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { ElMessage } from 'element-plus'
import { useUserStoreHook } from '@/store/modules/user'
import { useSettingsStoreHook } from '@/store/modules/settings'
import { tree } from '@/api/region'
import { info, edit, avatar } from '@/api/member'

export default {
  name: 'MemberEdit',
  components: {},
  data() {
    return {
      loading: false,
      model: {
        member_id: '',
        avatar_id: 0,
        avatar_url: '',
        username: '',
        email: '',
        phone: '',
        region_id: ''
      },
      uploadAction: avatar(),
      uploadHeaders: {},
      regionTree: [],
      regionProps: {
        expandTrigger: 'click',
        checkStrictly: true,
        value: 'region_id',
        label: 'region_name'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.info()
    const settingsStore = useSettingsStoreHook()
    const tokenName = settingsStore.tokenName
    const userStore = useUserStoreHook()
    const token = userStore.getToken()
    this.uploadHeaders[tokenName] = token
  },
  methods: {
    info() {
      this.loading = true
      tree()
        .then((res) => {
          this.regionTree = res.data.list
        })
        .catch(() => {})
      info()
        .then((res) => {
          this.model = res.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 地区选择
    regionChange(value) {
      if (value) {
        this.model.region_id = value[value.length - 1]
      }
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          edit(this.model, 'post')
            .then((res) => {
              this.info()
              const userStore = useUserStoreHook()
              userStore.setUserinfo(this.model)
              this.loading = false
              ElMessage.success(res.msg)
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    reset(formName) {
      this.$refs[formName].resetFields()
      this.info()
    },
    // 上传头像
    uploadSuccess(res) {
      if (res.code === 200) {
        this.model.avatar_id = res.data.file_id
        this.model.avatar_url = res.data.file_url
        ElMessage.success(res.msg)
      } else {
        ElMessage.error(res.msg)
      }
    },
    uploadError(res) {
      ElMessage.error(res.msg || '上传出错')
    },
    avatarDel() {
      this.model.avatar_id = 0
      this.model.avatar_url = ''
    }
  }
}
</script>

<style></style>
