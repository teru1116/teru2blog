<template>
  <div class="modal-wrap">
    <div class="modal-overlay" ref="overlay" />
    <div class="modal">
      <button class="close" @click="close"><i class="material-icons">clear</i></button>
      <div class="modal-inner" ref="modalInner">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close () {
      document.body.removeChild(this.$el)
      this.$emit('onClose')
    }
  },
  mounted () {
    this.$refs.overlay.addEventListener('click', this.close)
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    this.close()
  }
}
</script>

<style lang="scss" scoped>
.modal-wrap {
  @media screen and (min-width: 600px) {}
  @media screen and (max-width: 599px) {
    position: fixed;
    top: 40px;
    left: 16px;
    right: 16px;
    z-index: 100;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 101;
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
  }
  .modal {
    position: relative;
    z-index: 102;
    background-color: #fff;
    border-radius: 4px;
    .close {
      position: absolute;
      top: -32px;
      right: 0;
      color: #fff;
    }
    .modal-inner {
      padding: 16px 8px;
    }
  }
}
</style>
