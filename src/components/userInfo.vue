<template>
  <div class="user-info">
    <div class="top-bar">
        <div class="cancel" @click="prevStep()">上一步</div>
        <div class="tit" @click="crrShowWrap()">投稿内容</div>
        <div class="next" @click="nextStep()"></div>
    </div>
    <form
      id="app"
      @submit.prevent="checkForm"
      action="https://vuejs.org/"
      method="post"
    >

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
        >
      </p>

      <p>
        <label for="age">Age</label>
        <input
          id="age"
          v-model="age"
          type="number"
          name="age"
          min="0">
      </p>

      <p>
        <label for="age2">Age2</label>
        <input
          id="age2"
          v-model="age2"
          type="number"
          name="age2"
          min="0">
      </p>

      <p>
        <input type="submit" value="Submit">
      </p>

    </form>
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data () {
    return {
      errors: [],
      name: null,
      age: null,
      age2: null,
    }
  },
  methods: {
    prevStep(){
      this.$emit('increment', {step1: true, step2: false})
    },
    checkForm: function (e) {
      if (this.name && this.age && this.age2) {
        console.log("成功")
        return true;
      }
      console.log(this.errors.length)

      if (!this.name) {
        this.errors.push('Name required.');
        return false;
      }
      if (!this.age) {
        this.errors.push('Age required.');
        return false;
      }
      if (!this.age2) {
        this.errors.push('Age2 required.');
        return false;
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-info{

}
input{border:1px solid #000;}
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

</style>
