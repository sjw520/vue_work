//当前这个模块：API进行统一管理
import requests from "./request";

//三级联动的接口
export const reqCategoryList = () => {
    return requests({
        url:"/product/getBaseCategoryList",
        method:"get"
    })
}