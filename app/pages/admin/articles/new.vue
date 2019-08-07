<template>
  <div>
    <EditorHeader />
    <main>
      <Editor :title="title" :contentHTML="contentHTML" ref="editor" />
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditorHeader from './../../../components/TheArticleEditorHeader'
import Editor from './../../../components/TheArticleEditor'

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
  // previewページからnewページに戻ってきた時にストアの編集中記事データをエディタにセットしている
  mounted () {
    this.$refs.editor.setContent()
  }
}
</script>
