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


## 3 商品分类三级列表进行优化

在App根组件当中发请求（跟组件mounted只执行一次）



## 4 mock数据模拟

如果你想mock数据，需要用到插件mockjs

**使用步骤：**

1. 在项目src文件夹创建mock文件夹

2. 准备json数据（mock文件夹中创建相应的json文件）---格式化

   ```json
   [
     {
       "id": "1",
       "imgUrl": "/images/banner1.jpg"
     },
     {
       "id": "2",
       "imgUrl": "/images/banner2.jpg"
     },
     {
       "id": "3",
       "imgUrl": "/images/banner3.jpg"
     },
     {
       "id": "4",
       "imgUrl": "/images/banner4.jpg"
     }
   ]
   ```

   

3. 把mock数据需要的图片防止到public文件夹中（public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹中）

4. 创建mockServer.js通过mockjs插件实现模拟数据

   ```js
   //引入mockjs模块
   import Mock from 'mockjs';
   //把json数据格式引入进来
   //webpack默认对外暴露的：图片、json数据格式
   import banner from "./banner.json"
   import floor from "./floor.json"
   
   //mock数据:第一个参数请求地址路径 第二个参数请求数据
   Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页大的轮播图的数据
   Mock.mock("/mock/floor",{code:200,data:floor});
   ```

   

5. mockServe.js文件在入口文件中引入（至少需要执行一次，才能模拟数据）

   ```js
   import "mockServe.js"
   ```

   

## 5 swiper

安装swiper插件：最新版本6，安装的是swiper5

经常制作轮播图（移动端|pc端都可以用）

1. 引入相应依赖包
2. 页面中的解构务必要有
3. 初始化swiper实力，给轮播图添加动态效果

**轮播图解决方案**

watch+nextTick：数据监听：监听已有数据变化

**nextTick**：在下次DOM更新循环之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM（可以保证页面中结构一定是有的，经常和很多插件一起使用，都需要DOM存在了）

```js
  watch:{
      //监听bannerList数据的变化，因为这条数据发生变化，直接空数组变为有四个元素的数组
    bannerList:{
      handler(newValue,oldVale){
        //当前函数：只能保证bannerList已经有数据了，不能保证v-for已经执行完毕
          this.$nextTick(() => {
            //当你执行这个回调的时候，保证服务器数据回来了，v-for执行完毕了
            var mySwiper = new Swiper(document.querySelector(".swiper-container"),{
              loop:true,
              //分页器
              pagination:{
                el:".swiper-pagination",
                clickable:true
              },
              navigation:{
                nextE1:".swiper-button-next",
                preE1:".swiper-button-pre",
              }
            })
          })
      }
    }
  }
```



# day 05

## 1 开发floor组件

切记：仓库当中的state的数据格式，不能乱写，数据格式取决于服务器返回的数据

getFloorList这个action需要在Home路由组件当中发，不能再floor组件内部发action，因为我们需要v-for遍历floor组件

v-for也可以再自定义标签中使用

```html
<Floor v-for="(floor,index) in floorList" :key="floor.id" ></Floor>
```

### 1.1 props组件通信

props：用于父子组件通信

自定义时间：@on，@emit 可以实现子给父通信

全局时间总线：$bus 全能

插槽

vuex

## 2 共用全局组件

开发项目中，如果看到某一个组件再很多地方都是用，将它变成全局组件

注册一次，可以再任意地方使用，共用的组件}非路由组件放到components文件夹中

## 3 getters属性

```js
//简化数据
//计算属性 简化仓库中的数据
//可以把组件当中需要用的数据简化一下
//不分模块
const getters = {
    //当前仓库的state，并非大仓库的state
    goodsList(state){
        return state.searchList.goodsList
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
};
```



```js
    computed:{
      //mapGetter传递的数组，因为getters计算是没有划分模块（home，search）
      ...mapGetters(['goodList'])
    }
```

## 4 assign

```js
 //将后面相应的属性值赋值给searchParams
 Object.assign(this.searchParams,this.$route.query,this.$route.params)
```

## 5 监听路由

```js
    watch:{
      //监听路由的信息是否发生变化，如果发生变化，再次发起请求
      $route(newValue,oldValue){
        Object.assign(this.searchParams,this.$route.params,this.$route.query)
        //再次发起请求
        this.getData()
      }
    }
```



# day 06

## 1 动态开发面包屑中的分类名

## 2 动态开发面包屑中的关键字

### 2.1 当面包屑的关键字清楚后，需让兄弟组件Header中的关键清楚

```js
  beforeCreate() {
    //全局时间总线$bus配置
    Vue.prototype.$bus = this
  },
```

```js
this.$bus.$emit("clear")
```

```js
 this.$bus.$on("clear",() => {
      this.keyword = ""
    })
```

## 3 箭头icon的制作

1. 再public文件夹下静态页面引入阿里图标库

   ```html
   <link rel="stylesheet" href="https://at.alicdn.com/t/c/font_3679721_t7ef4az0kni.css">
   ```

