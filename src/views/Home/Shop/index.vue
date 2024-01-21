<template>
  <div>
    <div class="shop">
      <div class="shop-info">
        <img :src="'http://localhost:8081/img/'+goodsStore().shop.logo" class="logo">
        <span class="name">{{goodsStore().shop.name}}</span>
      </div>
    </div>
    <div class="body">
      <!-- 商品列表-->
      <div class="goods-item" v-for="good in date.goodsList" @click="goto(good.id)">
        <img :src="'http://localhost:8081/img/'+good.images[0]" alt="" />
        <p class="name ellipsis">{{ good.name }}</p>
        <p class="desc ellipsis">{{ good.inventory }}</p>
        <p class="price">&yen;{{ good.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {goodsStore} from "@/stores/Goods";
import {onMounted, reactive} from "vue";
import {getById, getByShopId} from "@/api/goods";
import router from "@/router";
import {ElMessage} from "element-plus";
import {useRoute} from "vue-router";
import {Back} from "@element-plus/icons-vue";
const route = useRoute()

const date = reactive({
  goodsList:[],
})

const goto = (id) => {
  getById({id}).then(ref=>{
    console.log("商品请求")
    if(ref.data.flag){
      goodsStore().goods=ref.data.data.goods
      goodsStore().shop=ref.data.data.shop
      router.push({
        path:'/home/goods/'+id,
      })
      window.scrollTo(0, 0);
    }else{
      ElMessage({ type: "error", message: ref.data.data})
    }
  })
}

const getGoodsList = () => {
  const shopId = route.params.shopId
  getByShopId({shopId}).then(res=>{
    date.goodsList = res.data.data
  })
}

onMounted(()=>{
  getGoodsList();
})
</script>

<style scoped lang='scss'>
.shop{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px auto 15px;
  height: 80px;
  width: 1240px;
  /*width: 100%;*/
  border-radius: 40px;
  background-color: #fff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 12px;
  position: relative;
  .shop-info{
    display: flex;
    .logo{
      width: 56px;
      height: 56px;
      border-radius: 100%;
      object-fit: contain;
      margin-right: 10px;
    }
    .name{
      height: 56px;
      display: flex;
      align-items: center;
      font-family: PingFangSC-Semibold;
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 300px;
      font-weight: 600;
    }
  }
}
.body {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10px;
  width: 1240px;
  margin: 0 auto;
  background-color: white;
  .goods-item {
    display: block;
    width: 220px;
    padding: 20px 30px;
    text-align: center;
    transition: all .5s;
    margin-right: 20px;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: #CF4444FF;
      font-size: 20px;
    }
  }
}
</style>