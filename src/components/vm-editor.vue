<template>
  <div class="vm-editor" ref="abc">
  <input type="text">
    <div class="vm-editor-content" contenteditable="true" ref="editor" @keyup="keyup" @focus="focus" @blur="blur" v-html="article"></div>
    <VmEditorMenu v-show="menu" :hide="hideObj">
      <button class="button icon-pic">
        <em class="icon"></em>
        <input ref="imgInput" type="file" accept="image/*" @change="imgInput($event)">
      </button>

      <div class="listpic-wrap-div" slot="pic" ref="picwrap">
        <swiper :options="swiperOption" ref="mySwiper" class="listpic-wrap">
            <swiper-slide v-for="(item, index) in listpic" :key="index"><img :src="item" @click="insertImg($event)"></swiper-slide>
        </swiper>
      </div>
    </VmEditorMenu>
    
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible" ref="actionsheet">
    </mt-actionsheet>
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
      menu: true,
      hideObj:{
        hide1: false,
        hide2: false
      },
      actions: [],
      sheetVisible: false,
      listpic:[],
      attrInsertImg:"",
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        slidesPerView :'auto'
      },
    }
  },
  created(){
    //console.log(this.article)
  },
  mounted() {
    this.actions = [{
      name: '删除',
      method: this.deletePic
    }, {
      name: '插入到正文',
      method: this.insertBody
    }];

  },
  updated(){
     if (this.listpic.length>0) {
    let num = this.listpic.length-1
              console.log(num)
              //console.log(t.$refs.mySwiper)
              this.$refs.mySwiper.swiper.slideTo(num, 1000, true)
            }
    //this.$emit('increment', this.html)
  },
  methods: {
    insertBody(){
      console.log(window.getSelection().getRangeAt(0))
      window.getSelection().getRangeAt(0)
      // let imgWrap = document.createElement('p')
      // imgWrap.innerHTML += "222222222222"
      // window.getSelection().getRangeAt(0).insertNode(imgWrap)
      document.execCommand('insertImage', false, this.attrInsertImg)
    },
    deletePic(){
      let index = this.listpic.indexOf(this.attrInsertImg)
      this.listpic.splice(index,1)
    },
    insertImg(e){
      this.attrInsertImg = e.target.src
      this.sheetVisible = !this.sheetVisible
      let li = this.$refs.actionsheet.$el.children[0].children[1]
      li.innerHTML = '插入到正文<img src="data:image/png;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="blank-img" />'

    },
    keyup(){

      this.$emit('increment', this.$refs.editor.innerText)
      if(this.$refs.editor.offsetHeight>350){
        document.body.scrollTop = document.body.scrollHeight;
      }
    },
    focus(){
      this.hideObj.hide1 = false 
      this.hideObj.hide2 = false 

      if (this.article=="请输入正文") {
        this.$emit('increment2', "")
      }
      if(this.$refs.editor.offsetHeight>350){
        document.body.scrollTop = document.body.scrollHeight;
      }
      //console.log(document.body.scrollHeight)
      //this.$refs.abc.scrollIntoView();
      //this.menu = true;
      
    },
    blur(){
      //this.menu = false;
      //document.body.scrollTop = 0;
    },
    imgInput (eve) {
        this.hideObj.hide2 = true;
        
        let t = this
        if(eve.target.files.length > 0){
          let loadingInstance = this.$loading({ fullscreen: true, lock: true });
          this.$lrz(eve.target.files[0], {
            width: 800
          })
          .then(function (rst) {
              loadingInstance.close();
              var img = new Image();
              img.src = rst.base64;
              let imgWrap = document.createElement('p')
              imgWrap.appendChild(img)
              //t.$refs.picwrap.appendChild(imgWrap)
              t.listpic.push(img.src)
              //console.log(t.listpic.length)

              // const qs = t.$qs.stringify({
              //   imgBase64:rst.base64,
              //   imgSuffix:""
              // });
              // t.$axios.post('/api/document/file/upload/base64', qs)
              // .then(res => {
              //   loadingInstance.close();
              //   if (res.data.code === 200) {
              //     img.src = res.data.data
              //     let imgWrap = document.createElement('p')
              //     imgWrap.appendChild(img)
              //     //t.$refs.editor.appendChild(imgWrap)
                  
              //     //安卓手机打开相册选中图片就获取不到焦点，下面两种都不行
              //     //第一种
              //     //var range = window.getSelection().getRangeAt(0);//找到焦点位置
              //     //range.insertNode(imgWrap)
              //     //第二种
              //     //document.execCommand('insertImage', false, img.src)//第一版，
                  
              //   }
              //   else{
              //     t.$Message.error('请重新上传')
              //   }
              // })
              // .catch(error => {
              //   alert(error)
              //   loadingInstance.close();
              //   t.$Message.error('请重新上传')
              // })
          })
          .catch(function (err) {
              // 万一出错了，这里可以捕捉到错误信息
              // 而且以上的then都不会执行
              loadingInstance.close();
              t.$Message.error('请重新上传')
          })
        }

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
    //
  },

  directives: {
    focus: {
      inserted: function (el) {
        //console.log(el)
        el.focus()
      }
    }
  }
}
</script>

<style lang="scss">
  .listpic-wrap-div{
    height:8rem;
  }
  .swiper-wrapper{
    display:flex;
    align-items:center;
    height:8rem;
    background:#fff;
    .swiper-slide {
      flex:0 0 auto;
      margin-left:.5rem;
      width:4rem;
      height:4rem;
      overflow: hidden;
      img{
        width:100%;
      }
    }
  }
  .mint-actionsheet-listitem{
    position: relative;
  }
  .blank-img{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
  .icon-pic {
      position: relative;
      overflow: hidden;

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
      padding: .8rem .8rem 5rem;
      font-size: .8rem;
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
        margin: 20px 30px;
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
