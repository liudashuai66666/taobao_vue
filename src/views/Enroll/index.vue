<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">品味宝库</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:">注册</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="ruleFormRef" label-position="left" label-width="65px" status-icon :model="form" :rules="rules">
              <el-form-item label="昵称" prop="name">
                <el-input v-model="form.name" placeholder="请输入昵称"/>
              </el-form-item>
              <el-form-item label="密码" prop="password1">
                <el-input type="password" v-model="form.password1" placeholder="请输入密码"/>
              </el-form-item>
              <el-form-item prop="password2">
                <el-input type="password" v-model="form.password2" placeholder="确认密码"/>
              </el-form-item>
              <el-form-item label="邮箱" prop="mailbox">
                <el-input v-model="form.mailbox" placeholder="请输入邮箱号"/>
                <el-button ref="sendBtn" class="send-btn" @click="subSendCaptcha">发送</el-button>
              </el-form-item>
              <el-form-item label="验证码" prop="captcha">
                <el-input v-model="form.captcha" placeholder="请输入验证码"/>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="submitForm">注册</el-button>
              <a href="/login" class="login-a">前往登录</a>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:">关于我们</a>
          <a href="javascript:">帮助中心</a>
          <a href="javascript:">售后服务</a>
          <a href="javascript:">配送与验收</a>
          <a href="javascript:">商务合作</a>
          <a href="javascript:">搜索推荐</a>
          <a href="javascript:">友情链接</a>
        </p>
        <p>CopyRight &copy; 品味宝库</p>
      </div>
    </footer>
  </div>
</template>



<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import {createUser, getUser} from "@/api/user"
import {sendCaptcha} from "@/api/other";




const router = useRouter()

const form = ref({
  name: "",
  mailbox: "",
  password1: "",
  password2: "",
  captcha: "",
})
// 表单校验
const rules = reactive({
  mailbox: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入邮箱'));
        }
        if (/^[1-9][0-9]{4,10}@qq\.com$/.test(value.toLowerCase())) {
          callback();
        } else {
          return callback(new Error('请输入正确的邮箱格式'));
        }
      },
      trigger: ['blur', 'change']
    }
  ],
  password1: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度要求6-14个字符', trigger: 'blur' }
  ],
  password2: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度要求6-14个字符', trigger: 'blur' }
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        value ? callback() : callback(new Error('请勾选登录协议'))
      }
    }
  ],
  name:[
    { required: true, message: '昵称不能为空', trigger: 'blur' },
  ],
  captcha:[
    { required: true, message: '验证码不能为空', trigger: 'blur' },
  ]
})
const ruleFormRef = ref(null)
// 注册
const submitForm = () => {
  const { name , mailbox, password1, captcha} = form.value
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      createUser({ name , mailbox, password1, captcha}).then(res => {
        if (res.data.flag){
          ElMessage({ type: "success", message: "注册成功"})
          router.replace({ path: '/' })
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
function isValidQQEmail(email) {
  const qqEmailRegex = /^[1-9]\d{4,10}@qq\.com$/;
  return qqEmailRegex.test(email);
}

let i=60;
const sendBtn = ref(null)
const subSendCaptcha = () =>{
  const mailbox = form.value.mailbox;
  const buttonElement = sendBtn.value.$el;
  if(!isValidQQEmail(form.value.mailbox)){

    console.log(sendBtn.value)
    ElMessage({ type: "warning", message: "邮箱格式不对"})

  }else{
    sendCaptcha({mailbox}).then(res => {
      if (res.data.flag){
        ElMessage({ type: "success", message: "发送成功"})
        //邮件发送成功，开始倒计时
        buttonElement.disabled= true;
        //将按钮设置为不可点，防止重复发送
        let n=setInterval(function (){
          i--;
          buttonElement.textContent=i;
          if(i===0){
            buttonElement.style.disabled=false;
            buttonElement.textContent="发送";
            buttonElement.disabled= false;
            i=60;
            clearInterval(n)
          }
        },1000)
      }else{
        ElMessage({ type: "error", message: res.data.data})
      }
    })
  }
}

</script>

<style scoped lang='scss'>
.login-header {
  background: rgb(237, 242, 241);
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      //color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    height: 430px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      //color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            //border-color: $priceColor;
          }

          &.active,
          &:focus {
            //border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        //color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      //background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: rgb(39, 186, 155);
  width: 100%;
  color: #fff;
}
.login-a{
  color: rgb(39, 186, 155);
  margin-left: 280px;
  margin-top: 10px;
}
.send-btn{
  width: 50px;
  position: absolute;
  left: 225px;
}
</style>