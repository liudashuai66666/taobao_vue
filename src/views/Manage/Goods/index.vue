<template>
  <div class="goods-list">
    <h3 class="box-title">商品信息</h3>
    <div class="box-body">
      <table class="goods">
        <thead>
          <tr>
            <th width="100">商品编号</th>
            <th width="150">商品名称</th>
            <th width="80">商品价格</th>
            <th width="80">审核状态</th>
            <th width="80">上架状态</th>
            <th width="180">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in date.goods" :key="i.id">
            <td>
              {{i.id}}
            </td>
            <td>
              <a @click="goto(i.id)" class="info">
                <img :src="'http://localhost:8081/img/'+i.images[0]" alt="">
                <div class="right">
                  <p>{{ i.name }}</p>
                </div>
              </a>
            </td>
            <td>&yen;{{ i.price }}</td>
            <td>通过</td>
            <td v-if="i.status===0">审核中</td>
            <td v-if="i.status===1">上架</td>
            <td v-if="i.status===2">下架</td>
            <td>
              <el-button type="warning" @click="lookGoods(i.id)">查看</el-button>
              <el-button type="primary" v-if="i.status===2" @click="updateGoodsStatus(1,i)">上架</el-button>
              <el-button type="danger" v-if="i.status===1" @click="updateGoodsStatus(2,i)">下架</el-button>
              <el-button type="success" v-if="i.status===0" @click="updateGoodsStatus(1,i)">通过</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script setup>
import router from "@/router";
import {onMounted, reactive, ref} from "vue";
import {getAllShopGoods} from "@/api/shop";
import {ElMessage} from "element-plus";
import {getById, updGoodsStatus} from "@/api/goods";
import {goodsStore} from "@/stores/Goods";

const date = reactive({
  goodsSku:{},
  goods:[],
})

const dialogVisible =ref(false)

const updateGoodsStatus = (status,goods) => {
  const data = {status:status,goodsId:goods.id}
  updGoodsStatus(data).then(res=>{
    if (res.data.flag){
      goods.status = status
      ElMessage.success(res.data.data)
    }else{
      ElMessage.error(res.data.data)
    }
  })
}

const lookGoods = (id) => {
  console.log(id)
  router.replace({
    path: '/manage/lookGoods',
    query: { id }
  })
  window.scrollTo(0, 0);
}

onMounted(()=>{
  getAllShopGoods().then(res=>{
    if(res.data.flag){
      date.goods = res.data.data;
    }else{
      ElMessage.error(res.data.data)
    }
  })
})

const goto = (id) => {
  getById({id}).then(ref=>{
    console.log("商品请求")
    if(ref.data.flag){
      goodsStore().goods=ref.data.data.goods
      goodsStore().shop=ref.data.data.shop
      window.open('/home/goods/'+id);
    }else{
      ElMessage({ type: "error", message: ref.data.data})
    }
  })
}

const addGoods = () => {
  router.replace({ path: '/shopManage/selectClass' })
}
</script>

<style scoped lang='scss'>
.goods-list{
  display: flex;
  flex-direction: column;
  .box-title {
    margin-top: 10px;
    font-size: 20px;
    font-weight: normal;
    padding-left: 20px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;
    background-color: white;
  }

  .box-body {
    padding: 20px 20px;
    background-color: white;
    .goods {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      .info {
        display: flex;
        text-align: left;

        img {
          width: 70px;
          height: 70px;
          margin-right: 20px;
        }

        .right {
          line-height: 24px;

          p {
            &:last-child {
              color: #999;
            }
          }
          span{
            padding-right: 10px;
            color: #999;
          }
        }
      }

      tr {
        th {
          background: #f5f5f5;
          font-weight: normal;
        }

        td,
        th {
          text-align: center;
          padding: 20px;
          border-bottom: 1px solid #f5f5f5;

          &:first-child {
            border-left: 1px solid #f5f5f5;
          }

          &:last-child {
            border-right: 1px solid #f5f5f5;
          }
        }
      }
    }
  }
}
.updateSkuCount{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
      span{
        padding-right: 10px;
        color: #999;
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
    .skuCount{
      width: 120px;
    }
  }
}
</style>