import request from "@/utils/request";

export function getCartList(data){
    return request({
        url:'http://localhost:8081/goods/getCartList',
        method: 'GET',
        params: data
    })
}


export function getSku(data){
    return request({
        url:'http://localhost:8081/goods/getSku',
        method: 'GET',
        params: data
    })
}

export function addCart(data){
    return request({
        url:'http://localhost:8081/goods/addCart',
        method: 'POST',
        data: data
    })
}

export function deleteCart(data){
    return request({
        url:'http://localhost:8081/goods/deleteCart',
        method: 'POST',
        data: data
    })
}