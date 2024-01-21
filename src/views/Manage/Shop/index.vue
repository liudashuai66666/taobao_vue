<template>
  <div class="goods-list">
    <h3 class="box-title">评论管理</h3>
    <div class="box-body">
      <table class="goods">
        <thead>
          <tr>
            <th width="120">店铺名</th>
            <th width="120">店铺logo</th>
            <th width="120">店铺简介</th>
            <th width="50">店铺状态</th>
            <th width="100">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in date.shops" :key="index">
            <td>
              {{item.name}}
            </td>
            <td>
              <img :src="'http://localhost:8081/img/'+item.logo">
            </td>
            <td>
              {{item.description}}
            </td>
            <td v-if="item.status===1">
              <p class="hao-ping">开启</p>
            </td>
            <td v-if="item.status===0">
              <p class="cha-ping">关闭</p>
            </td>
            <td>
              <el-button type="info" @click="updateShopStatus(0,item)" v-if="item.status === 1">关闭</el-button>
              <el-button type="success" @click="updateShopStatus(1,item)" v-if="item.status === 0">开启</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {getAllShop} from "@/api/shop";
import {updateStatus} from "@/api/shop"
import {ElMessage} from "element-plus";

const date = reactive({
  shops:[],
})

const updateShopStatus = (status,shop) => {
  const shopId = shop.shopId;
  updateStatus({status,shopId}).then(res=>{
    ElMessage.success(res.data.data)
    shop.status = status
  })
}
const getShopList = () => {
  getAllShop().then(res=>{
    date.shops = res.data.data
  })
}

onMounted(()=>{
  getShopList();
})


</script>

<style scoped lang='scss'>
.goods-list{
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  background-color: white;
  .box-title {
    margin-top: 10px;
    font-size: 20px;
    font-weight: normal;
    padding-left: 20px;
    line-height: 48px;
    border-bottom: 1px solid #f5f5f5;
    background-color: white;
  }

  .box-body {
    background-color: white;
    font-size: 14px;
    .goods {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      .info {
        display: flex;
        text-align: left;

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
        transition: background-color 0.3s ease;
        th {
          background: #f5f5f5;
          font-weight: normal;
        }

        td,
        th {
          text-align: center;
          border: 1px solid #ededed;
          height: 48px;
          padding: 0 10px;
          font-size: 13px;
          color: #515a6e;
          &:first-child {
            border-left: 1px solid #ededed;
          }

          &:last-child {
            border-right: 1px solid #ededed;
          }
          .sort{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 3px;
            width: 150px;
            display:block;
          }
          .long{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 3px;
            width: 250px;
            display:block;
          }
          .hao-ping{
            margin: 0 8px;
            padding: 4px 0;
            border-radius: 4px;
            color: #69ca39;
            background-color: #f4fcec;
            border: 1px solid #bfeb9d;
          }
          .zhong-ping{
            margin: 0 8px;
            padding: 4px 0;
            border-radius: 4px;
            color: #fa8c16;
            background-color: #fcf5e6;
            border: 1px solid #fcd89e;
          }
          .cha-ping{
            margin: 0 8px;
            padding: 4px 0;
            border-radius: 4px;
            color: #f34049;
            background-color: #fcf0ef;
            border: 1px solid #fcaea9;
          }
          .yi-hui-fu{
            margin: 0 8px;
            padding: 4px 0;
            border-radius: 4px;
            color: #69ca39;
            background-color: #f4fcec;
            border: 1px solid #bfeb9d;
          }
          .wei-hui-fu{
            margin: 0 8px;
            padding: 4px 0;
            border-radius: 4px;
            color: #379dfc;
            background-color: #e6f5fc;
            border: 1px solid #9ed8fc;
          }
          .reply-button{
            padding: 4px 6px;
            border-radius: 2px;
            color: white;
            background-color: #fa6419;

          }
        }
      }
      tr:hover{
        background-color: #ededed;
      }
    }
  }
}
.ivu-modal-body{
  font-size: 12px;
  line-height: 1.5;
  span{
    color: #515a6e;
  }
  .comment-content{
    display: block;
  }
}
</style>