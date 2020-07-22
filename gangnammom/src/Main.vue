<template>
  <div id="main" class="container">
    <div class="main_list">
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
      maxCount:8
    }
  },
  mounted () {
    this.requestEvents()   
  },
  methods: {
    requestEvents: async function() {
      this.posts = await this.$http.get('https://jsonplaceholder.typicode.com/posts')
      this.posts = this.posts.data
      console.log(this.posts)
    },
    getThumbnail() {
        let num = Math.floor(Math.random() * 3);
        console.log(num)
        return this.thumbnails[num]
    }

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
