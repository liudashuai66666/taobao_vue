<template>
  <el-form ref="ruleFormRef" label-position="right" label-width="100px" status-icon :model="form" :rules="rules">
    <h3 class="box-title">基本信息</h3>
    <div class="box-body">
      <div class="account-box">
        <div class="form">
          <el-form-item label="商品分类">
            <el-text>{{data.class1}}>{{data.class2}}</el-text>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="form.name" disabled placeholder="商品名称"/>
          </el-form-item>
          <el-form-item label="最低价格" disabled prop="price">
            <el-input v-model="form.price" disabled placeholder="最低价格"/>
          </el-form-item>
          <el-form-item label="适用年龄" prop="age">
            <el-input v-model="form.age" disabled placeholder="使用年龄"/>
          </el-form-item>
          <el-form-item label="保修时间" prop="warranty">
            <el-input v-model="form.warranty" disabled placeholder="保修时间"/>
          </el-form-item>
          <el-form-item label="商品卖点" prop="sellPoint">
            <el-input type="textarea"
                      :autosize="{ minRows: 2}"
                      v-model="form.sellPoint"
                      disabled
                      placeholder="商品卖点"/>
          </el-form-item>
          <el-form-item label="商品清单" prop="inventory">
            <el-input type="textarea"
                      :autosize="{ minRows: 2}"
                      disabled
                      v-model="form.inventory"
                      placeholder="商品清单"/>
          </el-form-item>
        </div>
      </div>
    </div>
    <h3 class="box-title">商品展示图片</h3>
    <div class="box-body">
      <div style="padding: 0 20px 20px 20px">
        <el-form-item label="商品图片">
          <el-upload
              v-model:file-list="data.images"
              action="http://localhost:8081/uploadImg"
              disabled
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
            <el-icon><Plus/></el-icon>
          </el-upload>
          <!--图片预览-->
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
      </div>
    </div>
    <h3 class="box-title">商品规格</h3>
    <div class="box-body">
      <div style="padding: 0 20px 20px 20px">
        <div v-for="(item,index1) in form.sku" :key="index1" class="sku-li">
          <el-form-item label="规格名称" class="skuKey-name">
            <el-input v-model="item.skuKey" disabled placeholder="请输入规格名称"/>
          </el-form-item>
          <div class="sku-value-li">
            <div v-for="(item2,index2) in item.skuValue" :key="index2" class="sku-value">
              <p>规格项</p>
              <el-input v-model="item.skuValue[index2]" disabled placeholder="请输入规格项" class="input"/>
            </div>
          </div>
        </div>
      </div>

    </div>
    <h3 class="box-title">规格详细</h3>
    <div class="box-body">
      <div style="padding: 0 20px 20px 20px">
        <table class="goods" v-if="form.sku.length!==0">
          <thead>
            <tr>
              <th v-for="item in form.sku" width="200px">{{item.skuKey}}</th>
              <th width="280">成本价</th>
              <th width="280">价格</th>
              <th width="280">库存</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in form.skuDate" :key="index">
              <td v-for="(i,index) in item.groupSkuValue">
                {{i}}
              </td>
              <td>
                <el-input v-model="item.costPrice" disabled placeholder="请输入成本价"/>
              </td>
              <td>
                <el-input v-model="item.price" disabled placeholder="请输入价格"/>
              </td>
              <td>
                <el-input v-model="item.count" disabled placeholder="请输入库存"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </el-form>
</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import {categoryStore} from '@/stores/category'
import {ElMessage} from "element-plus";
import {selectGoodsById,} from "@/api/goods";
import {useRoute} from "vue-router";
const route = useRoute()


const ruleFormRef = ref(null)

const form = ref({
  goodsId:'',
  classId: categoryStore().selectCategory[categoryStore().selectCategory.length-1].id,
  name: "",
  sellPoint: "",
  price:'',
  status:'',
  num:'',
  images:[],
  sku:[],
  skuDate:[],
  shopId: '',
  age:'',
  inventory:'',
  warranty:'',
})/*表单数据*/

