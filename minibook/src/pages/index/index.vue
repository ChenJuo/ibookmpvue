<template>
  <div>
    <div class="home" v-if="isAuth">
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
          @onMoreClick="recommendChange('recommend')"
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
          @onMoreClick="recommendChange('freeRead')"
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
          @onMoreClick="recommendChange('hotBook')"
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
          @onMoreClick="onCategoryMoreClick"
          @onBookClick="onHomeBookClick"
        />
      </div>
    </div>
    <Auth v-if="!isAuth" @getUserInfo = "init(res)"/>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import ImageView from "../../components/base/ImageView";
  import HomeCard from "../../components/home/HomeCard";
  import HomeBanner from "../../components/home/HomeBanner";
  import HomeBook from "../../components/home/HomeBook";
  import { getHomeData, recommend, freeRead, hotBook, register } from "../../api";
  import {getSetting,getUserInfo,getStorageSync,setStorageSync,getUserOpenId,showLoading,hideLoading} from "../../api/wechat";
  import Auth from "../../components/base/Auth";

  export default {
    components:{
      Auth,
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
        category:[],
        isAuth:true
      }
    },
    methods: {
      recommendChange(key){
        switch (key) {
          case 'recommend':
            recommend().then(res =>{
              this.recommend = res.data.data;
            });
            break;
          case  'freeRead':
            freeRead().then(res =>{
              this.freeRead = res.data.data;
            });
            break;
          case   'hotBook':
            hotBook().then(res =>{
              this.hotBook = res.data.data;
            });
            break
        }
      },
      getHomeData(openId,userInfo){
        getHomeData({openId}).then(res =>{
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
            userInfo
          };
          //关闭loading
          hideLoading()
        }).catch(() =>{
          //关闭loading
          hideLoading()
        })
      },
      onSearchBarkClick(){
        //跳转到搜索页面
        this.$router.push({
          path:'/pages/search/main',
          query:{
            hotSearch:this.hotSearch
          }
        })
      },
      onBannerClick(){
        console.log('banner click……')
      },
      onCategoryMoreClick(){},
      onHomeBookClick(book){
        console.log(book)
        this.$router.push({
          path: '/pages/detail/main',
          query: {
            fileName:book.fileName
          }
        })
      },
      getUserInfo(){
        const onOpenIdComplete =(openId,userInfo) =>{
            this.getHomeData(openId,userInfo)//获取首页数据
            register(openId,userInfo)
        };
        getUserInfo(
          (userInfo)=>{
            console.log(userInfo);
            setStorageSync('userInfo',userInfo)
            const openId = getStorageSync('openId')
            if(!openId || openId.length === 0){
              //未获得openId通过getUserOpenId获得
              getUserOpenId(openId=> onOpenIdComplete(openId,userInfo))
            }else{
              //已获得openId
              onOpenIdComplete(openId,userInfo)
            }
        },
          ()=>{
            console.log('failed……')//获取用户信息，抛出异常
          }
        )
      },
      getSetting(){
        getSetting('userInfo',
        () =>{
          this.isAuth = true;
          //获得授权之后，请求首页数据时开始loading
          showLoading('正在加载');
          this.getUserInfo()
        },
        () =>{
          this.isAuth = false
        })
      },
      init(e){
        this.getSetting();
      }
    },
    mounted(){
      this.init()
    },
  };
</script>

<style lang="scss" scoped>
  .book-home{
    margin-top: 23px;
  }

</style>
