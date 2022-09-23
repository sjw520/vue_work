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