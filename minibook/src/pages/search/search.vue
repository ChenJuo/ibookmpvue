<template>
    <div>
      <SearchBar
        :hot-search="hotSearchKeyword"
        :focus="searchFocus"
        @onChange="onChange"
        @onClear="onClear"
        @onConfirm="onConfirm"
        ref="searchBar"
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
  import { getStorageSync, setStorageSync, showToast} from "../../api/wechat";
  import {search,hotSearch} from "../../api";
  const KEY_HISTORY_SEARCH = 'historySearch';
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
        openId:'',
        page:1
      }
    },
    mounted(){
      this.openId = getStorageSync('openId')
      hotSearch().then(res =>{
        this.hotSearch = res.data.data;
      });
      this.page = 1;
      this.hotSearchKeyword = this.$route.query.hotSearch;
      this.historySearch = getStorageSync(KEY_HISTORY_SEARCH) ||[];
    },
    methods:{
      onConfirm(keyword) {
        console.log('onConfirm……')
        //1、判断是否有搜索关键词
        if(!keyword || keyword.trim().length === 0){
          //如果没有，则获取热门搜索词，通过热门搜索词发起请求
          keyword = this.hotSearchKeyword;
          this.$refs.searchBar.setValue(keyword)
        }else{
          //如果有，就用搜索关键词发起请求
          this.onSearch(keyword)
        }
        //2、将搜索结果写入历史搜索
        if(!this.historySearch.includes(keyword)){
            this.historySearch.push(keyword)
            setStorageSync(KEY_HISTORY_SEARCH,this.historySearch)
        }
        //3、将搜索框失去焦点
          this.searchFocus = false
      },
      onClear(){
        this.searchList ={}
      },
      onChange(keyword){
        if(!keyword || keyword.trim().length === 0){
          this.searchList ={};
          return
        }
        this.page = 1;
        this.onSearch(keyword)

      },
      onSearch(keyword){
        search({
          keyword,
          openId:this.openId,
          page:this.page,
        }).then(res =>{
          this.searchList = res.data.data;
        })
      },
      showBookDetail(){
        console.log('图书详情')
      },
      changeHotSearch(){
        hotSearch().then(res =>{
          this.hotSearch = res.data.data;
        });
        console.log('换一批，热搜')
      },
      clearHistorySearch(){
        this.historySearch = [];
        setStorageSync(KEY_HISTORY_SEARCH,[]);
        console.log('清除历史搜索')
      },
      searchKeyWord(text){
        this.$refs.searchBar.setValue(text);
        this.onSearch(text);
        console.log('搜索关键词')
      }
    },
    onPageScroll(){
      console.log('scroll……');
      if(this.searchFocus){
        this.searchFocus = false
      }
    },
    onReachBottom(){
      if(this.showList){
        this.page++;
        const searchWord = this.$refs.searchBar.getValue()
        search({
          keyword:searchWord,
          openId:this.openId,
          page:this.page,
        }).then(res =>{
          const {book} = res.data.data;
          if(book && book.length > 0){
            this.searchList.book.push(...book)
          }else{
            showToast('没有更多数据了')
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
