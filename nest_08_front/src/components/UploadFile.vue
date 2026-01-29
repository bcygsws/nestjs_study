<!--
*@name: UploadFile.vue
*@author: Bao Chengyi
*@date: 2026/1/30 2:04
-->
<template>
  <div class="up-container">
    <h3>上传文件</h3>
    <el-upload
        ref="upload"
        class="upload-demo"
        action="api/download/album"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <el-button class="ml-3" type="success" @click="submitUpload">
        传服务器
      </el-button>
      <template #tip>
        <div class="el-upload__tip text-red">
          limit 1 file, new file will cover the old file
        </div>
      </template>
    </el-upload>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {genFileId} from 'element-plus'

import type {UploadInstance, UploadProps, UploadRawFile} from 'element-plus'

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId();
  console.log(`file==`, file);
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  console.log(`upload.value==`, upload.value);
  upload.value!.submit()
}

</script>

<style lang="scss" scoped>
.up-container {
  .upload-demo {
    .el-upload {
      .el-button {
        margin-right: 20px;
      }
    }


  }
}


</style>