2. 使用

   ```html
   <a>综合<span v-show="isOne" class="iconfont icon-down"></span></a>
   ```

   

# day 07

## 1 分页功能实现

**分页展示，需要哪些数据**

1. 需要知道当前是第几个：pageNo字段代表当前页数
2. 需要知道每一个需要展示多少条数据：pageSize字段进行表示
3. 需要知道整个分页器一共由多少条数据，total字段进行表示
4. 需要知道分页器连续页码的个数：5|7，以奇数对称
5. continues代表分页连续页码个数





对于分页器来说，很重要的一个地方即为（算出连续页面的起使数组和结束数字）

**解析结构**

```js
//将对象中的属性单独领出来，可以用写this
const {continues,pageNo,totalPage} = this
```

### 1.1 计算连续的页码的起使数字和结束数字

```js
    startNumAndEndNum(){
      const {continues,pageNo,totalPage} = this
      let start = 0,end = 0;
      //连续页码数字5
      //总页数没有连续的页码多
      if(continues>totalPage){
          start = 1;
          end = totalPage
      }else {
        //连续页码数是5总页数一定是大于5的
        start = pageNo - parseInt(continues/2)
        end = pageNo + parseInt(continues/2)
        //start数字出现负数纠正
        if(start<1){
          start = 1
          end = continues
        }
        //end数字出现负数纠正
        if(end>totalPage){
          end = totalPage
          start = totalPage-continues+1;
        }
          return {start,end}
      }
    }
```

### 1.2 分页器动态展示

v-for：数组、数字、字符串、对象



## 2 开发产品详情页面

1. 静态组件
2. 发请求
3. vuex
4. 动态展示组件

### 2.1 滚动条

```js
export default new VueRouter({

    routes,
    //滚动行为
    scrollBehavior(to,from,savedPosition){
        //返回的y=0，代表滚动条再最上方
        return {y:0}
    }

})
```

## 3 本地存储

### 3.1 成功路由跳转与参数传递

本地存储：持久化的----5M

会话存储：并非持久 

**本地存储和会话存储一般存储的都是字符串（不允许存对象）**

```js
//将对象转换为字符串会话存储
sessionStorage.setItem("SKUINFO",JSON.stringify(this.skuInfo))

//将字符串转换为对象获取
   computed:{
      skuInfo(){
        return JSON.parse(sessionStorage.getItem("SKUINFO"))
      }
    }
```

## 4  uuid临时游客身份

### 4.1 every

```js
let arr = [{cur:1},{cur:1}.{cur:1}]
let result = arr.every(item=>item.cur==1)
```



```js
      isAllCheck(){
        // 遍历数组里面原理，只要全部元素isCheck属性为1返回真 只要有一个不是1为假
        return this.cartInfoList.every(item=>item.isChecked==1)
      }
```

### 4.2 uuid

```js
import {v4 as uuidv4} from "uuid"
export const getUUID = () => {
    //先从本地存储获取uuid
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    if(!uuid_token){
        // 没有 生成临时身份
        uuid_token = uuidv4();
        localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    return uuid_token;
}
```

## 5 promise

```js
Promise.all([p1,p2,p3])
//p1,p2,p3,每一个都是Promise对象，如果有一个Promise失败，都失败，如果都成功，返回失败
```





# day 08

## 1 登录与注册

### 1.1 静态资源

assets文件夹：放置全部组件公用静态资源

在样式中使用@符号（src别名），需要加~

```css
background-image: url(~@/assets/images/icons.png);
```

### 1.2 解析赋值

```js
//phone为真执行后面
phone && this.$store.dispatch("getCode",phone)
```

## 2 await

1. await右侧的表达式一般为promise对象，但也可以是其他的值
2. 如果表达式是promise对象，**await返回的是promise成功的值**
3. 如果表达式是其他值，直接将此值作为await的返回值

### 2.1注意

1. await必须卸载async函数中，但async函数中可以没有await
2. 如果await的promise失败了，就会抛出异常，需要通过try...carch捕获



## 3 async函数

1. 函数的返回值是promise对象
2. promise对象的结果有async函数执行的返回值决定

## 4 登录业务

登录成功的时候，后台为了区分你这个用户，服务器下发token（唯一标识符）

刷新之后，获取不到用户信息（token：vuex非持久化存储）

**问题1**

多个组件展示用户信息需要在每一个组件派发action

**问题2**

用户已经登录，就不应该再回登录页



## 5 导航守卫

### 5.1 全局守卫

项目当中，只要发生路由变化，守卫就能监听到

### 5.2 路由独享守卫

```js
    {
        path:"/trade",
        component:Trade,
        meta:{show:true},
        //路由独享守卫
        beforeEnter:(to,from,next) => {
            //去交易页面，必须是从购物车而来
            if(from.path=="/shopcart"){
                next()
            }else {
                //其他路由组件而来，停留在当前
                next(false)
            }
        }
    },
```



### 5.3 组件内守卫

