<template>
  <div id="app">
    <el-row>
      <el-col>
        <el-container>
          <el-header>
            <app-header></app-header>
          </el-header>
          <el-main id="app-main">
            <router-view />
          </el-main>
          <el-footer>
            <app-footer></app-footer>
          </el-footer>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader/AppHeader";
import AppFooter from "@/components/AppFooter/AppFooter";
export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style scoped>
#app {
  width: 1170px;
  margin: 0 auto;
}
#app-main {
  min-height: 860px;
}
</style>
