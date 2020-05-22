<template>
    <div>
      <SearchBar
        :hot-search="hotSearchKeyword"
        :focus="searchFocus"
        @onChange="onChange"
        @onClear="onClear"
      />
      <TagGroup
        header-text="热门搜索"
        btn-text="换一批"
        :value="hotSearchArray"
        @onBtnClick="changeHotSearch"
        @onTagClick="showBookDetail"
        v-if="hotSearchArray.length > 0 && !showList"
      />
      <TagGroup
        header-text="历史搜索"
        btn-text="清空"
        :value="historySearch"
        @onBtnClick="clearHistorySearch"
        @onTagClick="searchKeyWord"
        v-if="historySearch.length > 0 && !showList"
      />
      <SearchList
        :data="searchList"
        v-if="showList"
      />
    </div>
</template>

<script>
  import SearchList from "../../components/search/SearchList";
  import SearchBar from "../../components/home/SearchBar";
  import TagGroup from "../../components/base/TagGroup";
  import {getStorageSync} from "../../api/wechat";
  import {search,hotSearch} from "../../api";

  export default {
    name: "search",
    components:{
      TagGroup,
      SearchBar,
      SearchList,
    },
    computed:{
      showList(){
        const keys =Object.keys(this.searchList)
        return keys.length > 0
      },
      hotSearchArray(){
       const _hotSearch = []
        this.hotSearch.forEach(o => _hotSearch.push(o.title));
       console.log(_hotSearch,this.hotSearch);
        return _hotSearch
      }
    },
    data(){
      return{
        hotSearch:[],
        hotSearchKeyword:'',
        historySearch:[],
        searchList:{},
        searchFocus:true,
        openId:''
      }
    },
    mounted(){
      this.openId = getStorageSync('openId')
      hotSearch().then(res =>{
        this.hotSearch = res.data.data;
      });
      this.hotSearchKeyword = this.$route.query.hotSearch
    },
    methods:{
      onClear(){
        this.searchList ={}
      },
      onChange(keyword){
        if(!keyword || keyword.trim().length === 0){
          return
        }
        this.onSearch(keyword)
        console.log(keyword)
      },
      onSearch(keyword){
        search({
          keyword,
          openId:this.openId
        }).then(res =>{
          this.searchList = res.data.data;
        })
      },
      showBookDetail(){
        console.log('图书详情')
      },
      changeHotSearch(){
        console.log('换一批，热搜')
      },
      clearHistorySearch(){
        console.log('清除历史搜索')
      },
      searchKeyWord(){
        console.log('搜索关键词')
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
