import request from "@/utils/request";


//登录
export function getUser(data){
    return request({
        url:'http://localhost:8081/users/login',
        method: 'GET',
        params: data
    })
}

//注册
export function createUser(data){
    return request({
        url:'http://localhost:8081/users/enroll',
        method: 'POST',
        data: data
    })
}

//修改密码
export function resPass(data){
    return request({
        url:'http://localhost:8081/users/resPass',
        method: 'POST',
        data: data
    })
}

//修改数据
export function updateUser(data){
    return request({
        url:'http://localhost:8081/users/updateUser',
        method: 'POST',
        data: data
    })
}

//修改头像
export function updateAvatar(userId,data){
    return request({
        url:'http://localhost:8081/users/updateAvatar',
        method: 'POST',
        params: {
            userId:userId,
            data:JSON.stringify(data)
        },
        data:JSON.stringify(data),
        contentType:'application/json',
    })
}




