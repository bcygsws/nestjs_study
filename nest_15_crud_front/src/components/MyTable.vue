<template>
  <div class="table-container">
    <div class="title">
      <el-input
          v-model="input"
          style="max-width: 600px"
          placeholder="请输入查询内容"
          class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search" @click="handleSearch"/>
        </template>
      </el-input>
      <el-button type="primary" class="add-btn" @click="handleAdd">添加数据</el-button>
    </div>
    <!--表格内容-->
    <div class="content">
      <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe
      >
        <el-table-column label="Id" width="80">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row?.id }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row?.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="280">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row?.desc }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" width="280">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <!--dayjs包实现时间格式化工具dateFormat-->
              <span style="margin-left: 10px">{{ dateFormat(scope.row?.createdAt) }}</span>
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
                @click="handleDel(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <div class="pagination">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="param.limit"
          :total="param.total"
          @change="change"
      />
    </div>
  </div>
  <!--添加和修改数据对话框-->
  <el-dialog v-model="dialogFormVisible" :title="flag?'添加':'修改'" width="500">
    <el-form :model="form">
      <el-form-item label="用户" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="简介" :label-width="formLabelWidth">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!--  删除记录对话框-->
  <el-dialog
      v-model="delVisible"
      title="删除记录"
      width="500"
      :before-close="()=>{}"
  >
    <span>您确定要删除这条记录吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="delVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDelConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>


</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {Search} from '@element-plus/icons-vue'
import type {IParam, User} from "@/type";
import {addUserApi, deleteUserApi, getUserListApi, updateUserApi} from "@/apis";
import {dateFormat} from "../utils/format.ts";
// 特别注意：按需引入组件时，必须注视掉该语句，否则ElMessage将会失效
// import {ElMessage} from "element-plus";

// 控制添加或者修改对话框的显示或者隐藏状态
let dialogFormVisible = ref(false);
// 控制删除对话框的显示或者隐藏状态
let delVisible = ref(false);
const formLabelWidth = '48px';
// flag状态量：true为添加，false为修改
const flag = ref(true);
const form = reactive({
  id: 0,
  name: '',// 用户名
  desc: '',// 描述信息
  createdAt: new Date()// 创建时间
});

/**
 * @Desc:表格页面打开获取到数据
 *
 * */
// 文本框输入内容
const input = ref('');
// 表格数据源
const tableData = ref<User[]>([]);

// 请求参数数据
const param = reactive<IParam>({
  page: 1,// 当前页码，默认值1
  limit: 10,// 每页显示的条数，默认值为10
  search: '',// 搜索关键字
  total: 0,// 总数
  createdAt: Date.now()// 时间戳
})

const getList = async (val: IParam) => {
  const res = await getUserListApi(val);
  console.log(`res==`, res);
  if (res.status === 200) {
    tableData.value = res.data.data;
    param.total = res.data.total;

  } else {// 请求错误，弹出错误信息
    ElMessage({
      showClose: true,
      message: '出现错误，未请求到数据',
      type: 'error'
    })
  }
}
onMounted(() => {
  getList(param);
});

/**
 * @Desc:在文本框输入检索关键字，点击搜索按钮,
 * 完成`条件检索`操作
 * handleSearch()
 *
 * */
const handleSearch = async () => {
  param.search = input.value;
  await getList(param);
}

/**
 * @Desc:点击添加数据按钮，完成`添加数据`操作
 * handleAdd()
 *
 * */
const handleAdd = () => {
  // 对话框弹出，置该变量为true
  dialogFormVisible.value = true;
  // 修改flag状态量为true，标定为添加
  flag.value = true;
}
/**
 * @Desc:点击确认按钮，完成`添加数据`到后端
 * handleConfirm()
 *
 * */
const handleConfirm = async () => {
  // 关闭对话框
  dialogFormVisible.value = false;
  if (flag.value) {
    // 添加数据
    console.log(`添加数据`);
    // 转换为时间戳的5种方式：Date.now() new Date(['']).getTime()
    // Number((new Date()))、new Date().valueOf() +new Date()
    Object.assign(form, {createdAt: Date.now(), name: form.name, desc: form.desc});
    // 测试代码
    console.log(`form==`, form);
    // console.log(`form==`, typeof form.createdAt);// number
    const res = await addUserApi(form);
    console.log(`res==`, res);
    if (res.status === 201) {
      ElMessage({
        showClose: true,
        message: '成功添加一条记录',
        type: 'success'
      });
      // 重新刷新页面
      await getList(param);
      resetForm();// 重置表单
    } else {
      ElMessage({
        showClose: true,
        message: '添加数据失败',
        type: 'error'
      });
      resetForm();
    }

  } else {// 修改数据
    const res = await updateUserApi(form);
    console.log(`res==`, res);
    if (res.status === 200) {
      ElMessage({
        showClose: true,
        message: '修改成功',
        type: 'success'
      });
      await getList(param);
    } else {
      ElMessage({
        showClose: true,
        message: '修改数据失败',
        type: 'error'
      });
    }

  }

}

/**
 * @Desc：对话框的取消事件
 * handleCancel()
 * 作用：当点击``按钮，编辑完成后，点了对话框中的 取消，
 * 然后又点击`添加`按钮，要保证此时添加对话框是空白的，
 * 需要重新定义handleCancel()方法
 *
 *
 * */
const handleCancel = () => {
  // 关闭对话框
  dialogFormVisible.value = false;
  // 清空表单
  resetForm();
}

/**
 * @Desc:点击编辑按钮，弹出对话框
 * handleEdit()
 *
 *
 * */
const handleEdit = (_: number, row: User) => {
  // 记录当前id,弹出对话框
  dialogFormVisible.value = true;
  // 将flag状态量的值修改为false，状态为`修改`
  flag.value = false;
  console.log(row);
  // 记录id
  form.id = row.id;
  // 将原本的数据填充到表单中
  Object.assign(form, row);
}

/*
* @Desc:点击删除按钮，弹出`删除数据`对话框
* handleDel()
*
* */
const handleDel = async (_: number, row: User) => {
  delVisible.value = true;
  // 记录当前id
  form.id = row.id;
}
/*
* @Desc:点击确定按钮，完成`删除数据`操作
* handleDelConfirm()
*
* */

const handleDelConfirm = async () => {
  // 关闭对话框
  delVisible.value = false;
  const res = await deleteUserApi(form.id);
  console.log(res);
  if (res.status === 200) {
    ElMessage({
      showClose: true,
      message: '删除成功',
      type: 'success'
    });
    // 刷新列表
    await getList(param);
  } else {
    ElMessage({
      showClose: true,
      message: '删除失败',
      type: 'error'
    });
  }

}

// 重置添加或者修改对话框表单内容
const resetForm = () => {
  Object.assign(form, {name: '', desc: '', createdAt: new Date()});
}


/**
 * @Desc:页码切换是出发事件change
 *
 * */
const change = async (val: number) => {
  console.log(val);
  param.page = val;
  // 页码修改后，重新发出请求
  await getList(param);
}
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
    padding: 15px;
  }

  .pagination {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }

}
</style>
