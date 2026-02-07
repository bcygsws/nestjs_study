import axios from 'axios';
import type {User, CreateUserRequest, UpdateUserRequest, PaginatedResponse} from './types';

/**
 * @desc；URLSearchParams对象的使用
 * 作用：用于构建查询字符串
 * 使用：
 * 1.实例化URLSearchParams对象
 * 2.append方法添加参数
 * (key,变量.toString())存储起来
 * 示例：
 * params.append('search',search.toString());
 *
 * 3.toString方法将参数转换为查询字符串
 *
 *
 * */

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
    console.log('之前的params', params);
    if (search) params.append('search', search);
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    // console.log('之后的params', params);
    console.log(params.toString());

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
