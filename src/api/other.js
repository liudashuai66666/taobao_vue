import request from "@/utils/request";

export function sendCaptcha(data){
    return request({
        url:'http://localhost:8081/sendCaptcha',
        method: 'GET',
        params: data
    })
}