const data = reactive({
  class1: categoryStore().selectCategory[0].label,
  class2: categoryStore().selectCategory[1].label,
  images: [],
})
/*分类*/
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove = function(uploadFile, uploadFiles) {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview = function(uploadFile) {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};


/*商品图片*/


onMounted(()=>{
  const goodsId = route.query.id
  console.log(goodsId)
  selectGoodsById({goodsId}).then(res=>{
    if(res.data.flag){
      form.value=res.data.data
      data.images = form.value.images.map(url=>{
        return {
          name:url,
          url:'http://localhost:8081/img/'+url,
        };
      })
    }else{
      ElMessage.error(res.data.data)
    }
  })
})



const rules = reactive({
  name: [
    { required: true, message: '请填写参数', trigger: 'blur' },
  ],
  sellPoint: [
    { required: true, message: '请填写参数', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '请填写参数', trigger: 'blur' },
  ],
  inventory: [
    { required: true, message: '请填写参数', trigger: 'blur' },
  ],
  warranty: [
    { required: true, message: '请填写参数', trigger: 'blur' },
  ],
  price: [
    { required: true, message: '请填写参数', trigger: 'blur' },
  ],
})

</script>

<style scoped lang='scss'>
.steps{
  width: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
}
.box-title {
  margin-top: 10px;
  font-size: 16px;
  font-weight: normal;
  padding-left: 20px;
  line-height: 40px;
  border-bottom: 1px solid #f5f5f5;
  background-color: white;
}

.box-body {
  padding-top: 20px;
  background-color: white;
  .account-box {
    .toggle {
      padding: 15px 40px;
      text-align: right;

      a {
        //color: $xtxColor;

        i {
          font-size: 14px;
        }
      }
    }

    .form {
      padding: 0 20px 20px 20px;

      &-item {
        margin-bottom: 28px;

        .input {
          position: relative;
          height: 36px;

          >i {
            width: 34px;
            height: 34px;
            background: #cfcdcd;
            color: #fff;
            position: absolute;
            left: 1px;
            top: 1px;
            text-align: center;
            line-height: 34px;
            font-size: 18px;
          }

          input {
            padding-left: 44px;
            border: 1px solid #cfcdcd;
            height: 36px;
            line-height: 36px;
            width: 100%;

            &.error {
              //border-color: $priceColor;
            }

            &.active,
            &:focus {
              //border-color: $xtxColor;
            }
          }

          .code {
            position: absolute;
            right: 1px;
            top: 1px;
            text-align: center;
            line-height: 34px;
            font-size: 14px;
            background: #f5f5f5;
            color: #666;
            width: 90px;
            height: 34px;
            cursor: pointer;
          }
        }

        >.error {
          position: absolute;
          font-size: 12px;
          line-height: 28px;
          //color: $priceColor;

          i {
            font-size: 14px;
            margin-right: 2px;
          }
        }
      }

      .agree {
        a {
          color: #069;
        }
      }

      .btn {
        display: block;
        width: 100%;
        height: 40px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        //background: $xtxColor;

        &.disabled {
          background: #cfcdcd;
        }
      }
    }

    .action {
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .url {
        a {
          color: #999;
          margin-left: 10px;
        }
      }
    }
  }
  .sku-li{
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid rgb(232, 234, 236);
    transition: box-shadow 0.3s ease;  // 添加 transition 属性
    // 初始阴影为透明
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    // 鼠标悬浮时的样式
    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);  // 添加阴影样式
    }
    .skuKey-name{
      width: 300px;
    }
    .sku-value-li{
      display: flex;
      flex-wrap: wrap; /* 允许元素自动换行 */
      .sku-value{
        display: flex;
        padding-top:20px;
        p{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: 10px;
          width: 80px;
        }
        .input{
          width: 150px;
          height: 32px;
          padding-right: 10px;
        }
      }
    }
    .add-skuValue-value{
      padding: 30px 0 10px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .delete-skuKey{
      position: relative;
      top: -135px;
      left: 90%;
    }
  }
  .add-skuKey{
    display: flex;
    align-items: center;
    justify-content: center;
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
}
.sub-button{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  .subBtn {
    background: rgb(245, 108, 108);
    margin-top: 20px;
    width: 200px;
    color: #fff;
  }
}

</style>