<template>
  <body>
    <Top></Top>
    <LayoutFixed></LayoutFixed>
    <top-nav></top-nav>
    <!--二级路由-->
    <div class="main">
      <router-view/>
    </div>
    <Foot></Foot>
  </body>


</template>


<script setup>
import TopNav from "@/views/Home/components/top-nav.vue";
import Foot from "@/views/Home/components/Foot.vue";
import LayoutFixed from "@/views/Home/components/LayoutFixed.vue";
import Top from "@/views/Home/components/Top.vue";


</script>


<style scoped lang='scss'>
.main{
  background-color: rgb(240, 240, 240);
}
</style>