<template>
  <div id="detail" class="container">
    <div class="title">
        <h1>제목: {{$store.state.post.title}}</h1>
    </div>
    <div>
        <p>{{$store.state.post.body}}</p>
    </div>
    <div class="commentArea">
        <h5>댓글</h5>
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <div>
            <b>{{comment.name}}</b>
          </div>
          <div>
              작성자 이메일 {{comment.email}}
          </div>
          <div>
              {{comment.body}}
          </div>
        </div>        
    </div>
  </div>
</template>

<script>

export default {
  metaInfo() {
    return  {
      title: this.$store.state.post.title,      
      meta: [
        { charset: 'utf-8'},
        { name: 'description', 
        content: this.$store.state.post.body, 
        vmid: 'description'},
      ]
    }
  },
  
  name: 'Detail',
  components: {
  },
  data(){
    return {
      comments:[]
    }    
  },
  mounted: function () {
    this.requestEvents()
  },
  methods: {
    requestEvents: async function() {            
      let postNumber = this.$store.state.post.id
      console.log(this.$store.state.post.id)
      let response = await this.$http.get('https://jsonplaceholder.typicode.com/posts/'+postNumber+'/comments?_sort=id&_order=desc')      
      this.comments = response.data
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/module';
.container{
  text-align: left;
}
.title {
  border-bottom: 1px solid $gray-200;
  margin-bottom: 1rem;
}
.comment{
  margin-bottom: 1rem;
}
p {
  font-size: 1.2rem;
}
</style>
