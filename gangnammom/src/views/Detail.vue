<template>
  <div id="detail">
    <div>
        제목
    </div>
    <div>
        내용
    </div>
    <div class="commentArea">
        댓글
        <div>
            제목
        </div>
        <div>
            작성자 이메일
        </div>
        <div>
            내용
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Detail',
  components: {
  },
  data(){
    return {
        title : '',
        description : ''
    }    
  }
}
</script>

<style>
</style>
