<template>
  <div>
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
.copyright {
  text-align: center;
}
</style>
