<template>
  <div class="user-info">
    <div class="top-bar">
        <div class="cancel" @click="prevStep()">上一步</div>
        <div class="tit">投稿内容</div>
        <div class="next"></div>
    </div>
    <form @submit.prevent="checkForm">
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
        <label for="cellphone">联系电话<em>*</em></label>
        <input
          id="cellphone"
          v-model="cellphone"
          type="number"
          name="cellphone"
        >
      </p>

      <p class="input-box">
        <label for="wechatId">微信号<em>*</em></label>
        <input
          id="wechatId"
          v-model="wechatId"
          type="text"
          name="wechatId"
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

      <p class="submit" :class="{ on: isOn}">
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
      id: null,
      name: null,
      cellphone: null,
      wechatId: null,
      isOn: false
    }
  },
  methods: {
    prevStep(){
      this.$router.push({ path: '/editor/home' })
    },
    checkForm: function (e) {
      this.$Message.destroy()
      if (!this.name) {
        this.$Message.info('请填写作者署名');
        return false;
      }
      if (!this.cellphone) {
        this.$Message.info('请填写联系电话');
        return false;
      }
      const reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if(!this.cellphone){
        this.$Message.info('请填写联系电话');
        return false;
      }
      if(!reg.test(this.cellphone)){
        this.$Message.info('手机格式不正确');
        return false;
      }
      if (!this.wechatId) {
        this.$Message.info('请填写微信号');
        return false;
      }
      //
      let loadingInstance = this.$loading({ fullscreen: true, lock: true });
      const qs = this.$qs.stringify({
          id:this.id,
          name:this.name,
          cellphone:this.cellphone,
          wechatId:this.wechatId
      });
      this.$axios.post('/api/document/send',qs)
      .then(res => {
        loadingInstance.close();
        if (res.data.code === 200) {
          this.$router.push({ path: '/editor/userinfo/success' })
        }
        else{
          this.$router.push({ path: '/editor/userinfo/fail' })
        }
      })
      .catch(error => {
        loadingInstance.close();
        this.$router.push({ path: '/editor/userinfo/fail' })
      })
      //
    }
  },
  created(){
    // this.$axios.get('/api/document/ownerinfo')
    // .then(res => {
    //   this.id = res.data.data.id
    //   this.name = res.data.data.name
    //   this.cellphone = res.data.data.cellphone
    //   this.wechatId = res.data.data.wechatId
    // })
    // .catch(error => {
    //   console.log(error)
    // })
  },
  updated(){
    if (this.name && this.cellphone && this.wechatId) {
      this.isOn = true;
    }
    else{
      this.isOn = false;
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
  background: #b5b5b5;
  font-size: 1rem;
  color:#fff;
}
.submit.on input{
  background: #5dadd0
}
</style>
