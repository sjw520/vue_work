export const setToken = (token)=>{
    localStorage.setItem("TOKEN",token)
}

export const getToken = ()=>{
    return localStorage.getItem("TOKEN")
}
//清除
export const removeToken = ()=>{
    localStorage.removeItem("TOKEN")
}