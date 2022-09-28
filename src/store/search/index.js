import {reqGetSearchInfo} from "@/api";

// search模块的小仓库
const state = {
    //仓库初始状态
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
};
const actions = {
    //获取Search模块的数据
    async getSearchList({commit},params={}){
        let resulet = await reqGetSearchInfo(params)
        if(resulet.code == 200){
            commit("GETSEARCHLIST",resulet.data)
        }
    }
};
//简化数据
//计算属性 简化仓库中的数据
//可以把组件当中需要用的数据简化一下
//不分模块
const getters = {
    //当前仓库的state，并非大仓库的state
    goodsList(state){
        //假如网络不给力或没有网state.searchList.goodsList应该返回的是undefined
        //计算新的属性的属性值至少来一个数组
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}