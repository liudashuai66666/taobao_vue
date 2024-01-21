<script setup>
import { ref, onMounted } from "vue"
import { useRoute} from "vue-router"
import {getByClass, getById, getClassParent} from "@/api/goods";
import {goodsStore} from "@/stores/Goods";
import router from "@/router";
import {ElMessage} from "element-plus";
const route = useRoute()

// 获取二级分类数据
const filterData = ref({})
const getCategoryFilterData = (id) => {
  getClassParent({id}).then(res => {
    filterData.value = res.data.data
    console.log(filterData.value)
  })
}

// 获取商品列表
const goodsList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime"    // 'publishTime' | 'orderNum' | 'evaluateNum'
})
const getGoodsList = () => {
  getByClass(reqData.value).then(res => {
    if(res.data.flag){
      goodsList.value = res.data.data
      console.log(goodsList.value)
    }
  })
}
onMounted(() => {
  getGoodsList();
  getCategoryFilterData(route.params.id);
})

// tab切换
const tabChange = () => {
  reqData.value.page = 1
  getGoodsList()
}

// 无线滚动(加载更多数据)
let disabledLoad = ref(false)
const load = () => {
  reqData.value.page++
  getByClass(reqData.value).then(res => {
    goodsList.value = [...goodsList.value, ...res.data.data.items]
    if (res.data.data.items.length === 0) {
      disabledLoad.value = true
    }
  })
}

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

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/home/category/${filterData.parentId}` }">{{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!-- <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabledLoad"> -->
      <div class="body">
        <!-- 商品列表-->
        <div class="goods-item" v-for="good in goodsList" @click="goto(good.id)">
          <img :src="'http://localhost:8081/img/'+good.images[0]" alt="" />
          <p class="name ellipsis">{{ good.name }}</p>
          <p class="desc ellipsis">{{ good.inventory }}</p>
          <p class="price">&yen;{{ good.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    .goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      transition: all .5s;

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

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

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

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

}
</style>