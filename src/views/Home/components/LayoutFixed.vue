<script setup>
import { useScroll } from "@vueuse/core"
import {categoryStore} from "@/stores/category"
import {selectCategory} from "@/api/other";
import {ElMessage} from "element-plus";

const { y } = useScroll(window)

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

const handleNavigation = (item,index) => {
  window.scrollTo(0, 0);//将界面拉到最顶部
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

</script>

<template>
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav ">
        <li v-for="(item, index) in navItems" :key="index" :class="{ 'selected': item.selected }">
          <router-link
              :to="item.path"
              @click="handleNavigation(item,index)">
            {{ item.label }}
          </router-link>
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url("@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid #27BA9BFF;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: #27BA9BFF;
      }
    }
  }
}

.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: #27BA9BFF;
        border-bottom: 1px solid #27BA9BFF;
      }
    }

    .active {
      color: #27BA9BFF;
      border-bottom: 1px solid #27BA9BFF;
    }
  }
}
</style>