<template>
  <div class="vm-editor" ref="abc">
    <div class="vm-editor-content" contenteditable="true" ref="editor" @keyup="keyup" @focus="focus" @blur="blur" v-html="article"></div>
    <canvas style="display: none;" id="js-canvas" ref="canvas"></canvas>
    <VmEditorMenu v-show="menu" @increment="imgInput">
            <button class="button icon-pic">
              <em class="icon"></em>
              <input ref="imgInput" type="file" accept="image/*" @change="imgInput($event)">
            </button>
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
      html: this.article,
      menu: true
    }
  },
  created(){
    //console.log(this.article)
  },
  updated(){
    //console.log(this.html)
    //this.$emit('increment', this.html)
  },
  methods: {
    tohome(){
      
    },
    keyup(){
      this.$emit('increment', this.$refs.editor.innerText)
    },
    focus(){
      if (this.article=="请输入正文") {
        this.$emit('increment2', "")
      }
      
      //this.$refs.abc.scrollIntoViewIfNeeded();
      //this.menu = true;
    },
    blur(){
      //this.menu = false;
    },
    imgInput (eve) {
        //console.log(eve)
        let file = eve.target.files[0]
        this.selectedImg = file.name
        let URL = window.URL || window.webkitURL,
          dataURL = URL.createObjectURL(file)
        let img = new Image()
        //console.log(img)
        img.crossOrigin = 'anonymous'
        img.onload = (function (receiver, callback) {
          return function (e) {
            let img = e.target
            img.onload = ''
            URL.revokeObjectURL(img.src)  // 解除URL对象

            let canvas = document.getElementById('js-canvas'),
             ctx = canvas.getContext('2d')
             //console.log(canvas)
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            receiver.focus()   // 富文本编辑器必须聚焦才可设置
            let imgWrap = document.createElement('p'),
              newImg = document.createElement('img')
            newImg.src = canvas.toDataURL()
            newImg.style = 'max-width:100%'
            imgWrap.appendChild(newImg)
            receiver.appendChild(imgWrap)
            callback()
          }
        })(this.$refs.editor, () =>{ this.collapseSelection() })
        img.src = dataURL

      },
    collapseSelection () {
        /*
         *   @method:折叠选区范围 以 设置 光标位置
         *      |                 |
         *     锚点, 选区起点     焦点, 选区终点
         *     将选区范围从锚点折叠到焦点, 即锚点与焦点位置重合, 光标就会出现在终点位置
         *     当选区范围已折叠, sel.isCollapsed  为true
         *
         *     如果此范围失去焦点, 光标消失之后
         *     再进行折叠到相同位置处, 则没有效果,光标不会出现
         *     因为该处已经折叠了
         *     此时需要把选区折叠到其他位置, 再折叠回来
         * */
        let editor = this.$refs.editor,
          len = editor.childNodes.length,
          sel = window.getSelection()
        sel.collapse(document.body, 0)
        sel.collapse(editor, len)
        editor.scrollTop = editor.clientHeight
      },
  },
  directives: {
    focus: {
      inserted: function (el) {
        //console.log(el)
        //el.focus()
      }
    }
  }
}
</script>

<style lang="scss">
  .icon-pic {
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
