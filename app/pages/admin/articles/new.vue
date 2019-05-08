<template>
  <div>
    <EditorHeader />
    <main>
      <Editor />
    </main>
  </div>
</template>

<script>
import EditorHeader from './../../../components/TheArticleEditorHeader'
import Editor from './../../../components/TheArticleEditor'

export default {
  components: {
    EditorHeader,
    Editor
  }
}
</script>
