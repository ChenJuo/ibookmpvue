<template>
  <div>
    <DetailBook :book="book"/>
    <DetailStat
      :readers="book.readers"
      :readerNum="book.readerNum"
      :rankNum="book.rankNum"
      :rankAvg="book.rankAvg"
    />
    <DetailRate
      :rate-value="book.rateValue"
      @onRateChange="onRateChange"
    />
    <DetailContents
      :contents="contents"
      @readBook="readBook"
    />
  </div>
</template>

<script>
  import DetailBook from '../../components/detail/DetailBook'
  import DetailStat from '../../components/detail/DetailStat'
  import DetailRate from "../../components/detail/DetailRate";
  import DetailContents from "../../components/detail/DetailContents";
  import {bookDetail,bookRankSave,bookContents} from "../../api";
  import {getStorageSync} from "../../api/wechat";


  export default {
    components:{
      DetailContents,
      DetailRate,
      DetailStat,
      DetailBook
    },
    data(){
      return{
        book:{},
        contents:[]
      }
    },
    methods:{
      readBook(href){
        console.log(href)
      },
      onRateChange(value){
        const openId = getStorageSync('openId')
        const {fileName} = this.$route.query
        bookRankSave({
          openId,fileName,rank:value
        }).then(res =>{
          this.getBookDetail()
        })
      },
      getBookDetail(){
        const openId = getStorageSync('openId')
        const { fileName } = this.$route.query
        console.log('detail',openId,fileName)
        if(openId && fileName){
          bookDetail({openId,fileName}).then(res =>{
            this.book = res.data.data
            console.log(res)
          })
        }
      },
      getBookContents(){
        const { fileName } = this.$route.query
        if(fileName){
          bookContents({fileName}).then(res =>{
            this.contents = res.data.data
          })
        }
      }
    },
    mounted(){
      this.getBookContents()
      this.getBookDetail()
    }
  }
</script>

<style lang="scss" scoped>

</style>
