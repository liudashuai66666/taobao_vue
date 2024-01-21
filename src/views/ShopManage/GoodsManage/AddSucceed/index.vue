<template>
  <div class="steps">
    <el-steps :space="200" :active="3" finish-status="success" simple style="background-color: white">
      <el-step title="选择商品品类" />
      <el-step title="填写商品详情" />
      <el-step title="商品发布成功" />
    </el-steps>
  </div>
  <div class="result">
    <h1>恭喜您, 商品发布成功!</h1>
    <a href="/shopManage/goodsManage">去店铺查看商品列表>></a>
    <h3>您还可以：</h3>
    <span>1,继续 <a href="/shopManage/selectClass">发布商品</a></span>
    <span>2,进入卖家中心,管理 <a href="/shopManage/goodsManage">商品列表</a></span>
  </div>
</template>

<script setup>

</script>

<style scoped lang='scss'>
.steps{
  width: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
}
.result{
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  h1{
    padding: 10px 0;
  }
  h3{
    padding: 10px 0;
  }
  span{
    padding: 10px 0;
  }
  a{
    color: rgb(49, 142, 240);
    padding: 10px 0;
  }
}
</style>