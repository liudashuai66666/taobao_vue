import axios from "axios"
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import router from "@/router"
import { useUserStore } from "@/stores/user"


const request = axios.create({
    baseURL: 'http://localhost:8081',
    // timeout: 5000
    headers:{
        'Content-type':'application/json',
        'contentType':'application/x-www-form-urlencoded'
    }
})


request.interceptors.request.use(interceptRequest)
function interceptRequest(req){
    let token=localStorage.getItem('token')
    console.log("拦截请求");
    if(token){
        req.headers.Authorization=token;
    }
    return req
}



/**
 * 拦截响应
 */
request.interceptors.response.use(interceptResponse)
function interceptResponse (resp){
    console.log("拦截响应");
    console.log(resp.status);
    if(resp.status==201){
        /*长token没有过期，刷新token和long_token*/
        saveToken(resp);
        return resp
    }else if(resp.status==202){
        /*准备下一次传long_token*/
        refreshToken()
        resend(resp);
    }else if(resp.status==203){
        /*重新登录*/
        ElMessage.error("身份登录过期，请重登录")
        router.push({ path: '/login' })
    }else{
        return resp;
    }
}

/**
 * 重新发送请求
 */
function resend (error){
    let originalRequest=error.config;
    console.log("重新发送请求");
    originalRequest.headers['token_flag'] = 'long_token';
    axios({
        method:originalRequest.method,
        url:originalRequest.url,
        data:originalRequest.data,
        headers: originalRequest.headers // 使用修改后的请求头
    })
}


/**
 * 更换令牌
 */
function refreshToken(){
    let long_token=localStorage.getItem('long_token');
    localStorage.setItem('token',long_token);
}

/**
 * 缓存token
 * @param resp
 */
function saveToken(resp){
    var token=resp.headers.token;
    var long_token=resp.headers.long_token;
    console.log("短token："+token);
    // 将JWT保存在localStorage中
    localStorage.setItem('token',token);
    localStorage.setItem('long_token',long_token);
}


export default request