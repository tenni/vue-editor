<template>
    <div class="vm-editor-dropdown">
      <slot></slot>
      <!-- <div class="block"></div> -->
    </div>
</template>
<style lang="scss">
  .vm-editor-dropdown{

  }
  .vm-editor-ul{

    li{

      button{
        width:100%;
        height:2rem;
        line-height: 2rem;
        background:#fff;
        border:0;
        border-bottom:1px solid #f2f2f2;
      }
    }
  }
</style>
<script>
export default {
  name: 'VmEditorDropDown'
}
</script>
