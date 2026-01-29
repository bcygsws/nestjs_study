<template>
  <div class="main-container">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.main-container {
  width: 1200px;
  margin: 0 auto;
  background-color: #eeeeee;
  text-align: center;

  > a {
    margin: 0 15px;
    text-decoration: none; // 去除链接a的下划线
  }
}

.active { // 激活路由时的样式
  color: red;
  font-size: 20px;
}
</style>
