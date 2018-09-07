<template>
  <div class="main">
    <div class="success">
      <div class="top-bar">
          <div class="cancel"></div>
          <div class="tit">发送成功</div>
          <div class="next"></div>
      </div>
      <div class="response">
        <div class="icon"></div>
        <div class="title">您的作品已发送成功</div>
        <div class="detail">3个工作日内您将收到审核“通过”或“未通过”的通知，
  请关注【萝卜初行】公众号，注意查收。</div>
        <div class="btn" @click="prevStep">我知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'success',
  methods: {
    prevStep(){
      this.$router.push({ path: '/editor/home', query: { token: this.$route.query.token } })
    },

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
    background: url(../assets/icon-success.png) no-repeat center center / 100%;
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
  .btn{
    margin:3rem auto 0;
    width:6rem;
    height: 1.8rem;
    line-height: 1.8rem;
    background: #5dadd0;
    color:#fff;
    font-size: .8rem;
    border-radius: .2rem;
  }
</style>
