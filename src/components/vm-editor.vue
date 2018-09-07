<template>
  <div class="vm-editor" ref="abc">

    <div class="vm-editor-content" contenteditable="true" @focus="focus" @blur="blur" v-html="article" placeholder="请输入标题"></div>
    <VmEditorMenu v-show="menu">
      <!-- <VmEditorButton icon="upload" @click.native="uploadHtml" class="global-control"></VmEditorButton> -->
    </VmEditorMenu>

  </div>
</template>
<script>
import VmEditorMenu from './vm-editor-menu.vue'
import VmEditorButton from './vm-editor-button.vue'
export default {
  name: 'VmEditor',
  props:['article'],
  components: {
    VmEditorMenu,
    VmEditorButton
  },
  data: function () {
    return {
      html: 'Please Enter ...',
      menu: true
    }
  },
  methods: {
    
    focus(){
      //this.$refs.abc.scrollIntoViewIfNeeded();
      //this.menu = true;
    },
    blur(){
      //this.menu = false;
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="scss">
  .vm-editor{
    background-color: white;
    border-radius: 4px;
    min-width: 18.75rem;
    overflow: hidden;
    .global-control{
      position: absolute;
      right: 15px;
    }
    .vm-editor-content{
      outline: 0;
      min-height: 350px;
      text-align: left;
      padding: .8rem .8rem 3rem;
      font-size: 16px;
      ul, ol{
        margin: 10px 20px;
        padding: 0;
      }
      ul{
        list-style-type: square;
      }
      ol{
        list-style-type: decimal;
      }
      li{
        display: list-item;
        padding: 0;
      }
      hr{
        margin: 15px 0;
        border-top: 1px dashed #737373;
      }
      pre{
        display: block;
        margin: 10px 0;
        padding: 8px;
        border-radius: 4px;
        background-color: #f2f2f2;
        color: #656565;
        font-size: 14px;
      }
      blockquote{
        display: block;
        border-left: 4px solid #ddd;
        margin: 15px 0;
        padding: 0 15px;
      }
      img{
        margin: 20px 0;
        max-width:100%;
      }
      a{
        color: #41b883;
      }
    }
  }
</style>
