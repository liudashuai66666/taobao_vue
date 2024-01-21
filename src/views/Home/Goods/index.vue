<template>
  <div class="shop">
    <div class="shop-info">
      <img :src="'http://localhost:8081/img/'+goodsStore().shop.logo" class="logo">
      <span class="name">{{goodsStore().shop.name}}</span>
      <div class="button">
        <a :href="'/userChat/'+goodsStore().shop.shopId" target="_blank">
          <img src="https://img.alicdn.com/imgextra/i4/O1CN01xQtwpn1ezwPauykYy_!!6000000003943-2-tps-30-32.png">
          <span>联系客服</span>
        </a>
        <a :href="'/home/shop/'+goodsStore().shop.shopId">
          <img src="https://img.alicdn.com/imgextra/i3/O1CN01k56JHw1scx9dVvirY_!!6000000005788-2-tps-32-32.png">
          <span>进入店铺</span>
        </a></div>
    </div>
  </div>
  <div class="content">
    <div class="goods-info">
      <div class="media">
        <!-- 图片预览区 -->
        <div class="goods-image">
          <!-- 左侧大图-->
          <div ref="middleDiv" class="middle">
            <img ref="img" alt="">
            <!-- 蒙层小滑块 -->
            <div ref="layerDiv" class="layer" style="left: 200px; top: 200px; display: none;">

            </div>
          </div>
          <!-- 小图列表 -->
          <ul class="small">
            <li @mouseover="move('http://localhost:8081/img/'+image)" v-for="(image, index) in goodsStore().goods.images" :key="index" :class="{ 'active': index === activeIndex }">
              <img ref="smallLi" :src="'http://localhost:8081/img/'+image" :alt="image.alt">
            </li>
          </ul>
          <!--放大镜大图-->
          <div ref="largeDiv" class="large" style="background-image:
          url(&quot;''&quot;);
           background-position: -326px -224px; display: none;">

          </div>
        </div>
        <!-- 统计数量 -->
        <ul class="goods-sales">
          <li>
            <p class="tint">销量人气</p>
            <p class="good-data">872+ </p>
            <p class="is-link">
              <i class="fa fa-flag" />
              销量人气
            </p>
          </li>
          <li>
            <p class="tint">商品评价</p>
            <p class="good-data">1+</p>
            <p class="is-link">
              <i class="fa fa-comment" />
              查看评价
            </p>
          </li>
          <li>
            <p class="tint">收藏人气</p>
            <p class="good-data">1+</p>
            <p class="is-link">
              <i class="fa fa-star"/>
              收藏商品
            </p>
          </li>
          <li>
            <p class="tint">品牌信息</p>
            <p class="good-data">传智自有品牌</p>
            <p class="is-link">
              <i class="fa fa-copyright"/>
              品牌主页
            </p>
          </li>
        </ul>
      </div>
      <div class="spec">
        <!--商品信息-->
        <p class="g-name">{{goodsStore().goods.name}}</p>
        <p class="g-desc">{{goodsStore().goods.sellPoint}}</p>
        <p class="g-price">
          <span class="new-price">{{goodsStore().goods.price}}</span>
          <span class="old-price">{{goodsStore().goods.price}}</span>
        </p>
        <div class="g-service">
          <dl>
            <dt>促销</dt>
            <dd>12月好物放送，App领券购买直降120元</dd>
          </dl>
          <dl>
            <dt>服务</dt>
            <dd>
              <span>无忧退货</span>
              <span>快速退款</span>
              <span>免费包邮</span>
              <a href="javascript:;">了解详情</a>
            </dd>
          </dl>
        </div>
        <XtxGoodSku></XtxGoodSku>
      </div>
    </div>
    <div class="goods-footer">
      <div class="goods-article">
        <el-tabs class="tabs" v-model="activeName">
          <el-tab-pane label="商品详情" name="first">
            <div class="goods-detail">
            <ul class="attrs">
              <li>
                <span class="dt">适用年龄</span>
                <span class="dd">{{goodsStore().goods.age}}</span>
              </li>
              <li>
                <span class="dt">商品清单</span>
                <span class="dd">{{goodsStore().goods.inventory}}</span>
              </li>
              <li>
                <span class="dt">保修期</span>
                <span class="dd">{{goodsStore().goods.warranty}}</span>
              </li>
            </ul>
            <div v-for="(image, index) in goodsStore().goods.images" :key="index">
              <img :src="'http://localhost:8081/img/'+image">
            </div>
          </div>
          </el-tab-pane>
          <el-tab-pane label="商品评论" name="second">
            <el-tabs @tab-change="tabChange">
              <!-- tab切换 -->
              <el-tab-pane v-for="item in tabTypes" :key="item.name" :label="item.label" />
              <div class="comment" v-for="comment in goodsStore().goods.commentList">
                <div class="comment-info">
                  <div class="userInfo">
                    <div>
                      <img :src="'http://localhost:8081/img/'+comment.avatar">
                    </div>
                    <div class="info">
                      <div class="name">
                        {{ comment.name }}
                        <el-rate
                            v-model="comment.score"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template=" "
                        />
                      </div>
                      <div class="sku">
                        <span v-for="i in JSON.parse(comment.sku)">{{i.name+':'+i.value  }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="comment-text">
                    {{comment.content}}
                  </div>
                  <div class="images" v-if="comment.images">
                    <div class="image" v-for="img in JSON.parse(comment.images)">
                      <img :src="'http://localhost:8081/img/'+img" compresssuffix="q90" lazyload="true" style="width: 100px; height: 100px;">
                    </div>
                  </div>
                  <div class="big-img" style="display: none">
                    <img src="http://localhost:8081/img/avatar/avatar.jpg">
                  </div>
                </div>
                <div class="reply">
                  <div class="reply-info" v-if="comment.reply">
                    回复：{{comment.reply}}
                  </div>
                </div>
              </div>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="goods-aside">
        <div class="goods-hot">
          <h3>24小时热榜</h3>
          <!--商品区块-->
          <a href="/detail/4033959" class="goods-item">
            <img src="http://localhost:8081/img/img2.jpg" alt="">
            <p class="name ellipsis">3秒快速拆琴轻松保养odin奥丁12半音阶口琴</p>
            <p class="desc ellipsis">易吹性好按键灵敏音色优美全黑琴身</p>
            <p data-v-f5e250f0="" class="price">¥329.00</p>
          </a>
          <a href="/detail/4033959" class="goods-item">
            <img src="http://localhost:8081/img/img3.jpg" alt="">
            <p class="name ellipsis">3秒快速拆琴轻松保养odin奥丁12半音阶口琴</p>
            <p class="desc ellipsis">易吹性好按键灵敏音色优美全黑琴身</p>
            <p data-v-f5e250f0="" class="price">¥329.00</p>
          </a>
          <a href="/detail/4033959" class="goods-item">
            <img src="http://localhost:8081/img/img4.jpg" alt="">
            <p class="name ellipsis">3秒快速拆琴轻松保养odin奥丁12半音阶口琴</p>
            <p class="desc ellipsis">易吹性好按键灵敏音色优美全黑琴身</p>
            <p data-v-f5e250f0="" class="price">¥329.00</p>
          </a>
          <h3>周热榜</h3>
          <!--商品区块-->
          <a href="/detail/4033959" class="goods-item">
            <img src="http://localhost:8081/img/img2.jpg" alt="">
            <p class="name ellipsis">3秒快速拆琴轻松保养odin奥丁12半音阶口琴</p>
            <p class="desc ellipsis">易吹性好按键灵敏音色优美全黑琴身</p>
            <p data-v-f5e250f0="" class="price">¥329.00</p>
          </a>
          <a href="/detail/4033959" class="goods-item">
            <img src="http://localhost:8081/img/img3.jpg" alt="">
            <p class="name ellipsis">3秒快速拆琴轻松保养odin奥丁12半音阶口琴</p>
            <p class="desc ellipsis">易吹性好按键灵敏音色优美全黑琴身</p>
            <p data-v-f5e250f0="" class="price">¥329.00</p>
          </a>
          <a href="/detail/4033959" class="goods-item">
            <img src="http://localhost:8081/img/img4.jpg" alt="">
            <p class="name ellipsis">3秒快速拆琴轻松保养odin奥丁12半音阶口琴</p>
            <p class="desc ellipsis">易吹性好按键灵敏音色优美全黑琴身</p>
            <p data-v-f5e250f0="" class="price">¥329.00</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {goodsStore} from "@/stores/Goods"
import {useStore} from "@/stores/user"
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import XtxGoodSku from "@/components/Sku/index.vue";
import {ElMessage, ElNotification} from "element-plus";
import {getComments} from "@/api/comment";
import {getById} from "@/api/goods";
import {useRoute} from "vue-router";
const route = useRoute()

// 评论tab列表
const tabTypes = [
  { name: "all", label: "全部评论" },
  { name: "good", label: "好评" },
  { name: "medium", label: "中评" },
  { name: "bad", label: "差评" }
]
const data = {
  goodsId : goodsStore().goods.id,
  type:0 //0是默认全部评论
}
const getCommentList = () => {
  getComments(data).then(res => {
    if(res.data.flag){
      goodsStore().goods.commentList = res.data.data
    }else {
      ElNotification({
        title: 'Error',
        message: res.data.data,
        type: 'error',
      })
    }
  })
}

// tab切换
const tabChange = (type) => {
  data.type = type
  getCommentList()
}
const activeName = ref('first')


// 创建响应式引用，用于存储中间和层叠的div元素
const middleDiv = ref(null);  //大照片div
const layerDiv = ref(null);   //蒙层小滑块
const largeDiv = ref(null);   //放大镜大图
const smallLi = ref(null);    //小图列表
const img = ref(null);        //大照片
const layerX = ref(0);
const layerY = ref(0);
const initialImage = goodsStore().goods.images[0];

let activeIndex = 4; // 设置活动项的索引，这里假设第5项为活动项（索引从0开始）

// 在组件挂载后运行设置逻辑
onMounted(() => {
  // 附加mousemove和mouseleave事件监听器
  middleDiv.value.addEventListener('mousemove', handleMouseMove);
  middleDiv.value.addEventListener('mouseleave', handleMouseLeave);
  img.value.src = "http://localhost:8081/img/"+initialImage
  largeDiv.value.style.backgroundImage = `url(${"http://localhost:8081/img/"+initialImage})`;
  // 在滑块位置变化时更新放大镜大图的背景位置
  watch([layerX, layerY], () => {
    updateBackgroundPosition();
  });

});
const move = (src) => {
  img.value.src=src
  // 设置背景图片
  largeDiv.value.style.backgroundImage = `url(${src})`;
}

// 处理mousemove事件的函数
const handleMouseMove = (event) => {
  // 获取中间和层叠div的尺寸和位置
  const middleRect = middleDiv.value.getBoundingClientRect();
  const layerRect = layerDiv.value.getBoundingClientRect();

  // 计算层叠div的位置，以确保鼠标指针位于其中心
  layerX.value = event.clientX - middleRect.left - layerRect.width / 2;
  layerY.value = event.clientY - middleRect.top - layerRect.height / 2;

  // 确保层叠div保持在中间div的边界内
  const maxX = middleRect.width - layerRect.width;
  const maxY = middleRect.height - layerRect.height;

  // 将层叠div的位置限制在边界内
  const clampedX = Math.min(Math.max(0, layerX.value), maxX);
  const clampedY = Math.min(Math.max(0, layerY.value), maxY);

  // 更新层叠div的位置
  layerDiv.value.style.display = 'block';
  largeDiv.value.style.display = 'block';
  layerDiv.value.style.left = clampedX + 'px';
  layerDiv.value.style.top = clampedY + 'px';
};

// 处理mouseleave事件的函数
const handleMouseLeave = () => {
  // 当鼠标离开中间div时隐藏层叠div
  layerDiv.value.style.display = 'none';
  largeDiv.value.style.display = 'none';
};
const updateBackgroundPosition = () => {
  // 计算新的background-position值
  const backgroundPositionX = -layerX.value + 'px';
  const backgroundPositionY = -layerY.value + 'px';

  // 更新放大镜大图的样式
  largeDiv.value.style.backgroundPosition = `${backgroundPositionX} ${backgroundPositionY}`;
};

// 在组件销毁之前移除事件监听器
onBeforeUnmount(() => {
  middleDiv.value.removeEventListener('mousemove', handleMouseMove);
  middleDiv.value.removeEventListener('mouseleave', handleMouseLeave);
});
</script>

<style scoped lang='scss'>

.shop{
  display: flex;
  align-items: center;
  margin: 15px auto 0;
  height: 80px;
  width: 1240px;
  /*width: 100%;*/
  border-radius: 40px;
  background-color: #fff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 12px;
  position: relative;
  .shop-info{
    display: flex;
    .logo{
      width: 56px;
      height: 56px;
      border-radius: 100%;
      object-fit: contain;
      margin-right: 10px;
    }
    .name{
      height: 56px;
      display: flex;
      align-items: center;
      font-family: PingFangSC-Semibold;
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 300px;
      font-weight: 600;
    }
    .button{
      top: 0;
      right: 22px;
      position: absolute;
      padding: 22px 0;
      a{
        height: 36px;
        width: 102px;
        border: 1px solid #eee;
        border-radius: 18px;
        background-color: #fff;
        margin-left: 13px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        img{
          height: 13px;
          width: 13px;
          line-height: 14px;
          vertical-align: -2px;
        }
        span{
          line-height: 34px;
          margin-left: 6px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          font-size: 14px;
          color: #000;
        }
      }
    }
  }
}
.content{
  width: 1240px;
  margin: 15px auto 0;
  position: relative;
  background-color: rgb(245, 245, 245);
  .goods-info{
    min-height: 600px;
    background: #fff;
    display: flex;
    border-radius: 24px;
    .media{
      width: 580px;
      height: 600px;
      padding: 30px 50px;

      .goods-image{
        width: 480px;
        height: 400px;
        position: relative;
        display: flex;

        .middle{
          width: 400px;
          height: 400px;
          background: #f5f5f5;
        }

        .layer{
          width: 200px;
          height: 200px;
          background: rgba(0, 0, 0, 0.2);
          left: 0;
          top: 0;
          position: absolute;
        }

      }
      .small{
        width: 80px;
        li{
          width: 68px;
          height: 68px;
          margin-left: 12px;
          margin-bottom: 15px;
          cursor: pointer;
        }
      }
      .large{
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        z-index: 500;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        background-size: 800px 800px;
        background-color: #f8f8f8;
      }
    }
    .goods-sales{
      display: flex;
      align-items: center;
      text-align: center;
      height: 140px;
      li{
        flex: 1;
        margin-right: 10px;
        .tint{
          color: rgb(153, 153, 153);
        }
        p{
          margin-top: 10px;
        }
        .is-link{
          color: rgb(102, 102, 102);
        }
        .is-link:hover{
          color: rgb(39, 186, 155);
        }
        .good-data{
          color: rgb(207, 68, 68);
        }
        i{
          color: rgb(39, 186, 155);
        }
      }
    }

    .spec{
      flex: 1;
      padding: 30px 30px 30px 0;

      .g-name{
        font-size: 22px;
      }
      .g-desc{
        color: #999;
        margin-top: 10px;
      }
      .g-price{
        margin-top: 10px;
        .new-price{
          color: #cf4444;
          margin-right: 10px;
          font-size: 22px;
        }
        .old-price{
          color: #999;
          text-decoration: line-through;
          font-size: 16px;
        }
      }
      .g-service{
        background: #f5f5f5;
        width: 500px;
        padding: 20px 10px 0 10px;
        margin-top: 10px;
        dl{
          padding-bottom: 20px;
          display: flex;
          align-items: center;
          dt{
            width: 50px;
            color: #999;
          }
          dd{
            color: #666;
            span{
              margin-right: 10px;
            }
            span:before{
              content: "•";
              color: #27ba9b;
              margin-right: 2px;
            }
            a{
              color: #27ba9b;
            }
          }
        }
      }
      .goods-sku {
        padding-left: 10px;
        padding-top: 20px;

        dl {
          display: flex;
          padding-bottom: 20px;
          align-items: center;

          dt {
            width: 50px;
            color: #999;
          }

          .dd {
            flex: 1;
            color: #666;

            img {
              width: 50px;
              height: 50px;
              margin-bottom: 4px;
              border: 1px solid #e4e4e4;
              margin-right: 10px;
              cursor: pointer;
            }
          }
        }
      }
    }

  }

  .goods-footer{
    display: flex;
    margin-top: 20px;
    .goods-article{
      width: 940px;
      margin-right: 20px;
      .tabs{
        min-height: 600px;
        background: #fff;
        padding: 10px 40px 40px 40px;
        .comment{
          display: flex;
          flex-direction: column;
          padding: 25px 0;
          border-bottom: 1px solid rgb(240, 240, 240); /* 下划线样式，1像素宽度，黑色 */
          .comment-info{
            display: flex;
            flex-direction: column;
            .userInfo{
              display: flex;
              img{
                height: 50px;
                width: 50px;
                border-radius: 25px;
                line-height: 39px;
                margin-right: 10px;
                margin-top: 4px;
              }
              .info{
                display: flex;
                flex-direction: column;
                .name{
                  font-family: PingFang SC;
                  font-weight: 700;
                  font-size: 17px;
                  color: #000;
                  line-height: 22px;
                }
                .sku{
                  font-family: PingFang SC;
                  font-size: 14px;
                  color: #7a7a7a;
                  line-height: 18px;
                  span{
                    padding-right: 10px;
                  }
                }
              }
            }
            .comment-text{
              margin-top: 15px;
              font-family: PingFang SC;
              font-size: 16px;
              color: #000;
              line-height: 22px;
            }
            .images{
              display: flex;
              margin-top: 10px;
              border: 12px;
              .image{
                position: relative;
                float: left;
                height: 100px;
                width: 100px;
                margin-right: 4px;
                cursor: pointer;
              }
            }
            .big-img{
              padding-top: 10px;
              img{
                border-radius: 12px;
                width: 420px;
                height: 420px;
                cursor: zoom-out;
              }
            }
          }
          .reply{
            margin-top: 12px;
            .reply-info{
              font-family: PingFang SC;
              font-size: 13px;
              color: #7a7a7a;
              line-height: 20px;
            }
          }
        }

      }
      .goods-detail{
        .attrs{
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 30px;
          padding-top: 20px;
          li{
            display: flex;
            margin-bottom: 10px;
            width: 50%;
            .dt{
              width: 100px;
              color: #999;
            }
            .dd{
              flex: 1;
              color: #666;
            }
          }
        }
        img{
          width: 860px;
        }
      }
    }
    .goods-aside{
      width: 280px;
      min-height: 1000px;
      .goods-hot{
        box-sizing: border-box;
        h3{
          height: 70px;
          background: #e26237;
          color: #fff;
          font-size: 18px;
          line-height: 70px;
          padding-left: 25px;
          margin-bottom: 10px;
          font-weight: normal;
        }
        .goods-item{
          display: block;
          padding: 20px 30px;
          text-align: center;
          background: #fff;
          img{
            width: 160px;
            height: 160px;
          }
          .ellipsis{
            padding-top: 10px;
          }
          .desc{
            color: #999;
            height: 29px;
          }
          .price{
            color: #cf4444;
            font-size: 20px;
          }
        }
      }
    }
  }
}

</style>