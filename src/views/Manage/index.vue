<template>
  <div class="main">
    <div class="nav">
      <div class="logo">
        <img src="http://localhost:8081/img/logo.png">
      </div>
      <el-menu
          default-active="shop"
          class="el-menu-vertical-demo"
          :collapse="false"
          router
      >
        <el-menu-item index="shop">
          <el-icon><HomeFilled /></el-icon>
          <template #title>店铺管理</template>
        </el-menu-item>
        <el-menu-item index="goods">
          <el-icon><List /></el-icon>
          <template #title>商品管理</template>
        </el-menu-item>
        <el-menu-item index="comment">
          <el-icon><ChatSquare /></el-icon>
          <template #title>评价管理</template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="show">
      <div class="nav-top">
        <img :src="'http://localhost:8081/img/'+useStore().user.avatar">
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  List, HomeFilled, ChatSquare,
} from '@element-plus/icons-vue'
import {ref} from "vue";
import {useStore} from "@/stores/user";
const currentURL = window.location.href;
// 从URL中提取路径部分
const path = new URL(currentURL).pathname;
// 拆分路径为各个部分，并获取最后一个部分
const pathParts = path.split('/');
const lastPart = pathParts[pathParts.length - 1];
const activeIndex =ref(lastPart)

</script>

<style scoped lang='scss'>
.main{
  background-color: rgb(237, 237, 237);
  width: 100%;
  height: 100%;
  display: flex;
  .nav{
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
    height: 100%;
    z-index: 1500; /* 可选：设置 z-index，确保在其他元素之上 */
    .logo{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 0;
      border-bottom: 1px solid rgb(238, 238, 238);
      img{
        border-radius: 3px;
        height: 50px;
        margin-bottom: 5px;
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
    border:none;
  }

  .show{
    display: flex;
    flex-direction: column;
    width: 100%;
    .nav-top{
      z-index: 1000; /* 可选：设置 z-index，确保在其他元素之上 */
      height: 65px;
      background-color: white;
      width: 100%;
      box-shadow: 0 1px 6px rgba(0,21,41,.35);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img{
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-right: 30px;
      }
    }
    .content {
      max-height: 100%; /* 设置最大高度 */
      overflow-y: auto; /* 添加垂直滚动条，只在内容溢出时显示 */
      /* 其他样式，如边框、内边距等，可以根据需要添加 */
      border: 1px solid #ccc;
      padding: 10px;
    }
  }
}
</style>










