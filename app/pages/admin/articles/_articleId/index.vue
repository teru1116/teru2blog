<template>
  <div>
    <EditorHeader />
    <main>
      <div class="inner">
        <ArticleContent />
      </div>
    </main>
  </div>
</template>

<script>
import EditorHeader from './../../../../components/TheArticleEditorHeader'
import ArticleContent from './../../../../components/TheArticleContent'

export default {
  components: {
    EditorHeader,
    ArticleContent
  }
}
</script>
