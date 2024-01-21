import {createRouter, createWebHistory} from 'vue-router'
import login from "@/views/Login/index.vue"
import enroll from "@/views/Enroll/index.vue"
import home from "@/views/Home/index.vue"
// path和component对应关系的位置
const routes = [
    {
        name: '主页重定向',
        path: '/',
        redirect: '/home',
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
    },
    {
        path: '/chat/:shopId',
        component:()=>import("@/views/Chat/index.vue")
    },
    {
        path: '/userChat/:shopId',
        component:()=>import("@/views/Chat/userChat.vue")
    },
    {
        name: '大厅',
        path: '/home',
        component: home,
        children: [
            {
                name: '首页',
                path: '',
                component:()=> import('@/views/Home/Hall/index.vue')
            },
            {
                name: '商品页',
                path: 'goods/:id',
                component:()=> import('@/views/Home/Goods/index.vue')
            },
            {
                path: 'order',
                component:()=> import('@/views/Home/Order/index.vue')
            },
            {
                path: 'payBack',
                component:()=> import('@/views/Home/Pay/PayBack.vue')
            },/*支付结果界面*/
            {
                path: 'comment/:id',
                component:()=> import('@/views/Home/Comment/index.vue')
            },/*评论界面*/
            {
                path: 'pay',
                component: ()=> import('@/views/Home/Pay/index.vue')
            },/*支付界面*/
            {
                path: 'checkOut',
                component:()=> import('@/views/Home/CheckOut/index.vue')
            },/*确认订单*/
            {
                path: 'search/:text',
                component:()=> import('@/views/Home/Search/index.vue')
            },/*搜索界面*/
            {
                name: '一级分类',
                path: 'category/:id',
                component:()=> import('@/views/Home/Category/index.vue')
            },
            {
                name: '二级分类',
                path: 'category/sub/:id',
                component:()=> import('@/views/Home/CategorySub/index.vue')
            },
            {
                path: 'cart',
                component:()=> import('@/views/Home/Cart/index.vue')
            },
            {
                path: 'shop/:shopId',
                component:()=> import('@/views/Home/Shop/index.vue')
            },
            {
                name: '我的空间',
                path: 'my',
                component:()=> import('@/views/Home/My/index.vue'),
                children:[
                    {
                        name: '个人资料',
                        path: 'myData',
                        component:()=> import('@/views/Home/My/components/MyData.vue')
                    },
                    {
                        name: '修改密码',
                        path: 'resPassword',
                        component:()=> import('@/views/Home/My/components/ResPassword.vue')
                    },
                    {
                        name: '上传头像',
                        path: 'avatar',
                        component:()=> import('@/views/Home/My/components/Avatar.vue')
                    },
                    {
                        name: '收货管理',
                        path: 'receipt',
                        component:()=> import('@/views/Home/My/components/Receipt.vue')
                    },
                    {
                        name: '我的订单',
                        path: 'myOrders',
                        component:()=> import('@/views/Home/My/components/MyOrders.vue')
                    },
                    {
                        name: '浏览记录',
                        path: 'history',
                        component:()=> import('@/views/Home/My/components/History.vue')
                    },
                    {
                        name: '收藏的商品',
                        path: 'collectionGoods',
                        component:()=> import('@/views/Home/My/components/CollectionGoods.vue')
                    },
                    {
                        name: '收藏的店铺',
                        path: 'collectionShop',
                        component:()=> import('@/views/Home/My/components/CollectionShop.vue')
                    },
                ]
            },
        ]
    },
    {
        path: '/manage',
        component:()=>import("@/views/Manage/index.vue"),
        children: [
            {
                path: 'shop',
                component:()=>import("@/views/Manage/Shop/index.vue")
            },
            {
                path: 'goods',
                component:()=>import("@/views/Manage/Goods/index.vue")
            },
            {
                path: 'comment',
                component:()=>import("@/views/Manage/Comment/index.vue")
            },
            {
                path: 'lookGoods',
                component:()=>import("@/views/Manage/Goods/Info/index.vue")
            }
        ]
    },
    {
        path: '/shopManage',
        component: ()=>import('@/views/ShopManage/index.vue'),
        children: [
            {
                path: 'orderManage',
                component:()=> import('@/views/ShopManage/OrderManage/index.vue')
            },
            {
                path: 'shopInfo',
                component:()=> import('@/views/ShopManage/ShopInfo/index.vue')
            },
            {
                path: 'goodsManage',
                component:()=> import('@/views/ShopManage/GoodsManage/index.vue')
            },
            {
                path: 'commentManage',
                component:()=> import('@/views/ShopManage/CommentManage/index.vue')
            },
            {
                path: 'addGoods',
                component:()=> import('@/views/ShopManage/GoodsManage/AddGoods/index.vue')
            },
            {
                path: 'selectClass',
                component:()=> import('@/views/ShopManage/GoodsManage/SelectClass/index.vue')
            },
            {
                path: 'addSucceed',
                component:()=> import('@/views/ShopManage/GoodsManage/AddSucceed/index.vue')
            },
            {
                path: 'updateGoods',
                component:()=> import('@/views/ShopManage/GoodsManage/UpdateGoods/index.vue')
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;