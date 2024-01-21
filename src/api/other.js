import request from "@/utils/request";

export function sendCaptcha(data){
    return request({
        url:'http://localhost:8081/sendCaptcha',
        method: 'GET',
        params: data
    })
}

export function selectCategory(data){
    return request({
        url:'http://localhost:8081/selectCategory',
        method: 'GET',
        params: data
    })
}

export function selectAllCategory(data){
    return request({
        url:'http://localhost:8081/selectAllCategory',
        method: 'GET',
        params: data
    })
}