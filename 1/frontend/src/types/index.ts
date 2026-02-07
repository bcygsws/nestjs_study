// 用户数据类型定义
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  age?: number;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

// 分页数据结构
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// 创建用户请求数据
export interface CreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  age?: number;
  bio?: string;
}

// 更新用户请求数据
export interface UpdateUserRequest extends Partial<CreateUserRequest> {}
