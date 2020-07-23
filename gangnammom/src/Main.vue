<template>
  <div id="main" class="container">
    <div class="main_list"
    v-infinite-scroll="loadMore" 
       infinite-scroll-disabled="busy" 
       infinite-scroll-distance="10">
            <div class="main_item">
                <div class="contents" v-for="post in posts" :key="post.id">
                  <div class="card">
                                       <div class="thumbnail">
                        <img v-bind:src="getThumbnail()"/>
                    </div>
                    <p>{{post.title}}</p>
                    <p>{{post.body}}</p>
                    <p>{{post.userId}}</p>
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
      tempStorage: []
    }
  },
  mounted () {
    this.requestEvents()   
  },
  methods: {
    requestEvents: async function() {
      this.eventUpdateCount += 1      
      this.tempStorage = await this.$http.get('https://jsonplaceholder.typicode.com/posts?_page='+ this.eventUpdateCount +'&_limit=8&_sort=id&_order=desc')
      console.log(this.tempStorage)
      for (let data of this.tempStorage.data) {        
        this.posts.push(data)        
      }
     
    },
    getThumbnail() {
        let num = Math.floor(Math.random() * 3);
        return this.thumbnails[num]
    },
    // loadMore: function () {
    //   this.busy = true // 무한 스크롤 기능 비활성화
    //   this.requestEvents()
    // },

  }
}
</script>

<style lang="scss" scoped>
@import './styles/module';
@media (min-width: 768px){
    .container{
        max-width: 1040px;
    }
    .contents {
        flex: 0 0 25%;
        max-width: 25%;
        padding: 1rem 0.5rem;
    }
    .card {
        background-color: $gray-300;
        padding: 1rem;
        border-radius: .5rem; 
    }
    .main_item {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    
}
</style>
