# day 01

## 1 vue-cli脚手架初始化

### 1.1 项目目录结构

1. public：一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹里面
2. src：程序员源代码文件夹
3. assets：经常放置一些静态资源（图片），assets文件夹里面资源webpack会进行打包为一个模块（js文件夹里面）
4. components:一般放置非路由组件（或者项目共用的组件）

### 1.2 关闭eslint校验工具

1. 创建vue.config.js文件：需要对外暴露

```js
module.exports = {
   lintOnSave:false,
}
```

### 1.3 src文件夹的别名设置

因为项目大的时候src（源代码文件夹）：里面目录会很多，找文件不方便，设置src文件夹的别名的好处，找文件会方便一些

1. 创建jsconfig.json文件

   ```json
   {
       "compilerOptions": {
           "baseUrl": "./",
           "paths": {
               "@/*": [
                   "src/*"
               ]
           }
       },
       "exclude": [
           "node_modules",
           "dist"
       ]
   }
   ```





## 2 项目路由分析

* vue-router

前端所谓路由：kv键值对



2个非路由组件|四个路由组件
两个非路由组件：Header 、Footer
路由组件:Home、Search、Login（没有底部的Footer组件，带有二维码的）、Register（没有底部的Footer组件，带二维码的

### 2.1 完成非路由组件Header与Footer业务

创建组件的时候，组件结构+组件的样式+图片资源

* 注意：项目采用的less样式,浏览器不识别less语法，需要一些loader进行处理，把less语法转换为CSS语法
* 需要在style标签的身上加上lang="less",不添加样式不生效





## 3 路由组件的搭建

vue-router

分析，路由组件应该四个：Home，Search，Login，Register

1. components文件夹：经常放置的非路由组件（公用的全局组件）
2. pages|vies文件夹：放置路由组件

### 3.1 配置路由

项目当中配置的路由一般放置在router文件夹中

注意：Vue Router v3对应Vue2.x，v4对应Vue3

### 3.2 总结

#### 3.2.1 路由组件与非路由组件的区别？

1. 路由组件一般放置在pages|views文件夹，非路由一般放置components问价夹中

2. 路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字），非路由组件使用使用的时候，一般以标签的形式使用

3. 注册完路由，不管路由路由组件、还是非路由组件身上有$router、 $route属性

   * $route：一般获取路由信息（路径、query、params等）
   * $router：一般进行编程时导航进行路由跳转（push、replace）

   ```js
   new Vue({
     render: h => h(App),
     //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
     router
   }).$mount('#app')
   ```

4. 路由的重定向

   ```js
           //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
           {
               path:'*',
               redirect:"/home"
           }
   ```

   

#### 3.2.2 路由的跳转

路由跳转的两种形式

1. 声明是导航router-link，可以进行路由的跳转
2. 编程时导航push|replace





## 4 Footer组件显示与隐藏

显示或者隐藏组件：v-if、v-show

footer组件：在Home、Search显示Footer组件

Footer组件：在登陆、注册时候隐藏

* 我们可以根据组件身上$route获取当前路由的信息，通过路由路径判断Footer显示与隐藏
* 配置路由的时候，可以给路由添加路由元信息（meta），路由需要配置对象，它的key不能乱写



## 5 路由传参

### 5.1 路由跳转的方式

声明式导航：router-link（务必要有to属性）

编程式导航：利用的是组件实例$route|replace方法，可以实现路由跳转

### 5.2 路由传参

* params参数：属于路径打那个中一部分，在配置路由的时候，需要占位
* query参数：不属于路径当中的一部分,类似于/home?k=v,不需要展位



### 5.3 路由传参相关问题

1. 如何指定params参数可传可不传

   * 如果路由要求传递params参数，但是你就不传递params参数，URL会有问题。可以在占位的后面加上一个问号（params可以传递或者不传递）
   *  path:"/search/:keyword?",

2. params如果传递空串如何解决

   * 使用undefined解决：params参数可以传递、不传递（空字符串）

     ```js
     this.$router.push({name:search,params:{keyword:""||undefined}})
     ```

3. 编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplication的警告错误

   * 声明式导航没有这类问题，因为vue-router底层已经处理好

   * this：当前组件实例

   * this.$router属性：当前的这个属性，属性值VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加router|route属性

   * push：VueRouter类的一个实例

     ```js
     //先把VueRouter原型对象的push，先保存一份
     let originPush = VueRouter.prototype.push
     
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
     ```

     

# day 02

## 1 Home模块组件拆分

### 1.1 三级联动组件完成

由于三级联动，在Home、Search、Detail，把三级联动注册为全局组件

好处：只需要注册一次，就可以在项目任意地方使用

## 2 axios二次封装

### 2.1 为什么需要进行二次封装axios

请求拦截器、响应拦截器：请求拦截器，可以在发请求之前可以处理一些业务、相应拦截器，当服务器数据返回以后，可以处理一些事情

### 2.2 在项目当中经常API文件夹(axios)

接口当中，路径都带有/api

