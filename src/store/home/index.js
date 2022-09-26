import { reqCategoryList } from "@/api";

// home模块的小仓库
const state = {
    // state中数据默认初始值鳖虾蟹，服务器返回对象，服务器返回数组（根据接口返回值初始化）
    categoryList:[],
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    }

};
const actions = {
    // 通过API函数接口，向服务器发送请求
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code === 200){
            commit("CATEGORYLIST",result.data)
        }
       
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}