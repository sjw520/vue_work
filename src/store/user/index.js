import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api"
import { setToken,getToken,removeToken } from "@/utils/token"
// 登录与注册
const state = {
    code:"",
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token = "";
        state.userInfo = {};
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        //获取验证码接口
       let result =  await reqGetCode(phone)
        if(result.code==200){
            commit("GETCODE",result.data)
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        console.log(result)
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error("falie"))
        }
    },
    //登录业务
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        //服务器发token，用户唯一标识符
        // 将来经常通过带toaken找服务器要用户信息进行展示
        
        if(result.code==200){
            commit("USERLOGIN",result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        console.log("2222"+result)
        if(result.code==200){
            commit("GETUSERINFO",result.data)
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqLogout();
        //action里面不能操作 state ，需要提交到mutations
        if(result.code==200){
            commit("CLEAR")
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    }

}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}