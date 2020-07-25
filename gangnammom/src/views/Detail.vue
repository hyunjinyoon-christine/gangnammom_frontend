<template>
  <div id="detail">
    <div>
        제목 {{$store.state.post.title}}
    </div>
    <div>
        내용 {{$store.state.post.body}}
    </div>
    <div class="commentArea">
        댓글
        <div>
            제목 {{commentTitle}}
        </div>
        <div>
            작성자 이메일 {{email}}
        </div>
        <div>
            내용 {{commentDescription}}
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Detail',
  components: {
  },
  computed: {

  },
  data(){
    return {
        title : '',        
        description : '',
        commentTitle: '',
        email:'',
        commentDescription: ''
    }    
  }
}
</script>

<style lang="scss" scoped>
</style>