baseURL:"/api"

```js
//对于axios进行二次封装
import axios from "axios"

// 1. 利用axios对象的方法create，去创建一个axios实例
// 2. request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    //代表请求超时的时间
    timeout:5000
})

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个属性，headers请求头
    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应数据回来后，响应拦截器可以检测到
    return res.data
},(error) => {
    //响应失败的回调函数
    return Promise(new Error("file"))
})


export default requests
```

## 3 接口统一管理

项目很小：完全可以在组件的生命周期函数中发请求

项目大：

```js

export const reqCategoryList = () => {
    return requests({
        url:"/product/getBaseCategoryList",
        method:"get"
    })
}
```



### 3.1 跨域问题

```js
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  //配置代理跨域
  devServer:{
    proxy:{
      "/api":{
        target:"http://39.98.123.211"
      }
    }
  }
})
```

## 4 nprogress进度条使用

```js
//引入进度条
import nprogress from "nprogress";
// 引入进度条的样式
import "nprogress/nprogress.css"
//start:代表进度条开始 done：代表进度条结束
```

start：进度条开始

done：进度条结束

进度条颜色可以修改的

## 5 vuex状态管理库

### 5.1 vuex

vuex是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据。

切记，并不是全部项目需要vuex，如果项目很小，完全不需要vuex

### 5.2 vuex基本使用

```js
import Vue from "vue"
import Vuex from "vuex"

//需要使用插件
Vue.use(Vuex)
//state：仓库存储数据的地方
const state = {};
//mutations修改state的唯一手段
const mutations = {};
//action处理action，可以书写自己的uewu逻辑，也可以处理异步
const actions = {};
//getter:理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {};

//对外暴露store的实例
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
```



### 5.3 vuex实现模块式开发

如果项目过大，组件过多，接口也很多，数据也很多，可以让vuex实现模块式开发k

```js
//对外暴露store的实例
export default new Vuex.Store({
    // 实现仓库模块式开发存储数据
    modules:{
        home,
        search
    }
});
```





# day 03

## 1 完成一级分类动态添加背景色

1. 添加鼠标事件

   ```html
    <h3 @mouseenter="changeIndex(index)">
   ```

2. 添加样式

   ```css
      .cur {
         background: skyblue;
       }
   ```

3. 判断添加央视u

   ```html
                           <div class="item bo" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex == index}">
   
   ```

   

##  2 卡顿现象

### 2.1 卡顿

​    正常情况：鼠标进入，每一个一级分类，都会触发鼠标进入事件

​    非正常情况：本身全部的一级分类都应该触发进入事件，但只有部分h3触发

​    由于用户行为过快，导致浏览器反应不过来，如果回调函数中有大量业务，可能出现卡顿

### 2.2 函数的防抖与节流

防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会触发一次（用户操作很频繁，但是只是执行一次）

节流：在规定的间隔时间范围内不回重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发（用户操作很频繁，但是把频繁的操作变为少量的操作，可以给浏览器充裕的时间解析代码）

```js
import throttle from "lodash/throttle"
//throtle回调寒素别用箭头函数，可能出现上下文this
changeIndex:throttle(function(index){
            this.currentIndex = index
        },50),
```

## 3 三级联动组件的路由跳转与传递参数

三级联动：如果使用声明式导航router-link，可以实现路由的跳转与传递参数。但是需注意，出现卡顿现象

创建组件实例的时候，一瞬间创建1000+很耗内存，因此出现卡顿现象

**事件委派，把全部子节点的事件委派给父亲节点**

1. 点击a标签的时候，才会进行路由跳转（怎么确定点击的一定是a标签）

   * 把子节点当中a标签，加上自定义属性data-categoryName，其余的子节点是没有的

     ```html
     <a :data-categoryName="c1.categoryName" >{{c1.categoryName}}</a>
     ```

2. 获取到当前触发这个事件节点，需要带有data-categoryname这样的节点

   * 节点有一个属性dataset，可以获取节点的自定义属性和属性值

     ```js
     let element = event.target
     //dataset自定义的标签属性要有data前缀:data-categoryName="c1.categoryName"
     let {categeoryname} = element.dataset
     
       // 判断属性是否存在
      if(categoryname){}
     ```

     

# day 04

## 1 组件在不同路径下的显示

使用v-show，通过路径进行判断

```js
        // 当组件挂在完毕，让show变为false
        // 如果不是Home路由组件，将typeNav进行隐藏
        if(this.$route.path!="/home"){
            this.show = false
        }
```



## 2 过度动画

前提组件|元素务必要有v-if或v-show指令才可以进行过度动画

1. 添加transition标签

   ```html
   <transition name="sort"></transition>
   ```

2. 添加样式

   ```css
               //过度动画开始状态
               .sort-enter {
                   height: 0px;
               }
               // 过度动画结束状态
               .sort-enter-to{
                   height: 461px;
               }
               //定义动画时间、速率
               .sort-enter-active{
                   transition: all .5s linear;
               }
   ```

   
