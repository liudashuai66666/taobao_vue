<template>

  <div class="my-nav">
    <div class="demo-collapse nav-tab">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="我的账户" name="1">

          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleMenuSelect">
            <el-menu-item index="myData">个人资料</el-menu-item>
            <el-menu-item index="resPassword">修改密码</el-menu-item>
            <el-menu-item index="avatar">上传头像</el-menu-item>
            <el-menu-item index="receipt">收货管理</el-menu-item>
          </el-menu>

        </el-collapse-item>
        <el-collapse-item title="交易管理" name="2">

          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleMenuSelect">
            <el-menu-item index="myOrders">我的订单</el-menu-item>
            <el-menu-item index="history">浏览记录</el-menu-item>
            <el-menu-item index="collectionGoods">收藏的商品</el-menu-item>
            <el-menu-item index="collectionShop">收藏的店铺</el-menu-item>
          </el-menu>

        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="content">
      <!-- 三级路由 -->
      <div class="head">
        <div class="user-meta">
          <div class="avatar">
            <img :src="'http://localhost:8081/img/'+useStore().user.avatar" alt="User Avatar">
          </div>
          <h4>{{ useStore().user.uname }}</h4>
        </div>
        <div class="item">
          <a>
            <font-awesome-icon icon="fa fa-gem" size="2x" />
            <p>会员中心</p>
          </a>
          <a>
            <font-awesome-icon icon="fa fa-cog" size="2x" />
            <p>安全设置</p>
          </a>
          <a>
            <font-awesome-icon icon="fa fa-map-marker-alt" size="2x" />
            <p>地址管理</p>
          </a>
        </div>
      </div>
      <div class="main">
        <router-view/>
      </div>
    </div>
  </div>


</template>

<script setup>
import { ref } from 'vue'
import router from "@/router";
import {useStore} from "@/stores/user"

const activeName = ref('1')
const currentURL = window.location.href;

// 从URL中提取路径部分
const path = new URL(currentURL).pathname;

// 拆分路径为各个部分，并获取最后一个部分
const pathParts = path.split('/');
const lastPart = pathParts[pathParts.length - 1];

const activeIndex =ref(lastPart)

const handleMenuSelect = (index) => {
  console.log(useStore().user.avatar)
  activeIndex.value = index;
  console.log("我要去到"+index+"页面了")
  router.replace({ path: index })
}
</script>

<style scoped lang='scss'>
.my-nav{
  display: flex;
  padding-top: 20px;
  width: 1240px;
  margin: 0 auto;

  .nav-tab{
    width: 220px;
    padding: 10px 40px 50px 40px;
    margin-right: 20px;
    margin-bottom: 20px;
    border-radius: 2px;
    background-color: #fff;
  }
}

.item{
  font-size: 14px;
}

.content{
  display: flex;
  flex-direction: column;

  .head{
    width: 1031px;
    height: 132px;
    background: url(/src/assets/images/center-bg.png) no-repeat center/cover;
    display: flex;
    margin-bottom: 20px;


    .user-meta{
      flex: 1;
      display: flex;
      align-items: center;

      .avatar{
        width: 85px;
        height: 85px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 60px;

        img{
          max-width: 100%;
          max-height: 100%;
          vertical-align: middle;
        }
      }

      h4{
        padding-left: 26px;
        font-size: 18px;
        font-weight: normal;
        color: white;
      }
    }


    .item{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;

      a{
        color: white;
        font-size: 16px;
        text-align: center;

        p{
          line-height: 32px;
        }
      }
    }
  }

  .main{
    background-color: rgb(255, 255, 255);
    padding: 20px 20px 100px 20px;
    margin-bottom: 20px;
  }


}


</style>