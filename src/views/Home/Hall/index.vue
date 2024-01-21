<template style="background-color: rgb(245, 245, 245)">
  <Slideshow></Slideshow>
  <div class="main">
    <div class="head">
      <span>猜你喜欢</span>
      <img src="src/assets/images/recommend.png">
    </div>
    <div class="content">
      <div class="li" v-for="product in products" :key="product.id">
        <a @click="goto(product.id)">
          <div class="img-wrapper">
            <img :src="product.image">
          </div>
          <div class="info-wrapper">
            <div class="title">{{ product.name }}</div>
            <div class="tag-list"></div>
          </div>
          <div class="price-wrapper">
            <span class="price-value"><em>¥</em>{{ product.price }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import Slideshow from "@/views/Home/components/Slideshow.vue";
import {getById} from "@/api/goods"
import router from "@/router";
import {goodsStore} from "@/stores/Goods";
import {ElMessage} from "element-plus";

 const products = [
  { id: 1, name: '跟灯按弦超好玩碳纤维智能尤克里里', image: 'http://localhost:8081/img/img2.jpg', price: '599.00' },
  { id: 2, name: '平台有道翻译王青春版', image: 'http://localhost:8081/img/2img1.png', price: '799.00' },
  { id: 16, name: '测试数据', image: 'http://localhost:8081/img/1_colour2.png', price: '10.0' },
  { id: 17, name: '电吉他', image: 'http://localhost:8081/img/7bd9263a590fa6e858bce43e2945ef20.jpg', price: '400.0' },
  { id: 19, name: '华为手机', image: 'http://localhost:8081/img/c95a957d20153e2ea174022c23366eee.jpg', price: '3000.0' },
  { id: 22, name: '上衣', image: 'http://localhost:8081/img/avatar5.jpg', price: '1000.0' },
]

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

<style scoped lang='scss'>

.main{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(245, 245, 245);

  .head{
    display: flex;
    width: 1240px;
    padding: 20px 10px;
    background-color: white;
    span{
      padding-left: 18px;
      font-size: 30px;
    }
    img{
      height: 20px;
      margin-top: 15px;
      padding-left: 5px;
    }
  }
  .content{
    width: 1240px;
    padding: 10px;
    background-color: white;

    .li{
      width: 372px;
      position: relative;
      float: left;
      height: 174px;
      margin: 0 8px 18px 18px;
      overflow: hidden;
      color: #333;
      background-color: #f7f9fa;
      border: 1px solid #f7f9fa;
      -webkit-border-radius: 12px;
      -moz-border-radius: 12px;
      border-radius: 12px;
      cursor: pointer;
      -webkit-transition: all 0.5s;
      -o-transition: all 0.5s;
      -moz-transition: all 0.5s;
      transition: all 0.5s;

      a{
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 11px;

        .img-wrapper{
          position: absolute;
          width: 150px;
          height: 150px;
          overflow: hidden;
          background-color: rgba(27, 23, 67, 0.03);
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
          img{
            display: block;
            width: 100%;
            height: 100%;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
          }
        }

        .info-wrapper{
          height: 116px;
          margin-left: 162px;
          overflow: hidden;

          .title{
            display: inline-block;
            max-height: 46px;
            margin: 6px 0 2px 0;
            overflow: hidden;
            color: #333;
            font-size: 16px;
            line-height: 23px;
          }
          .tag-list{
            height: 20px;
            overflow: hidden;
          }
        }

        .price-wrapper{
          margin-left: 162px;
          color: #ff5000;
          span{
            display: inline-block;
            font-size: 22px;
            line-height: 22px;
          }
          em{
            margin-right: 4px;
            font-size: 14px;
            font-family: "Microsoft Yahei";
            vertical-align: middle;
          }
        }
      }
    }

    .li:hover{
      background-color: white;
      border: 1px solid rgb(255, 145, 94);
    }
  }
}

body{
  background-color: rgb(245,245,245);
}



.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>