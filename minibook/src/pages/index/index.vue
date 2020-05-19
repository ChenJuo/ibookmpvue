<template>
  <div class="home">
    <SearchBar
      disable
      @onClick="onSearchBarkClick"
    />
    <HomeCard/>
    <HomeBanner
      img="http://www.youbaobao.xyz/book/res/bg.jpg"
      title="mpvue2.0实战多端小程序上线啦"
      subTitle="立即体验"
      @onClick="onBannerClick"
    />
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import ImageView from "../../components/base/imageView";
  import HomeCard from "../../components/home/HomeCard";
  import HomeBanner from "../../components/home/HomeBanner";
  export default {
    components:{
      HomeBanner,
      HomeCard,
      ImageView,
      SearchBar
    },
    methods: {
      onSearchBarkClick(){
        //跳转到搜索页面
      },
      onBannerClick(){
        console.log('banner click……')
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
