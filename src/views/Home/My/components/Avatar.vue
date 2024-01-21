<template>
  <div>
    <el-button type="primary" @click="choose">选择头像</el-button>
    <el-button type="success">上传头像</el-button>
  </div>
</template>

<script setup>
import {updateAvatar} from "@/api/user";
import {ElMessage} from "element-plus";
import {useStore} from "@/stores/user"

const choose = () => {
// 创建文件选择器的 input 元素
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".jpg, .png, .webp"; // 可选的文件类型

// 当文件选择器的值发生改变时触发上传文件的函数
  input.addEventListener("change", function (event) {
    const file = event.target.files[0]; // 获取第一个选定的文件
    if (file) {
      // 创建 FormData 对象
      const formData = new FormData();
      formData.append("avatar", file);
      // 发送 POST 请求进行文件上传
      updateAvatar(useStore().user.id,formData).then(res => {
        console.log("111")
        console.log(file)
        if(res.data.flag){
          ElMessage({type:"success",message:res.data.data})
        }else{
          ElMessage({type:"error",message:res.data.data})
        }
      })
    }
  });

// 模拟点击文件选择器的 input 元素
  input.click();
}


</script>

<style scoped lang='scss'>

</style>
