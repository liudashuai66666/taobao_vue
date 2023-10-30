import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUser } from '@/api/user'



export const useUserStore = defineStore('user', () => {
    /**
     * 定义数据 state
     */
    const userInfo = ref({})

    /**
     * 定义方法 action
     */
        // 用户登录(获取用户信息)
    const getUserInfo = async (data) => {
            let res = await getUser(data)
            userInfo.value = res.result
        }

    // 退出登录
    const clearUserInfo = () => {
        userInfo.value = {}
        // 清除购物车列表
    }

    return { userInfo, getUserInfo, clearUserInfo }
}, {
    // 插件：持久化
    persist: true
})

