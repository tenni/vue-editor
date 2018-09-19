<template>
  <div class="vm-editor-menu">
          <div class="button-wrap">
           <!--  <VmEditorAddimage></VmEditorAddimage> -->
            <slot v-if='true'></slot>
            
          </div>
          

          
            <slot name='pic'></slot>
            
          
    
          
    

    
        <!-- <VmEditorAddimage></VmEditorAddimage> -->

    
    
  </div>
</template>

<script>
import VmEditorButton from './vm-editor-button.vue'
import VmEditorDropdown from './vm-editor-dropdown.vue'
import VmEditorAddimage from './vm-editor-addimage.vue'
export default {
  name: 'VmEditorMenu2',
  props:['hide'],
  data(){
    return{
    }
  },
  components: {
    VmEditorButton,
    VmEditorDropdown,
    VmEditorAddimage,
  },
  methods: {
    execCommand: function (commandName, valueArgument,e) {
      if (!valueArgument) {
        valueArgument = null
      }
      document.execCommand(commandName, false, valueArgument)
      if (!e) {
        this.fatherBoo = !this.fatherBoo
      }
    },
    tabBoo(){
      this.hide.hide1 = !this.hide.hide1
      this.hide.hide2 = false
    },
    btnFile(){
      this.hide.hide1 = false
      this.hide.hide2 = !this.hide.hide2
    },
    
  },
  mounted(){
    //console.log(this.$refs.line)
    //this.$refs.abc.scrollIntoView(false);
  }
}
</script>
<style scoped>
  .vm-editor-menu {
      position: fixed;
      bottom: 0;
      width:18.75rem;
  }
  .icon-word {
      position: relative;
      overflow: hidden;
  }
  .btn-file{
    position: absolute;
    top:-2rem;
    right:1rem;
    background: transparent;
    border:0;
    outline: 0
  }
  .btn-file .icon{
    display: block;
    width:1.75rem;
    height:1.75rem;
    background-repeat:no-repeat;
    background-position: center;
    background-size:100%;
    background-image: url(../assets/icon-file.png)
  }
  .btn-file .cur{
    background-image: url(../assets/icon-file-h.png)
  }
  .button-wrap{
    display: flex;
    border-top:1px solid #f2f2f2;
    border-bottom:1px solid #f2f2f2;
    width: 18.75rem;
    height: 2rem;
    background: #fafafa;
  }
  .vm-editor-menu .button {
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
      outline: 0
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
    background-image: url(../assets/icon-file-pic.png)
  }
  .vm-editor-menu .icon-word .icon{
    background-image: url(../assets/icon-file-word.png);
    height:1.3rem;
    background-size: auto 100%;
  }


  .vm-editor-menu .icon-word input{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
      }
  .vm-editor-menu .icon-hr .icon{
    background-image: url(../assets/icon-hr.png)
  }
</style>
