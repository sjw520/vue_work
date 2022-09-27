import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api";

// home模块的小仓库
const state = {
    // state中数据默认初始值鳖虾蟹，服务器返回对象，服务器返回数组（根据接口返回值初始化）
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    //floor组件的数据
    floorList:[]

}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },

    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }

};
const actions = {
    // 通过API函数接口，向服务器发送请求
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code === 200){
            commit("CATEGORYLIST",result.data)
        }
       
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code == 200){
            //提交mutation
            commit("GETBANNERLIST",result.data)
        }
    },
    //获取floor数组
    async getFloorList({commit}){
      let result = await reqFloorList()
        if(result.code == 200){
            commit("GETFLOORLIST",result.data)
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