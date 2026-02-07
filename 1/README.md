# NestJS + Vue 3 + MySQL 用户管理系统

这是一个完整的全栈 CRUD 项目，演示了用户管理系统的增删改查功能。

## 技术栈

### 后端
- **NestJS** - Node.js 框架
- **TypeORM** - 数据库 ORM
- **MySQL** - 关系型数据库
- **Class Validator** - 数据验证

### 前端
- **Vue 3** - 前端框架
- **Vite** - 构建工具
- **Axios** - HTTP 客户端
- **TypeScript** - 类型安全

## 项目结构

```
project/
├── backend/                 # NestJS 后端项目
│   ├── src/
│   │   ├── users/          # 用户模块
│   │   │   ├── dto/        # 数据传输对象
│   │   │   ├── entities/   # 实体类
│   │   │   ├── users.controller.ts
│   │   │   ├── users.module.ts
│   │   │   └── users.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env                # 环境变量
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/               # Vue 3 前端项目
    ├── src/
    │   ├── services/       # API 服务
    │   ├── types/          # 类型定义
    │   ├── App.vue         # 主组件
    │   └── main.ts
    ├── index.html
    ├── package.json
    └── vite.config.ts
```

## API 接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/users | 获取用户列表（支持搜索和分页） |
| GET | /api/users/:id | 获取单个用户 |
| POST | /api/users | 创建用户 |
| PATCH | /api/users/:id | 更新用户 |
| DELETE | /api/users/:id | 删除用户 |

### 查询参数
- `search` - 搜索关键词（姓名、邮箱、电话）
- `page` - 页码（默认：1）
- `limit` - 每页数量（默认：10）

## 快速开始

### 1. 数据库配置

确保 MySQL 数据库已启动，并创建数据库：

```sql
CREATE DATABASE crud_demo;
```

修改 `backend/.env` 文件中的数据库配置：

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=crud_demo
```

### 2. 启动后端

```bash
cd backend
npm install
npm run start:dev
```

后端服务将在 http://localhost:3000 启动

### 3. 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端应用将在 http://localhost:5173 启动

## 功能特性

- ✅ 用户列表展示
- ✅ 搜索用户（按姓名、邮箱、电话）
- ✅ 分页功能
- ✅ 新增用户
- ✅ 编辑用户
- ✅ 删除用户
- ✅ 数据验证
- ✅ 响应式设计

## 用户字段

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| name | string | 是 | 姓名（2-50字符） |
| email | string | 是 | 邮箱（唯一） |
| phone | string | 否 | 电话 |
| address | string | 否 | 地址 |
| age | number | 否 | 年龄（0-150） |
| bio | string | 否 | 个人简介 |

## License

MIT
