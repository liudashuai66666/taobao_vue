<template>
  <div>
    <el-form ref="ruleFormRef" label-position="top" label-width="100px" status-icon :model="form" :rules="rules">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"/><!-- 姓名 -->
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.mailbox" :readonly="true" class="mailbox" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="男" />
          <el-radio label="女" />
          <el-radio label="保密" />
        </el-radio-group>
      </el-form-item>
      <el-button size="large" class="subBtn" @click="confirm">修改</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { updateUser} from "@/api/user"
import { useStore } from "@/stores/user"




const router = useRouter()

const form = ref({
  mailbox: useStore().user.mailbox,
  name: useStore().user.uname,
  gender: useStore().user.gender,
})
// 表单校验
const rules = reactive({
  name: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 1, max: 14, message: '昵称太长', trigger: 'blur' }
  ],
})

const ruleFormRef = ref(null)



const confirm = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      updateUser(form.value).then(res => {
        if (res.data.flag){
          useStore().user.uname=form.value.name
          useStore().user.gender=form.value.gender
          ElMessage({ type: "success", message: "修改成功"})
        }else{
          ElMessage({ type: "error", message: res.data.data})
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>

<style scoped lang='scss'>

.demo-ruleForm {
  width: 900px;
}
/* 自定义表单项的宽度 */
.demo-ruleForm .el-form-item {
  width: 100%;
}


</style>