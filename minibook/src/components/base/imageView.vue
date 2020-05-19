<template>
  <div class="image-view" @click="onClick">
    <img
    :class="round ? 'round image' : 'image'"
    :style="{height}"
    :src="src"
    :lazy-load="lazyLoad"
    @load="onLoad"
    @error="onError"/>
  </div>
</template>

<script>
  export default {
    name: "imageView",
    props:{
      src:{
        type:String,
        default:''
      },
      mode:{
        type:String,
        default: 'widthFix'
      },
      lazyLoad:{
        type:Boolean,
        default:true
      },
      round:{
        type:Boolean,
        default:false
      },
      height:{
        type:String,
        default:'auto'
      }
    },
    watch:{
      src(newValue,preValue){

      }
    },
    data(){
      return{
        isLoading:true,
        error:false
      }
    },
    methods:{
      onClick(){
        this.$emit('onClick')
      },
      onLoad(){
        this.isLoading = false
        this.error = false
        console.log('onload')
      },
      onError(){
        this.error = true
        this.isLoading = false
        console.log('onerror')
      }
    }
  };
</script>

<style scoped>

</style>
