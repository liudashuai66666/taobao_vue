<template>
  <div class="main">
    <div class="path">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryStore().category.className }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-list">
      <h3>{{categoryStore().category.className}}</h3>
      <ul>
        <li v-for="item in categoryStore().category.child" :key="item.id">
          <a :href="'/home/category/sub/'+item.id">
            <img :src="'http://localhost:8081/img/'+item.img" alt="">
            <p>{{ item.className }}</p>
          </a>
        </li>
      </ul>
    </div>
    <div v-for="item in categoryStore().category.child" :key="item.id" class="ref-goods">
      <div class="head">
        <h3>- {{item.className}} -</h3>
      </div>
    </div>

  </div>

</template>

<script setup>
import {ArrowRight} from "@element-plus/icons-vue";
import {categoryStore} from "@/stores/category"


</script>

<style scoped lang='scss'>
.main{
  width: 1240px;
  margin: 0 auto;
  .path{
    padding: 25px 0;
  }
  .sub-list{
    background-color: #fff;
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }
    ul{
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li{
        width: 168px;
        height: 160px;
        a{
          text-align: center;
          display: block;
          font-size: 16px;
          img{
            width: 100px;
            height: 100px;
          }
          p{
            line-height: 40px;
          }
        }
        a:hover{
          color: #27ba9b;
        }
      }
    }
  }
  .ref-goods{
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head{
      box-sizing: border-box;
      h3{
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
      }
    }
  }
}
</style>