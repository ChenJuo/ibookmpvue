<template>
  <div class="home">
    <SearchBar
      disable
      @onClick="onSearchBarkClick"
    />
  <!--  <ImageView
      src="https://www.youbaobao.xyz/mpvue-res/big.jpg"
    />-->
    <HomeCard/>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import ImageView from "../../components/base/imageView";
  import HomeCard from "../../components/home/HomeCard";
  export default {
    components:{
      HomeCard,
      ImageView,
      SearchBar
    },
    methods: {
      onSearchBarkClick(){
        //跳转到搜索页面
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
