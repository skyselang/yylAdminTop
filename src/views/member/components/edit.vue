<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="form" :model="model" :rules="rules" label-width="120px">
            <el-form-item label="头像" prop="avatar_url">
              <el-col :span="10">
                <el-image
                  v-if="model.avatar_url"
                  style="width: 100px; height: 100px; border-radius: 100px;"
                  :src="model.avatar_url"
                  :preview-src-list="[model.avatar_url]"
                  title="点击查看大图"
                />
              </el-col>
              <el-col :span="14">
                <el-upload
                  name="file"
                  :show-file-list="false"
                  :action="uploadAction"
                  :headers="uploadHeaders"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                >
                  <el-button size="mini">上传头像</el-button>
                </el-upload>
                <span>jpg、png图片，小于50kb，宽高1:1</span>
              </el-col>
            </el-form-item>
            <el-form-item label="账号" prop="username">
              <el-input v-model="model.username" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="model.nickname" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="model.email" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model="model.phone" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="region_id">
              <el-cascader v-model="model.region_id" :options="regionTree" :props="regionProps" @change="regionChange" placeholder="请选择所在地区" style="width:100%" />
            </el-form-item>
            <el-form-item>
              <el-button @click="reset('form')">重置</el-button>
              <el-button type="primary" @click="submit('form')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getMemberToken, setAvatar } from '@/utils/userinfo'
import { tree } from '@/apis/region'
import { info, edit, avatar } from '@/apis/member'

export default {
  name: 'MemberEdit',
  components: {},
  data () {
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
      uploadHeaders: { MemberToken: getMemberToken() },
      regionTree: [],
      regionProps: {
        expandTrigger: 'click',
        checkStrictly: true,
        value: 'region_id',
        label: 'region_name'
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.isLogin()
  },
  methods: {
    isLogin () {
      const token = getMemberToken()
      if (token) {
        this.info()
      }
    },
    info () {
      this.loading = true
      tree().then(res => {
        this.regionTree = res.data
      }).catch((err) => {
        this.$message.error(err.msg)
      })
      info().then(res => {
        this.model = res.data
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this.$message.error(err.msg)
      })
    },
    // 地区选择
    regionChange (value) {
      if (value) {
        this.model.region_id = value[value.length - 1]
      }
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          edit(this.model, 'post').then(res => {
            this.info()
            setAvatar(this.model.avatar_url)
            this.loading = false
            this.$message.success(res.msg)
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.info()
    },
    // 上传头像
    uploadSuccess (res) {
      if (res.code === 200) {
        this.model.avatar_id = res.data.file_id
        this.model.avatar_url = res.data.file_url
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    uploadError (res) {
      this.$message.error(res.msg || '上传出错')
    }
  }
}
</script>

<style>
</style>
