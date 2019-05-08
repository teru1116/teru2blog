<template>
  <div>
    <EditorHeader />
    <main>
      <Editor />
    </main>
  </div>
</template>

<script>
import EditorHeader from './../../../../components/TheArticleEditorHeader'
import Editor from './../../../../components/TheArticleEditor'

export default {
  components: {
    EditorHeader,
    Editor
  },
  created () {
    this.$store.dispatch('admin/article/fetchArticle', this.$route.params.articleId)
  }
}
</script>
