import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {VERSION_NEUTRAL, VersioningType} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 全局版本控制，在defaultVersion中指定默认版本，如果指定了默认版本，则所有路由都会添加默认版本
    app.enableVersioning({
        type: VersioningType.URI,
        // defaultVersion: '1',
        // defaultVersion:['1','2'],
        // defaultVersion: VERSION_NEUTRAL
    })
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();


/**
 * @Desc:NestJs创建和使用
 *
 * 一、nest项目创建过程
 * 1.全局安装脚手架
 * npm i -g @nestjs/cli
 *
 * 2.创建项目
 * nest new nest_01_demo
 *
 * 3.选择npm作为包管理器，安装完成后，切换到当前项目路径
 *
 * 4.启动项目
 * npm run start:dev
 *
 * 二、熟记nest创建文件的命令：
 * nest -h
 * 会弹出帮助信息，里面有快捷创建命令
 *         name          │ alias       │ description                                  │
 *       │ application   │ application │ Generate a new application workspace         │
 *       │ class         │ cl          │ Generate a new class                         │
 *       │ configuration │ config      │ Generate a CLI configuration file            │
 *       │ controller    │ co          │ Generate a controller declaration            │
 *       │ decorator     │ d           │ Generate a custom decorator                  │
 *       │ filter        │ f           │ Generate a filter declaration                │
 *       │ gateway       │ ga          │ Generate a gateway declaration               │
 *       │ guard         │ gu          │ Generate a guard declaration                 │
 *       │ interceptor   │ itc         │ Generate an interceptor declaration          │
 *       │ interface     │ itf         │ Generate an interface                        │
 *       │ library       │ lib         │ Generate a new library within a monorepo     │
 *       │ middleware    │ mi          │ Generate a middleware declaration            │
 *       │ module        │ mo          │ Generate a module declaration                │
 *       │ pipe          │ pi          │ Generate a pipe declaration                  │
 *       │ provider      │ pr          │ Generate a provider declaration              │
 *       │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
 *       │ resource      │ res         │ Generate a new CRUD resource                 │
 *       │ service       │ s           │ Generate a service declaration               │
 *       │ sub-app       │ app         │ Generate a new application within a monorepo │
 *
 *
 * 练习：
 * 分开生成login路由(优点：灵活，按需添加文件；缺点：controller类和service类中没有生成增删改查的路由)
 * nest g mo login  生成后会自动在app.module.ts(类似vue3项目中的router.ts) imports中导入
 * nest g co login  生成后会自动在login.module.ts(类似vue3项目中的router.ts) controllers中导入
 * nest g s login   生成后会自动在login.module.ts(类似vue3项目中的router.ts) providers中导入
 *
 * 生成一整套user路由：
 * nest g res user
 *
 * 三、版本控制
 * 四、状态码
 * 200: 请求成功
 * 304: not modified 协商缓存（从服务器上一次更新到现在，没有被修改过，那么直接从缓存取出数据，节约数据量）
 * 400: Bad request,参数错误
 * 401: unauthorized token,未授权
 * 403: forbidden referee origin，验证失败，路由请求被拒绝
 * 404: not found,未找到
 * 500: internal server error,服务短错误
 * 502: Bad gateway，上游接口有问题或者服务器有问题
 *
 *
 * */
