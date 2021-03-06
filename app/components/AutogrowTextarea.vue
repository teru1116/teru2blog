<template>
  <textarea
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    :style="textareaStyles"
    :placeholder="placeholder"
    @input="applyStyles"
    @blur="$emit('blur')"
  />
</template>

<script>
function calculateContentHeight (el, lineHeight) {
  const origHeight = el.style.height
  const height = el.offsetHeight
  const scrollHeight = el.scrollHeight

  el.style.overflow = 'hidden'

  if (height >= scrollHeight) {
    el.style.height = (height + lineHeight) + 'px'

    if (scrollHeight < el.scrollHeight) {
      el.style.height = origHeight

      return height
    }
  }

  return scrollHeight
}

export default {
  props: {
    value: String,
    placeholder: String
  },
  computed: {
    textareaStyles () {
      return {
        height: `${this.textareaHeight}px`
      }
    }
  },
  data () {
    return {
      textareaHeight: 0
    }
  },
  watch: {
    textareaHeight (newVal) {
      this.$emit('onChangeHeight', newVal)
    }
  },
  methods: {
    applyStyles () {
      this.setTextAreaSize(18)
      this.$nextTick().then(() => {
        this.setTextAreaSize()
        window.setTimeout(() => {
          this.$el.style.overflow = 'auto'
        }, 10)
      })
    },
    setTextAreaSize (height) {
      let newHeight = height

      if (!height) {
        const size = this.getTextAreaLineSize()
        newHeight = calculateContentHeight(this.$el, size)
      }

      this.textareaHeight = newHeight
    },
    getTextAreaLineSize () {
      const style = window.getComputedStyle(this.$el)
      return parseInt(style.lineHeight, 10)
    }
  },
  mounted () {
    this.setTextAreaSize()
  }
}
</script>

<style lang="scss" scoped>
textarea {
  resize: none;
  height: 24px;
  font-size: 16px;  // iPhoneの自動ズームが効かないフォントサイズ
  outline: 0;
}
</style>
