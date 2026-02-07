<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import type { User } from './types';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './services/api';

// 状态定义
const users = ref<User[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = 10;
const loading = ref(false);
const searchQuery = ref('');

// 表单状态
const showForm = ref(false);
const isEditing = ref(false);
const formRef = ref<HTMLFormElement | null>(null);

const formData = reactive({
  id: 0,
  name: '',
  email: '',
  phone: '',
  address: '',
  age: 0,
  bio: '',
});

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 50, message: '姓名长度必须在2-50个字符之间', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
  ],
};

// 计算属性
const totalPages = computed(() => Math.ceil(total.value / pageSize));

// 获取用户列表
async function fetchUsers() {
  loading.value = true;
  try {
    const result = await getUsers(searchQuery.value, currentPage.value, pageSize);
    users.value = result.data;
    total.value = result.total;
  } catch (error) {
    console.error('获取用户列表失败:', error);
    alert('获取用户列表失败');
  } finally {
    loading.value = false;
  }
}

// 搜索用户
function handleSearch() {
  currentPage.value = 1;
  fetchUsers();
}

// 重置搜索
function resetSearch() {
  searchQuery.value = '';
  currentPage.value = 1;
  fetchUsers();
}

// 打开新增表单
function openAddForm() {
  isEditing.value = false;
  resetForm();
  showForm.value = true;
}

// 打开编辑表单
async function openEditForm(user: User) {
  isEditing.value = true;
  const result = await getUser(user.id);
  Object.assign(formData, {
    id: result.id,
    name: result.name,
    email: result.email,
    phone: result.phone || '',
    address: result.address || '',
    age: result.age || 0,
    bio: result.bio || '',
  });
  showForm.value = true;
}

// 重置表单
function resetForm() {
  Object.assign(formData, {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    age: 0,
    bio: '',
  });
}

// 提交表单
async function handleSubmit() {
  if (!formRef.value) return;

  try {
    loading.value = true;
    if (isEditing.value) {
      await updateUser(formData.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
        age: formData.age || undefined,
        bio: formData.bio || undefined,
      });
      alert('用户更新成功');
    } else {
      await createUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
        age: formData.age || undefined,
        bio: formData.bio || undefined,
      });
      alert('用户创建成功');
    }
    showForm.value = false;
    fetchUsers();
  } catch (error: any) {
    console.error('保存用户失败:', error);
    const message = error.response?.data?.message || '保存用户失败';
    alert(message);
  } finally {
    loading.value = false;
  }
}

// 删除用户
async function handleDelete(user: User) {
  if (!confirm(`确定要删除用户 "${user.name}" 吗？`)) return;

  try {
    loading.value = true;
    await deleteUser(user.id);
    alert('用户删除成功');
    if (users.value.length === 1 && currentPage.value > 1) {
      currentPage.value--;
    }
    fetchUsers();
  } catch (error) {
    console.error('删除用户失败:', error);
    alert('删除用户失败');
  } finally {
    loading.value = false;
  }
}

// 取消表单
function handleCancel() {
  showForm.value = false;
  resetForm();
}

// 分页处理
function handlePageChange(page: number) {
  currentPage.value = page;
  fetchUsers();
}

// 生命周期
onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="container">
    <header class="header">
      <h1>用户管理系统</h1>
      <p class="subtitle">NestJS + Vue 3 + MySQL CRUD Demo</p>
    </header>

    <!-- 搜索区域 -->
    <div class="search-area">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索姓名、邮箱或电话..."
        class="search-input"
        @keyup.enter="handleSearch"
      />
      <button class="btn btn-primary" @click="handleSearch">搜索</button>
      <button class="btn btn-secondary" @click="resetSearch">重置</button>
      <button class="btn btn-success" @click="openAddForm">新增用户</button>
    </div>

    <!-- 用户列表 -->
    <div class="table-container">
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>邮箱</th>
            <th>电话</th>
            <th>年龄</th>
            <th>地址</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="8" class="loading">加载中...</td>
          </tr>
          <tr v-else-if="users.length === 0">
            <td colspan="8" class="empty">暂无数据</td>
          </tr>
          <template v-else>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone || '-' }}</td>
              <td>{{ user.age || '-' }}</td>
              <td>{{ user.address || '-' }}</td>
              <td>{{ new Date(user.createdAt).toLocaleDateString() }}</td>
              <td class="actions">
                <button class="btn btn-primary btn-sm" @click="openEditForm(user)">
                  编辑
                </button>
                <button class="btn btn-danger btn-sm" @click="handleDelete(user)">
                  删除
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination" v-if="totalPages > 0">
      <button
        class="btn btn-secondary"
        :disabled="currentPage === 1"
        @click="handlePageChange(currentPage - 1)"
      >
        上一页
      </button>
      <span class="page-info">
        第 {{ currentPage }} / {{ totalPages }} 页，共 {{ total }} 条
      </span>
      <button
        class="btn btn-secondary"
        :disabled="currentPage === totalPages"
        @click="handlePageChange(currentPage + 1)"
      >
        下一页
      </button>
    </div>

    <!-- 用户表单弹窗 -->
    <div class="modal" v-if="showForm">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ isEditing ? '编辑用户' : '新增用户' }}</h2>
          <button class="close-btn" @click="handleCancel">&times;</button>
        </div>
        <form ref="formRef" @submit.prevent="handleSubmit" class="user-form">
          <div class="form-group">
            <label for="name">姓名 <span class="required">*</span></label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              minlength="2"
              maxlength="50"
              placeholder="请输入姓名"
            />
          </div>
          <div class="form-group">
            <label for="email">邮箱 <span class="required">*</span></label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              placeholder="请输入邮箱"
            />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="phone">电话</label>
              <input
                id="phone"
                v-model="formData.phone"
                type="text"
                maxlength="20"
                placeholder="请输入电话"
              />
            </div>
            <div class="form-group">
              <label for="age">年龄</label>
              <input
                id="age"
                v-model.number="formData.age"
                type="number"
                min="0"
                max="150"
                placeholder="请输入年龄"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="address">地址</label>
            <input
              id="address"
              v-model="formData.address"
              type="text"
              maxlength="200"
              placeholder="请输入地址"
            />
          </div>
          <div class="form-group">
            <label for="bio">简介</label>
            <textarea
              id="bio"
              v-model="formData.bio"
              rows="3"
              maxlength="500"
              placeholder="请输入个人简介"
            ></textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="handleCancel">
              取消
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? '保存中...' : (isEditing ? '更新' : '创建') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.search-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #7f8c8d;
}

.btn-success {
  background-color: #27ae60;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background-color: #229954;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #c0392b;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.user-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #555;
  white-space: nowrap;
}

.user-table tr:hover {
  background-color: #f8f9fa;
}

.user-table .actions {
  display: flex;
  gap: 8px;
}

.loading,
.empty {
  text-align: center;
  padding: 40px !important;
  color: #999;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.page-info {
  color: #666;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  font-size: 1.5rem;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.close-btn:hover {
  color: #333;
}

.user-form {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
}

.required {
  color: #e74c3c;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-group textarea {
  resize: vertical;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .header h1 {
    font-size: 1.8rem;
  }

  .search-area {
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .pagination {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
