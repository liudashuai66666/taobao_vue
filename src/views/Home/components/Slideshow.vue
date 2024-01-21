<template>
  <div class="block text-center">
    <el-carousel height="500px" style="width: 1240px;">
      <el-carousel-item v-for="item in 5" :key="item">
        <h3 class="small justify-center" text="2xl"></h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang='scss'>
.text-center{
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 500px; /* 根据轮播图高度调整 */
  width: 100%; /* 占满容器宽度 */
}
.demonstration {
  color: var(--el-text-color-secondary);
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(3) {
  background: url('@/assets/images/p1.jpg') no-repeat center / cover;
}
.el-carousel__item:nth-child(4) {
  background: url('@/assets/images/p2.jpg') no-repeat center / cover;
}
.el-carousel__item:nth-child(5) {
  background: url('@/assets/images/p3.jpg') no-repeat center / cover;
}
.el-carousel__item:nth-child(6) {
  background: url('@/assets/images/p4.jpg') no-repeat center / cover;
}
.el-carousel__item:nth-child(7) {
  background: url('@/assets/images/p5.jpg') no-repeat center / cover;
}
</style>