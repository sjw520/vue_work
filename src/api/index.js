//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax"
//三级联动的接口
export const reqCategoryList = () => {
    return requests({
        url:"/product/getBaseCategoryList",
        method:"get"
    })
}


//获取banner（home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get("/banner")

//获取Floor组件的数据
export const reqFloorList = () => mockRequests.get("/floor")

//获取搜索模块数据
export const reqGetSearchInfo = (params) => requests({
    url:"/list",
    method:"post",
    data:params
})

//获取产品详情信息接口
export const reqGoodsInfo = (skuId) => requests({
    url:`/item/${skuId}`,
    method:"get"
})

//将产品添加到购物车中（或者跟新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:"post"
})