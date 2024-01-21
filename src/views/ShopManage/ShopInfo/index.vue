<template>
  <div class="shopInfo">
    <div class="user-name">
      <h3>嗨, {{useStore().user.uname}}</h3>
    </div>
    <img :src="'http://localhost:8081/img/'+useStore().user.avatar" class="avatar">
    <p>
      店铺名称：{{useStore().shop.name}}
    </p>
    <p v-if="useStore().shop.status === 1">
      店铺状态：开启中
    </p>
    <p v-if="useStore().shop.status === 0">
      店铺状态：已关闭
    </p>
    <el-button type="success" class="button" @click="openChat">点击登录客服</el-button>
  </div>
  <div class="updateInfo">
    <div class="ud-avatar">
      <span>选择头像</span>
      <el-upload
          action="http://localhost:8081/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
  </div>

</template>

<script setup>
import {useStore} from '@/stores/user'
import {ElMessage} from "element-plus";
import {onMounted, ref} from "vue";
import {getShop} from "@/api/shop";
// 引入 Vue 3 的 ref 函数

// 创建一个响应式变量 imageUrl
const imageUrl = ref('');

// 定义上传成功时的处理函数 handleAvatarSuccess
const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};
const openChat = () => {
  window.open("http://localhost:5173/chat/"+useStore().shop.shopId)
}

// 定义上传前的验证函数 beforeAvatarUpload
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/webp') {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};

onMounted(()=>{
  const shopId = useStore().shop.shopId
  getShop({shopId}).then(res=>{
    useStore().shop = res.data.data
  })
})

</script>

<style scoped lang='scss'>
.shopInfo{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 980px;
  height: 250px;
  margin: 20px;
  border-radius: 4px;
  box-shadow: 0 0 1px rgba(0,21,41,.35);
  .user-name{
    margin: 10px 0 5px 0;
    color: rgb(81, 90, 110);
    font-size: 24px;
  }
  .avatar{
    width: 80px;
    height: 80px;
    border-radius: 100%;
    margin: 5px 0;
  }
  p{
    margin: 5px 0;
    color: rgb(81, 90, 110);
  }
  .button{
    margin: 5px 0 10px 0;
  }
}

.updateInfo{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 980px;
  height: 250px;
  margin: 20px;
  border-radius: 4px;
  box-shadow: 0 0 1px rgba(0,21,41,.35);
  .ud-avatar{
    display: flex;
    align-items: center;
    justify-content: center;
    .avatar{
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }
  }
}

</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

