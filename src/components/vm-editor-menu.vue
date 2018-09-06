<template>
  <div class="vm-editor-menu" ref="abc">
          <button class="button icon-pic"><em class="icon"></em></button>
          <button class="button icon-font" @click="crrShowWrap()"><em class="icon"></em></button>
          <button class="button icon-hr" @click="execCommand('insertHorizontalRule')"><em class="icon"></em></button>
    <!-- <VmEditorButton>
      <VmEditorDropdown>
        <ul class="vm-editor-ul">
          <li @click="execCommand('fontSize', 7)">
            <button style="font-size: 24px">7</button>
          </li>
          <li @click="execCommand('fontSize', 6)">
            <button style="font-size: 22px">6</button>
          </li>
          <li @click="execCommand('fontSize', 5)">
            <button style="font-size: 20px">5</button>
          </li>
          <li @click="execCommand('fontSize', 4)">
            <button style="font-size: 18px">4</button>
          </li>
          <li @click="execCommand('fontSize', 3)">
            <button style="font-size: 16px">3</button>
          </li>
          <li @click="execCommand('fontSize', 2)">
            <button style="font-size: 14px">2</button>
          </li>
          <li @click="execCommand('fontSize', 1)">
            <button style="font-size: 12px">1</button>
          </li>
        </ul>
      </VmEditorDropdown>
    </VmEditorButton> -->
    
    

    

    
        <!-- <VmEditorAddimage></VmEditorAddimage> -->

    
    <slot></slot>
  </div>
</template>

<script>
import VmEditorButton from './vm-editor-button.vue'
import VmEditorDropdown from './vm-editor-dropdown.vue'
import VmEditorAddimage from './vm-editor-addimage.vue'
export default {
  name: 'VmEditorMenu',
  components: {
    VmEditorButton,
    VmEditorDropdown,
    VmEditorAddimage,
  },
  methods: {
    execCommand: function (commandName, valueArgument) {
      if (!valueArgument) {
        valueArgument = null
      }
      document.execCommand(commandName, false, valueArgument)
    },
    setImage: function (evt) {
      let reader = new FileReader()
      let file = evt.target.files[0]
      reader.readAsDataURL(file)
      reader.onload = function (evt) {
        let base64Image = evt.target.result
        document.execCommand('insertImage', false, base64Image)
      }
    }
  },
  mounted(){
    //console.log(this.$refs.abc)
    //this.$refs.abc.scrollIntoView(false);
  }
}
</script>
<style scoped>
  .vm-editor-menu {
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

  .vm-editor-menu .button {
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
      background: transparent;
      border:0;
  } 
  .vm-editor-menu .button .icon{
    display: block;
    width:1.5rem;
    height: 2rem;
    background-repeat:no-repeat;
    background-position: center;
    background-size:100%;
  }
  .vm-editor-menu .icon-pic .icon{
    background-image: url(../assets/icon-pic.png)
  }
  .vm-editor-menu .icon-font .icon{
    background-image: url(../assets/icon-font.png)
  }
  .vm-editor-menu .icon-hr .icon{
    background-image: url(../assets/icon-hr.png)
  }
</style>
