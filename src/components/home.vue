<template>
  <div class="main">
    <div class="hide">{{editorVal}}</div>
    <div class="home">
      <div class="top-bar">
          <div class="cancel" @click="cancelBtn">取消</div>
          <div class="tit">投稿内容</div>
          <div class="next" :class="{ on: isOn}" @click="uploadHtml()" v-loading.fullscreen.lock="fullscreenLoading">下一步</div>
      </div>
      <div class="title">
        <input type="text" placeholder="请输入标题" v-model="title" @focus="focus">
      </div>
      <VmEditor :listpic="getfileUrlArr" :closeMenu="closeMenu" :article="previewHtml" @increment="incretol" @increment2="incretol2" @listpic="listpicfa"></VmEditor>
      
    </div>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible" ref="actionsheet">
    </mt-actionsheet>
  </div>
</template>

<script>
import VmEditor from '@/components/vm-editor.vue'

export default {
  name: 'home',
  data () {
    return {
      id:'',
      title:'',
      getfileUrlArr: [],
      previewHtml: '',
      closeMenu:{
        menu1: false,
        menu2: false,
        btn: false,
        rem: 1
      },
      isOn: false,
      temp: false,
      editorVal: '',// 作用下一步颜色
      fullscreenLoading: false,
      actions: [],
      sheetVisible: false,
    }
  },
  components: {
    VmEditor
  },
  methods: {
    listpicfa(e){
      this.getfileUrlArr = e
    },
    focus(){
      this.closeMenu.menu1 = false
      this.closeMenu.menu2 = false
      this.closeMenu.btn = false
      this.closeMenu.rem = 1
    },
    // 作用下一步颜色
    incretol: function(val){
      this.editorVal = val
    },
    // 作用去掉请输入正文
    incretol2: function(val){
      this.previewHtml = val
    },
    uploadHtml: function () {
      let style = {
        ul: `
              margin: 10px 20px;
              list-style-type: square;
              padding: 0;
            `,
        ol: `
              margin: 10px 20px;
              list-style-type: decimal;
              padding: 0;
            `,
        li: `
              display: list-item;
              padding: 0;
            `,
        hr: `
              margin: 20px 30px;
              border-top: 1px dashed #737373;
            `,
        pre: `
              display: block;
              margin: 10px 0;
              padding: 8px;
              border-radius: 4px;
              background-color: #f2f2f2;
              color: #656565;
              font-size: 14px;
             `,
        blockquote: `
                      display: block;
                      border-left: 4px solid #ddd;
                      margin: 15px 0;
                      padding: 0 15px;
                    `,
        img: `
               margin: 20px 0;
               max-width:100%;
             `,
        a: `
            color: #41b883;
           `
      }
      let html = document.getElementsByClassName('vm-editor-content')[0]
      let htmlContainerParent = document.createElement('div')
      let htmlContainer = document.createElement('div')
      let tagNames = Object.keys(style)
      for (let i = 0; i < tagNames.length; i++) {
        let _tagNames = html.getElementsByTagName(tagNames[i])
        if (_tagNames.length > 0) {
          for (let j = 0; j < _tagNames.length; j++) {
            _tagNames[j].style = style[tagNames[i]]
          }
        }
      }
      htmlContainer.style = `
                              text-align: left;
                              padding: 15px;
                              font-size: 16px; 
                            `
      htmlContainer.innerHTML = html.innerHTML
      htmlContainerParent.appendChild(htmlContainer)
      //console.log(html.innerHTML)
      this.previewHtml = html.innerHTML


      if (this.title && this.previewHtml && this.previewHtml!='<span style="color:#757575">请输入正文</span>' && this.previewHtml!="<br>") {
        //let loadingInstance = this.$loading({ fullscreen: true, lock: true });
        this.fullscreenLoading = true;
        const qs = this.$qs.stringify({
          id:this.id,
          documentTitle:this.title,
          documentContext:this.previewHtml,
          enclosureUrl:JSON.stringify(this.getfileUrlArr)
        });
        this.$axios.post('/api/document/save', qs)
        .then(res => {
          //loadingInstance.close();
          this.fullscreenLoading = false;
          if (res.data.code === 200) {
            this.$router.push({ path: '/editor/userinfo', query: { token: this.$route.query.token } })
          }
          else{
            this.$Message.error('发送失败')
          }
        })
        .catch(error => {
          //loadingInstance.close();
          this.fullscreenLoading = false;
          this.$Message.error('发送失败')
          
        })

        return true;
      }
      this.$Message.destroy()
      if (!this.title) {
        this.$Message.info('请输入标题')
        return false;
      }
      if (!this.previewHtml || this.previewHtml=='<span style="color:#757575">请输入正文</span>' || this.previewHtml=="<br>") {
        this.$Message.info('请输入正文')
        return false;
      }
    },
    nosave(){
      this.$wechat.closeWindow()
    },
    yessave(){
      this.uploadHtml()
      this.$wechat.closeWindow()
    },
    cancelBtn(){
      this.sheetVisible = !this.sheetVisible
    }
    //
  },
  created(){

    this.$axios.get('/api/document/preview')
    .then(res => {
      this.id = res.data.data.id
      this.title = res.data.data.documentTitle
      
      if(res.data.data.documentContext){
        this.previewHtml = res.data.data.documentContext
      }
      else{
        this.previewHtml = '<span style="color:#757575">请输入正文</span>'
      }
      if (res.data.data.enclosureUrl) {
        // '[{"src":"http://image.roobbc.com/document-99323a26-2254-4ffd-bbef-a0999b5ec322.jpeg","type":0}]'转数组
        let str = res.data.data.enclosureUrl
        this.getfileUrlArr = JSON.parse(str)
      }
      
    })
    .catch(error => {
      console.log("错误："+error)
    })

  },
  mounted() {
    this.actions = [{
      name: '不保存草稿',
      method: this.nosave
    }, {
      name: '保存草稿',
      method: this.yessave
    }]
  },
  updated(){

    
      if (this.title && this.editorVal) {
        this.isOn = true
      }
      else{
        if (this.title && this.previewHtml) {
          this.isOn = true
        }
        else{
          this.isOn = false
        }
      }
    


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  padding:0 .8rem;
  border-bottom:1px solid #f2f2f2;
}
.title input{
  width:100%;
  height:3rem;
  font-size: .85rem;
}
.hide{display: none;}
</style>
