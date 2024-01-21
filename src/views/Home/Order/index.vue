<script setup>

import { useRoute } from 'vue-router'
import { ref, onMounted } from "vue"
import {CountDown} from "@/views/Home/Pay/CountDowm"
import {getOrder} from "@/api/order";
import {getById} from "@/api/goods";
import {goodsStore} from "@/stores/Goods";
import router from "@/router";
import {ElMessage} from "element-plus";
const { formatTime, start} = CountDown()

const route = useRoute()

const order = ref({})
let goods = {};
let address = {};
let region = {};
// 获取订单详情
const getOrderDetailHandler = () => {
  const orderId = route.query.id;
  getOrder({orderId}).then(res => {
    if(res.data.flag){
      order.value=res.data.data.order
      goods=JSON.parse(order.value.goods)
      address = JSON.parse(order.value.address)
      region = JSON.parse(address.region).join(' ')
      start(res.data.data.time)
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

onMounted(() => {
  getOrderDetailHandler();
})

// 支付地址
const baseURL = 'http://localhost:8081/pay/confirm'
const payUrl = `${baseURL}?orderId=${route.query.id}`

</script>


<template>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 付款信息 -->
      <div class="pay-info">
        <div class="tip">
          <p v-if="order.state===1">订单已经拍下，等待买家付款</p>
          <p v-if="order.state===2">买家已付款，等待发货</p>
          <p v-if="order.state===3">商品已发货，待收货</p>
          <p v-if="order.state===4">待评价</p>
          <p v-if="order.state===5">订单已完成</p>
          <p v-if="order.state===6">订单已取消</p>
          <p v-if="order.state===1">支付还剩 <span>{{ formatTime }}</span>, 超时后将取消订单</p>
        </div>
        <div class="amount">
          <span v-if="order.state === 1">应付总额：</span>
          <span v-else>订单金额：</span>
          <span>¥{{ order.price }}</span>
        </div>
      </div>
      <div class="box-body">
        <div class="head">
          <span>下单时间：{{ order.time }}</span>
          <span>订单编号：{{ order.orderId }}</span>
        </div>
      </div>
      <!-- 收货地址 -->
      <h3 class="box-title">收货地址</h3>
      <div class="box-body">
        <div class="address">
          <div class="text">
            <ul>
              <li><span>收<i />货<i />人：</span>{{ address.name }}</li>
              <li><span>联系方式：</span>{{ address.phone }}</li>
              <li><span>收货地址：</span>{{ region }} {{ address.address }}</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 商品列表 -->
      <h3 class="box-title">商品信息</h3>
      <div class="box-body">
        <table class="goods">
          <thead>
            <tr>
              <th width="520">商品信息</th>
              <th width="170">单价</th>
              <th width="170">数量</th>
              <th width="170">小计</th>
              <th width="170">实付</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in goods" :key="i.id">
              <td>
                <a @click="goto(i.goodsId)" class="info">
                  <img :src="'http://localhost:8081/img/'+i.img" alt="">
                  <div class="right">
                    <p>{{ i.name }}</p>
                    <span v-for="item in i.data">
                        {{item.name+':'+item.value}}
                      </span>
                  </div>
                </a>
              </td>
              <td>&yen;{{ i.price }}</td>
              <td>{{ i.count }}</td>
              <td>&yen;{{ i.price * i.count }}</td>
              <td>&yen;{{ i.price * i.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type" v-if="order.state === 1">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" :href="payUrl"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-pay-page {
  margin-top: 20px;
}

.pay-info {

  background: #fff;
  display: flex;
  align-items: center;
  height: 120px;
  padding: 0 80px;

  .icon {
    font-size: 80px;
    color: #1dc779;
  }

  .tip {
    padding-left: 10px;
    flex: 1;

    p {

      &:last-child {
        color: #999;
        font-size: 16px;
      }

      &:first-child {
        color: #181818;
        font-size: 20px;
        margin-bottom: 5px;
      }
    }
  }

  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }

      &:last-child {
        color: #CF4444FF;
        font-size: 20px;
      }
    }
  }
}

.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;

  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;

    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;

    &.active,
    &:hover {
      border-color: #27BA9BFF;
    }

    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat center / contain;
    }

    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat center / contain;
    }
  }
}
.head {
  height: 50px;
  line-height: 50px;
  background: #f5f5f5;
  padding: 0 20px;
  overflow: hidden;

  span {
    margin-right: 20px;

    &.down-time {
      margin-right: 0;
      float: right;

      i {
        vertical-align: middle;
        margin-right: 3px;
      }

      b {
        vertical-align: middle;
        font-weight: normal;
      }
    }
  }

  .del {
    margin-right: 0;
    float: right;
    color: #999;
  }
}
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
}
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: #27BA9BFF;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
}
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

</style>