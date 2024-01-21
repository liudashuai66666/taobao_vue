<template>
  <div class="main">
    <h3 class="box-title">商品信息</h3>
    <div class="box-body">
      <table class="goods">
        <thead>
          <div class="goods-info">
            <span style="width: 520px">商品信息</span>
            <span style="width: 170px">单价</span>
            <span style="width: 170px">数量</span>
            <span style="width: 170px">小计</span>
            <span style="width: 170px">实付</span>
          </div>
        </thead>
        <tbody>
          <div class="comment-main" v-for="(item,index) in data.goods" :key="index">
            <div class="comment-goods">
              <div class="comment-image">
                <a :href="'/home/goods?id='+item.goodsId" class="info">
                  <img :src="'http://localhost:8081/img/'+item.img">
                  <div class="right">
                    <p>{{ item.name }}</p>
                    <span v-for="i in item.data">
                    {{i.name+':'+i.value}}
                  </span>
                  </div>
                </a>
              </div>
              <div class="attribute">&yen;{{ item.price }}</div>
              <div class="attribute">{{ item.count }}</div>
              <div class="attribute">&yen;{{ item.price * item.count }}</div>
              <div class="attribute">&yen;{{ item.price * item.count }}</div>
            </div>
            <div class="comment-content">
              <el-rate v-model="data.grade[index]" size="large" />
              <el-input
                  v-model="data.content[index]"
                  type="textarea"
                  :autosize="{ minRows: 2}"
                  class="custom-input"
                  maxlength="80"
                  placeholder="输入文本"></el-input>
              <!--选择图片-->
              <el-upload
                  v-model:file-list="image.img[index]"
                  action="http://localhost:8081/uploadImg"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                <el-icon><Plus/></el-icon>
              </el-upload>
              <!--图片预览-->
              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </div>
          </div>
          <div class="submit" @click="submit">
            <el-button type="primary" size="large">评论</el-button>
          </div>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

import { useRoute } from 'vue-router'
import {ref, onMounted, reactive, toRefs} from "vue"
import {getOrder} from "@/api/order";
import {Plus} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {setComments} from "@/api/comment";
import router from "@/router";

const route = useRoute()

const order = ref({})
const data = reactive({
  // 商品数据
  goods:[],
  //评论数据
  content:[],
  //评分数据
  grade:[],
  //图片
  image: [[]],
  orderId:route.params.id
})

const image = reactive({
  // 文件
  img: [[]]
})


// 获取订单详情
const getOrderDetailHandler = () => {
  const orderId = route.params.id;
  getOrder({orderId}).then(res => {
    if(res.data.flag){
      order.value=res.data.data.order
      console.log(order.value)
      data.goods=JSON.parse(order.value.goods)
      console.log(data.goods,"商品")
    }
  })
}

onMounted(() => {
  getOrderDetailHandler();
})

const submit = () =>{
  // 将属性分解出来
  const { content, grade } = toRefs(data);
  // 检查是否有属性为空
  const hasEmptyContent = content.value.some(item => item === null || item === undefined);
  const hasEmptyGrade = grade.value.some(item => item === 0);
  if (hasEmptyContent || hasEmptyGrade || content.value.length!==data.goods.length) {
    ElMessage({
      message: '请将全部订单评价完再提交',
      type: 'warning',
    })
  } else {

    for (let i = 0; i < image.img.length; i++) {
      let newImg = image.img[i].map(file => file.name);
      console.log(newImg)
      data.image[i]=newImg
    }
    setComments(data).then(res=>{
      if(res.data.flag){
        ElMessage({
          message: '提交成功',
          type: 'success',
        })
        router.replace({ path: '/home/my/myOrders' })
        window.scrollTo(0, 0);
      }else{
        ElMessage({
          message: '网络错误',
          type: 'error',
        })
      }
    })
  }
}


let dialogImageUrl = '';
let dialogVisible = false;

const handleUploadSuccess = (uploadFile) => {
  data.image[this.index].push(uploadFile.url)
}
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl = uploadFile.url;
  dialogVisible = true;
};



</script>

<style scoped lang='scss'>
.main{
  width: 1240px;
  margin: 0 auto;
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
      .goods-info{
        display: flex;
        text-align: center;
        border-bottom: 1px solid #f5f5f5;
        background: #f5f5f5;
        span{
          padding: 20px;
        }
      }

      .comment-main{
        display: flex;
        flex-direction: column;
        width: 1200px;
        border: 1px solid rgb(245, 245, 245);
        .comment-goods{
          display: flex;
          .comment-image{
            text-align: center;
            padding: 20px;
            width: 520px;
          }
          .attribute{
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            width: 170px;
          }
        }
        .comment-content{
          div{
            padding: 10px;
          }
          .custom-input {
            padding: 10px;
            border-radius: 5px;
            outline: none;
            font-size: 16px;
            transition: border-color 0.3s ease;
            width: 1176px;
            &:focus {
              border-color: #2ecc71;
            }
          }

        }
      }
      .submit{
        display: flex;
        flex-direction: column;
        width: 1200px;
        padding:20px 0;
      }


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
    }
  }
}
</style>