<template>
  <el-row>
    <el-col>
      <div class="text-center"></div>
    </el-col>
    <el-col class="text-center">
      <el-text>Copyright © 2018-{{ year }} yylAdmin, Apache-2.0 license </el-text>
    </el-col>
  </el-row>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
