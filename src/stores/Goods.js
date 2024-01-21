import { defineStore } from 'pinia'

export const goodsStore = defineStore('goods', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断出它们的类型
            goods:{},
            shop:{},
        }
    },
    actions: {
        // 创建一个action用于登录
        loginGoods(goods) {
            console.log(goods)
            this.goods = goods;
        },
        // 创建一个action用于注销
        logoutGoods() {
            this.goods = null;
        },
    },
    persist: {
        enabled: true, // true 表示开启持久化保存
        strategies: [
            {
                key: 'goods',
                storage: localStorage,
            },
        ],
    },
})