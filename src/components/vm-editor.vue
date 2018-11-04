<template>
  <div class="vm-editor" ref="abc">
    <div class="vm-editor-content" contenteditable="true" ref="editor" @keyup="keyup" @focus="focus" @blur="blur" v-html="article"></div>
    <button class="btn-file" :style="{bottom: closeMenu.rem+'rem'}" @click="btnFile">
      <em class="icon" :class="{cur:closeMenu.btn}"></em>
    </button>
    <VmEditorMenu v-show="closeMenu.menu1" :hide="hideObj">
      <!-- hideObj传给子元素，子元素再传给子元素 -->
      <button class="button icon-pic">
        <em class="icon"></em>
        <input ref="imgInput" type="file" accept="image/*" @change="imgInput($event)">
      </button>
    </VmEditorMenu>

    <VmEditorMenu2 v-show="closeMenu.menu2" :hide="hideObj">
      <button class="button icon-pic">
        <em class="icon"></em>
        <input ref="imgInput" type="file" accept="image/*" @change="imgInput2($event)">
      </button>
      <button class="button icon-word">
        <em class="icon"></em>
        <input ref="imgInput" type="file" @change="wordUpload($event)">
      </button>

      <div class="listpic-wrap-div" slot="pic" ref="picwrap">
        <swiper :options="swiperOption" ref="mySwiper" class="listpic-wrap">
            <swiper-slide v-for="(item, index) in listpic" :key="index"><img :src="item.src" :type="item.type" :name="item.url" @click="insertImg($event,index)"></swiper-slide>
        </swiper>
      </div>
    </VmEditorMenu2>

    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible" ref="actionsheet">
    </mt-actionsheet>

    <mt-actionsheet
      :actions="actions2"
      v-model="sheetVisible2" ref="actionsheet2">
    </mt-actionsheet>
  </div>
