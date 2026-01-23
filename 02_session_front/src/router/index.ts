/**
 * @Desc:路由配置
 *
 *
 * */
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/home',
        component: () => import('@/views/Home.vue')
    },
];

const router = createRouter({
    routes,
    history: createWebHistory()
});
// 导出后main.ts中注册
export default router;
