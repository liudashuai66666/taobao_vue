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
          <a href="javascript:">登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="ruleFormRef" label-position="right" label-width="60px" status-icon :model="form" :rules="rules">
              <el-form-item label="邮箱" prop="mailbox">
                <el-input v-model="form.mailbox" placeholder="请输入邮箱号"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"/>
              </el-form-item>
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox size="large" v-model="form.agree">
                  我已经同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="submitForm">点击登录</el-button>
              <a href="/enroll" class="el-a">新用户注册</a>
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
import {getUser} from "@/api/user"




const router = useRouter()

const form = ref({
  mailbox: "",
  password: "",
  agree: false
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
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度要求6-14个字符', trigger: 'blur' }
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        value ? callback() : callback(new Error('请勾选登录协议'))
      }
    }
  ]
})
const ruleFormRef = ref(null)
// 登录
const submitForm = () => {
  const { mailbox, password } = form.value
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      getUser({mailbox, password}).then(res => {
        if (res.data.flag){
          console.log(res.data)
          ElMessage({ type: "success", message: "登录成功"})
          localStorage.setItem("token",res.data.data.token)
          localStorage.setItem("long_token",res.data.data.long_token)
          router.replace({ path: '/' })
        }else{
          ElMessage({ type: "error", message: res.data.data})
          router.replace({ path: '/' })
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
    height: 310px;
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

.el-a{
  color: rgb(39, 186, 155);
  margin-left: 270px;
  margin-top: 10px;;
}
</style>