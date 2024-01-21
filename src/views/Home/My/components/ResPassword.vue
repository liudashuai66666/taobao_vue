<template>
  <div>
    <el-form ref="ruleFormRef" label-position="top" label-width="100px" status-icon :model="form" :rules="rules">
      <el-form-item label="邮箱" prop="mailbox">
        <el-input v-model="form.mailbox" :readonly="true" />
      </el-form-item>
      <el-form-item label="原密码" prop="oldPass">
        <el-input type="password" v-model="form.oldPass" placeholder="请输入原密码"/>
      </el-form-item>
      <el-form-item label="新密码" prop="pass1">
        <el-input type="password" v-model="form.pass1" placeholder="请输入新密码"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="pass2">
        <el-input type="password" v-model="form.pass2" placeholder="请确认密码"/>
      </el-form-item>
      <el-button size="large" class="subBtn" @click="confirm">确定</el-button>
      <el-button size="large" class="subBtn" @click="reset">重置</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { resPass} from "@/api/user"
import { useStore } from "@/stores/user"
import CreateAddress from "@/views/Home/components/CreateAddress.vue";




const router = useRouter()

const form = ref({
  mailbox: useStore().user.mailbox,
  oldPass: "",
  pass1: "",
  pass2: "",
})
// 表单校验
const rules = reactive({
  oldPass: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度要求6-14个字符', trigger: 'blur' }
  ],
  pass1: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度要求6-14个字符', trigger: 'blur' }
  ],
  pass2: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度要求6-14个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请确认密码'));
        }
        if (form.value.pass2===form.value.pass1) {
          callback();
        } else {
          return callback(new Error('两次输入的密码不相同'));
        }
      },
      trigger: ['blur', 'change']
    }
  ],
})
const ruleFormRef = ref(null)

const reset = () => {
  form.value.oldPass=''
  form.value.pass1=''
  form.value.pass2=''
}

// 登录
const confirm = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      resPass(form.value).then(res => {
        if (res.data.flag){
          console.log(res.data)
          console.log(res.data.data.user)
          ElMessage({ type: "success", message: "修改成功"})
          reset();
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