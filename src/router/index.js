import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: '登陆页面',
        component: () => import('../views/login/index.vue')
    },
    // {
    //     path: '/register',
    //     name: '注册页面',
    //     component: () => import('../views/register/index.vue')
    // },
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
            {
                path: 'admin',
                name: '员工管理页面',
                component: () => import('../views/admin/index.vue')
            },
            {
                path: 'role',
                name: '角色管理页面',
                component: () => import('../views/role/index.vue')
            },
            {
                path: 'menu',
                name: '菜单（权限）管理',
                component: () => import('../views/menu/index.vue')
            },
            {
                path: 'corn',
                name: '定时任务',
                component: () => import('../views/corn/index.vue')
            },
        ]
    }
]

const router = new VueRouter({

    mode: 'history',  /*去除url中的#号*/
    routes
})

export default router;
