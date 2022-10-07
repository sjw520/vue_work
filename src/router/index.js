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
import Detail from "@/pages/Detail";
import routes from "@/router/routes";
import store from "@/store"
//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push|replace
// 第一个参数：告诉原来push，你往哪跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location,resolve,reject){
    // call与apply区别
    // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同点：call与apply传递参数：call传递参数用都好隔开，apply方法执行，传递数组
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=> { },() => {})
    }
}


VueRouter.prototype.replace = function (location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=> { },() => {})
    }
}

let router =  new VueRouter({

    routes,
    //滚动行为
    scrollBehavior(to,from,savedPosition){
        //返回的y=0，代表滚动条再最上方
        return {y:0}
    }

})
//全局守卫：前置守卫
router.beforeEach(async (to,from,next)=>{
    // next("/login")放行到指定的路径
    // next();
    //用户登录了才会有token
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name
    if(token){
        //用户登录之后还想去login
        if(to.path=='login'||to.path=='register'){
            next("/")
        }else{
            //登录了，但不是去login
            if(name){
                next()
            }else{
              //没有用户信息，让仓库存储用户信息
              try {
                //获取用户信息成功
                await store.dispatch('getUserInfo');
                next()
              } catch (error) {
                // token失效了
                // 清除token
                await store.dispatch("userLogout")
                next("/login")
              }
             
            }
        }
    }else{
        // 未登录
        next()
    }
})

export default router