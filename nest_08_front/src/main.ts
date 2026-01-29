import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router";

const app = createApp(App);
app.use(router);
app.mount('#app');

/**
 * @Desc: 创建Vue项目
 * 1.创建项目：npm create vue@latest 项目名 -- --template vue-ts
 * 或者使用全局安装 create-vite-app
 * create-vite-app 项目名
 *
 * 2.启动项目：npm run dev
 * 3.安装依赖：npm i vue-router sass@1.78.0 -S
 * 分别用以配置路由和对scss样式的支持
 *
 * 4.创建路由文件：src/router/index.ts
 *
 *
 *
 *
 *
 *
 * */
