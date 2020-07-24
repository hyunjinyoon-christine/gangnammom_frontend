<template>
  <div id="main" class="container">
    <div class="area_select">
      <label for="postNumber">포스트 개수</label>
        <select v-model="selected">
          <option v-for="option in options" :value="option.value" :key="option.value">
            {{ option.text }}
          </option>
        </select>
    </div>
    <div class="main_list">
      <div class="main_item"
      v-infinite-scroll="loadMore" 
      infinite-scroll-disabled="busy" 
      infinite-scroll-distance="10">
          <div class="contents" v-for="post in posts" :key="post.id">
            <div class="card">
              <div class="thumbnail">
                <img v-bind:src="post.thumbnail"/>
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
      postNumber:8,
      options: [
        { text: '8', value: 8 },
        { text: '16', value: 16 },
      ],
      selected: '8',
      thumbnail:''
      
    }
  },
  watch: {    
    question: function (newVal) {      
      if(newVal > this.postNumber){
        this.postNumber = 8
        this.requestEvents()
        this.postNumber = newVal
      } else if(newVal < this.postNumber){
        this.posts = this.posts.slice(0,8)
        this.postNumber = newVal
      } 
    }
  },
  methods: {
    requestEvents: async function() {
      this.eventUpdateCount += 1
      let tempStorage = []
      tempStorage = await this.$http.get('https://jsonplaceholder.typicode.com/posts?_page='+ this.eventUpdateCount +'&_limit='+this.postNumber+'&_sort=id&_order=desc')
      for(let i = 0; i < tempStorage.data.length; i++){
        console.log(tempStorage.data,'냐냐')
        tempStorage.data[i].thumbnail = this.getThumbnail()
      }
      for (let data of tempStorage.data) {        
        this.posts.push(data)
      }

      if(tempStorage.data.length >= this.postNumber ){
        this.busy = false 
      }     
    },
    getThumbnail() {
      let num = Math.floor(Math.random() * 3);
      console.log(this.thumbnails[num],'냐냐0')
      return this.thumbnails[num]
    },
    loadMore: function () {
      this.busy = true
      this.requestEvents()
    },

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
    .area_select{
      display: flex;
      justify-content: flex-end;
    }
    
}
</style>
