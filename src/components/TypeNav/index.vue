<template>
        <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container">
                <!-- 事件委派 -->
                <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex == index}">
                            <h3 @mouseenter="changeIndex(index)">
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId" >{{c1.categoryName}}</a>
                            </h3>
                            <div class="item-list clearfix"  :style="{display:currentIndex==index?'block':'none'}">
                                <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </transition>


                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>

            </div>
        </div>
</template>
<script>
import {mapState} from "vuex"
// 是把lodash全部功能函数引入
import throttle from "lodash/throttle"
export default {
    name:'TypeNav',
    data(){
        return {
            currentIndex:-1,
            show:true
        }
    },
    mounted() {
        // 通知vuex发请求，获取数据，存储仓库中

        // 当组件挂在完毕，让show变为false
        // 如果不是Home路由组件，将typeNav进行隐藏
        if(this.$route.path!="/home"){
            this.show = false
        }
    },
    computed:{
        // 右侧需要的是一个函数
        //注入一个state，其实为大仓库的属性
        ...mapState({
            categoryList:state => state.home.categoryList
        })
        // ...mapState('home',["categoryList"])
    }, 
    methods:{
        // 鼠标进入
        // 正常情况：鼠标进入，每一个一级分类，都会触发鼠标进入事件
        // 非正常情况：本身全部的一级分类都应该触发进入事件，但只有部分h3触发
        // 由于用户行为过快，导致浏览器反应不过来，如果回调函数中有大量业务，可能出现卡顿
        changeIndex(index){
           
        },
        changeIndex:throttle(function(index){
            this.currentIndex = index
        },50),
        // 一级分类鼠标移出的回调
        leaveIndex(){
            this.currentIndex = -1
        },
        goSearch(event){
            let element = event.target
            // 获取categoryname属性
            let {categoryname,category1id,category2id,category3id} = element.dataset
            // 判断属性是否存在
            if(categoryname){
                // 整理路由的参数
                let location = {name:"search"}
                let query  = {categoryName:categoryname}

                if(category1id){
                    query.category1Id = category1id
                }else if(category2id){
                    query.category2Id = category2id
                }else{
                    query.category3Id = category3id
                }

                //判断路由里面params里面是否有参数
                if(this.$route.params){
                    location.params = this.$route.params;
                    // 添加条件参数
                    location.query = query
                    this.$router.push(location)
                }

            }
        },
        //当鼠标移入的时候，让商品列表进行展示
        enterShow(){
             if(this.$route.path != "/home"){
                this.show = true
             }
            
        },
        leaveShow(){
            this.currentIndex = -1
            //判断
            if(this.$route.path != "/home"){

            this.show = false
            }


        }
    },
    
}
</script>
<style lang="less">
        .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
      
                        // }
                    }
                    .cur {
                        background: skyblue;
                    }

                }
            }
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
        }
    }
</style>