import {v4 as uuidv4} from "uuid"
export const getUUID = () => {
    //先从本地存储获取uuid
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    if(!uuid_token){
        // 没有 生成临时身份
        uuid_token = uuidv4();
        localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    return uuid_token;
}