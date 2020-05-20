<template>
  <div class="home">
    <SearchBar
      disable
      @onClick="onSearchBarkClick"
      :hot-search="hotSearch"
    />
    <HomeCard :data="homeCard" @onClick="onHomeBookClick"/>
    <HomeBanner
      img="http://www.youbaobao.xyz/book/res/bg.jpg"
      title="《鬼吹灯.龙岭迷窟》上线了"
      subTitle="立即体验"
      @onClick="onBannerClick"
      @onBookClick="onHomeBookClick"
    />
    <div class="book-home">
      <HomeBook
        title="为你推荐"
        :row="1"
        :col="3"
        mode="col"
        btn-text="换一批"
        :data="recommend"
        @onMoreClick="onMoreClick"
        @onBookClick="onHomeBookClick"
      />
    </div>
    <div class="book-home">
      <HomeBook
        title="免费阅读"
        :row="2"
        :col="2"
        mode="row"
        btn-text="换一批"
        :data="freeRead"
        @onMoreClick="onMoreClick"
        @onBookClick="onHomeBookClick"
      />
    </div>
    <div class="book-home">
      <HomeBook
        title="当前最热"
        :row="1"
        :col="4"
        mode="col"
        btn-text="换一批"
        :data="hotBook"
        @onMoreClick="onMoreClick"
        @onBookClick="onHomeBookClick"
      />
    </div>
    <div class="book-home">
      <HomeBook
        title="分类"
        :row="3"
        :col="2"
        mode="category"
        btn-text="查看全部"
        :data="category"
        @onMoreClick="onMoreClick"
        @onBookClick="onHomeBookClick"
      />
    </div>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import ImageView from "../../components/base/imageView";
  import HomeCard from "../../components/home/HomeCard";
  import HomeBanner from "../../components/home/HomeBanner";
  import HomeBook from "../../components/home/HomeBook";
  import {getHomeData} from "../../api";

  export default {
    components:{
      HomeBook,
      HomeBanner,
      HomeCard,
      ImageView,
      SearchBar
    },
    data(){
      return{
        hotSearch:'',
        homeCard:{},
        banner:{},
        recommend:[],
        freeRead:[],
        hotBook:[],
        category:[]
      }
    },
    mounted(){
      this.getHomeData()
    },
    methods: {
      getHomeData(){
        getHomeData({openId:'1234'}).then(res =>{
          const {
            data:{
              hotSearch:{
                keyword
              },
              shelf,
              banner,
              recommend,
              freeRead,
              hotBook,
              category,
              shelfCount
            }
          } = res.data;
          this.hotSearch = keyword;
          this.banner = banner;
          this.recommend = recommend;
          this.freeRead = freeRead;
          this.hotBook = hotBook;
          this.category = category;
          this.homeCard = {
            bookList:shelf,
            num:shelfCount,
            userInfo:{
              avatar:'https://www.youbaobao.xyz/mpvue-res/logo.jpg',
              nickname:'米老鼠'
            }
          }
        }).cache(err => {
          console.log('捕获异常',err)
        })
      },
      onSearchBarkClick(){
        //跳转到搜索页面
      },
      onBannerClick(){
        console.log('banner click……')
      },
      onMoreClick(){
        console.log('onMore click……')
      },
      onHomeBookClick(){
        console.log('onHomeBookClick click……')
      }
    }
  };
</script>

<style lang="scss" scoped>
  .book-home{
    margin-top: 23px;
  }

</style>
