<template>
  <div class="user-info">
    <div class="top-bar">
        <div class="cancel" @click="prevStep()">上一步</div>
        <div class="tit">投稿内容</div>
        <div class="next"></div>
    </div>
    <form
      @submit.prevent="checkForm"
      action="https://vuejs.org/"
      method="post"
    >
      <p class="input-box">
        <label for="name">作者署名<em>*</em></label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
        >
      </p>

      <p class="input-box">
        <label for="tel">联系电话<em>*</em></label>
        <input
          id="tel"
          v-model="tel"
          type="number"
          name="tel"
        >
      </p>

      <p class="input-box">
        <label for="wechat">微信号<em>*</em></label>
        <input
          id="wechat"
          v-model="wechat"
          type="text"
          name="wechat"
        >
      </p>

      <!-- <p class="input-box">
        <label for="alipay">支付宝账号<em>*</em></label>
        <input
          id="alipay"
          v-model="alipay"
          type="text"
          name="alipay"
        >
      </p>

      <p class="alipay-info">（支付宝账号仅用于结算稿费）</p> -->
      
      <p class="intro">请再次确定，您所要发送的作品是原创首发稿件，没有抄袭、洗稿行为，投稿文章未以任何形式发表于任何公众媒体之上，且您是稿件的版权所有人。</p>

      <p class="submit">
        <input type="submit" value="OK，发送给萝卜初行">
      </p>

    </form>
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data () {
    return {
      name: null,
      tel: null,
      wechat: null,
      alipay: null,
    }
  },
  methods: {
    prevStep(){
      this.$emit('increment', {step1: true, step2: false})
    },
    checkForm: function (e) {
      if (this.name && this.tel && this.wechat) {
        this.$Message.success('发送成功！');
        return true;
      }
      this.$Message.destroy()
      if (!this.name) {
        this.$Message.info('请填写作者署名！');
        return false;
      }
      if (!this.tel) {
        this.$Message.info('请填写联系电话！');
        return false;
      }
      if (!this.wechat) {
        this.$Message.info('请填写微信号！');
        return false;
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form{
  padding-top: .5rem;
}

.input-box{
  margin-top: 1rem;
  overflow: hidden;
  font-size:.8rem;
}
.input-box label{
  float: left;
  padding: .6rem .6rem .6rem 0;
  width:6rem;
  text-align: right;
  vertical-align: middle;
  color: #737373;
  line-height: 1;
}
.input-box label em{
  color:#ea5541;
}
.input-box input{
  display: block;
  margin-left: 6rem;
  padding-left: .4rem;
  border:1px solid #5dadd0;
  border-radius: .3rem;
  width:11rem;
  height: 2rem;
}
.alipay-info{
  margin-top: .5rem;
  padding: 0 1.5rem;
  font-size: .6rem;
  color:#737373;
  text-align: right;
}
.intro{
  margin-top: 1.5rem;
  padding: 0 1.5rem;
  font-size: .6rem;
  color:#878787;
  line-height: 1rem;
}
.submit{
  margin-top: 2rem;
  text-align: center;
}
.submit input{
  width:12rem;
  height: 2.5rem;
  border-radius: .3rem;
  background: #5dadd0;
  font-size: 1rem;
  color:#fff;
}
</style>
