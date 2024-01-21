<template>
  <div class="steps">
    <el-steps :space="200" :active="0" finish-status="success" simple style="background-color: white">
      <el-step title="选择商品品类" />
      <el-step title="填写商品详情" />
      <el-step title="商品发布成功" />
    </el-steps>
  </div>
  <div class="choose">
    <el-cascader-panel :options="data.category" @change="select"/>
  </div>
  <div class="next">
    <el-button type="danger" @click="next">下一步</el-button>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {selectAllCategory} from '@/api/other'
import {categoryStore} from '@/stores/category'
import {ElMessage} from "element-plus";
import router from "@/router";
const data = reactive({
  //所有分类
  category: [],
})
let selectClass = null;

const getLabelAndIdFromValue = (selectedValues) => {
  const result = [];
  const findLabelAndId = (options, values) => {
    const targetValue = values.shift();
    const option = options.find(opt => opt.value === targetValue);
    if (option) {
      result.push({ id: option.value, label: option.label });
      if (option.children && values.length > 0) {
        findLabelAndId(option.children, values);
      }
    }
  };
  findLabelAndId(data.category, selectedValues);
  return result;
}


const select = (item) => {
  selectClass = getLabelAndIdFromValue(item);
  console.log(selectClass)
}

const next = () => {
  if(selectClass!== null){
    console.log(selectClass)
    categoryStore().selectCategory = selectClass;
    router.replace({ path: '/shopManage/addGoods' })
  }else{
    ElMessage.info("请选择商品分类")
  }
}

const getAllClass = () => {
  selectAllCategory().then(res=>{
    if(res.data.flag){
      data.category = res.data.data.map(convertToNewFormat);
    }else{
      ElMessage.error(res.data.data);
    }
  })
}
onMounted(()=>{
  getAllClass();
})








function convertToNewFormat(data) {
  let result = {
    value: data.id.toString(),
    label: data.className,
    children: []
  };

  if (data.child && data.child.length > 0) {
    result.children = data.child.map(convertToNewFormat);
  }

  return result;
}
</script>

<style scoped lang='scss'>
.steps{
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;
}
.choose{
  background-color: white;
  height: 400px;
  border-radius: 8px;
}

</style>