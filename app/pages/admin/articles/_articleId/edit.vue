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
  methods: {
    async fetchArticle () {
      await this.$store.dispatch('admin/editingArticle/fetchArticle', this.$route.params.articleId)
      // 記事の読み込みが完了したら、エディタにコンテンツを渡す
      this.$refs.editor.setContent()
    }
  },
  created () {
    this.fetchArticle()
  }
}
</script>
