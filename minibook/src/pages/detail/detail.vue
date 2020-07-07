<template>
  <div>
    <DetailBook :book="book"/>
  </div>
</template>

<script>
  import DetailBook from '../../components/detail/DetailBook'
  import {bookDetail} from "../../api";
  import {getStorageSync} from "../../api/wechat";

  export default {
    components:{
      DetailBook
    },
    data(){
      return{
        book:{}
      }
    },
    mounted(){
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      console.log('detail',openId,fileName)
      if(openId && fileName){
          bookDetail({openId,fileName}).then(res =>{
            this.book = res.data.data
            console.log(res)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
