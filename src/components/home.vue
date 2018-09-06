<template>
  <div class="main">
    <div class="home">
      <div class="top-bar">
          <div class="cancel">取消</div>
          <div class="tit">投稿内容</div>
          <div class="next" @click="uploadHtml()">下一步</div>
      </div>
      <div class="title">
        <input type="text" placeholder="请输入标题" v-model="title">
      </div>
      <VmEditor :article="previewHtml"></VmEditor>
      
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
      previewHtml: ''
    }
  },
  components: {
    VmEditor
  },
  methods: {
    showHtml: function (data) {
      this.previewHtml = data
    },
    uploadHtml: function () {
      this.$router.push({ path: 'userinfo' })
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
              border-top: 1px solid #eeeff1;
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

      this.previewHtml = htmlContainerParent.innerHTML

      const qs = this.$qs.stringify({
          id:this.id,
          documentTitle:this.title,
          documentContext:this.previewHtml
      });
      this.$axios.post('/api/api/document/save',qs)
      .then(res => {
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })

      
    }
    //
  },
  created(){
    this.$axios.get('/api/api/document/preview')
    .then(res => {
      this.id = res.data.data.id
      this.title = res.data.data.documentTitle
      this.previewHtml = res.data.data.documentContext
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  padding:0 1rem;
  border-bottom:1px solid #f2f2f2;
}
.title input{
  width:100%;
  height:3rem;
  font-size: .8rem;
}

</style>
