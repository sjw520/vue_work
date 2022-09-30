import {reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";


const state = {
    goodInfo:{}
}
const actions = {
    //获取产品信息
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code==200){
            commit("GETGOODINFO",result.data)
        }
    },
    //将产品添加到购物车中
   async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //加入购物车返回的结构
       //加入购物车以后将参数带给服务器
       //服务器写入数据陈工，并没有返回其他的数据，因此不需要再state里面存储数据
       let result =  await reqAddOrUpdateShopCart(skuId,skuNum);
    }
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
//简化数据
const getters = {
    //state.goodInfo初始状态是空对象，空对象的属性值是undefined
    //当前计算出来的属性值至少是一个空对象
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    //简化产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    //售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}