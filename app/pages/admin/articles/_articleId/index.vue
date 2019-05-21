<template>
  <div>
    <EditorHeader />
    <main>
      <div class="inner">
        <ArticleContent :article="article" />
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditorHeader from './../../../../components/TheArticleEditorHeader'
import ArticleContent from './../../../../components/TheArticleContent'

export default {
  components: {
    EditorHeader,
    ArticleContent
  },
  computed: {
    ...mapState({
      article: state => state.admin.article
    })
  },
  created () {
    this.$store.dispatch('admin/article/fetchArticle', this.$route.params.articleId)
  }
}
</script>
