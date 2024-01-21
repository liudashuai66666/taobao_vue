<template>
  <div class="main">
    <el-form ref="ruleFormRef" label-position="left" label-width="80px" status-icon :model="form" :rules="rules">
      <el-form-item label="收货人" prop="name">
        <el-input v-model="form.name" placeholder="请输入收货人姓名"/>
      </el-form-item>
      <el-form-item label="地址备注" prop="tag">
        <el-input v-model="form.tag" placeholder="请输入地址备注"/>
      </el-form-item>
      <el-form-item label="地址" prop="region">
        <el-cascader
            size="large"
            :options="pcaTextArr"
            v-model="form.region">
        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input
            v-model="form.address"
            :rows="3"
            type="textarea"
            placeholder="输入详细的收获地址，小区名称，门牌号等"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号码"/>
      </el-form-item>
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button type="default" @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form>
  </div>
</template>

<script setup>
import {ref, reactive, inject, onMounted} from "vue";
import { pcaTextArr } from 'element-china-area-data';
import {createAddress, updateAddress} from "@/api/address";
import {ElMessage} from "element-plus";
import {useStore} from "@/stores/user";

const form = inject('address')
console.log(form.value.region)

const rules = reactive({
  name: [
    { required: true, message: '请输入收货人姓名', trigger: 'blur' },
    { min: 1, max: 10, message: '姓名长度要求1-10个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '电话号码为11位数', trigger: 'blur' }
  ],
  region: [
    { required: true, message: '请选择地址', trigger: 'blur' },
  ],
  address: [
    { required: true, message: '请填写地址', trigger: 'blur' },
  ],
  tag: [
    { required: true, message: '请填写地址', trigger: 'blur' },
  ],
});

const ruleFormRef = ref(null);

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const confirm = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      const data = form.value;
      data.region=JSON.stringify(data.region)
      if(form.value.id===0){
        //为0则说明是创建地址
        createAddress(data).then(res => {
          if(res.data.flag){
            if (res.data.flag){
              console.log(res.data)
              ElMessage({ type: "success", message: "创建成功"})
              useStore().user.address.push(res.data.data)
              resetForm(ruleFormRef);
            }else{
              ElMessage({ type: "error", message: res.data.data})
            }
          }
        })
      }else{
        //修改地址
        updateAddress(data).then(res => {
          if(res.data.flag){
            if (res.data.flag){
              console.log(res.data)
              ElMessage({ type: "success", message: "修改成功"})
            }else{
              ElMessage({ type: "error", message: res.data.data})
            }
          }
        })
      }
    } else {
      console.log(form);
      return false;
    }
  });
};
</script>

<style scoped lang='scss'>
.main{
  margin: 0 auto;
  align-items: center;
  justify-content: center;
}
</style>