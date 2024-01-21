import { defineStore } from 'pinia'
import {addCart, deleteCart, getCartList} from "@/api/cart";
import {computed, ref} from "vue";
import {useStore} from "@/stores/user"
import {ElMessage} from "element-plus";

export const cartStore = defineStore('cart', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        const cartList = ref([]);
        return {
            cartList,
        }
    },
    getters: {
        allCount() {
            return computed(() => this.cartList.reduce((totalCount, item) => totalCount + item.count, 0));
        },

        allPrice() {
            return computed(() => this.cartList.reduce((totalPrice, item) => totalPrice + item.count * item.price, 0));
        },

        // 是否全选
        isAll() {
            return computed(() => {
                if (this.cartList.length === 0) return false
                return this.cartList.every(item => item.selected)
            });
        },

        // 选中的数量和价格
        selectedCount() {
            return computed(() => this.cartList.filter(item => item.selected).reduce((totalCount, value) => totalCount + value.count, 0));
        },

        selectedPrice() {
            return computed(() => this.cartList.filter(item => item.selected).reduce((totalPrice, value) => totalPrice + value.count * value.price, 0));
        },
    },

    actions: {
        setCart: function(id) {
            getCartList({ id }).then(res => {
                if (res.data.flag) {
                    this.cartList = res.data.data;
                } else {
                    console.log("网络错误");
                }
            });
        },
        addCart: async function(goods) {
            // 判断是否登录
            if (useStore().onlineState) {
                // 判断是否已经添加到购物车
                const good = this.cartList.find(item => item.skuId === goods.skuId);
                if (good) {
                    good.count += goods.count;
                } else {
                    const goods1=goods;
                    this.cartList.push(goods1);
                    addCart(goods).then(res=>{
                        if(res.data.flag){
                            console.log("添加成功")
                        }else {
                            console.log("添加失败")
                        }
                    })
                }
            } else {
                // 处理登录情况
            }
        },
        deleteCart: async function(skuId) {
            if (useStore().onlineState) {
                this.cartList = this.cartList.filter(item => item.skuId !== skuId);
                // 删除购物车中的物品，通过skuId和userId来进行删除
                await deleteCart({skuId:skuId,userId:useStore().user.id}).then(res=>{
                    if(res.data.flag){
                        ElMessage({ type: "success", message: "删除成功"});
                    }else {
                        ElMessage({type:"error",message:"删除失败"});
                    }
                })
            } else {
                // 处理登录情况
            }
        },
        deleteCartByGoodsId: function(goodsId) {
            console.log("goodsId是" + goodsId);
            this.cartList = this.cartList.filter(item => {
                console.log(item.goodsId, typeof item.goodsId);
                return item.goodsId != goodsId;
            });
            console.log("过滤后的购物车列表", this.cartList);
        },

        clearCartList: function() {
            this.cartList = [];
            // 根据用户id来清空购物车
        },
        singleCheck: function(skuId, selected) {
            this.cartList.find(item => item.skuId === skuId).selected = selected;
        },
        allCheck: function(value) {
            this.cartList.forEach(item => (item.selected = value));
            console.log(this.isAll)
        },
    },
    persist: {
        enabled: true, // true 表示开启持久化保存
        strategies: [
            {
                key: 'cart',
                storage: localStorage,
            },
        ],
    },
})