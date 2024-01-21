import request from "@/utils/request";


export function getShop(data){
    return request({
        url:'http://localhost:8081/shops/getShop',
        method: 'GET',
        params: data
    })
}
export function getShopGoods(data){
    return request({
        url:'http://localhost:8081/shops/getShopGoods',
        method: 'GET',
        params: data
    })
}

export function getAllShopGoods(data){
    return request({
        url:'http://localhost:8081/shops/getAllShopGoods',
        method: 'GET',
        params: data
    })
}

export function getAllShop(data){
    return request({
        url:'http://localhost:8081/shops/getAllShop',
        method: 'GET',
        params: data
    })
}

export function updateStatus(data){
    return request({
        url:'http://localhost:8081/shops/updateStatus',
        method: 'POST',
        data: data
    })
}