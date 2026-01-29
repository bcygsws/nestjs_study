import {createRouter, createWebHistory} from "vue-router";
import Home from '@/views/Home.vue';
import About from "@/views/About.vue";

/**
 * @Desc:配置路由
 *
 *
 * */

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
})
export default router;
