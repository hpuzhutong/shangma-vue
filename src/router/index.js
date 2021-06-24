import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: '登陆页面',
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/main',
        name: '主页面',
        component: () => import('../views/main/index.vue'),
        children: [
            {
                path: 'index',
                name: '主页',
                component: () => import('../views/index/index.vue')
            },
            {
                path: 'brand',
                name: '品牌管理页面',
                component: () => import('../views/brand/index.vue')
            },
        ]
    }
]

const router = new VueRouter({

    mode: 'history',  /*去除url中的#号*/
    routes
})

export default router
