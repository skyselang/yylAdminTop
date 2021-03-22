<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="copyright">友情链接：<a href="https://www.luhu.co" target="_blank">芦虎导航</a></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="copyright">Copyright © 2020 yylAdmin, Apache-2.0 license</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
  data () {
    return {}
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color:black;
}
.copyright {
  text-align: center;
}
</style>
