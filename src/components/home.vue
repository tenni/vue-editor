<template>
  <div class="main">
    <div class="home" v-show="step1">
      <div class="top-bar">
          <div class="cancel">取消</div>
          <div class="tit">投稿内容</div>
          <div class="next" @click="nextStep()">下一步</div>
      </div>
      <div class="title">
        <input type="text" placeholder="请输入标题">
      </div>
      <VmEditor @upload="showHtml"></VmEditor>
      
    </div>
    <div v-show="step2">
      <userInfo v-on:increment="incretol"></userInfo>
    </div>
  </div>
</template>

<script>
import userInfo from '@/components/userInfo'
import VmEditor from '@/components/vm-editor.vue'

export default {
  name: 'home',
  data () {
    return {
      previewHtml: '',
      step1: true,
      step2: false,
    }
  },
  components: {
    userInfo,
    VmEditor
  },
  methods: {
    nextStep(){
      this.step1 = !this.step1;
      this.step2 = !this.step2;
    },
    incretol(msg){
      this.step1 = msg.step1
      this.step2 = msg.step2
    },
    showHtml: function (data) {
      this.previewHtml = data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  padding:0 1rem;
  border-bottom:1px solid #f2f2f2;
}
.title input{
  width:100%;
  height:3rem;
  font-size: .8rem;
}

</style>
