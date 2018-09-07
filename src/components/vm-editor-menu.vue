<template>
  <div class="vm-editor-menu">
          <div class="button-wrap">
            <VmEditorAddimage></VmEditorAddimage>
            <button class="button icon-font" @click="tabBoo">
              <em class="icon"></em>
            </button>
            <button class="button icon-hr" @click="execCommand('insertHorizontalRule','',1)" ref="line"><em class="icon"></em></button>
          </div>
          <VmEditorButton :boo="fatherBoo">
            <VmEditorDropdown>
              <ul class="vm-editor-ul">
                <li @click="execCommand('formatBlock', '<h1>')">
                  <button style="font-size: 24px">大标题</button>
                </li>
                <li @click="execCommand('formatBlock', '<h2>')">
                  <button style="font-size: 22px">标题</button>
                </li>
                <li @click="execCommand('formatBlock', '<h3>')">
                  <button style="font-size: 20px">正文</button>
                </li>
                <li @click="execCommand('insertUnorderedList')">
                  <button style="font-size: 18px">无序列表</button>
                </li>
              </ul>
            </VmEditorDropdown>
          </VmEditorButton>
    

    

    
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
  data(){
    return{
      fatherBoo: false
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
      this.fatherBoo = !this.fatherBoo
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
