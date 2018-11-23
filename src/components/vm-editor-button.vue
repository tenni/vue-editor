<template>
  <div class="vm-editor-button">
    <slot v-if="boo"></slot>
  </div>
</template>
<style lang="scss">
  
</style>
<script>
export default {
  name: 'VmEditorButton',
  props: ['boo'],
  // data: function () {
  //   return {
  //     slot: false
  //   }
  // },
  // methods: {
  //   showSlot () {
  //     this.slot = this.slot === false ? true : false
      
  //   },
  //   hideSlot () {
  //     this.slot = false
  //   }
  // }
}
</script>