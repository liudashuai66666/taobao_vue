<template>
  <div>

    <table class="tab">
      <thead class="tab-head">
        <tr>
          <th style="width: 120px;">地址备注</th>
          <th style="width: 160px;">收货人姓名</th>
          <th style="width: 240px;">详细地址</th>
          <th style="width: 190px;">联系电话</th>
          <th style="width: 250px;">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.aid" class="tab-li">
          <td>{{ item.tag }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.phone }}</td>
          <td>
            <el-button type="primary" :icon="Edit" @click="updateAddress(item)" />
            <el-button type="danger" :icon="Delete"/>
            <el-button type="info" v-if="item.isDefault===0">设为默认</el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <el-button @click="visible = true">
      添加新地址
    </el-button>
    <el-dialog v-model="visible" :show-close="false" style="width: 500px" @open="createAddress">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">添加新地址</h4>
        </div>
      </template>
      <CreateAddress></CreateAddress>
    </el-dialog>

    <el-dialog v-model="update" :show-close="false" style="width: 500px" @open="updateAddress">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">编辑地址</h4>
        </div>
      </template>
      <CreateAddress></CreateAddress>
    </el-dialog>


  </div>
</template>

<script setup>
import CreateAddress from "@/views/Home/components/CreateAddress.vue";
import {provide, ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
import {useStore} from "@/stores/user"
import { ElButton, ElDialog } from 'element-plus'

const tableData = useStore().user.address

const visible = ref(false)
const update = ref(false)
const address = ref({
  uid: useStore().user.id,
  id: '',
  name:"",
  region: '',
  address: "",
  phone: "",
  tag: "",
  isDefault:0,
});//传递给子组件的值，修改的时候就是那一行的数据，新添的时候就是空值

const updateAddress = (item) => {
  update.value = true
  address.value.name=item.name;
  address.value.region=JSON.parse(item.region);
  address.value.address=item.address;
  address.value.phone=item.phone;
  address.value.tag=item.tag;
  address.value.id=item.id;
  address.value.isDefault=item.isDefault;
}


provide('address', address)

const createAddress = () => {
  address.value.name="";
  address.value.region=[];
  address.value.address="";
  address.value.phone="";
  address.value.tag="";
  address.value.id=0;
  address.value.isDefault=0;
  console.log(address.value)
}


</script>

<style scoped lang='scss'>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.tab{
  margin-bottom: 20px;
}

.tab-head{
  width: 960px;
  height: 40px;
  color: rgb(144, 147, 153);


  th{
    padding: 8px 0 8px 10px;
    border-bottom: 1px solid rgb(235, 238, 245);
    text-align: left;
  }
}

.tab-li{
  width: 960px;
  height: 49px;
  color: rgb(116, 98, 102);
  transition: background-color 0.3s; /* 过渡效果，0.3秒时长可根据需要调整 */
  margin: 0;

  td{
    padding: 8px 0 8px 10px;
    border-bottom: 1px solid rgb(235, 238, 245);
    text-align: left;
    margin: 0;
  }
}
.tab-li:hover{
  background-color: rgb(245, 247, 250);
}
</style>