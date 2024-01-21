<template>
  <div class="head">
    <div class="head-container">
      <h1 class="logo">
        <a href="/" class="logo-img"></a>
      </h1>
      <ul class="nav">
        <li v-for="(item, index) in navItems" :key="index" :class="{ 'selected': item.selected }">
          <router-link
              :to="item.path"
              @click="handleNavigation(item,index)">
            {{ item.label }}
          </router-link>
        </li>
      </ul>
      <div class="search">
        <i class="fa fa-search" />
        <input type="text" placeholder="搜一搜" v-model="searchText" @keydown.enter="handleEnter">
      </div>
      <div class="cart">
        <a class="curr">
          <i class="fa fa-shopping-cart"></i>
          <em>{{cartStore().cartList.length}}</em>
        </a>
        <div class="layer">
        <div class="list">
          <div class="item" v-for="i in cartStore().cartList" :key="i">
            <RouterLink to="">
              <img :src="'http://localhost:8081/img/'+i.img" alt="" />
              <div class="center">
                <p class="name ellipsis-2">
                  {{ i.name }}
                </p>
                <p class="attr ellipsis">
                  <span v-for="item in i.data">
                    {{item.name+':' +item.value   }}
                  </span>
                </p>
              </div>
              <div class="right">
                <p class="price">&yen;{{ i.price }}</p>
                <p class="count">x{{ i.count }}</p>
              </div>
            </RouterLink>
            <i class="fa fa-times" @click="cartStore().deleteCart(i.skuId)"/><!--删除按钮-->
          </div>
        </div>
        <div class="foot">
          <div class="total">
            <p>共 {{ cartStore().cartList.length }} 件商品</p>
            <p>&yen; {{cartStore().allPrice}} </p>
          </div>
          <el-button size="large" type="primary" @click="goCart">去购物车结算</el-button>
        </div>
      </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {useStore} from "@/stores/user"
import { categoryStore } from "@/stores/category"
import { cartStore } from "@/stores/Cart"
import router from "@/router";
import {useRoute} from "vue-router";
import { selectCategory } from "@/api/other"
import {ElMessage, ElNotification} from "element-plus";
import {provide, ref} from "vue";
const user = useStore().user
const navItems = [
  { path: '/home', label: '首页', query: { id: null }},
  { path: '/home/category/1', label: '居家', query: { id: 1 } },
  { path: '/home/category/2', label: '美食', query: { id: 2 } },
  { path: '/home/category/3', label: '服饰', query: { id: 3 } },
  { path: '/home/category/4', label: '母婴', query: { id: 4 } },
  { path: '/home/category/5', label: '个护', query: { id: 5 } },
  { path: '/home/category/6', label: '严选', query: { id: 6 } },
  { path: '/home/category/7', label: '数码', query: { id: 7 } },
  { path: '/home/category/8', label: '运动', query: { id: 8 } },
  { path: '/home/category/9', label: '杂项', query: { id: 56 }},
];
const route = useRoute();
const handleNavigation = (item,index) => {
  navItems.forEach((v)=>{
    v.selected = false;
  });
  navItems[index].selected=true;
  item.selected = true;

  // 点击导航时触发路由跳转，并传递查询参数
  // 将id道后端，从后端来得到想要的数据
  const  id = item.query.id
  if(id!==null){
    selectCategory({id}).then(res=>{
      if(res.data.flag){
        categoryStore().category=res.data.data;
      }else{
        ElMessage({ type: "error", message: "网络错误"})
      }
    })
  }
};
const goCart = () => {
  if(useStore().onlineState){
    router.replace({ path: '/home/cart' })
  }else{
    ElNotification({
      title: 'Warning',
      message: '请先登录',
      type: 'warning',
    })
    router.replace({ path: '/login' })
  }
}


// 搜索
const searchText = ref('');
provide('searchText',searchText)
const handleEnter = () => {
  // 回车键被按下，执行你的逻辑
  search();
};

const search = () => {
  // 在这里执行搜索的逻辑
  console.log(searchText.value);
  window.location.href = '/home/search/'+searchText.value;
};

</script>

<style scoped lang="scss">


.head{
  background-color: white;

  .head-container{
    height: 132px;
    background-color: white;
    width: 1240px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .logo{
      display: block;
      width: 200px;
      height: 132px;

      text-indent: -9999px;
      background: url(/src/assets/images/logo.png) no-repeat center 18px/contain;
    }

    .nav{
      display: flex;
      width: 820px;
      padding-left: 40px;
      height: 32px;
      position: relative;
      z-index: 998;

      li{
        margin-right: 40px;
        width: 38px;
        text-align: center;

        a,span{
          font-size: 16px;
          line-height: 32px;
          height: 32px;
          display: inline-block;
        }

        a:hover{
          color: rgb(39, 186, 155);
          border-bottom: 1.5px solid rgb(39, 186, 155);
        }

      }
    }
  }
  .selected{
    color: rgb(39, 186, 155);
    border-bottom: 1.5px solid rgb(39, 186, 155);
  }
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }

  .search{
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    i{
      font-size: 18px;
      margin-left: 5px;
    }

    input{
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  /*.cart{
    width: 50px;
    position: relative;
    z-index: 600;

    .curr{
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      i{
        font-size: 22px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      em{
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: #e26237;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
      }
    }
  }*/
  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;
    i {
      font-size: 22px;
    }
    em {
      font-style: normal;
      position: absolute;
      right: -2;
      top: 0;
      padding: 1px 6px;
      line-height: 1;
      background: #E26237FF;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
      font-family: Arial;
    }
  }

  .cart:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }

  .layer {
    opacity: 0;
    transition: all 0.4s 0.2s;
    transform: translateY(-200px) scale(1, 0);
    width: 400px;
    height: 400px;
    position: absolute;
    top: 150px;
    right: 150px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 4px;
    padding-top: 10px;
    z-index: 1000; // 根据你的布局调整这个值

    &::before {
      content: "";
      position: absolute;
      right: 14px;
      top: -10px;
      width: 20px;
      height: 20px;
      background: #fff;
      transform: scale(0.6, 1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    }

    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;

      .total {
        padding-left: 10px;
        color: #999;

        p {
          &:last-child {
            font-size: 18px;
            color: #CF4444FF;
          }
        }
      }
    }
  }

  .list {
    height: 310px;
    overflow: auto;
    padding: 0 10px;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f8f8f8;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #eee;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    .item {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
      position: relative;

      i {
        position: absolute;
        bottom: 38px;
        font-size: 20px;
        right: 0;
        opacity: 0;
        color: #666;
        transition: all 0.5s;
      }

      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
      }

      a {
        display: flex;
        align-items: center;

        img {
          height: 80px;
          width: 80px;
        }

        .center {
          padding: 0 10px;
          width: 200px;

          .name {
            font-size: 16px;
          }

          .attr {
            color: #999;
            padding-top: 5px;
            span{
              padding-right: 10px;
            }
          }
        }

        .right {
          width: 100px;
          padding-right: 20px;
          text-align: center;

          .price {
            font-size: 16px;
            color: #CF4444FF;
          }

          .count {
            color: #999;
            margin-top: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}




</style>