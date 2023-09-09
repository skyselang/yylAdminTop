<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="link">
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="copyright">Copyright © 2018-{{year}} yylAdmin, Apache-2.0 license</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color:black;
}
.link {
  text-align: center;
}
.copyright {
  font-size: 16px;
  text-align: center;
}
.margin-left {
  margin-left: 10px;
}
</style>
