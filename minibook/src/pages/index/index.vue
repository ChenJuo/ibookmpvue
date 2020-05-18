<template>
  <div>
    <span class="msg">Hello World</span>
    <van-button type="primary" @click="jump">按钮</van-button>
  </div>
</template>

<script>
  import{ get } from '../../utils/request'
  export default {
    methods: {
      jump(){
       /* this.$router.push("/pages/index/main");*/
       /* get('https://www.baidu.com').then(response => {
          console.log('handleResponse……')
        })*/
      }
    }
  };
</script>

<style lang="scss" scoped>
  .msg {
    color: red;
    font-size: 20px;
    font-weight: bold;
  }
</style>
