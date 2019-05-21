<template>
  <div>
    <EditorHeader />
    <main>
      <Editor :title="title" :contentHTML="contentHTML" />
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditorHeader from './../../../../components/TheArticleEditorHeader'
import Editor from './../../../../components/TheArticleEditor'

export default {
  components: {
    EditorHeader,
    Editor
  },
  computed: {
    ...mapState({
      title: state => state.admin.editingArticle.title,
      contentHTML: state => state.admin.editingArticle.contentHTML
    })
  },
  created () {
    this.$store.dispatch('admin/editingArticle/fetchArticle', this.$route.params.articleId)
  }
}
</script>
