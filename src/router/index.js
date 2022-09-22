//配置路由
import Vue from "vue";
import VueRouter from "vue-router"
//使用插件
Vue.use(VueRouter);
//引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"


export default new VueRouter({

    routes:[

        {
            path:"/home",
            component:Home,
            meta:{show:true}
        },

        {
            path:"/search/:keyword",
            name:"search",
            component:Search,
            meta:{show:true}
        },

        {
            path:"/login",
            component:Login,
            meta:{show:false}
        },

        {
            path:"/register",
            component:Register,
            meta:{show:false}
        },
        //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
        {
            path:'*',
            redirect:"/home"
        }

    ]

})