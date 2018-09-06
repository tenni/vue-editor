<template>
  <div id="app" ref="abc">
    <router-view/>
  </div>
</template>

<script>
//import home from './components/home'

export default {
  name: 'App',
  mounted(){
    //console.log(this.$refs.abc.offsetHeight)
    //this.$refs.abc.offsetHeight;
  }
}

;(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=750){
                docEl.style.fontSize = '40px';
            }else{
                docEl.style.fontSize = 40 * (clientWidth / 750) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
    font-size: .7rem;
    -webkit-overflow-scrolling: touch;
}
*{
    -webkit-tap-highlight-color: transparent;
}
html, body, div, span, applet, object, iframe, h1, h2, h3,
h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address,
big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li,
fieldset, form, label, legend, table, caption, tbody, tfoot,
thead, tr, th, td,input,textarea {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-weight: inherit;
    font-style: inherit;
    line-height: inherit;
    border:none;
    font-family:"Helvetica";
}

html,body{
    height:100%;
}
html{

}
body{
    max-width: 750px;
    margin:0 auto;
}
a{
    text-decoration:none;
    color:inherit;
}
ul{
    list-style: none;
}

a,button,input,optgroup,select,textarea{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
i{
    font-style: normal;
}
input{
    border-radius:0;
    -webkit-border-radius:0;
}
/*img{
    width:100%;
    height:auto;
}*/
.top-bar {
    display: flex;
    bottom: 0;
    border-bottom:1px solid #f2f2f2;
    height: 2.5rem;
    padding:0 1rem;
    background: #fafafa;
}

.top-bar div {
    flex: 1;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    font-size: .8rem;
    color: #5dadd0;
}
.top-bar .tit{
  color:#000;
}
.top-bar .cancel{
  text-align:left;
}
.top-bar .next{
  text-align: right
}
</style>
