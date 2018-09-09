<template>
  <div class="main">
    <div class="hide">{{editorVal}}</div>
    <div class="home">
      <div class="top-bar">
          <div class="cancel"></div>
          <div class="tit">投稿内容</div>
          <div class="next" :class="{ on: isOn}" @click="uploadHtml()">下一步</div>
      </div>
      <div class="title">
        <input type="text" placeholder="请输入标题" v-model="title">
      </div>
      <VmEditor :article="previewHtml" @increment="incretol" @increment2="incretol2"></VmEditor>
      
    </div>
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
      previewHtml: '',
      isOn: false,
      editorVal: ''
    }
  },
  components: {
    VmEditor
  },
  methods: {
    incretol: function(val){
      this.editorVal = val
    },
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
              margin: 15px 0;
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


      if (this.title && this.previewHtml) {
        
        const qs = this.$qs.stringify({
          id:this.id,
          documentTitle:this.title,
          documentContext:this.previewHtml
        });
        this.$axios.post('/api/document/save',qs)
        .then(res => {
          console.log(res.data)
          this.$router.push({ path: '/editor/userinfo', query: { token: this.$route.query.token } })
        })
        .catch(error => {
          console.log(error)
        })

        //this.$Message.success('发送成功');
        return true;
      }
      this.$Message.destroy()
      if (!this.title) {
        this.$Message.info('请输入标题');
        return false;
      }
      if (!this.previewHtml) {
        this.$Message.info('请输入正文');
        return false;
      }
    },
    
    //
  },
  created(){
    //this.previewHtml = "请输入正文"
    this.$axios.get('/api/document/preview')
    .then(res => {
      this.id = res.data.data.id
      this.title = res.data.data.documentTitle
      if(res.data.data.documentContext){
        this.previewHtml = res.data.data.documentContext
      }
      else{
        this.previewHtml = "请输入正文"
      }
    })
    .catch(error => {
      console.log(error)
    })
  },
  updated(){
      if (this.title && this.editorVal) {
        this.isOn = true
      }
      else{
        this.isOn = false
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
  font-size: .8rem;
}
.hide{display: none;}
</style>
