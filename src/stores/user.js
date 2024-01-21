import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断出它们的类型
            user:{
                id:0,
                uname:"",
                mailbox:"",
                password:"",
                gender:"",
                userType:"",
                avatar:"",
                address:[],
            },
            onlineState:false,
            shop:{},
            shopGoods:[],
        }
    },
    getters: {
        // 添加一个getter来检查用户是否已登录
        isLoggedIn: (state) => state.onlineState,
    },
    actions: {
        // 创建一个action用于登录
        login(user) {
            this.user = user;
            this.onlineState = true;
        },
        // 创建一个action用于注销
        logout() {
            this.user = null;
            this.onlineState = false;
            this.shop=null;
            this.shopGoods = null;
        },
    },
    persist: {
        enabled: true, // true 表示开启持久化保存
        strategies: [
            {
                key: 'user',
                storage: localStorage,
            },
        ],
    },
})