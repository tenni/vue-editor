<template>
  <div></div>
</template>

<script>

export default {
  name: 'editor',
  data(){
    return{
        isGet:false
    }
  },
  created(){
    if(!this.isGet){
        this.getList()
    }
    
  },
  methods:{
    getList(){
      this.isGet = true
      this.$axios.get('/api/document/login/wx/authorurl')
      .then(res => {
        window.location.href = res.data.data.url
        window.event.returnValue = false
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