</template>
<script>
import VmEditorMenu from './vm-editor-menu.vue'
import VmEditorMenu2 from './vm-editor-menu2.vue'
import VmEditorButton from './vm-editor-button.vue'
export default {
  name: 'VmEditor',
  props: {
    article: String,
    closeMenu: Object,
    listpic: Array,
  },
  components: {
    VmEditorMenu,
    VmEditorMenu2,
    VmEditorButton
  },
  data: function () {
    return {
      wordUrl: '',
      importPic: 'data:image/png;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      hideObj:{
        hide1: false,
        hide2: false
      },
      actions: [],
      actions2: [],
      sheetVisible: false,
      sheetVisible2: false,
      attrInsertImg:"",
      attrInsertImgIndex: '',
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        slidesPerView :3,
        spaceBetween :10,
      },
    }
  },
  created(){
    
  },
  mounted() {
    this.actions = [{
      name: '删除图片',
      method: this.deletePic
    }, {
      name: '插入到正文',
      method: this.insertBody
    }];

    this.actions2 = [{
      name: '删除文档',
      method: this.deleteFile
    }];
  },
  methods: {
    getUrlRelativePath(){
      var url = this.attrInsertImg;
      var arrUrl = url.split("//");

      var start = arrUrl[1].indexOf("/");
      var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

      if(relUrl.indexOf("?") != -1){
      　　relUrl = relUrl.split("?")[0];
      }
      return relUrl;
    },
    btnFile(){
      if (this.closeMenu.menu2) {
        this.closeMenu.btn = false
        //this.closeMenu.menu1 = true
        this.closeMenu.menu2 = false
        this.closeMenu.rem = 1
      }
      else{
        this.closeMenu.btn = true
        this.closeMenu.menu1 = false
        this.closeMenu.menu2 = true
        this.closeMenu.rem = 10.5
      }
    },
    insertBody(){
      window.getSelection().getRangeAt(0)
      // let imgWrap = document.createElement('p')
      // imgWrap.innerHTML += "222222222222"
      // window.getSelection().getRangeAt(0).insertNode(imgWrap)
      document.execCommand('insertImage', false, this.attrInsertImg)
      // let imgWrap = document.createElement('p'),
      //     newImg = document.createElement('img')
      // newImg.src = this.attrInsertImg
      // imgWrap.appendChild(newImg)
      // window.getSelection().getRangeAt(0).insertNode(imgWrap)
    },
    deletePic(){
      let loadingInstance = this.$loading({ fullscreen: true, lock: true })
      this.$axios.delete('/api/document/file/delete', {
        params: {
          type:0,
          fileName:this.attrInsertImg
        }
      })
      .then(res => {
        loadingInstance.close();
        if (res.data.code === 200) {
          this.listpic.splice(this.attrInsertImgIndex,1)
          this.$emit('listpic', this.listpic)

          let node = this.$refs.editor.getElementsByTagName('img')
          for (var i = node.length - 1; i >= 0; i--) {
            if (node[i].getAttribute('src')==this.attrInsertImg) {
              node[i].parentNode.removeChild(node[i]);
            }
          }
        }
        else{
          this.$Message.error('请重新删除')
        }
      })
      .catch(error => {
        console.log(error)
        loadingInstance.close();
        this.$Message.error('请重新删除')
      })
      //this.listpic.splice(this.attrInsertImgIndex,1)
    },
    deleteFile(){
      let loadingInstance = this.$loading({ fullscreen: true, lock: true })
      this.$axios.delete('/api/document/file/delete', {
        params: {
          type:2,
          fileName:this.wordUrl
        }
      })
      .then(res => {
        loadingInstance.close();
        if (res.data.code === 200) {
          this.listpic.splice(this.attrInsertImgIndex,1)
          this.$emit('listpic', this.listpic)

          let node = this.$refs.editor.getElementsByTagName('img')
          for (var i = node.length - 1; i >= 0; i--) {
            if (node[i].getAttribute('src')==this.attrInsertImg) {
              node[i].parentNode.removeChild(node[i]);
            }
          }
        }
        else{
          this.$Message.error('请重新删除')
        }
      })
      .catch(error => {
        console.log(error)
        loadingInstance.close();
        this.$Message.error('请重新删除')
      })
      //this.listpic.splice(this.attrInsertImgIndex,1)
    },
    insertImg(e, index){
      this.attrInsertImgIndex = index
      this.attrInsertImg = e.target.src
      this.wordUrl = e.target.name
      if (this.attrInsertImg==this.importPic) {
        this.sheetVisible2 = !this.sheetVisible2
      }
      else{
        this.sheetVisible = !this.sheetVisible
        let li = this.$refs.actionsheet.$el.children[0].children[1]
        li.innerHTML = '插入到正文<img src="data:image/png;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="blank-img" />'
      }
    },
    keyup(){

      this.$emit('increment', this.$refs.editor.innerText)
      // if(this.$refs.editor.offsetHeight>350){
      //   document.body.scrollTop = document.body.scrollHeight;
      // }
    },
    focus(){
      //this.$refs.editor.scrollIntoView()
      if (this.article=='<span style="color:#757575">请输入正文</span>') {
        this.$emit('increment2', "")
      }
      //console.log(document.body.scrollHeight)
      this.closeMenu.menu1 = true;
      this.closeMenu.menu2 = false;
      this.closeMenu.btn = false;
      this.closeMenu.rem = 2.5
    },
    blur(){
      //this.closeMenu.menu1 = false;
      this.closeMenu.rem = 2.5
      //this.fileStyle = 1
      //document.body.scrollTop = 0;
    },
    imgInput (eve) {

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
              t.$refs.editor.appendChild(imgWrap)
              /*t.listpic.push(img.src)
              if (t.listpic.length>0) {
                let num = t.listpic.length-1
                t.$refs.mySwiper.swiper.slideTo(num)
              }*/
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
              //   console.log(error)
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
    wordUpload (eve) {
      let loadingInstance = this.$loading({ fullscreen: true, lock: true });
      let file = eve.target.files[0]
      let formData = new FormData()
      formData.append('file', file)
      formData.append('type', 2)
      //var reader = new FileReader()
      //reader.readAsDataURL(file)
      //reader.onload = function(e) {
        // 也能获取base64
      //  console.log(this)
      //}
      let t = this
      t.$axios.post('/api/document/file/upload', formData)
      .then(res => {
        loadingInstance.close();
        if (res.data.code === 200) {

          t.listpic.push({src:t.importPic, type:2, url:res.data.data.url})
          if (t.listpic.length>0) {
            let num = t.listpic.length-1
            t.$refs.mySwiper.swiper.slideTo(num)
          }


          t.$emit('listpic', t.listpic)

        }
        else{
          t.$Message.error('请重新上传')
        }
      })
      .catch(error => {
        console.log(error)
        loadingInstance.close();
        t.$Message.error('请重新上传')
      })



    },
    imgInput2 (eve) {


        let t = this
        if(eve.target.files.length > 0){
          let loadingInstance = this.$loading({ fullscreen: true, lock: true });
          this.$lrz(eve.target.files[0], {
            width: 800
          })
          .then(function (rst) {
              var img = new Image();
              img.src = rst.base64;
              //let imgWrap = document.createElement('p')
              //imgWrap.appendChild(img)
              //t.$refs.editor.appendChild(imgWrap)

              const qs = t.$qs.stringify({
                timeout:1000,
                imgBase64:rst.base64,
                imgSuffix:""
              });
              t.$axios.post('/api/document/file/upload/base64', qs)
              .then(res => {
                loadingInstance.close();
                if (res.data.code === 200) {
                  img.src = res.data.data
                  t.listpic.push({src:img.src, type:0})
                  if (t.listpic.length>0) {
                    let num = t.listpic.length-1
                    t.$refs.mySwiper.swiper.slideTo(num)
                  }


                  t.$emit('listpic', t.listpic)
                  //t.$refs.editor.appendChild(imgWrap)

                  //安卓手机打开相册选中图片就获取不到焦点，下面两种都不行
                  //第一种
                  //var range = window.getSelection().getRangeAt(0);//找到焦点位置
                  //range.insertNode(imgWrap)
                  //第二种
                  //document.execCommand('insertImage', false, img.src)//第一版，

                }
                else{
                  t.$Message.error('请重新上传')
                }
              })
              .catch(error => {
                console.log(error)
                loadingInstance.close();
                t.$Message.error('请重新上传')
              })
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
  .btn-file{
    position: fixed;
    bottom:1rem;
    right:1rem;
    background: transparent;
    border:0;
    outline: 0;
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
  .listpic-wrap-div{
    height:8rem;
    background:#fff;
    overflow:hidden;
  }
  .swiper-container{
    padding-left:.5rem;
    padding-right:5.3rem;
  }
  .swiper-wrapper{
    display:flex;
    align-items:center;
    height:8rem;
    .swiper-slide {
      flex:0 0 auto;
      display:flex;
      align-items:center;
      border:1px solid #f2f2f2;
      border-radius:.2rem;
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
        margin: 20px 0;
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
