import request from "@/utils/request";

//创建或者修改地址
export function createAddress(data){
    return request({
        url:'http://localhost:8081/address',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    })
}

export function updateAddress(data){
    return request({
        url:'http://localhost:8081/address/update',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    })
}

