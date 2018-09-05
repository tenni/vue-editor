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
      <div class="article"></div>
      <div class="bottom-btn">
          <div class="icon-pic" @click="showWrap()"><i class="icon"></i></div>
          <div class="icon-font" @click="crrShowWrap()"><i class="icon"></i></div>
          <div class="icon-hr" @click="allshowWrap()"><i class="icon"></i></div>
      </div>
    </div>
    <div v-show="step2">
      <userInfo v-on:increment="incretol"></userInfo>
    </div>
  </div>
</template>

<script>
import userInfo from '@/components/userInfo'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      step1: false,
      step2: true,
    }
  },
  components: {
    userInfo
  },
  methods: {
    nextStep(){
      this.step1 = !this.step1;
      this.step2 = !this.step2;
    },
    incretol(msg){
      this.step1 = msg.step1
      this.step2 = msg.step2
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
.bottom-btn {
    position: fixed;
    display: -webkit-flex; /* Safari */
    display: flex;
    bottom: 0;
    border-top:1px solid #f2f2f2;
    border-bottom:1px solid #f2f2f2;
    width: 18.75rem;
    height: 2rem;
    background: #fafafa;
}

.bottom-btn div {
    flex: 1;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content:center;
    align-items:center;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: .8rem;
    color: #3399FF;
} 
.bottom-btn div .icon{
  display: block;
  width:1.5rem;
  height: 2rem;
  background-repeat:no-repeat;
  background-position: center;
  background-size:100%;
}
.bottom-btn .icon-pic .icon{
  background-image: url(../assets/icon-pic.png)
}
.bottom-btn .icon-font .icon{
  background-image: url(../assets/icon-font.png)
}
.bottom-btn .icon-hr .icon{
  background-image: url(../assets/icon-hr.png)
}
</style>
