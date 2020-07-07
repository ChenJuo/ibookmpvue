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
    <DetailBottom
      :is-in-shelf="isInShelf"
      @handleShelf="handleShelf"
      @readBook="readBook"
    />
  </div>
</template>

<script>
  import DetailBook from '../../components/detail/DetailBook'
  import DetailStat from '../../components/detail/DetailStat'
  import DetailRate from "../../components/detail/DetailRate";
  import DetailContents from "../../components/detail/DetailContents";
  import DetailBottom from "../../components/detail/DetailBottom";
  import {bookDetail,bookRankSave,bookContents,bookIsInShelf,bookShelfSave} from "../../api";
  import {getStorageSync} from "../../api/wechat";



  export default {
    components:{
      DetailBottom,
      DetailContents,
      DetailRate,
      DetailStat,
      DetailBook
    },
    data(){
      return{
        book:{},
        contents:[],
        isInShelf:false
      }
    },
    methods:{
      handleShelf(){
        if(!this.isInShelf){
          const openId = getStorageSync('openId')
          const {fileName} = this.$route.query
          bookShelfSave({openId,fileName}).then(() =>{
            this.getBookIsInShelf()
          })
        }
      },
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
      },
      getBookIsInShelf(){
        const openId = getStorageSync('openId')
        const { fileName } = this.$route.query
        if(openId && fileName){
          bookIsInShelf({openId,fileName}).then(res =>{
            const {data} =res.data
            data.length === 0 ? this.isInShelf = false : this.isInShelf = true
          })
        }
      }
    },
    mounted(){
      this.getBookContents()
      this.getBookDetail()
      this.getBookIsInShelf()
    }
  }
</script>

<style lang="scss" scoped>

</style>
