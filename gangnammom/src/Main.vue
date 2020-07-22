<template>
  <div id="main" class="container">
    <div class="main_list">
        <div class="main_item"  v-for="post in posts" :key="post.id">
            <div class="contents">
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
    .main_list {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .main_item {
        background-color: $gray-300;
        padding: 1rem;
        flex: 0 0 25%;
        max-width: 25%;
        border-radius: .5rem;
    }
    
}
</style>
