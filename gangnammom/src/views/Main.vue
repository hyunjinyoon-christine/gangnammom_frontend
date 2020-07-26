<template>
  <div id="main" class="container">
    <div class="area_select">
      <label for="postNumber">포스트 개수</label>
      <select v-model="showPostNumber">
        <option v-for="option in options" :value="option.value" :key="option.value">
          {{ option.text }}
        </option>
      </select>
      <label for="listType">목록보기 형태</label>
      <select v-model="showPostType">
        <option v-for="option in options2" :value="option.value" :key="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
    <div>      
      <div :class="{grid:isGrid, list:isList}"
      v-infinite-scroll="loadMore" 
      infinite-scroll-disabled="busy" 
      infinite-scroll-distance="10">
          <div :class="{contents:isGrid}" v-for="post in posts" :key="post.id">
            <router-link 
            :to="{ name: 'Detail'}">            
              <div :class="{card:isGrid}" @click="sendDetail(post)">
                <div :class="{thumbnail:isGrid} ">
                  <img v-bind:src="post.thumbnail"/>
                </div>
                <p class="title"><b>{{post.title}}</b></p>
                <p class="body">{{post.body}}</p>
                <p>{{post.userId}}</p>
              </div>
            </router-link>
          </div>
      </div>      
    </div>    
  </div>
</template>

<script>
export default {
  name: 'Main',  
  components: {       
  },
  data (){
    return {
      thumbnails : [
        'https://via.placeholder.com/150/771796',
        'https://via.placeholder.com/150/92c952',
        'https://via.placeholder.com/150/56a8c0'
      ],
      posts:[],
      busy: false,
      eventUpdateCount: 0,
      postNumber:8,
      options: [
        { text: '8', value: 8 },
        { text: '16', value: 16 },
      ],
      options2: [
        { text: '그리드형', value: 'grid' },
        { text: '리스트형', value: 'list' },
      ],
      showPostNumber: '8',
      showPostType: 'grid',
      thumbnail:'',
      isList: false,
      isGrid: true
      
    }
  },
  mounted(){
    this.showPostNumber = this.$store.state.postNumber
    this.showPostType = this.$store.state.postType
    console.log(this.showPostNumber, this.showPostType)
    
  },  
  watch: {    
    showPostNumber: function (newVal) {      
      if(newVal > this.postNumber){
        this.postNumber = 8
        this.requestEvents()        
      } else if(newVal < this.postNumber){
        this.posts = this.posts.slice(0,8)        
      }
      this.postNumber = newVal
      this.$store.dispatch('setNum',newVal)
    },
    showPostType: function (){
      this.$store.dispatch('setType',this.showPostType)
      if(this.showPostType == 'grid'){
        this.isGrid = true
        this.isList = false
      } else {
        this.isList = true
        this.isGrid = false
      }
    }
  },
  methods: {
    requestEvents: async function() {
      this.eventUpdateCount += 1      
      let tempStorage = await this.$http.get('https://jsonplaceholder.typicode.com/posts?_page='+ this.eventUpdateCount +'&_limit='+this.postNumber+'&_sort=id&_order=desc')

      for (let data of tempStorage.data) {        
        data.thumbnail = this.getThumbnail()
        this.posts.push(data)
      }

      if(tempStorage.data.length >= this.postNumber ){
        this.busy = false 
      }     
    },
    getThumbnail() {
      let num = Math.floor(Math.random() * 3);
      return this.thumbnails[num]
    },
    loadMore: function () {
      this.busy = true
      this.requestEvents()
    },
    sendDetail(post){      
      this.$store.dispatch('setPost',post)
    }

  }
}
</script>

<style lang="scss" scoped>
@import '../styles/module';
.grid{
  .title {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .body {
    display: inline-block; 
    width: 100%; 
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: normal; 
    line-height: 1.2;
    height: 3.6em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .thumbnail {
    display: none;
  }
  .card {
    padding: 1rem;
    border-radius: 0;
    border: 0;
    border-bottom: 1px solid $gray-200
  }
}
.list{
  text-align: left;
  div {
    div {
      margin-bottom: 1rem;
      border-bottom: 1px solid $gray-200;
    }
  }  
}
.area_select {
  display: none;
}

@media (min-width: 768px){
  .container{
    max-width: 1040px;
  }
  .contents {
    flex: 0 0 25%;
    max-width: 25%;
    padding: 1rem 0.5rem;
  }    
  .grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .card {
      padding: 1rem;
      border: 1px solid $gray-200;
      border-radius: 0.5rem;
    }
    .thumbnail {
      display: block;
      margin-bottom: 1rem;
    }
  }
  .area_select {
    display: flex;
    justify-content: flex-end;
  }
  
}


</style>
