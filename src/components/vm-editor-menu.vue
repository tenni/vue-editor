<template>
  <div class="vm-editor-menu">
          <div class="button-wrap">
           <!--  <VmEditorAddimage></VmEditorAddimage> -->
            <slot v-if='true'></slot>
            <button class="button icon-font" @click="tabBoo(4)">
              <em class="icon"></em>
            </button>
            <button class="button icon-hr" @click="execCommand('insertHorizontalRule','',1)" ref="line"><em class="icon"></em></button>
          </div>
          <VmEditorButton :boo="hideObj.hide1">
            <VmEditorDropdown>
              <ul class="vm-editor-ul">
                <li @click="execCommand('formatBlock', '<h1>')">
                  <button style="font-size: 1rem">大标题</button>
                </li>
                <li @click="execCommand('formatBlock', '<h2>')">
                  <button style="font-size: .9rem">小标题</button>
                </li>
                <li @click="execCommand('formatBlock', '<div>')">
                  <button style="font-size: .8rem">正文</button>
                </li>
                <li @click="execCommand('insertUnorderedList')">
                  <button style="font-size: .8rem">无序列表</button>
                </li>
              </ul>
            </VmEditorDropdown>
          </VmEditorButton>
    
          
    

    
        <!-- <VmEditorAddimage></VmEditorAddimage> -->

    
    
  </div>
</template>

<script>
import VmEditorButton from './vm-editor-button.vue'
import VmEditorDropdown from './vm-editor-dropdown.vue'
import VmEditorAddimage from './vm-editor-addimage.vue'
export default {
  name: 'VmEditorMenu',
  computed:{
    hideObj(){
      return this.$store.state.hideObj
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
        this.$store.commit('reducePrice')
      }
    },
    tabBoo(amount){
      this.$store.dispatch('actionPrice', amount)
    }
    
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
    background-image: url(../assets/icon-pic.png)
  }
  .vm-editor-menu .icon-font .icon{
    background-image: url(../assets/icon-font.png)
  }
  .vm-editor-menu .icon-hr .icon{
    background-image: url(../assets/icon-hr.png)
  }
</style>
