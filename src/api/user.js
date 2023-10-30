import request from "@/utils/request";

export function getUser(data){
    return request({
        url:'http://localhost:8081/users/login',
        method: 'GET',
        params: data
    })
}

export function createUser(data){
    return request({
        url:'http://localhost:8081/users/enroll',
        method: 'POST',
        data: data
    })
}
