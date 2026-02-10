<template>
  <div class="table-container">
    <div class="title">
      <el-input
          v-model="input3"
          style="max-width: 600px"
          placeholder="请输入查询内容"
          class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search"/>
        </template>
      </el-input>
      <el-button type="primary" class="add-btn">添加数据</el-button>
    </div>
    <!--表格内容-->
    <div class="content">
      <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe
      >
        <el-table-column label="Id" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="380">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.desc }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"/>
    </div>
  </div>

</template>
<script setup lang="ts">
import {ref} from 'vue'
import {Search} from '@element-plus/icons-vue'

interface User {
  id: string
  name: string
  desc: string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    id: '2016-05-03',
    name: 'Tom',
    desc: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: '2016-05-02',
    name: 'Tom',
    desc: 'No. 189, Grove St, Los Angeles',
  },
]
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const select = ref('')
</script>


<style lang="scss" scoped>
.table-container {
  width: 1200px;
  background-color: #eeeeee;
  height: 100vh;
  margin: 0 auto;

  .title {
    height: 50px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    .add-btn {
      margin-left: 30px;
    }
  }

  .content {
    padding: 20px;
  }

  .pagination {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }

}
</style>
