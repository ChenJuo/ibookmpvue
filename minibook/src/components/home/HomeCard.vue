<template>
    <div class="home-card">
      <div class="home-card-inner">
        <div class="user-info">
          <div class="avatar-wrapper">
            <ImageView
              src="https://www.youbaobao.xyz/mpvue-res/logo.jpg"
              round
            />
          </div>
          <div class="nickname">{{'米老鼠'}}</div>
          <div class="shelf-text">书架共有{{3}}本好书</div>
          <div class="round-item"></div>
          <div class="shelf-text">特别精选</div>
        </div>
        <div class="book-info">
            <div class="book-wrapper">
              <ImageView
                src="https://www.youbaobao.xyz/book/res/img//EarthSciences/978-981-10-3713-9_CoverFigure.jpg"
              />
              <ImageView
                src="https://www.youbaobao.xyz/book/res/img//EarthSciences/978-981-10-3713-9_CoverFigure.jpg"
              />
              <ImageView
                src="https://www.youbaobao.xyz/book/res/img//EarthSciences/978-981-10-3713-9_CoverFigure.jpg"
              />
            </div>
            <div class="shelf-wrapper">
                <div class="shelf">书架</div>
                <van-icon class="arrow" name="arrow"></van-icon>
            </div>
        </div>
        <div class="feedback-wrapper">

        </div>
      </div>
    </div>
</template>

<script>
  import ImageView from "../base/imageView";
  export default {
    name: "HomeCard",
    components: { ImageView },
    props:{
      data:Object,
      hasSign:{
        type:Boolean,
        default:false
      },
      signDay:{
        type: Number,
        default:0
      }
    },
    methods:{
      gotoShelf(){

      },
      onBookClick(){

      },
      sign(){

      },
    }
  };
</script>

<style lang="scss" scoped>
  .home-card{
    background-image: linear-gradient(-90deg,#54575f 0%,#595b60 100%);
    border-radius:15px;
    margin: 22px 20px 0;
    .home-card-inner{
      padding: 21.5px 17px 20px 20px;
      box-sizing: border-box;
      .user-info{
        display: flex;
        align-items: center;
        .avatar-wrapper{
          width: 20px;
          height: 20px;
        }
        .nickname,.shelf-text{
          font-size: 12px;
          color:#ffffff;
        }
        .nickname{
          margin: 0 8.5px;
        }
        .shelf-text{
          opacity: 0.7;
        }
        .round-item{
          width: 4px;
          height: 4px;
          background: #a2a2a2;
          border-radius: 50%;
          margin: 0 8px;
        }
      }
      .book-info{
        display: flex;
        .book-wrapper{
          flex: 1;
          display: flex;
        }
        .shelf-wrapper{
          display: flex;
          align-items: center;
        }
      }
      .feedback-wrapper{

      }
    }
  }
</style>
