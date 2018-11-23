<template>
  <div class="main">
    <div class="fail">
      <div class="top-bar">
          <div class="cancel"></div>
          <div class="tit">发送失败</div>
          <div class="next"></div>
      </div>
      <div class="response">
        <div class="icon"></div>
        <div class="title">对不起！发送失败！</div>
        <div class="detail">请检查您的网络或者稍后重试。</div>
        <div class="back-editor" @click="prevStep">返回编辑</div>
        <div class="btn" @click="resend">重新发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fail',
  methods: {
    prevStep(){
      this.$router.push({ path: '/editor/home' })
    },
    resend(){
      this.$router.push({ path: '/editor/userinfo' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .response{
    text-align: center;
    padding:0 2.25rem;
  }
  .icon{
    margin:3.5rem auto 0;
    width:2.875rem;
    height: 2.875rem;
    background: url(../assets/icon-fail.png) no-repeat center center / 100%;
  }
  .title{
    margin-top: 1rem;
    color:#000;
    font-size: .8rem;
  }
  .detail{
    margin-top: 1rem;
    color:#737373;
    font-size: .6rem;
    line-height: 1.2rem;
  }
  .back-editor{
    margin-top: 2rem;
    font-size: .8rem;
    color:#5dadd0;
  }
  .btn{
    margin:1rem auto 0;
    width:6rem;
    height: 1.8rem;
    line-height: 1.8rem;
    background: #5dadd0;
    color:#fff;
    font-size: .8rem;
    border-radius: .2rem;
  }
</style>
