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
      @onBookClick="onHomeBookClick"
    />
    <div class="book-home">
      <HomeBook
        title="为你推荐"
        :row="2"
        :col="2"
        mode="row"
        btn-text="更多"
        :data="hotBook"
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
        "hotBook":[
          {
            "id":89,
            "fileName":"2018_Book_ContemporaryPerspectivesOnAgei",
            "cover":"https://www.youbaobao.xyz/book/res/img/SocialSciences/978-3-319-73820-8_CoverFigure.jpg",
            "title":"Contemporary Perspectives on Ageism",
            "author":"Liat Ayalon",
            "publisher":"Springer International Publishing",
            "bookId":"2018_Book_ContemporaryPerspectivesOnAgei",
            "category":2,
            "categoryText":"SocialSciences",
            "language":"en",
            "rootFile":"OEBPS/package.opf"
          },
          {
            "id":218,
            "fileName":"2015_Book_PovertyReductionPoliciesAndPra",
            "cover":"https://www.youbaobao.xyz/book/res/img/Economics/2015_Book_PovertyReductionPoliciesAndPra.jpeg",
            "title":"Poverty Reduction Policies and Practices in Developing Asia",
            "author":"Almas Heshmati, Esfandiar Maasoumi and Guanghua Wan",
            "publisher":"Springer Singapore, Singapore",
            "bookId":"2015_Book_PovertyReductionPoliciesAndPra",
            "category":3,
            "categoryText":"Economics",
            "language":"en",
            "rootFile":"OEBPS/content.opf"
          },
          {
            "id":6,
            "fileName":"2018_Book_DronesAndTheCreativeIndustry",
            "cover":"https://www.youbaobao.xyz/book/res/img/BusinessandManagement/978-3-319-95261-1_CoverFigure.jpg",
            "title":"Drones and the Creative Industry",
            "author":"Virginia Santamarina-Campos",
            "publisher":"Springer International Publishing",
            "bookId":"2018_Book_DronesAndTheCreativeIndustry",
            "category":13,
            "categoryText":"BusinessandManagement",
            "language":"en",
            "rootFile":"OEBPS/package.opf"
          },
          {
            "id":139,
            "fileName":"2018_Book_EvolutionMonitoringAndPredicti",
            "cover":"https://www.youbaobao.xyz/book/res/img/EarthSciences/2018_Book_EvolutionMonitoringAndPredicti.jpeg",
            "title":"Evolution, Monitoring and Predicting Models of Rockburst",
            "author":"Chunlai Wang",
            "publisher":"Springer Singapore, Singapore",
            "bookId":"2018_Book_EvolutionMonitoringAndPredicti",
            "category":14,
            "categoryText":"EarthSciences",
            "language":"en",
            "rootFile":"OEBPS/content.opf"
          }
        ],
      }
    },
    methods: {
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
