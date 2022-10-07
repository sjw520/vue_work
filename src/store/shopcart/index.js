import {reqCartList,reqDeleteCartById,reqUpdateCheckedByid} from "@/api"
const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }

}
const actions = {
    //获取购物车列表数据
    async getCartList({commit}){
        let result  = await reqCartList()
        if(result.code == 200){
            commit("GETCARTLIST",result.data)
        }
    },
    //删除购物车的某个产品
    async deleteCartListById({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code==200){
            return "ok";
        }else{
            return Promise.reject(new Error())
        }
    },
    //修改购物车产品选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedByid(skuId,isChecked)
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new error("faile"))
        }
    },
    // 删除全部勾选产品
    deleteAllCheckedCart({dispatch,getters}){
        //获取购物车中全部的产品
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1 ? dispatch("deleteCartListById",item.skuId):""
            // 将每一次返回的Promise添加到数组当中
            PromiseAll.push(promise)
        })
        // 如果有一个失败，返回即为失败
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = []
      state.cartList[0].cartInfoList.forEach(item=>{
         let promise = dispatch("updateCheckedById",{skuId:item.skuId,isChecked})
         promiseAll.push(promise)
      })
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    },


}
export default {
    state,
    mutations,
    actions,
    getters
}