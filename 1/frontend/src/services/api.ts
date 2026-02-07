import axios from 'axios';
import type { User, CreateUserRequest, UpdateUserRequest, PaginatedResponse } from './types';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 获取用户列表
export async function getUsers(
  search?: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<User>> {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const response = await apiClient.get<PaginatedResponse<User>>(
    `/users?${params.toString()}`
  );
  return response.data;
}

// 获取单个用户
export async function getUser(id: number): Promise<User> {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
}

// 创建用户
export async function createUser(data: CreateUserRequest): Promise<User> {
  const response = await apiClient.post<User>('/users', data);
  return response.data;
}

// 更新用户
export async function updateUser(
  id: number,
  data: UpdateUserRequest
): Promise<User> {
  const response = await apiClient.patch<User>(`/users/${id}`, data);
  return response.data;
}

// 删除用户
export async function deleteUser(id: number): Promise<void> {
  await apiClient.delete(`/users/${id}`);
}
