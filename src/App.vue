<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- 在Home、Search显示的，在登录、注册隐藏 -->

    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>

import Header from './components/Header'
import Footer from './components/Footer'


export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    // 派发action
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
</style>
