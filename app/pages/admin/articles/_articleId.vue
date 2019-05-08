<template>
  <div>
    <EditorHeader />
    <main>
      <ArticleContent />
    </main>
  </div>
</template>

<script>
import EditorHeader from './../../../components/TheArticleEditorHeader'
import ArticleContent from './../../../components/TheArticleContent'

export default {
  components: {
    EditorHeader,
    ArticleContent
  }
}
</script>
