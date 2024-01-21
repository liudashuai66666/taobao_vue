import request from "@/utils/request";

export function getById(data){
    return request({
        url:'http://localhost:8081/goods/getById',
        method: 'GET',
        params: data
    })
}

export function getByClass(data){
    return request({
        url:'http://localhost:8081/goods/getByClass',
        method: 'GET',
        params: data
    })
}

export function getByShopId(data){
    return request({
        url:'http://localhost:8081/goods/getByShopId',
        method: 'GET',
        params: data
    })
}

export function getClassParent(data){
    return request({
        url:'http://localhost:8081/goods/getClassParent',
        method: 'GET',
        params: data
    })
}
export function getBySearch(data){
    return request({
        url:'http://localhost:8081/goods/getBySearch',
        method: 'GET',
        params: data
    })
}

export function addGoods(data){
    return request({
        url:'http://localhost:8081/goods/addGoods',
        method: 'POST',
        data: data
    })
}

export function selectGoodsById(data){
    return request({
        url:'http://localhost:8081/goods/selectGoodsById',
        method: 'GET',
        params: data
    })
}

export function getSkuCount(data){
    return request({
        url:'http://localhost:8081/goods/getSkuCount',
        method: 'GET',
        params: data
    })
}

export function updateSkuCount(data){
    return request({
        url:'http://localhost:8081/goods/updateSkuCount',
        method: 'POST',
        data: data
    })
}

export function updGoodsStatus(data){
    return request({
        url:'http://localhost:8081/goods/updGoodsStatus',
        method: 'POST',
        data: data
    })
}

export function updGoods(data){
    return request({
        url:'http://localhost:8081/goods/updGoods',
        method: 'POST',
        data: data
    })
}

