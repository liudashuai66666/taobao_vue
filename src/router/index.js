import {createRouter, createWebHistory} from 'vue-router'
import login from "@/views/Login/index.vue"
import enroll from "@/views/Enroll/index.vue"

// path和component对应关系的位置
const routes = [
    {
        name: '主页重定向',
        path: '/',
        redirect: '/login',
    },
    {
        name: '登录',
        path: '/login',
        component: login,
    },
    {
        name: '注册',
        path: '/enroll',
        component: enroll
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;