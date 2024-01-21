import request from "@/utils/request";

export function getChatter(data){
    return request({
        url:'http://localhost:8081/chats/getChatter',
        method: 'GET',
        params: data
    })
}
export function getUserChatter(data){
    return request({
        url:'http://localhost:8081/chats/getUserChatter',
        method: 'GET',
        params: data
    })
}
export function addShopChat(data){
    return request({
        url:'http://localhost:8081/chats/addShopChat',
        method: 'GET',
        params: data
    })
}

export function getChatMessageShop(data){
    return request({
        url:'http://localhost:8081/chats/getChatMessageShop',
        method: 'GET',
        params: data
    })
}

export function getChatMessage(data){
    return request({
        url:'http://localhost:8081/chats/getChatMessage',
        method: 'GET',
        params: data
    })
}

export function addChatMessage(data){
    return request({
        url:'http://localhost:8081/chats/addChatMessage',
        method: 'POST',
        data: data
    })
}