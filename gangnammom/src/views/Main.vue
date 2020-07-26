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
    <div v-if="this.showPostType == 'list'">
        <div>
          <div class="list"
          v-infinite-scroll="loadMore" 
          infinite-scroll-disabled="busy" 
          infinite-scroll-distance="10">
              <div v-for="post in posts" :key="post.id">
                <router-link 
                :to="{ name: 'Detail'}">            
                  <div @click="sendDetail(post)">                    
                    <p>{{post.title}}</p>
                    <p>{{post.body}}</p>
                    <p>{{post.userId}}</p>
                  </div>
                </router-link>
              </div>
          </div>
      </div>
    </div>
    <div v-else>
      <div>
        <div class="main_item"
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="busy" 
        infinite-scroll-distance="10">
            <div class="contents" v-for="post in posts" :key="post.id">
              <router-link 
              :to="{ name: 'Detail'}">            
                <div class="card" @click="sendDetail(post)">
                  <div class="thumbnail">
                    <img v-bind:src="post.thumbnail"/>
                  </div>
                  <p class="title">{{post.title}}</p>
                  <p class="body">{{post.body}}</p>
                  <p>{{post.userId}}</p>
                </div>
              </router-link>
            </div>
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
      list: false,
      grid: true
      
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
    }
  },
  methods: {
    requestEvents: async function() {
      this.eventUpdateCount += 1      
      let tempStorage = await this.$http.get('https://jsonplaceholder.typicode.com/posts?_page='+ this.eventUpdateCount +'&_limit='+this.postNumber+'&_sort=id&_order=desc')
      // for(let i = 0; i < tempStorage.data.length; i++){
      //   tempStorage.data[i].thumbnail = this.getThumbnail()
      // }
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

.list{
  text-align: left;
  div {
    div {
      margin-bottom: 1rem;
      border-bottom: 1px solid $gray-200
    }
  }
}

.title {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

.area_select {
  display: none;
}

@media (min-width: 768px){
  .card {
      padding: 1rem;
      border: 1px solid $gray-200;
      border-radius: 0.5rem;
  }
  .container{
      max-width: 1040px;
  }
  .contents {
      flex: 0 0 25%;
      max-width: 25%;
      padding: 1rem 0.5rem;
  }    
  .main_item {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
  }
  .area_select {
    display: flex;
    justify-content: flex-end;
  }
  .thumbnail {
    display: block;
    margin-bottom: 1rem;
  }
  
}


</style>
