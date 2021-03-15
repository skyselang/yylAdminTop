<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="form" label-width="120px">
            <el-form-item label="头像">
              <el-avatar v-if="avatar" shape="circle" fit="contain" :size="100" :src="avatar" />
            </el-form-item>
            <el-form-item label="">
              <div>jpg、png图片，小于50kb，宽高1:1</div>
            </el-form-item>
            <el-form-item>
              <el-upload name="avatar_file" :show-file-list="false" :action="uploadAction" :headers="uploadHeaders" :on-success="uploadSuccess">
                <el-button type="primary">更换</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getToken, getUserId, getAvatar, setAvatar } from '@/utils/userinfo'

export default {
  name: 'UserAvatar',
  components: {},
  data () {
    return {
      avatar: '',
      uploadAction:
        process.env.VUE_APP_BASE_API + '/index/User/userAvatar',
      uploadHeaders: {
        UserToken: getToken(),
        UserId: getUserId()
      }
    }
  },
  created () {
    this.getAvatar()
  },
  methods: {
    getAvatar () {
      this.avatar = getAvatar()
    },
    uploadSuccess (res, file) {
      if (res.code === 200) {
        setAvatar(res.data.avatar)
        this.getAvatar()
        this.avatar = res.data.avatar
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>
