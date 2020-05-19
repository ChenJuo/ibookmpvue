<template>
  <div class="home">
    <SearchBar
      disable
      @onClick="onSearchBarkClick"
    />
    <ImageView
      src="https://www.youbaobao.xyz/mpvue-res/big.jpg"
    />
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import ImageView from "../../components/base/imageView";
  export default {
    components:{
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
