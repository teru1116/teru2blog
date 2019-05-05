<template>
  <div>
    <EditorHeader />
    <main>
      <!-- 記事エディタ -->
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditorHeader from './../../../../components/TheArticleEditorHeader'

export default {
  components: {
    EditorHeader
  },
  computed: {
    ...mapState({
      article: state => state.admin.article.selectedArticle
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
