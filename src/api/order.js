import request from "@/utils/request"

// 创建订单
export function createOrder(data){
    return request({
        url:'http://localhost:8081/orders/createOrder',
        method: 'POST',
        data: data
    })
}

//得到订单
export function getOrder(data){
    return request({
        url:'http://localhost:8081/orders/getOrder',
        method: 'GET',
        params: data
    })
}

export function getOrderPage(data){
    return request({
        url:'http://localhost:8081/orders/getOrderPage',
        method: 'GET',
        params: data
    })
}

export function getShopOrderPage(data){
    return request({
        url:'http://localhost:8081/orders/getShopOrderPage',
        method: 'GET',
        params: data
    })
}
//修改订单状态
export function updState(data){
    return request({
        url:'http://localhost:8081/orders/updState',
        method: 'POST',
        data: data
    })
}



