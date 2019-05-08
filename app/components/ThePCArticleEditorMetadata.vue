<template>
  <div class="article-editor-metadata">
    <section>
      <h3>アイキャッチ画像</h3>
      <ImagePicker
        :width="180"
        :height="135"
        :defaultImageDataURL="defaultImageDataURL"
        v-on:onSelect="onIcatchImageUpdate"
      />
    </section>
    <CategoryEditor />
  </div>
</template>

<script>
import ImagePicker from './ImagePicker'
import CategoryEditor from './TheArticleEditorCategory'

export default {
  components: {
    ImagePicker,
    CategoryEditor
  },
  data () {
    return {
      defaultImageDataURL: this.$store.state.admin.article.displayingArticle.icatchImageDataURL
    }
  },
  methods: {
    onIcatchImageUpdate (dataURL) {
      this.$store.dispatch('admin/article/updateIcatchImageDataURL', dataURL)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-editor-metadata {
  width: 180px;
  margin-left: 32px;
  section {
    margin-bottom: 24px;
    .article-icatch-show {
      width: 180px;
      height: 135px;
      background-color: whitesmoke;
      cursor: pointer;
    }
  }
}
</style>
