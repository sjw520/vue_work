<template>
    <div>
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list=floor ></Floor>
        <Brand></Brand>
    </div>
</template>
<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from "@/pages/Home/Floor"
import Brand from "@/pages/Home/Brand"
import {mapState} from "vuex";


export default {

    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
  mounted() {

      //getFloorList这个action需要在Home路由组件当中发，不能再floor组件内部发action，因为我们需要v-for遍历floor组件
      //派发action，获取floor组件的数组
    this.$store.dispatch("getFloorList");
  },
  computed:{
      ...mapState({
        floorList:state => state.home.floorList
      })
  }


}
</script>
<style lang="">
    
</style>