```js
 //组件内守卫
    //不能获取组件实例this 当守卫之前签，组件还没有被创建
    beforeRouteEnter(to,from,next){
      if(from.path=="/pay"){
        next()
      }else {
        next(false)
      }
    },
```



# day 09

## 1 统一管理api请求

1. 在main.js下引入

```js
//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from "@/api"


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
```

2. 调用

   ```js
   this.$API.reqSubmitOrder()
   ```

   

## 2 关于生命周期

注意：在生命周期函数中不使用async



## 3 element ui使用

1. 安装依赖

   `npm install --save element-ui`

2. 按需引入

   `npm install babel-plugin-component -D`

   ```js
     "plugins": [
       [
         "component",
         {
           "libraryName": "element-ui",
           "styleLibraryName": "theme-chalk"
         }
       ]
     ]
   ```

3. 挂在原型上注册

   ```js
   import {Button,MessageBox} from "element-ui";
   Vue.component(Button.name,Button)
   //elementui注册组件第二种写法，挂在原型上
   Vue.prototype.$msgbox = MessageBox;
   Vue.prototype.$alert = MessageBox.alert;
   ```

   

## 4 微信支付

## 4.1 二维码生成QRcode

```js
async open() {
        //生成二维码
        let url = await QRCode.toDataURL(this.payInfo.codeUrl)
        this.$alert(`<img src=${url} />`, '微信支付', {
          dangerouslyUseHTMLString: true,
          center:true,
          //是否显示取消按钮
          showCancelButton:true,
          //取消按钮文本的内容
          cancelButtonText:"支付遇见问题",
          confirmButtonText:"已支付成功",
          //右上角的x
          showClose:false
        });
        // 支付成功，路由的跳转，支付失败，提示信息
        //定时器没有，开启一个新定时器
        if(!this.timer){
          this.timer = setInterval(async ()=>{
            //发请求获取用户支付转台
            let result = await this.$API.reqPayStatus(this.orderId)
            if(result.code==200){
              //清楚定时器
              clearInterval(this.timer)
              this.timer = null
              //保存状态码
              this.code = result.code
              //关闭弹出框
              this.$msgbox.close();
              //跳转到下一路由
              this.$router.push("/paysuccess")
            }
          },1000)
        }
      }
```

# day 10

## 1 二级路由

1. 配置路由

```js
 	{
        path:"/center",
        component:Center,
        meta:{show:true},
        //耳机路由组件
        children:[
            {
                //路径要么写全要么不写
                path:"myorder",
                component:MyOrder
            },
            {
                path:"grouporder",
                component: GroupOrder
            },
            {
                path:"/center",
                redirect:"/center/myorder"
            }
        ]
    },
```



## 2 图片懒加载

1. 引入插件

   ```js
   //引入插件
   import VueLazyload from "vue-lazyload";
   //图片、json默认对外暴露
   import atm from "@/assets/logo.png"
   Vue.use(VueLazyload,{
     //懒加载默认图片
     loading:atm
   })
   ```

2. 使用

   ```vue
   <img v-lazy="good.defaultImg" />
   ```

## 3 自定义插件

1. 新建js文件

   ```js
   //Vue的插件一定暴露一个对象
   let myPlugins = {}
   
   myPlugins.install = function (vue,options){
       //vue.prototype.$bus任何数组都可以使用
       // vue.component
   }
   
   export default myPlugins
   ```

2. 引入使用

   ```js
   //引入自定义插件
   import myPlugins from "@/plugins/myPlugins";
   Vue.use(myPlugins,{
     name:"upper"
   })
   ```

3. 使用

   ```vue
   <h1 v-upper="msg">
       
   </h1>
   ```

   

## 4 vee-validate使用

1. 安装插件

   ` npm i vee-validate@2 --save`

   

2. 使用插件

   ```js
   //vee-validate插件表单验证区域
   import Vue from "vue";
   import VeeValidate from "vee-validate";
   //中文提示信息
   import zh_CN from "vee-validate/dist/locale/zh_CN";
   Vue.use(VeeValidate)
   
   //表单验证
   VeeValidate.Validator.localize("zh_CN", {
       messages: {
           ...zh_CN.messages,
           is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
       },
       attributes: {
           phone: "手机号",//当遇到phone字段的时候变成手机号
           code: "验证码",
           password: "密码",
           password1: "确认密码",
           agree:'协议'
       },
   });
   
   //自定义校验规则
   VeeValidate.Validator.extend("tongyi", {
       validate: (value) => {
           return value;
       },
       getMessage: (field) => field + "必须同意",
   });
   
   ```

3. 执行文件

   ```js
   //引入表单校验插件 只要里面代码执行就行
   import "@/plugins/validate"
   ```

4. 使用

   ```vue
    <input
             placeholder="请输入你的密码"
             v-model="password"
             name="password"
             v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
             :class="{ invalid: errors.has('password') }"
           />
           <span class="error-msg">{{ errors.first("password") }}</span>
   ```

   