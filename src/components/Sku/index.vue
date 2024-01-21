<template>
  <form @submit.prevent="addToCart">
    <div class="goods-sku">
      <dl v-for="item in goodsStore().goods.values" :key="item.id">
        <dt>{{ item.name }}</dt>
        <dd>
          <template v-for="val in item.data" :key="val.value">
            <img
                :class="{ selected: val.selected, disabled: val.disabled }"
                @click="clickSpecs(item, val)"
                v-if="val.img"
                :src="'http://localhost:8081/img/' + val.img"
            />
            <span
                :class="{ selected: val.selected, disabled: val.disabled }"
                @click="clickSpecs(item, val)"
                v-else
            >{{ val.value }}</span>
          </template>
        </dd>
      </dl>
      <el-input-number v-model="num" :min="1" :max="10"/>
      <div>
        <button aria-disabled="false" type="submit" class="el-button el-button--large btn">
          <span class=""> 加入购物车 </span>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import {computed, ref} from 'vue';

import { goodsStore } from '@/stores/Goods';
import { useStore } from '@/stores/user';
import {ElMessage} from "element-plus";
import {getSku} from "@/api/cart";
import {cartStore} from "@/stores/Cart";

const selectedAttributes = ref([]);
const num = ref(1)            //选择的商品数量
const allCount = computed(() => {
  let count = 0;
  for (const item of goodsStore().goods.values) {
    count ++;
  }
  return count;
});//总的属性值

const clickSpecs = (item, val) => {
  item.data.forEach((v) => {
    if (v !== val) {
      v.selected = false;
    }
  });

  val.selected = !val.selected;

  const index = selectedAttributes.value.findIndex(attr => attr.type === item.name);
  if (val.selected) {
    if (index !== -1) {
      // 如果已存在相同类型的属性，则更新其值
      selectedAttributes.value[index] = { type: item.name, value: val.value,id:val.id };
    } else {
      // 否则，添加新的属性
      selectedAttributes.value.push({ type: item.name, value: val.value,id:val.id });
    }
  } else {
    // 如果取消选择，从数组中移除相应的属性
    if (index !== -1) {
      selectedAttributes.value.splice(index, 1);
    }
  }
  console.log(selectedAttributes.value.length);
  console.log(selectedAttributes.value)
};

const getSelectedAttributes = () => {
  return selectedAttributes.value;
};

const addToCart = () => {
  if(selectedAttributes.value.length === allCount.value){
    // 先得到sku，然后再得到库存价格等
    // 假设 selectedAttributes.value 是一个对象数组，每个对象都有一个 id 属性
// 步骤1: 根据 id 属性进行排序
    selectedAttributes.value.sort((a, b) => a.id - b.id);
// 步骤2: 构建 skuId 字符串
    let skuId = selectedAttributes.value.map(attribute => attribute.id).join('#');
// 现在 skuId 包含了排序后的 id 组合

    getSku({skuId}).then(res => {
      if(res.data.flag){
        console.log(res.data.data)
        cartStore().addCart({
          count:num.value,
          data:selectedAttributes.value.map(item => ({ name: item.type, value: item.value })),
          goodsId:res.data.data.goodsId,
          img:goodsStore().goods.images[0],
          isEffective:true,
          name:goodsStore().goods.name,
          price:res.data.data.price,
          selected:true,
          skuId:skuId,
          userId: useStore().user.id,
          shopId: goodsStore().goods.shopId,
        });
      }else{
        console.log("网路错误")
      }
    })
    ElMessage({ type: "success", message: "添加进购物车成功"})
  }else {
    ElMessage({ type: "warning", message: "请选择商品规格"})
  }
}

</script>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27BA9BFF;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
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

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
.el-input-number{
  position: relative;
  display: inline-flex;
  width: 150px;
  line-height: 30px;
}

.btn{
  margin-top: 20px;
}
</style>