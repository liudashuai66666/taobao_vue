import request from "@/utils/request";

export function getComments(data){
    return request({
        url:'http://localhost:8081/comments/getComments',
        method: 'GET',
        params: data
    })
}
export function getShopComment(data){
    return request({
        url:'http://localhost:8081/comments/getShopComment',
        method: 'GET',
        params: data
    })
}

export function getAllComment(data){
    return request({
        url:'http://localhost:8081/comments/getAllComment',
        method: 'GET',
        params: data
    })
}

export function setComments(data){
    return request({
        url:'http://localhost:8081/comments/setComments',
        method: 'POST',
        data: data,
    })
}

export function replyComment(data){
    return request({
        url:'http://localhost:8081/comments/replyComment',
        method: 'POST',
        data: data,
    })
}

export function updateComment(data){
    return request({
        url:'http://localhost:8081/comments/updateComment',
        method: 'POST',
        data: data,
    })
}
export function updateStatus(data){
    return request({
        url:'http://localhost:8081/comments/updateStatus',
        method: 'POST',
        data: data,
    })
}