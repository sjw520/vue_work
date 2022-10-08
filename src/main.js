import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)

import Carousel from "@/components/Carousel";
Vue.component(Carousel.name,Carousel)
//分页器的全局组件
import Pagination from "@/components/Pagination";
Vue.component(Pagination.name,Pagination)

import {Button,MessageBox} from "element-ui";
Vue.component(Button.name,Button)
//elementui注册组件第二种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from '@/router'
// 引入仓库
import store from "@/store"

//引入mockServe.js
import "@/mock/mockServe"

//引入swiper样式
import "swiper/css/swiper.css"

//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from "@/api"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    //全局时间总线$bus配置
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性,this.$router
  router,
  //注册仓库：组件实例的身上就会多了一个属性$store
  store 
}).$mount('#app')
