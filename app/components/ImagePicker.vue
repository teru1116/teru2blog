<template>
  <div>
    <div
      class="image-picker"
      :style="{ width: `${width}px`, height: `${height}px`, backgroundImage: `url(${backgroundImageUrl})` }"
      @click="$refs.input.click()"
    />
    <input
      type="file"
      ref="input"
      :style="{ display: 'none' }"
      @change="onFileSelect"
    />
  </div>
</template>

<script>
export default {
  props: {
    width: Number,
    height: Number,
    defaultImageDataURL: String
  },
  computed: {
    backgroundImageUrl () {
      return this.selectedImageDataURL || this.defaultImageDataURL
    }
  },
  data () {
    return {
      selectedImageDataURL: '',
      file: null
    }
  },
  methods: {
    onFileSelect (e) {
      e.preventDefault()

      const file = e.target.files[0]
      const image = new Image()
      const reader = new FileReader()
      reader.onload = () => {
        this.selectedImageDataURL = reader.result
        this.$emit('onSelect', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss" scoped>
.image-picker {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: whitesmoke;
  cursor: pointer;
}
</style>
