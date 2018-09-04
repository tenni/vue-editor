<template>
  <div class="main">
    <div class="home" v-show="step1">
      <div class="top-bar">
          <div class="cancel" @click="showWrap()">取消</div>
          <div class="tit" @click="crrShowWrap()">投稿内容</div>
          <div class="next" @click="nextStep()">下一步</div>
      </div>
      <div class="title">
        <input type="text" placeholder="请输入标题">
      </div>
      <div class="article"></div>
      <div class="bottom-btn">
          <div class="savebtn" @click="showWrap()"><i class="icon-pencil"></i>图片</div>
          <div class="currmonthbtn" @click="crrShowWrap()"><i class="icon-signal"></i>字体大小</div>
          <div class="totalbtn" @click="allshowWrap()"><i class="icon-bar-chart"></i>水平线</div>
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
      step2:true,
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
.home{

}
.top-bar {
    display: flex;
    bottom: 0;
    height: 3rem;
    padding:0 1rem;
    background: #efeded;
}

.top-bar div {
    flex: 1;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    font-size: .8rem;
    color: #3399FF;
    -webkit-tap-highlight-color: transparent;
} 
.top-bar .cancel{text-align:left;}
.top-bar .next{text-align: right}
.title{
  padding:0 1rem;
  border-bottom:1px solid #efeded;
}
.title input{
  width:100%;
  height:3rem;
}
.bottom-btn {
    position: fixed;
    display: flex;
    bottom: 0;
    width: 18.75rem;
    height: 3rem;
    background: #efeded;
}

.bottom-btn div {
    flex: 1;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    font-size: .8rem;
    color: #3399FF;
    -webkit-tap-highlight-color: transparent;
} 
</style>
