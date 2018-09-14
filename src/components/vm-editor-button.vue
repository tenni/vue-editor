<template>
  <div class="vm-editor-button">
    <slot v-if="boo"></slot>
    <slot v-if="boo2"></slot>
  </div>
</template>
<style lang="scss">
  .vm-editor-button{
  }
</style>
<script>
export default {
  name: 'VmEditorButton',
  props: ['boo', 'boo2'],
  data: function () {
    return {
      slot: false
    }
  },
  methods: {
    showSlot () {
      this.slot = this.slot === false ? true : false
      
    },
    hideSlot () {
      this.slot = false
    }
  }
}
</script>