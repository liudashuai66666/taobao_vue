import { defineStore } from 'pinia'

export const categoryStore = defineStore('category', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断出它们的类型
            category:{
                id:0,
                className:"",
                parentId:0,
                img:'',
                child:[],
            },
            selectCategory:{},
        }
    },
    getters: {

    },
    actions: {
        // 创建一个action用于登录
        loginCategory(category) {
            console.log(category)
            this.category = category;
        },
        // 创建一个action用于注销
        logoutCategory() {
            this.category = null;
        },
    },
    persist: {
        enabled: true, // true 表示开启持久化保存
        strategies: [
            {
                key: 'category',
                storage: localStorage,
            },
        ],
    },
})