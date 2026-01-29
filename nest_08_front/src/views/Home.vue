<!--
*@name: Home
*@author: Bao Chengyi
*@date: 2026/1/29 6:36
-->
<template>
  <div class="home-container">
    <h3>Home</h3>
    <!--下载图片-->
    <div class="content">
      <UploadFile/>
      <el-button @click="useFetch" type="success" plain>下载</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {getCompressSteam} from "@/apis";
import UploadFile from "@/components/UploadFile.vue";

const useFetch = async () => {
  const res = await getCompressSteam();
  console.log(`res==`, res);// res== Blob {size: 354951, type: 'application/octet-stream'}
  console.log(`res.data==`, res.data);
  // 数据请求完成后，转化为blob
  // const blob = new Blob([res]);
  // console.log(`blob==`, blob);
  // 获取下载的流文件url
  const link = document.createElement('a');
  const url = window.URL.createObjectURL(new Blob([res]));
  console.log(`url==`, url);
  link.href = url;
  link.download = 'xiaoman.zip';
  document.body.appendChild(link);
  link.click();// 模拟浏览器下载
  document.body.removeChild(link);// 下载完成后删除
  window.URL.revokeObjectURL(url);// 下载完成后释放blob的url
}
</script>

<style lang="scss" scoped>
.home-container {
  .content {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    > button {
      margin: 0 10px;
    }
  }
}

</style>
