<template>
  <div>
    <div class="top">
      <ul class="top-ul" v-if="useStore().onlineState">
        <li>
          <a href="/home/my/myData">
            <i class="fa fa-user" />
            {{ useStore().user.uname }}
          </a>
        </li>
        <li>
          <a @click="logout">退出登录</a>
        </li>
        <li>
          <a href="/home/my/myOrders">我的订单</a>
        </li>
        <li>
          <a>我的收藏</a>
        </li>
        <li v-if="useStore().user.userType==='SHOP'">
          <a href="/shopManage/ShopInfo" target="_blank">店铺管理</a>
        </li>
      </ul>
      <ul class="top-ul" v-if="!useStore().onlineState">
        <li>
          <a href="/login">请先登录</a>
        </li>
        <li>
          <a href="javascript:;">帮助中心</a>
        </li>
        <li>
          <a href="javascript:;">关于我们</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "@/stores/user";
import router from "@/router";


const logout = ()=> {
  useStore().logout();
  router.replace({ path: '/login' })
}


</script>

<style scoped lang='scss'>
.top{
  height: 53px;
  background-color: rgb(51, 51, 51);
  .top-ul{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 1240px;
    margin: 0 auto;
    position: relative;
    li{
      height: 53px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    a{
      padding: 0 15px;
      color: rgb(205, 205, 205);
      border-right: 2px solid #666;
      line-height: 1;
      display: inline-block;
    }
    a:hover{
      color: rgb(39, 186, 155);
    }
  }
}
</style>