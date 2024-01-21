<script setup>
import {getShopOrderPage, updState} from "@/api/order"
import { ref, onMounted } from "vue"
import {goodsStore} from "@/stores/Goods";
import {useStore} from "@/stores/user"
import {ElMessage} from "element-plus";

// 支付地址

const fomartPayState = (payState) => {
  const stateMap = {
    1: '待用户付款',
    2: '待发货',
    3: '待用户收货',
    4: '待用户评价',
    5: '已完成',
    6: '已取消'
  }
  return stateMap[payState]
}

// 加载效果
let loading = ref(true)
const total = ref(0)//总数量


// tab列表
const tabTypes = [
  { name: "all", label: "全部订单" },
  { name: "unpay", label: "待用户付款" },
  { name: "deliver", label: "待发货" },
  { name: "receive", label: "待用户收货" },
  { name: "comment", label: "待用户评价" },
  { name: "complete", label: "已完成" },
  { name: "cancel", label: "已取消" }
]
// 订单列表
const orderList = ref([])
const data = {
  orderState: 0, // 0默认是全部订单
  page: 1,
  pageSize: 10,
  shopId:useStore().shop.shopId
}

const fahuo = (order) => {
  const data = {status:3,orderId:order.orderId};
  updState(data).then(res=>{
    if (res.data.data){
      order.state=3;
      ElMessage.success(res.data.data)
    }else{
      ElMessage.error(res.data.data)
    }
  })
}

const getOrderList = () => {
  loading.value = true
  console.log(data.shopId)
  getShopOrderPage(data).then(res => {
    console.log(res.data.data)
    orderList.value = res.data.data.orders
    total.value = res.data.data.count
    loading.value = false
  })
}
onMounted(() => getOrderList())


// tab切换
const tabChange = (type) => {
  console.log(type)
  data.orderState = type
  data.page = 1
  getOrderList()
}

// 页数切换
const pageChange = (page) => {
  console.log(page)
  data.page = page
  getOrderList()
}
</script>

<template>
  <div class="order-container" v-loading="loading">
    <el-tabs @tab-change="tabChange">
      <!-- tab切换 -->
      <el-tab-pane v-for="item in tabTypes" :key="item.name" :label="item.label" />

      <div class="main-container">
        <div class="holder-container" v-if="orderList.length === 0">
          <el-empty description="暂无订单数据" />
        </div>
        <div v-else>
          <!-- 订单列表 -->
          <div class="order-item" v-for="order in orderList" :key="order.id">
            <div class="head">
              <span>下单时间：{{ order.time }}</span>
              <span>订单编号：{{ order.orderId }}</span>
            </div>
            <div class="body">
              <div class="column goods">
                <ul>
                  <li v-for="item in JSON.parse(order.goods)" :key="item.id">
                    <a class="image" href="javascript:;">
                      <img :src="'http://localhost:8081/img/'+item.img" alt="" />
                    </a>
                    <div class="info">
                      <p class="name ellipsis-2">
                        {{ item.name }}
                      </p>
                      <p class="attr ellipsis">
                        <span>
                          <span v-for="i in item.data">{{i.name+':'+i.value  }}</span>
                        </span>
                      </p>
                    </div>
                    <div class="price">¥{{ item.price }}</div>
                    <div class="count">x{{ item.count }}</div>
                  </li>
                </ul>
              </div>
              <div class="column state">
                <p>{{ fomartPayState(order.state) }}</p>
                <p v-if="order.state === 3">
                  <a href="javascript:;" class="green">查看物流</a>
                </p>
              </div>
              <div class="column amount">
                <p class="red">¥{{ order.price?.toFixed(2) }}</p>
                <p>在线支付</p>
              </div>
              <div class="column action">
                <el-button v-if="order.state === 2" type="primary" size="small" @click="fahuo(order)">
                  立即发货
                </el-button>
                <p><a :href="'/home/order?id='+order.orderId">查看详情</a></p>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <div class="pagination-container">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange"
                           :page-size="data.pageSize" />
          </div>
        </div>
      </div>

    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.order-container {
  padding: 10px 20px;
  background-color: white;

  .pagination-container {
    display: flex;
    justify-content: center;
  }

  .main-container {
    min-height: 500px;

    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
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

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      >p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;

        .green {
          color: #27BA9BFF;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: #CF4444FF;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: #27BA9BFF;
          }
        }
      }
    }
  }
}
</style>