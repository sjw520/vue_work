import Vue from "vue"
import Vuex from "vuex"

import home from "./home"
import search from "./search";
import detail from "@/store/detail";
//需要使用插件
Vue.use(Vuex)


//对外暴露store的实例
export default new Vuex.Store({
    // 实现仓库模块式开发存储数据
    modules:{
        home,
        search,
        detail
    }
});