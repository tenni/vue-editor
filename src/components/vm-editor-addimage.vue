<template>
  <div class="add-img">  
    <span class="icon"></span>
    <input type="file" accept="image/*" @change="setImage">
  </div>
</template>
<style lang="scss">
  .add-img {
      position: relative;
      flex: 1;
      display: flex;
      justify-content:center;
      align-items:center;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      font-size: .8rem;
      color: #3399FF;
      background: transparent;
      border:0;
  
      .icon{
        display: block;
        width:1.5rem;
        height: 2rem;
        background-repeat:no-repeat;
        background-position: center;
        background-size:100%;
        background-image: url(../assets/icon-pic.png)
      }
      input{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
      }
  }
</style>
<script>
export default {
  name: 'VmEditorAddimage',
  methods: {
    setImage: function (evt) {
      let reader = new FileReader()
      console.log(reader)
      let file = evt.target.files[0]
      console.log(evt)
      reader.readAsDataURL(file)
      reader.onload = function (evt) {
        console.log(evt)
        let base64Image = evt.target.result
        document.execCommand('insertImage', false, base64Image)
      }
    }
  }
}
</script>
